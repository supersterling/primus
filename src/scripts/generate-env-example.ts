import { plugin } from "bun"
import { z } from "zod"
import { result } from "@/lib/either.ts"

// ── Intercept createEnv ────────────────────────────────────────────────────

type EnvSection = Record<string, z.ZodType>
type EnvConfig = { server?: EnvSection; client?: EnvSection; shared?: EnvSection }

let captured: EnvConfig | null = null

plugin({
    name: "capture-env",
    setup(build) {
        build.module("@t3-oss/env-nextjs", () => ({
            exports: {
                createEnv(cfg: EnvConfig) {
                    captured = cfg
                    return new Proxy({}, { get: (_, k) => process.env[k as string] ?? "" })
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

if (!captured) {
    console.error("createEnv() was never called")
    process.exit(1)
}

const config = captured as EnvConfig

// ── Generate lines ─────────────────────────────────────────────────────────

function section(title: string, schemas: EnvSection | undefined): string[] {
    if (!schemas || Object.keys(schemas).length === 0) {
        return []
    }

    const lines = [`# ── ${title} ──`, ""]

    for (const [key, schema] of Object.entries(schemas)) {
        const js = z.toJSONSchema(schema) as Record<string, unknown>

        if (js.description) {
            lines.push(`# ${js.description}`)
        }
        if (Array.isArray(js.enum)) {
            lines.push(`# ${js.enum.join(" | ")}`)
        }

        const defaultVal = "default" in js ? JSON.stringify(js.default) : ""
        lines.push(`${key}=${defaultVal}`, "")
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
