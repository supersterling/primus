#!/usr/bin/env bun
// = create-ts-script.ts
//
// == Description
//
// Generate professional Bun TypeScript scripts with standard boilerplate.
//
// == Metadata
//
// Author:  supersterling
// Created: 2026-02-19
//
// == Usage
//
// ./scripts/meta/create-ts-script.ts SCRIPT_PATH <description> [-a author]

import { $ } from "bun"

//
// Constants
//

const PASS = "✔"
const FAIL = "✘"
const DONE = "▶"
const STEP = "●"
const FLOW = "▷"
const POSE = "?"
const WARN = "!"
const SCRIPT_NAME = import.meta.file
const SCRIPT_PATH = import.meta.path

//
// Logging
//
// All log functions respect the current indent level set by `logFlow`.
// Use `logFlow` / `logDone` pairs to create visually nested output blocks.
//
// ### Output Example
//
// ```
// ▷ Building project...
//   ● Compiling sources...
//   ✔ Compiled 42 files
//     src/index.ts: OK           ← dim (cmdExec)
// ▶ Build complete.
// ? Deploy now?                  ← cyan (askUserVia*)
//   > yes
// ```

let _indent = 0

// ### `pad`
//
// Returns whitespace for the current indent level (2 spaces per level).
// Internal helper — called by all log functions.
function pad(): string {
    return " ".repeat(_indent * 2)
}

// ### `logBold` — Bold text
//
// Prints bold text at the current indent level. No prefix icon.
//
// ```ts
// logBold("Project Setup")
// // Project Setup  (bold)
// ```
function logBold(...args: string[]): void {
    console.write(`${pad()}\x1b[1m${args.join(" ")}\x1b[22m\n`)
}

// ### `logPass` — Success message
//
// Green **✔** prefix. Use after a successful operation.
//
// ```ts
// logPass("Compiled 42 files")
// // ✔ Compiled 42 files
// ```
function logPass(...args: string[]): void {
    console.write(`${pad()}${Bun.color("green", "ansi")}${PASS}\x1b[39m ${args.join(" ")}\n`)
}

// ### `logDone` — Complete a flow block
//
// Black **▶** prefix. If inside a `logFlow` block, decrements indent first
// so the message aligns with its matching `logFlow`. Safe to call without a
// preceding `logFlow` — indent stays at 0.
//
// ```ts
// logFlow("Installing...")
// logPass("Installed foo")
// logDone("Installation complete.")
// // ▷ Installing...
// //   ✔ Installed foo
// // ▶ Installation complete.
// ```
function logDone(...args: string[]): void {
    if (_indent > 0) {
        _indent -= 1
    }
    console.write(`${pad()}${Bun.color("black", "ansi")}${DONE}\x1b[39m ${args.join(" ")}\n`)
}

// ### `logFlow` — Start an indented flow block
//
// Black **▷** prefix. Increments indent level so all subsequent log output is
// nested until the matching `logDone`. Flows can be nested.
//
// ```ts
// logFlow("Building...")
// logStep("Compiling")
// logDone("Build complete.")
// // ▷ Building...
// //   ● Compiling
// // ▶ Build complete.
// ```
function logFlow(...args: string[]): void {
    console.write(`${pad()}${Bun.color("black", "ansi")}${FLOW}\x1b[39m ${args.join(" ")}\n`)
    _indent += 1
}

// ### `logStep` — Informational step (dim)
//
// Dim black **●** prefix. Use for progress updates within a flow.
//
// ```ts
// logStep("Compiling sources...")
// // ● Compiling sources...
// ```
function logStep(...args: string[]): void {
    console.write(
        `${pad()}\x1b[2m${Bun.color("black", "ansi")}${STEP}\x1b[22;39m ${args.join(" ")}\n`,
    )
}

// ### `logPose` — Pose a question
//
// Cyan **?** prefix. Use when the script needs to prompt the user for input.
// Typically called via the `askUserVia*` family rather than directly.
//
// ```ts
// logPose("Which environment?")
// // ? Which environment?
// ```
function logPose(...args: string[]): void {
    console.write(`${pad()}${Bun.color("cyan", "ansi")}${POSE}\x1b[39m ${args.join(" ")}\n`)
}

