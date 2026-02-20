#!/usr/bin/env bash
# = initialize-project.sh
#
# == Description
#
# Check prerequisites and install project dependencies
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-19
#
# == Usage
#
# ./scripts/init/initialize-project.sh [options]

set -euo pipefail

#
# Constants
#

readonly PASS="✔"
readonly FAIL="✘"
readonly DONE="▶"
readonly STEP="●"
readonly FLOW="▷"
readonly POSE="?"
readonly EXEC="$"
readonly WARN="!"
readonly HINT="+"
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
# ? Deploy now?                  ← cyan (ask_user_via_*)
#   + Default: yes               ← dim (hint)
#   > yes
# ```

_indent=0

# ### `_pad`
#
# Returns whitespace for the current indent level (2 spaces per level).
# Internal helper — called by all log functions.
_pad() { printf '%*s' $(( _indent * 2 )) ''; }

# ### `log_bold` — Bold text
#
# Prints bold text at the current indent level. No prefix icon.
#
# ```bash
# log_bold "Project Setup"
# # Project Setup  (bold)
# ```
log_bold() { printf '%s\e[1m%s\e[22m\n' "$(_pad)" "$*"; }

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

# ### `log_pose` — Pose a question
#
# Cyan **?** prefix. Use when the script needs to prompt the user for input.
# Typically called via the `ask_user_via_*` family rather than directly.
#
# ```bash
# log_pose "Which environment?"
# # ? Which environment?
# ```
log_pose() { printf '%s\e[36m%s\e[39m %s\n' "$(_pad)" "$POSE" "$*"; }

# ### `log_dull` — Dim text (no prefix)
#
# Dims the entire line. No prefix icon. Use for supplementary output
# that should be visually subdued.
#
# ```bash
# log_dull "skipping optional step"
# # skipping optional step  (dim)
# ```
log_dull() { printf '%s\e[2m%s\e[22m\n' "$(_pad)" "$*"; }

# ### `log_hint` — Hint text with dim prefix
#
# Dim **+** prefix, normal body text. Use for supplementary information
# like default values in `ask_user_via_*` prompts.
#
# ```bash
# log_hint "Configuration loaded from ~/.config"
# # + Configuration loaded from ~/.config
# ```
log_hint() { printf '%s\e[2m%s %s\e[22m\n' "$(_pad)" "$HINT" "$*"; }

# ### `ask_user_via_prompt` — Free-text input
#
# First argument is the variable name. If the variable is already set
# (e.g., from a CLI flag via `add_flag`), the prompt is skipped.
# Sets both `REPLY` and the named variable.
#
# ```bash
# ask_user_via_prompt NAME "Project name" "my-app"
# echo "$NAME"
# ```
ask_user_via_prompt() {
    local varname="$1"
    local prompt="$2"
    local default="${3:-}"
    if [[ -n "${!varname:-}" ]]; then
        REPLY="${!varname}"
        return
    fi
    log_pose "$prompt"
    [[ -n "$default" ]] && printf '%s\e[2m%s Default: \e[1m%s\e[22;2m. Leave blank to accept.\e[22m\n' "$(_pad)" "$HINT" "$default"
    printf '%s  \e[36m>\e[39m ' "$(_pad)"
    read -r REPLY
    [[ -z "$REPLY" && -n "$default" ]] && REPLY="$default" || true
    printf -v "$varname" '%s' "$REPLY"
}

