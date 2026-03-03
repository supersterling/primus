#!/usr/bin/env bun
// = generate-env-example.ts
//
// == Description
//
// Generate .env.example from Zod schemas in src/lib/env.ts
//
// == Metadata
//
// Author:  supersterling
// Created: 2026-03-03
//
// == Usage
//
// ./scripts/init/generate-env-example.ts generate [options]

import { plugin } from "bun"
import { Cli, z } from "incur"

// =============================================================================
// Env schema capture
// =============================================================================

type EnvConfig = {
    server?: Record<string, z.ZodType>
    client?: Record<string, z.ZodType>
    shared?: Record<string, z.ZodType>
    [key: string]: unknown
}

type SchemaInfo = {
    type: string
    hasDefault: boolean
    defaultValue?: unknown
}

let captured: EnvConfig | null = null

plugin({
    name: "capture-env-schema",
    setup(build) {
        build.module("@t3-oss/env-nextjs", () => ({
            exports: {
                createEnv(config: EnvConfig) {
                    captured = config
                    return new Proxy({}, { get: (_, key) => process.env[key as string] ?? "" })
                },
            },
            loader: "object",
        }))
    },
})

// =============================================================================
// Helpers
// =============================================================================

function describe(schema: z.ZodType): SchemaInfo {
    const js = z.toJSONSchema(schema) as Record<string, unknown>
    const parts: string[] = []
    let hasDefault = false
    let defaultValue: unknown

    if (Array.isArray(js.enum)) {
        parts.push(js.enum.join(" | "))
    } else if (js.type) {
        parts.push(String(js.type))
    }

    if (js.format) {
        parts.push(String(js.format))
    }

    if ("default" in js) {
        hasDefault = true
        defaultValue = js.default
    }

    return { type: parts.join(", "), hasDefault, defaultValue }
}

function section(lines: string[], title: string, schemas?: Record<string, z.ZodType>): number {
    lines.push("#")
    lines.push(`# ${title}`)
    lines.push("#")
    lines.push("")

    if (!schemas || Object.keys(schemas).length === 0) {
        return 0
    }

    for (const [key, schema] of Object.entries(schemas)) {
        const { type, hasDefault, defaultValue } = describe(schema)
        lines.push(`# ${type}`)
        const val = hasDefault ? JSON.stringify(defaultValue) : ""
        lines.push(`${key}=${val}`)
        lines.push("")
    }

    return Object.keys(schemas).length
}

// =============================================================================
// CLI
// =============================================================================

const cli = Cli.create("generate-env-example", {
    description: "Generate .env.example from Zod schemas in src/lib/env.ts",
})

cli.command("generate", {
    description: "Generate .env.example from Zod schemas in src/lib/env.ts",

    options: z.object({
        source: z.string().optional().describe("Source env file (default: src/lib/env.ts)"),
        output: z.string().optional().describe("Output file path (default: .env.example)"),
    }),

    examples: [
        { description: "Generate with defaults" },
        {
            options: { output: ".env.example.ci" },
            description: "Write to a custom output path",
        },
    ],

    async *run({ options, ok }) {
        const source = options.source ?? "src/lib/env.ts"
        const output = options.output ?? ".env.example"

        yield `Checking ${source}...`
        if (!(await Bun.file(source).exists())) {
            process.stderr.write(`Missing: ${source}\n`)
            process.exit(1)
        }

        yield `Extracting schemas from ${source}...`
        await import(`${import.meta.dir}/../../${source}`)

        if (!captured) {
            process.stderr.write("Failed to capture env config from createEnv()\n")
            process.exit(1)
        }

        yield `Building ${output}...`
        const lines: string[] = [
            "# Auto-generated from src/lib/env.ts",
            "# Run: bun run env:example",
            "",
        ]

        let keys = 0
        keys += section(lines, "Server", captured.server)
        keys += section(lines, "Client", captured.client)

        if (captured.shared && Object.keys(captured.shared).length > 0) {
            keys += section(lines, "Shared", captured.shared)
        }

        const content = lines.join("\n")
        await Bun.write(output, content.endsWith("\n") ? content : `${content}\n`)

        yield `Wrote ${keys} keys to ${output}`
        return ok(undefined)
    },
})

export default cli
cli.serve()