// ### `readLine` — Read a line from stdin
//
// Internal helper for the `askUserVia*` functions. Lazily creates a stdin
// reader on first call. Returns the trimmed input string.
let _stdinReader: ReadableStreamDefaultReader<Uint8Array> | undefined
const _decoder = new TextDecoder()

async function readLine(): Promise<string> {
    _stdinReader ??= Bun.stdin.stream().getReader()
    const { value } = await _stdinReader.read()
    return value ? _decoder.decode(value).trim() : ""
}

// ### `askUserViaPrompt` — Free-text input
//
// Displays a cyan **?** prompt, reads a line into a string.
// Pass an optional second argument as the default value.
//
// ```ts
// const name = await askUserViaPrompt("Project name", "my-app")
// // ? Project name [my-app]
// //   >
// ```
async function askUserViaPrompt(prompt: string, defaultValue?: string): Promise<string> {
    if (defaultValue !== undefined) {
        logPose(`${prompt} [${defaultValue}]`)
    } else {
        logPose(prompt)
    }
    console.write(`${pad()}  ${Bun.color("cyan", "ansi")}>\x1b[39m `)
    const reply = await readLine()
    return reply || defaultValue || ""
}

function confirmHint(defaultValue?: boolean): string {
    if (defaultValue === true) {
        return "Y/n"
    }
    if (defaultValue === false) {
        return "y/N"
    }
    return "y/n"
}

// ### `askUserViaConfirm` — Yes/no confirmation
//
// Prompts with `[Y/n]`, `[y/N]`, or `[y/n]` based on the optional default.
// Returns `true` for yes, `false` for no.
//
// ```ts
// if (await askUserViaConfirm("Deploy to production?", false)) {
//     deploy()
// }
// // ? Deploy to production? [y/N]
// //   >
// ```
async function askUserViaConfirm(prompt: string, defaultValue?: boolean): Promise<boolean> {
    const hint = confirmHint(defaultValue)
    for (;;) {
        logPose(`${prompt} [${hint}]`)
        console.write(`${pad()}  ${Bun.color("cyan", "ansi")}>\x1b[39m `)
        const reply = (await readLine()).toLowerCase()
        if (!reply && defaultValue !== undefined) {
            return defaultValue
        }
        if (reply === "y") {
            return true
        }
        if (reply === "n") {
            return false
        }
        logWarn("Enter y or n")
    }
}

// ### `askUserViaSelect` — Numbered menu selection
//
// Displays a numbered list, loops until the user picks a valid option.
// Returns the chosen option's **text**, not the number.
//
// ```ts
// const env = await askUserViaSelect("Which environment?", ["staging", "production"])
// // ? Which environment?
// //   1. staging
// //   2. production
// //   >
// ```
async function askUserViaSelect(prompt: string, options: string[]): Promise<string> {
    logPose(prompt)
    for (let i = 0; i < options.length; i += 1) {
        console.write(`${pad()}  ${Bun.color("cyan", "ansi")}${i + 1}.\x1b[39m ${options[i]}\n`)
    }
    for (;;) {
        console.write(`${pad()}  ${Bun.color("cyan", "ansi")}>\x1b[39m `)
        const reply = await readLine()
        const num = Number.parseInt(reply, 10)
        if (!Number.isNaN(num) && num >= 1 && num <= options.length) {
            return options[num - 1] as string
        }
        logWarn(`Enter a number 1-${options.length}`)
    }
}

// ### `logWarn` — Warning message
//
// Yellow **!** prefix. Use for non-fatal issues that deserve attention.
//
// ```ts
// logWarn("Config not found, using defaults")
// // ! Config not found, using defaults
// ```
function logWarn(...args: string[]): void {
    console.write(`${pad()}${Bun.color("yellow", "ansi")}${WARN}\x1b[39m ${args.join(" ")}\n`)
}