# ### `ask_user_via_confirm` — Yes/no confirmation
#
# First argument is the variable name. If the variable is already set
# (e.g., from a CLI flag via `add_flag`), the prompt is skipped.
# Sets `REPLY` and the named variable to `y` or `n`.
# Returns 0 for yes, 1 for no — works with `if`.
#
# ```bash
# if ask_user_via_confirm DEPLOY "Deploy to production?" "n"; then
#     deploy
# fi
# ```
ask_user_via_confirm() {
    local varname="$1"
    local prompt="$2"
    local default="${3:-}"
    if [[ -n "${!varname:-}" ]]; then
        REPLY="${!varname}"
        case "$REPLY" in
            [yY]) REPLY="y"; printf -v "$varname" '%s' "y"; return 0 ;;
            [nN]) REPLY="n"; printf -v "$varname" '%s' "n"; return 1 ;;
            *) die "Invalid value for $varname: $REPLY (expected y or n)" ;;
        esac
    fi
    local hint="y/n"
    [[ "$default" == "y" ]] && hint="Y/n"
    [[ "$default" == "n" ]] && hint="y/N"
    while true; do
        log_pose "$prompt [$hint]"
        printf '%s  \e[36m>\e[39m ' "$(_pad)"
        read -r REPLY
        [[ -z "$REPLY" ]] && REPLY="$default"
        case "$REPLY" in
            [yY]) REPLY="y"; printf -v "$varname" '%s' "y"; return 0 ;;
            [nN]) REPLY="n"; printf -v "$varname" '%s' "n"; return 1 ;;
            *) log_warn "Enter y or n" ;;
        esac
    done
}

