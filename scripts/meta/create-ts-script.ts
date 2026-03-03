#!/usr/bin/env bun
import { $ } from "bun"
import { Cli, z } from "incur"

// =============================================================================
// Template
// =============================================================================

const TS_EXT_RE = /\.ts$/

function generateScript(target: string, desc: string, author: string, date: string): string {
    const name = target.substring(target.lastIndexOf("/") + 1)
    const cliName = name.replace(TS_EXT_RE, "")

    return `#!/usr/bin/env bun
// = ${name}
//
// == Description
//
// ${desc}
//
// == Metadata
//
// Author:  ${author}
// Created: ${date}
//
// == Usage
//
// ${target.startsWith("/") ? target : `./${target}`} <command> [options]

import { Cli, z } from "incur"

const cli = Cli.create("${cliName}", {
    description: "${desc}",
})

cli.command("run", {
    description: "TODO",

    args: z.object({
        // example: z.string().describe("An example argument"),
    }),

    options: z.object({
        // verbose: z.boolean().optional().describe("Enable verbose output"),
    }),

    async run(_c) {
        // TODO: implement
        return {}
    },
})

export default cli
cli.serve()
`
}

// =============================================================================
// CLI
// =============================================================================

const cli = Cli.create("create-ts-script", {
    description: "Generate professional Bun TypeScript scripts with standard boilerplate.",
})

cli.command("generate", {
    description: "Generate a new Bun TypeScript script with standard boilerplate.",

    args: z.object({
        path: z.string().describe("Path where the new script will be created"),
        description: z.string().describe("One-line description for the script header"),
    }),

    options: z.object({
        author: z.string().optional().describe("Author name (defaults to git user.name or $USER)"),
    }),

    output: z.object({
        created: z.string().describe("Path of the created script"),
        author: z.string().describe("Author name written into the script header"),
        date: z.string().describe("Creation date written into the script header"),
    }),

    examples: [
        {
            args: { path: "scripts/my-script.ts", description: "Does something useful" },
            description: "Create a script with auto-detected author",
        },
        {
            args: { path: "scripts/my-script.ts", description: "Does something useful" },
            options: { author: "sterling" },
            description: "Create a script with an explicit author",
        },
    ],

    async run(c) {
        const target = c.args.path
        const desc = c.args.description
        const date = new Date().toISOString().slice(0, 10)

        const gitName = (await $`git config user.name`.nothrow().quiet().text()).trim()
        const author = c.options.author ?? (gitName ? gitName : (Bun.env.USER ?? "unknown"))

        if (await Bun.file(target).exists()) {
            process.stderr.write(`File already exists: ${target}\n`)
            process.exit(1)
        }

        const lastSlash = target.lastIndexOf("/")
        if (lastSlash > 0) {
            const parent = target.substring(0, lastSlash)
            const { exitCode } = await $`test -d ${parent}`.nothrow().quiet()
            if (exitCode !== 0) {
                await $`mkdir -p ${parent}`.quiet()
            }
        }

        await Bun.write(target, generateScript(target, desc, author, date))
        await $`chmod +x ${target}`.quiet()

        return { created: target, author, date }
    },
})

cli.serve()