// ### `logFail` — Error message
//
// Red **✘** prefix. Writes to stderr. Use for errors that don't halt
// execution. For fatal errors, use `die` instead.
//
// ```ts
// logFail("Connection refused")
// // ✘ Connection refused
// ```
function logFail(...args: string[]): void {
    process.stderr.write(`${pad()}${Bun.color("red", "ansi")}${FAIL}\x1b[39m ${args.join(" ")}\n`)
}

// ### `die` — Fatal error and exit
//
// Calls `logFail` then exits with the given code (default: 1).
//
// ```ts
// die("Missing config file", 2)
// // ✘ Missing config file
// // (exits with code 2)
// ```
function die(msg: string, code = 1): never {
    logFail(msg)
    process.exit(code)
}

// ### `cmdExec` — Run a command with dimmed, indented output
//
// Executes the given command string via Bun shell, capturing output and
// displaying each line dimmed and indented. Returns the command's exit code.
// Best used inside a `logFlow` block.
//
// ```ts
// logFlow("Compiling...")
// await cmdExec("tsc --noEmit")
// logDone("Compiled.")
// // ▷ Compiling...
// //   src/index.ts(3,1): error TS2304    ← dim + indented
// // ▶ Compiled.
// ```
async function cmdExec(cmd: string): Promise<number> {
    const indent = `${pad()}  `
    const result = await $`${{ raw: cmd }}`.nothrow().quiet()
    for (const line of result.text().split("\n")) {
        if (line) {
            console.write(`${indent}\x1b[2m${line}\x1b[22m\n`)
        }
    }
    return result.exitCode
}

//
// Signal Handling
//

let _cleaned = false

// ### `cleanup`
//
// Called on script exit or signal. Override this in generated scripts to add
// teardown logic (temp files, processes, etc.). Guarded against double-run.
function cleanup(): void {
    if (_cleaned) {
        return
    }
    _cleaned = true
}

process.on("SIGINT", () => {
    cleanup()
    logFail("Interrupted (INT)")
    process.exit(130)
})
process.on("SIGTERM", () => {
    cleanup()
    logFail("Terminated (TERM)")
    process.exit(143)
})
process.on("SIGHUP", () => {
    cleanup()
    logFail("Hangup (HUP)")
    process.exit(129)
})
process.on("exit", cleanup)

//
// Functions
//

// ### `usage`
//
// Prints CLI help text. Called on `-h`/`--help` or when required args are missing.
function usage(): void {
    console.log(`Usage: ${SCRIPT_NAME} SCRIPT_PATH <description> [-a author]

Arguments:
  SCRIPT_PATH    Path where the new script will be created
  description    One-line description for the script header

Options:
  -a author      Author name (default: git user.name or $USER)
  -h             Show this help message`)
}