# ### `ask_user_via_select` — Numbered menu selection
#
# First argument is the variable name. If the variable is already set
# (e.g., from a CLI flag via `add_flag`), the prompt is skipped and
# the value is validated against the options.
# Sets both `REPLY` and the named variable to the chosen option's text.
# Pass `--default VALUE` before the variable name to set a default;
# if the user presses Enter without input, the default is used.
#
# ```bash
# ask_user_via_select ENV "Which environment?" "staging" "production"
# ask_user_via_select --default "staging" ENV "Which environment?" "staging" "production"
# echo "$ENV"
# ```
ask_user_via_select() {
    local _default=""
    [[ "${1:-}" == "--default" ]] && { _default="$2"; shift 2; }
    local varname="$1"; shift
    local prompt="$1"; shift
    local options=("$@")
    if [[ -n "${!varname:-}" ]]; then
        REPLY="${!varname}"
        for opt in "${options[@]}"; do
            [[ "$opt" == "$REPLY" ]] && return
        done
        die "Invalid value for $varname: $REPLY (valid: ${options[*]})"
    fi
    log_pose "$prompt"
    local i=1
    for opt in "${options[@]}"; do
        printf '%s  \e[36m%d.\e[39m %s\n' "$(_pad)" "$i" "$opt"
        (( i++ ))
    done
    [[ -n "$_default" ]] && printf '%s\e[2m%s Default: \e[1m%s\e[22;2m. Leave blank to accept.\e[22m\n' "$(_pad)" "$HINT" "$_default"
    while true; do
        printf '%s  \e[36m>\e[39m ' "$(_pad)"
        read -r REPLY
        if [[ -z "$REPLY" && -n "$_default" ]]; then
            REPLY="$_default"
            printf -v "$varname" '%s' "$REPLY"
            return
        fi
        if [[ "$REPLY" =~ ^[0-9]+$ ]] && (( REPLY >= 1 && REPLY <= ${#options[@]} )); then
            REPLY="${options[$((REPLY - 1))]}"
            printf -v "$varname" '%s' "$REPLY"
            return
        fi
        log_warn "Enter a number 1-${#options[@]}"
    done
}

# ### `ask_user_via_choice` — Multi-select checkbox
#
# First argument is the variable name. If the variable is already set
# (e.g., from a CLI flag via `add_flag`), the prompt is skipped and
# each space-separated value is validated against the options.
# Sets both `REPLY` and the named variable to a space-separated string
# of selected option texts. Iterate with: `for item in $VAR; do`.
# Pass `--default VALUE` before the variable name to set a default
# (space-separated option texts); if the user presses Enter without
# input, the default is used.
#
# ```bash
# ask_user_via_choice FEATURES "Which features?" "logging" "metrics" "tracing"
# ask_user_via_choice --default "logging tracing" FEATURES "Which features?" "logging" "metrics" "tracing"
# for f in $FEATURES; do echo "Selected: $f"; done
# ```
ask_user_via_choice() {
    local _default=""
    [[ "${1:-}" == "--default" ]] && { _default="$2"; shift 2; }
    local varname="$1"; shift
    local prompt="$1"; shift
    local options=("$@")
    if [[ -n "${!varname:-}" ]]; then
        REPLY="${!varname}"
        for word in $REPLY; do
            local found=0
            for opt in "${options[@]}"; do
                [[ "$opt" == "$word" ]] && { found=1; break; }
            done
            (( found )) || die "Invalid value for $varname: $word (valid: ${options[*]})"
        done
        return
    fi
    log_pose "$prompt (enter numbers, e.g. 1,3 or 'all')"
    local i=1
    for opt in "${options[@]}"; do
        printf '%s  \e[36m%d.\e[39m %s\n' "$(_pad)" "$i" "$opt"
        (( i++ ))
    done
    [[ -n "$_default" ]] && printf '%s\e[2m%s Default: \e[1m%s\e[22;2m. Leave blank to accept.\e[22m\n' "$(_pad)" "$HINT" "${_default// /, }"
    while true; do
        printf '%s  \e[36m>\e[39m ' "$(_pad)"
        read -r REPLY
        if [[ -z "$REPLY" && -n "$_default" ]]; then
            REPLY="$_default"
            printf -v "$varname" '%s' "$REPLY"
            return
        fi
        if [[ "$REPLY" == "all" ]]; then
            REPLY="${options[*]}"
            printf -v "$varname" '%s' "$REPLY"
            return
        fi
        local input="${REPLY//,/ }"
        local selected=()
        local valid=1
        for num in $input; do
            if [[ "$num" =~ ^[0-9]+$ ]] && (( num >= 1 && num <= ${#options[@]} )); then
                selected+=("${options[$((num - 1))]}")
            else
                valid=0
                break
            fi
        done
        if (( valid && ${#selected[@]} > 0 )); then
            REPLY="${selected[*]}"
            printf -v "$varname" '%s' "$REPLY"
            return
        fi
        log_warn "Enter numbers 1-${#options[@]} separated by commas or spaces"
    done
}

# ### `log_warn` — Warning message
#
# Yellow **!** prefix. Use for non-fatal issues that deserve attention.
#
# ```bash
# log_warn "Config not found, using defaults"
# # ! Config not found, using defaults
# ```
log_warn() { printf '%s\e[33m%s\e[39m %s\n' "$(_pad)" "$WARN" "$*"; }

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

# ### `log_exec` — Show the command about to run
#
# Bold **$** prefix. Prints the command line so the user can see exactly
# what is being executed. Called automatically by `cmd_exec`.
#
# ```bash
# log_exec bun install
# # $ bun install  (bold)
# ```
log_exec() { printf '%s\e[1m%s %s\e[22m\n' "$(_pad)" "$EXEC" "$*"; }

# ### `cmd_exec` — Run a command with dimmed, indented output
#
# Prints the command via `log_exec`, then runs it, piping both stdout
# and stderr through a formatter that dims and indents each line. Preserves
# the command's exit code via `$PIPESTATUS`. Best used inside a `log_flow`
# block.
#
# ```bash
# log_flow "Compiling..."
# cmd_exec tsc --noEmit
# log_done "Compiled."
# # ▷ Compiling...
# #   $ tsc --noEmit              ← bold
# #     src/index.ts(3,1): error  ← dim + indented
# # ▶ Compiled.
# ```
cmd_exec() {
    log_exec "$@"
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
# Called on script exit or signal. Add teardown logic here
# (temp files, processes, etc.). Guarded against double-run.
cleanup() {
    (( _cleaned )) && return
    _cleaned=1
}

trap 'cleanup; log_fail "Interrupted (INT)"; exit 130' INT
trap 'cleanup; log_fail "Terminated (TERM)"; exit 143' TERM
trap 'cleanup; log_fail "Hangup (HUP)"; exit 129' HUP
trap 'cleanup' EXIT

#
# Flags
#
# Register CLI flags that double as interactive prompts.
# Call `add_flag` here, then use `ask_user_via_*` with the same
# variable name in `main()`.
#
# ```bash
# add_flag "env" "ENV" "Target environment"
# # In main():
# #   ask_user_via_select ENV "Which environment?" "staging" "production"
# # CLI: ./script.sh --env staging
# ```

declare -a _flag_names=()
declare -a _flag_vars=()
declare -a _flag_descs=()
declare -a ARGS=()

# ### `add_flag` — Register a CLI flag
#
# Maps a flag name to a variable. When the flag is passed on the CLI,
# the variable is pre-set and `ask_user_via_*` skips the prompt.
#
# ```bash
# add_flag "number" "NUMBER" "Which number to use"
# # Enables: --number <value>
# ```
add_flag() {
    _flag_names+=("$1")
    _flag_vars+=("$2")
    _flag_descs+=("$3")
}

# ### `parse_flags` — Parse registered CLI flags
#
# Parses `--flag value` pairs from arguments. Unknown flags cause an
# error; positional arguments are collected into `ARGS`. Handles
# `-h`/`--help` automatically via `usage()`.
#
# ```bash
# main() {
#     parse_flags "$@"
#     echo "Positional: ${ARGS[*]}"
# }
# ```
parse_flags() {
    while (( $# )); do
        case "$1" in
            -h|--help) usage; exit 0 ;;
            --)
                shift
                ARGS+=("$@")
                break
                ;;
            --*)
                local flag="${1#--}"
                local found=0
                for i in "${!_flag_names[@]}"; do
                    if [[ "${_flag_names[$i]}" == "$flag" ]]; then
                        (( $# < 2 )) && die "Option --$flag requires a value"
                        printf -v "${_flag_vars[$i]}" '%s' "$2"
                        found=1
                        shift 2
                        break
                    fi
                done
                (( found )) || die "Unknown option: $1"
                ;;
            *)
                ARGS+=("$1")
                shift
                ;;
        esac
    done
}

# ### `usage` — Auto-generated help
#
# Prints help text from registered flags. Called on `-h`/`--help`.
usage() {
    printf 'Usage: %s [options]\n\n' "$SCRIPT_NAME"
    printf 'Options:\n'
    for i in "${!_flag_names[@]}"; do
        printf '  --%-20s %s\n' "${_flag_names[$i]} <value>" "${_flag_descs[$i]}"
    done
    printf '  -h, --help             Show this help message\n'
}

add_flag "agents" "AGENTS" "Space-separated agent names"
add_flag "name" "APP_NAME" "App name (npm package name)"
add_flag "description" "APP_DESC" "App description (one sentence)"

#
# Functions
#

# ### `require_cmd`
#
# Assert a command exists on PATH, or die with install hint.
require_cmd() {
    local cmd="$1"
    local hint="${2:-}"
    if ! command -v "$cmd" &>/dev/null; then
        [[ -n "$hint" ]] && die "Required command '$cmd' not found. $hint" || true
        die "Required command '$cmd' not found."
    fi
    log_pass "$cmd found ($(command -v "$cmd"))"
}

# ### `install_skills`
#
# Install skills from repos in parallel. Each argument is a repo spec:
#   "repo skill1 skill2 ..."  — install only the named skills
# Every skill must be explicitly listed (no wildcards) to prevent
# surprise installs when repos add new skills.
# Uses the AGENT_FLAGS array built from user selection.
# All repos are cloned and installed concurrently; output is collected
# and printed after all jobs complete.
install_skills() {
    local tmpdir
    tmpdir="$(mktemp -d)"
    local pids=()
    local specs=()
    local i=0

    for spec in "$@"; do
        local repo="${spec%% *}"
        local skills="${spec#"$repo"}"
        skills="${skills# }"

        [[ -z "$skills" ]] && die "install_skills: repo '$repo' has no skills listed"
        local skill_flags=()
        for skill in $skills; do
            skill_flags+=(--skill "$skill")
        done

        bunx skills add "$repo" "${skill_flags[@]}" --yes "${AGENT_FLAGS[@]}" \
            > "$tmpdir/$i.out" 2>&1 &
        pids+=($!)
        specs+=("$repo")
        i=$(( i + 1 ))
    done

    local failed=0
    for j in "${!pids[@]}"; do
        if wait "${pids[$j]}"; then
            log_pass "${specs[$j]}"
        else
            log_fail "${specs[$j]}"
            failed=$(( failed + 1 ))
        fi
    done

    rm -rf "$tmpdir"
    (( failed == 0 )) || die "$failed skill repo(s) failed to install"
}

#
# Main
#

main() {
    parse_flags "$@"

    log_flow "Initializing project..."

    # Prerequisites
    log_flow "Checking prerequisites..."
    require_cmd bun "Install: https://bun.sh"
    require_cmd docref "Install: cargo install docref"
    log_done "Prerequisites satisfied."

    # Project identity
    log_flow "Configuring project identity..."

    ask_user_via_prompt APP_NAME "App name (npm package name)" "primus"
    if [[ ! "$APP_NAME" =~ ^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$ ]]; then
        die "Invalid npm name: '$APP_NAME' (must be lowercase, no spaces)"
    fi
    log_pass "Name: $APP_NAME"

    ask_user_via_prompt APP_DESC "App description (one sentence)" "An opinionated Next.js template with the best of Vercel, Inngest, and modern tooling."
    [[ -n "$APP_DESC" ]] && log_pass "Description: $APP_DESC" || log_dull "No description"

    # Rewrite package.json name
    APP_NAME="$APP_NAME" bun -e '
const pkg = await Bun.file("package.json").json()
pkg.name = Bun.env.APP_NAME
await Bun.write("package.json", JSON.stringify(pkg, null, 2) + "\n")
'
    log_pass "Updated package.json"

    # Rewrite layout.tsx metadata
    APP_NAME="$APP_NAME" APP_DESC="$APP_DESC" bun -e '
const file = Bun.file("src/app/layout.tsx")
let src = await file.text()
const name = Bun.env.APP_NAME ?? ""
const desc = Bun.env.APP_DESC ?? ""
src = src.replace(/title:\s*"[^"]*"/, `title: "${name}"`)
if (desc) {
    src = src.replace(/description:\s*"[^"]*"/, `description: "${desc}"`)
} else {
    src = src.replace(/\n\s*description:\s*"[^"]*",?/, "")
}
await Bun.write("src/app/layout.tsx", src)
'
    log_pass "Updated layout.tsx metadata"

    # Generate README.md
    cat > README.md <<EOF
# $APP_NAME
${APP_DESC:+
$APP_DESC
}
## Getting Started

\`\`\`bash
bun install
bun dev
\`\`\`
EOF
    log_pass "Generated README.md"

    # Replace page.tsx with clean starter
    cat > src/app/page.tsx <<'EOF'
export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <h1 className="text-4xl font-bold">Hello, world.</h1>
        </main>
    )
}
EOF
    log_pass "Replaced page.tsx with clean starter"

    log_done "Project identity configured."

    # Install dependencies
    log_flow "Installing dependencies..."
    cmd_exec bun install
    log_done "Dependencies installed."

    # shadcn/ui
    log_flow "Initializing shadcn/ui..."
    cmd_exec bunx shadcn@latest init --defaults
    log_pass "shadcn initialized"
    cmd_exec bunx shadcn@latest add --all
    log_pass "All components added"
    log_done "shadcn/ui ready."

    # Agent skills
    log_flow "Installing agent skills..."
    ask_user_via_choice --default "claude-code cursor" \
        AGENTS "Which agents to install skills for?" \
        "claude-code" "cursor" "codex"
    AGENT_FLAGS=()
    for agent in $AGENTS; do
        AGENT_FLAGS+=(--agent "$agent")
    done
    log_step "Agents: $AGENTS"
    install_skills \
        "vercel-labs/skills find-skills" \
        "vercel-labs/agent-skills vercel-react-best-practices vercel-composition-patterns web-design-guidelines" \
        "vercel-labs/next-skills next-best-practices next-cache-components" \
        "vercel/ai ai-sdk" \
        "vercel/ai-elements ai-elements" \
        "vercel/streamdown streamdown" \
        "vercel/components.build building-components" \
        "vercel/vercel vercel-cli" \
        "vercel-labs/json-render json-render-core json-render-react json-render-shadcn" \
        "vercel-labs/before-and-after before-and-after" \
        "anthropics/skills skill-creator"
    log_done "Agent skills installed."

    # Environment
    log_flow "Setting up environment..."
    if [[ -f .env.local ]]; then
        log_pass ".env.local already exists"
    else
        cp .env.example .env.local
        log_pass "Copied .env.example → .env.local"
    fi
    log_done "Environment ready."

    log_done "Project initialized."
}

main "$@"
