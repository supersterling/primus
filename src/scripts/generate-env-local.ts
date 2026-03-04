import { plugin } from "bun"
import { z } from "zod"
import { result } from "@/lib/either.ts"
import { fallback } from "@/lib/utils.ts"

// ── Intercept createEnv ────────────────────────────────────────────────────

type EnvSection = Record<string, z.ZodType>
type EnvConfig = { server?: EnvSection; client?: EnvSection; shared?: EnvSection }

let captured: EnvConfig | null = null

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

function requireEnvConfig(value: EnvConfig | null): EnvConfig {
    if (!value) {
        console.error("createEnv() was never called")
        process.exit(1)
    }
    return value
}

plugin({
    name: "capture-env",
    setup(build) {
        build.module("@t3-oss/env-nextjs", () => ({
            exports: {
                createEnv(cfg: EnvConfig) {
                    captured = cfg
                    return new Proxy(
                        {},
                        {
                            get: (_, k) => {
                                const val = typeof k === "string" ? process.env[k] : undefined
                                return fallback(val, "")
                            },
                        },
                    )
                },
            },
            loader: "object",
        }))
        build.module("@t3-oss/env-core/presets-zod", () => ({
            exports: { vercel: () => ({}) },
            loader: "object",
        }))
    },
})

// ── Load env.ts ────────────────────────────────────────────────────────────

const load = await result.trycatch(() => import("@/lib/env.ts"))

if (!load.ok) {
    console.error("Failed to load src/lib/env.ts:", load.error.message)
    process.exit(1)
}

const config = requireEnvConfig(captured)

// ── Read existing .env.local ───────────────────────────────────────────────

const existing = new Map<string, string>()

const read = await result.trycatch(() => Bun.file(".env.local").text())

if (read.ok) {
    for (const line of read.value.split("\n")) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) {
            continue
        }
        const eq = trimmed.indexOf("=")
        if (eq === -1) {
            continue
        }
        const key = trimmed.slice(0, eq).trim()
        const val = trimmed.slice(eq + 1).trim()
        existing.set(key, val)
    }
}

// ── Generate lines ─────────────────────────────────────────────────────────

function defaultFor(schema: z.ZodType): string {
    const jsonSchema: unknown = z.toJSONSchema(schema)
    if (!isRecord(jsonSchema)) {
        return ""
    }
    return "default" in jsonSchema ? String(jsonSchema.default) : ""
}

function schemaLines(key: string, schema: z.ZodType): string[] {
    const jsonSchema: unknown = z.toJSONSchema(schema)

    if (!isRecord(jsonSchema)) {
        return []
    }

    const lines: string[] = []

    if (jsonSchema.description) {
        lines.push(`# ${jsonSchema.description}`)
    }
    if (Array.isArray(jsonSchema.enum)) {
        lines.push(`# ${jsonSchema.enum.join(" | ")}`)
    }

    const value = existing.has(key) ? existing.get(key) : defaultFor(schema)
    lines.push(`${key}=${fallback(value, "")}`, "")

    return lines
}

function section(title: string, schemas: EnvSection | undefined): string[] {
    if (!schemas || Object.keys(schemas).length === 0) {
        return []
    }

    const lines = [`# ── ${title} ──`, ""]

    for (const [key, schema] of Object.entries(schemas)) {
        lines.push(...schemaLines(key, schema))
    }

    return lines
}

const lines = [
    "# Auto-generated — run: bun run env:local",
    "# Existing values are preserved. New keys are added with defaults.",
    "",
    ...section("Server", config.server),
    ...section("Client", config.client),
    ...section("Shared", config.shared),
]

// ── Write ──────────────────────────────────────────────────────────────────

const write = await result.trycatch(() => Bun.write(".env.local", lines.join("\n")))

if (!write.ok) {
    console.error("Failed to write .env.local:", write.error.message)
    process.exit(1)
}

const added: string[] = []
const allKeys = [
    ...Object.keys(config.server ? config.server : {}),
    ...Object.keys(config.client ? config.client : {}),
    ...Object.keys(config.shared ? config.shared : {}),
]
for (const key of allKeys) {
    if (!existing.has(key)) {
        added.push(key)
    }
}

if (added.length > 0) {
    console.log(`✓ .env.local written — added: ${added.join(", ")}`)
} else {
    console.log("✓ .env.local written — no new keys")
}
