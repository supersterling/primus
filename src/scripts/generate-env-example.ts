import { plugin } from "bun"
import { z } from "zod"
import { result } from "@/lib/either.ts"

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
                                return val != null ? val : ""
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

// ── Generate lines ─────────────────────────────────────────────────────────

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

    const defaultVal = "default" in jsonSchema ? JSON.stringify(jsonSchema.default) : ""
    lines.push(`${key}=${defaultVal}`, "")

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
    "# Auto-generated — run: bun run env:example",
    "",
    ...section("Server", config.server),
    ...section("Client", config.client),
    ...section("Shared", config.shared),
]

// ── Write ──────────────────────────────────────────────────────────────────

const write = await result.trycatch(() => Bun.write(".env.example", lines.join("\n")))

if (!write.ok) {
    console.error("Failed to write .env.example:", write.error.message)
    process.exit(1)
}

console.log("✓ .env.example written")
