#!/usr/bin/env bash
# = generate-env-example-from-env-ts.sh
#
# == Description
#
# Generate .env.example from Zod schemas in src/lib/env.ts
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-19
#
# == Usage
#
# ./scripts/generate-env-example-from-env-ts.sh [options]

set -euo pipefail

#
# Constants
#

readonly PASS="✔"
readonly FAIL="✘"
readonly DONE="▶"
readonly STEP="●"
readonly FLOW="▷"
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)/$SCRIPT_NAME"

#
# Logging
#
# All log functions respect the current indent level set by `log_flow`.
# Use `log_flow` / `log_done` pairs to create visually nested output blocks.
#
# ### Output Example
#
# ```
# ▷ Building project...
#   ● Compiling sources...
#   ✔ Compiled 42 files
#     src/index.ts: OK           ← dim (cmd_exec)
# ▶ Build complete.
# ```

_indent=0

# ### `_pad`
#
# Returns whitespace for the current indent level (2 spaces per level).
# Internal helper — called by all log functions.
_pad() { printf '%*s' $(( _indent * 2 )) ''; }

# ### `log_pass` — Success message
#
# Green **✔** prefix. Use after a successful operation.
#
# ```bash
# log_pass "Compiled 42 files"
# # ✔ Compiled 42 files
# ```
log_pass() { printf '%s\e[32m%s\e[39m %s\n' "$(_pad)" "$PASS" "$*"; }

# ### `log_done` — Complete a flow block
#
# Black **▶** prefix. If inside a `log_flow` block, decrements indent first
# so the message aligns with its matching `log_flow`. Safe to call without a
# preceding `log_flow` — indent stays at 0.
#
# ```bash
# log_flow "Installing..."
# log_pass "Installed foo"
# log_done "Installation complete."
# # ▷ Installing...
# #   ✔ Installed foo
# # ▶ Installation complete.
# ```
log_done() { (( _indent > 0 )) && _indent=$(( _indent - 1 )) || true; printf '%s\e[30m%s\e[39m %s\n' "$(_pad)" "$DONE" "$*"; }

# ### `log_flow` — Start an indented flow block
#
# Black **▷** prefix. Increments indent level so all subsequent log output is
# nested until the matching `log_done`. Flows can be nested.
#
# ```bash
# log_flow "Building..."
# log_step "Compiling"
# log_done "Build complete."
# # ▷ Building...
# #   ● Compiling
# # ▶ Build complete.
# ```
log_flow() { printf '%s\e[30m%s\e[39m %s\n' "$(_pad)" "$FLOW" "$*"; _indent=$(( _indent + 1 )); }

# ### `log_step` — Informational step (dim)
#
# Dim black **●** prefix. Use for progress updates within a flow.
#
# ```bash
# log_step "Compiling sources..."
# # ● Compiling sources...
# ```
log_step() { printf '%s\e[2;30m%s\e[22;39m %s\n' "$(_pad)" "$STEP" "$*"; }

# ### `log_warn` — Warning message
#
# Yellow **Warn:** prefix. Use for non-fatal issues that deserve attention.
#
# ```bash
# log_warn "Config not found, using defaults"
# # Warn: Config not found, using defaults
# ```
log_warn() { printf '%s\e[1;33mWarn:\e[22;39m %s\n' "$(_pad)" "$*"; }

# ### `log_fail` — Error message
#
# Red **✘** prefix. Writes to stderr. Use for errors that don't halt
# execution. For fatal errors, use `die` instead.
#
# ```bash
# log_fail "Connection refused"
# # ✘ Connection refused
# ```
log_fail() { printf '%s\e[31m%s\e[39m %s\n' "$(_pad)" "$FAIL" "$*" >&2; }

# ### `die` — Fatal error and exit
#
# Calls `log_fail` then exits with the given code (default: 1).
#
# ```bash
# die "Missing config file" 2
# # ✘ Missing config file
# # (exits with code 2)
# ```
die() { log_fail "$1"; exit "${2:-1}"; }

# ### `cmd_exec` — Run a command with dimmed, indented output
#
# Executes the given command, piping both stdout and stderr through a
# formatter that dims and indents each line. Preserves the command's exit
# code via `$PIPESTATUS`. Best used inside a `log_flow` block.
#
# ```bash
# log_flow "Compiling..."
# cmd_exec tsc --noEmit
# log_done "Compiled."
# # ▷ Compiling...
# #   src/index.ts(3,1): error TS2304    ← dim + indented
# # ▶ Compiled.
# ```
cmd_exec() {
    local pad="$(_pad)  "
    "$@" 2>&1 | while IFS= read -r line; do
        printf '%s\e[2m%s\e[22m\n' "$pad" "$line"
    done
    return "${PIPESTATUS[0]}"
}

#
# Signal Handling
#

_cleaned=0

# ### `cleanup`
#
# Called on script exit or signal. Guarded against double-run.
cleanup() {
    (( _cleaned )) && return || true
    _cleaned=1
}

trap 'cleanup; log_fail "Interrupted (INT)"; exit 130' INT
trap 'cleanup; log_fail "Terminated (TERM)"; exit 143' TERM
trap 'cleanup; log_fail "Hangup (HUP)"; exit 129' HUP
trap 'cleanup' EXIT

#
# Constants (script-specific)
#

readonly PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
readonly OUT_FILE="$PROJECT_ROOT/.env.example"

#
# Functions
#

check_prerequisites() {
    command -v bun >/dev/null 2>&1 || die "bun is not installed"
    [[ -d "$PROJECT_ROOT/node_modules" ]] || die "node_modules not found — run bun install first"
    [[ -f "$PROJECT_ROOT/src/lib/env.ts" ]] || die "Missing: src/lib/env.ts"
}

#
# Main
#

main() {
    log_flow "Generating .env.example..."

    log_step "Checking prerequisites..."
    check_prerequisites

    log_step "Extracting schemas from src/lib/env.ts..."

    export PROJECT_ROOT
    cmd_exec bun -e "$(cat <<'BUNSCRIPT'
import process from "node:process"
import { plugin } from "bun"
import { z } from "zod"

const root = process.env.PROJECT_ROOT ?? ""

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

await import(`${root}/src/lib/env.ts`)

if (!captured) {
    process.stderr.write("Failed to capture env config from createEnv()\n")
    process.exit(1)
}

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

const lines: string[] = ["# Auto-generated from src/lib/env.ts", "# Run: bun run env:example", ""]

function section(title: string, schemas?: Record<string, z.ZodType>) {
    lines.push("#")
    lines.push(`# ${title}`)
    lines.push("#")
    lines.push("")

    if (!schemas || Object.keys(schemas).length === 0) {
        return
    }

    for (const [key, schema] of Object.entries(schemas)) {
        const { type, hasDefault, defaultValue } = describe(schema)
        lines.push(`# ${type}`)
        const val = hasDefault ? JSON.stringify(defaultValue) : ""
        lines.push(`${key}=${val}`)
        lines.push("")
    }
}

section("Server", captured.server)
section("Client", captured.client)

if (captured.shared && Object.keys(captured.shared).length > 0) {
    section("Shared", captured.shared)
}

const outPath = `${root}/.env.example`
await Bun.write(outPath, lines.join("\n"))
BUNSCRIPT
)"

    log_pass "Wrote $OUT_FILE"
    log_done "Done."
}

main "$@"