// ### `generateScript`
//
// Returns a complete Bun TypeScript script as a string. Generator variables
// like `${name}` are baked in at generation time; everything else is literal
// output that survives as-is in the generated file.
function generateScript(target: string, desc: string, author: string, date: string): string {
    const name = target.substring(target.lastIndexOf("/") + 1)

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
// ./${target} [options]

import { $ } from "bun"

//
// Constants
//

const PASS = "✔"
const FAIL = "✘"
const DONE = "▶"
const STEP = "●"
const FLOW = "▷"
const POSE = "?"
const WARN = "!"
const SCRIPT_NAME = import.meta.file
const SCRIPT_PATH = import.meta.path

//
// Logging
//
// All log functions respect the current indent level set by \`logFlow\`.
// Use \`logFlow\` / \`logDone\` pairs to create visually nested output blocks.
//
// ### Output Example
//
// \`\`\`
// ▷ Building project...
//   ● Compiling sources...
//   ✔ Compiled 42 files
//     src/index.ts: OK           ← dim (cmdExec)
// ▶ Build complete.
// ? Deploy now?                  ← cyan (askUserVia*)
//   > yes
// \`\`\`

let _indent = 0

// ### \`pad\`
//
// Returns whitespace for the current indent level (2 spaces per level).
// Internal helper — called by all log functions.
function pad(): string {
    return " ".repeat(_indent * 2)
}

// ### \`logBold\` — Bold text
//
// Prints bold text at the current indent level. No prefix icon.
//
// \`\`\`ts
// logBold("Project Setup")
// // Project Setup  (bold)
// \`\`\`
function logBold(...args: string[]): void {
    console.write(\`\${pad()}\\x1b[1m\${args.join(" ")}\\x1b[22m\\n\`)
}

// ### \`logPass\` — Success message
//
// Green **✔** prefix. Use after a successful operation.
//
// \`\`\`ts
// logPass("Compiled 42 files")
// // ✔ Compiled 42 files
// \`\`\`
function logPass(...args: string[]): void {
    console.write(\`\${pad()}\${Bun.color("green", "ansi")}\${PASS}\\x1b[39m \${args.join(" ")}\\n\`)
}

// ### \`logDone\` — Complete a flow block
//
// Black **▶** prefix. If inside a \`logFlow\` block, decrements indent first
// so the message aligns with its matching \`logFlow\`. Safe to call without a
// preceding \`logFlow\` — indent stays at 0.
//
// \`\`\`ts
// logFlow("Installing...")
// logPass("Installed foo")
// logDone("Installation complete.")
// // ▷ Installing...
// //   ✔ Installed foo
// // ▶ Installation complete.
// \`\`\`
function logDone(...args: string[]): void {
    if (_indent > 0) {
        _indent -= 1
    }
    console.write(\`\${pad()}\${Bun.color("black", "ansi")}\${DONE}\\x1b[39m \${args.join(" ")}\\n\`)
}

// ### \`logFlow\` — Start an indented flow block
//
// Black **▷** prefix. Increments indent level so all subsequent log output is
// nested until the matching \`logDone\`. Flows can be nested.
//
// \`\`\`ts
// logFlow("Building...")
// logStep("Compiling")
// logDone("Build complete.")
// // ▷ Building...
// //   ● Compiling
// // ▶ Build complete.
// \`\`\`
function logFlow(...args: string[]): void {
    console.write(\`\${pad()}\${Bun.color("black", "ansi")}\${FLOW}\\x1b[39m \${args.join(" ")}\\n\`)
    _indent += 1
}

// ### \`logStep\` — Informational step (dim)
//
// Dim black **●** prefix. Use for progress updates within a flow.
//
// \`\`\`ts
// logStep("Compiling sources...")
// // ● Compiling sources...
// \`\`\`
function logStep(...args: string[]): void {
    console.write(
        \`\${pad()}\\x1b[2m\${Bun.color("black", "ansi")}\${STEP}\\x1b[22;39m \${args.join(" ")}\\n\`,
    )
}

// ### \`logPose\` — Pose a question
//
// Cyan **?** prefix. Use when the script needs to prompt the user for input.
// Typically called via the \`askUserVia*\` family rather than directly.
//
// \`\`\`ts
// logPose("Which environment?")
// // ? Which environment?
// \`\`\`
function logPose(...args: string[]): void {
    console.write(\`\${pad()}\${Bun.color("cyan", "ansi")}\${POSE}\\x1b[39m \${args.join(" ")}\\n\`)
}

// ### \`readLine\` — Read a line from stdin
//
// Internal helper for the \`askUserVia*\` functions. Lazily creates a stdin
// reader on first call. Returns the trimmed input string.
let _stdinReader: ReadableStreamDefaultReader<Uint8Array> | undefined
const _decoder = new TextDecoder()

async function readLine(): Promise<string> {
    _stdinReader ??= Bun.stdin.stream().getReader()
    const { value } = await _stdinReader.read()
    return value ? _decoder.decode(value).trim() : ""
}

// ### \`askUserViaPrompt\` — Free-text input
//
// Displays a cyan **?** prompt, reads a line into a string.
// Pass an optional second argument as the default value.
//
// \`\`\`ts
// const name = await askUserViaPrompt("Project name", "my-app")
// // ? Project name [my-app]
// //   >
// \`\`\`
async function askUserViaPrompt(prompt: string, defaultValue?: string): Promise<string> {
    if (defaultValue !== undefined) {
        logPose(\`\${prompt} [\${defaultValue}]\`)
    } else {
        logPose(prompt)
    }
    console.write(\`\${pad()}  \${Bun.color("cyan", "ansi")}>\\x1b[39m \`)
    const reply = await readLine()
    return reply || defaultValue || ""
}

function confirmHint(defaultValue?: boolean): string {
    if (defaultValue === true) {
        return "Y/n"
    }
    if (defaultValue === false) {
        return "y/N"
    }
    return "y/n"
}

// ### \`askUserViaConfirm\` — Yes/no confirmation
//
// Prompts with \`[Y/n]\`, \`[y/N]\`, or \`[y/n]\` based on the optional default.
// Returns \`true\` for yes, \`false\` for no.
//
// \`\`\`ts
// if (await askUserViaConfirm("Deploy to production?", false)) {
//     deploy()
// }
// // ? Deploy to production? [y/N]
// //   >
// \`\`\`
async function askUserViaConfirm(prompt: string, defaultValue?: boolean): Promise<boolean> {
    const hint = confirmHint(defaultValue)
    for (;;) {
        logPose(\`\${prompt} [\${hint}]\`)
        console.write(\`\${pad()}  \${Bun.color("cyan", "ansi")}>\\x1b[39m \`)
        const reply = (await readLine()).toLowerCase()
        if (!reply && defaultValue !== undefined) {
            return defaultValue
        }
        if (reply === "y") {
            return true
        }
        if (reply === "n") {
            return false
        }
        logWarn("Enter y or n")
    }
}

// ### \`askUserViaSelect\` — Numbered menu selection
//
// Displays a numbered list, loops until the user picks a valid option.
// Returns the chosen option's **text**, not the number.
//
// \`\`\`ts
// const env = await askUserViaSelect("Which environment?", ["staging", "production"])
// // ? Which environment?
// //   1. staging
// //   2. production
// //   >
// \`\`\`
async function askUserViaSelect(prompt: string, options: string[]): Promise<string> {
    logPose(prompt)
    for (let i = 0; i < options.length; i += 1) {
        console.write(\`\${pad()}  \${Bun.color("cyan", "ansi")}\${i + 1}.\\x1b[39m \${options[i]}\\n\`)
    }
    for (;;) {
        console.write(\`\${pad()}  \${Bun.color("cyan", "ansi")}>\\x1b[39m \`)
        const reply = await readLine()
        const num = Number.parseInt(reply, 10)
        if (!Number.isNaN(num) && num >= 1 && num <= options.length) {
            return options[num - 1] as string
        }
        logWarn(\`Enter a number 1-\${options.length}\`)
    }
}

// ### \`logWarn\` — Warning message
//
// Yellow **!** prefix. Use for non-fatal issues that deserve attention.
//
// \`\`\`ts
// logWarn("Config not found, using defaults")
// // ! Config not found, using defaults
// \`\`\`
function logWarn(...args: string[]): void {
    console.write(\`\${pad()}\${Bun.color("yellow", "ansi")}\${WARN}\\x1b[39m \${args.join(" ")}\\n\`)
}

// ### \`logFail\` — Error message
//
// Red **✘** prefix. Writes to stderr. Use for errors that don't halt
// execution. For fatal errors, use \`die\` instead.
//
// \`\`\`ts
// logFail("Connection refused")
// // ✘ Connection refused
// \`\`\`
function logFail(...args: string[]): void {
    process.stderr.write(\`\${pad()}\${Bun.color("red", "ansi")}\${FAIL}\\x1b[39m \${args.join(" ")}\\n\`)
}

// ### \`die\` — Fatal error and exit
//
// Calls \`logFail\` then exits with the given code (default: 1).
//
// \`\`\`ts
// die("Missing config file", 2)
// // ✘ Missing config file
// // (exits with code 2)
// \`\`\`
function die(msg: string, code = 1): never {
    logFail(msg)
    process.exit(code)
}

// ### \`cmdExec\` — Run a command with dimmed, indented output
//
// Executes the given command string via Bun shell, capturing output and
// displaying each line dimmed and indented. Returns the command's exit code.
// Best used inside a \`logFlow\` block.
//
// \`\`\`ts
// logFlow("Compiling...")
// await cmdExec("tsc --noEmit")
// logDone("Compiled.")
// // ▷ Compiling...
// //   src/index.ts(3,1): error TS2304    ← dim + indented
// // ▶ Compiled.
// \`\`\`
async function cmdExec(cmd: string): Promise<number> {
    const indent = \`\${pad()}  \`
    const result = await $\`\${{ raw: cmd }}\`.nothrow().quiet()
    for (const line of result.text().split("\\n")) {
        if (line) {
            console.write(\`\${indent}\\x1b[2m\${line}\\x1b[22m\\n\`)
        }
    }
    return result.exitCode
}

//
// Signal Handling
//

let _cleaned = false

// ### \`cleanup\`
//
// Called on script exit or signal. Add teardown logic here
// (temp files, processes, etc.). Guarded against double-run.
function cleanup(): void {
    if (_cleaned) {
        return
    }
    _cleaned = true
}

process.on("SIGINT", () => {
    cleanup()
    logFail("Interrupted (INT)")
    process.exit(130)
})
process.on("SIGTERM", () => {
    cleanup()
    logFail("Terminated (TERM)")
    process.exit(143)
})
process.on("SIGHUP", () => {
    cleanup()
    logFail("Hangup (HUP)")
    process.exit(129)
})
process.on("exit", cleanup)

//
// Functions
//

// TODO: Add your functions here

//
// Main
//

async function main(): Promise<void> {
    logFlow("Running ${name}...")

    // TODO: Implement main logic
    // await cmdExec("some-command --flag")

    logDone("${name} complete.")
}

await main()
`
}

//
// Main
//

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: CLI argument parsing
async function main(): Promise<void> {
    const args = Bun.argv.slice(2)
    let author = ""
    const positional: string[] = []

    // Parse arguments — positional first, then flags
    let i = 0
    while (i < args.length) {
        const arg = args[i]
        if (arg === undefined) {
            break
        }

        if (arg === "-h" || arg === "--help") {
            usage()
            process.exit(0)
        }

        if (arg === "-a") {
            const nextArg = args[i + 1]
            if (nextArg === undefined) {
                die("Option -a requires an argument")
            }
            author = nextArg
            i += 2
            continue
        }

        if (arg.startsWith("-")) {
            die(`Unknown option: ${arg}`)
        }

        positional.push(arg)
        i += 1
    }

    // Validate positional arguments
    const [target, desc] = positional
    if (target === undefined || desc === undefined) {
        usage()
        die("Missing required arguments")
    }

    const date = new Date().toISOString().slice(0, 10)

    // Default author from git or Bun.env.USER
    if (!author) {
        const gitResult = await $`git config user.name`.nothrow().quiet()
        if (gitResult.exitCode === 0) {
            author = gitResult.text().trim()
        } else {
            author = Bun.env.USER ?? "unknown"
        }
    }

    // Refuse to overwrite existing files
    if (await Bun.file(target).exists()) {
        die(`File already exists: ${target}`)
    }

    // Create parent directories as needed
    const lastSlash = target.lastIndexOf("/")
    if (lastSlash > 0) {
        const parent = target.substring(0, lastSlash)
        const { exitCode } = await $`test -d ${parent}`.nothrow().quiet()
        if (exitCode !== 0) {
            logStep(`Creating directory: ${parent}`)
            await $`mkdir -p ${parent}`.quiet()
        }
    }

    // Generate the script
    logFlow(`Generating ${target}...`)
    await Bun.write(target, generateScript(target, desc, author, date))
    await $`chmod +x ${target}`

    logPass(`Created ${target}`)
    logDone("Done.")
}

await main()
