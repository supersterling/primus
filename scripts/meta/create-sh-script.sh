#!/usr/bin/env bash
# = create-sh-script.sh
#
# == Description
#
# Generate professional bash scripts with standard boilerplate.
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-19
#
# == Usage
#
# ./scripts/meta/create-sh-script.sh SCRIPT_PATH <description> [-a author]

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
# Called on script exit or signal. Override this in generated scripts to add
# teardown logic (temp files, processes, etc.). Guarded against double-run.
cleanup() {
    (( _cleaned )) && return
    _cleaned=1
}

trap 'cleanup; log_fail "Interrupted (INT)"; exit 130' INT
trap 'cleanup; log_fail "Terminated (TERM)"; exit 143' TERM
trap 'cleanup; log_fail "Hangup (HUP)"; exit 129' HUP
trap 'cleanup' EXIT

#
# Functions
#

# ### `usage`
#
# Prints CLI help text. Called on `-h`/`--help` or when required args are missing.
usage() {
    cat <<EOF
Usage: ${SCRIPT_NAME} SCRIPT_PATH <description> [-a author]

Arguments:
  SCRIPT_PATH    Path where the new script will be created
  description    One-line description for the script header

Options:
  -a author      Author name (default: git user.name or \$USER)
  -h             Show this help message
EOF
}

# ### `generate_script`
#
# Emits a complete bash script to stdout using a heredoc template.
# Variables like `${name}` are baked in at generation time; variables
# like `\${PIPESTATUS[0]}` are escaped to survive as literals in the output.
#
# ```bash
# generate_script "scripts/setup.sh" "Setup env" "sterling" "2026-02-19" > scripts/setup.sh
# ```
generate_script() {
    local target="$1"
    local desc="$2"
    local author="$3"
    local date="$4"
    local name
    name="$(basename "$target")"

    cat <<TEMPLATE
#!/usr/bin/env bash
# = ${name}
#
# == Description
#
# ${desc}
#
# == Metadata
#
# Author:  ${author}
# Created: ${date}
#
# == Usage
#
# ./${target} [options]

set -euo pipefail

#
# Constants
#

readonly PASS="✔"
readonly FAIL="✘"
readonly DONE="▶"
readonly STEP="●"
readonly FLOW="▷"
readonly SCRIPT_NAME="\$(basename "\$0")"
readonly SCRIPT_PATH="\$(cd "\$(dirname "\$0")" && pwd)/\$SCRIPT_NAME"

#
# Logging
#
# All log functions respect the current indent level set by \`log_flow\`.
# Use \`log_flow\` / \`log_done\` pairs to create visually nested output blocks.
#
# ### Output Example
#
# \`\`\`
# ▷ Building project...
#   ● Compiling sources...
#   ✔ Compiled 42 files
#     src/index.ts: OK           ← dim (cmd_exec)
# ▶ Build complete.
# \`\`\`

_indent=0

# ### \`_pad\`
#
# Returns whitespace for the current indent level (2 spaces per level).
# Internal helper — called by all log functions.
_pad() { printf '%*s' \$(( _indent * 2 )) ''; }

# ### \`log_pass\` — Success message
#
# Green **✔** prefix. Use after a successful operation.
#
# \`\`\`bash
# log_pass "Compiled 42 files"
# # ✔ Compiled 42 files
# \`\`\`
log_pass() { printf '%s\e[32m%s\e[39m %s\n' "\$(_pad)" "\$PASS" "\$*"; }

# ### \`log_done\` — Complete a flow block
#
# Black **▶** prefix. If inside a \`log_flow\` block, decrements indent first
# so the message aligns with its matching \`log_flow\`. Safe to call without a
# preceding \`log_flow\` — indent stays at 0.
#
# \`\`\`bash
# log_flow "Installing..."
# log_pass "Installed foo"
# log_done "Installation complete."
# # ▷ Installing...
# #   ✔ Installed foo
# # ▶ Installation complete.
# \`\`\`
log_done() { (( _indent > 0 )) && _indent=\$(( _indent - 1 )) || true; printf '%s\e[30m%s\e[39m %s\n' "\$(_pad)" "\$DONE" "\$*"; }

# ### \`log_flow\` — Start an indented flow block
#
# Black **▷** prefix. Increments indent level so all subsequent log output is
# nested until the matching \`log_done\`. Flows can be nested.
#
# \`\`\`bash
# log_flow "Building..."
# log_step "Compiling"
# log_done "Build complete."
# # ▷ Building...
# #   ● Compiling
# # ▶ Build complete.
# \`\`\`
log_flow() { printf '%s\e[30m%s\e[39m %s\n' "\$(_pad)" "\$FLOW" "\$*"; _indent=\$(( _indent + 1 )); }

# ### \`log_step\` — Informational step (dim)
#
# Dim black **●** prefix. Use for progress updates within a flow.
#
# \`\`\`bash
# log_step "Compiling sources..."
# # ● Compiling sources...
# \`\`\`
log_step() { printf '%s\e[2;30m%s\e[22;39m %s\n' "\$(_pad)" "\$STEP" "\$*"; }

# ### \`log_warn\` — Warning message
#
# Yellow **Warn:** prefix. Use for non-fatal issues that deserve attention.
#
# \`\`\`bash
# log_warn "Config not found, using defaults"
# # Warn: Config not found, using defaults
# \`\`\`
log_warn() { printf '%s\e[1;33mWarn:\e[22;39m %s\n' "\$(_pad)" "\$*"; }

# ### \`log_fail\` — Error message
#
# Red **✘** prefix. Writes to stderr. Use for errors that don't halt
# execution. For fatal errors, use \`die\` instead.
#
# \`\`\`bash
# log_fail "Connection refused"
# # ✘ Connection refused
# \`\`\`
log_fail() { printf '%s\e[31m%s\e[39m %s\n' "\$(_pad)" "\$FAIL" "\$*" >&2; }

# ### \`die\` — Fatal error and exit
#
# Calls \`log_fail\` then exits with the given code (default: 1).
#
# \`\`\`bash
# die "Missing config file" 2
# # ✘ Missing config file
# # (exits with code 2)
# \`\`\`
die() { log_fail "\$1"; exit "\${2:-1}"; }

# ### \`cmd_exec\` — Run a command with dimmed, indented output
#
# Executes the given command, piping both stdout and stderr through a
# formatter that dims and indents each line. Preserves the command's exit
# code via \`\$PIPESTATUS\`. Best used inside a \`log_flow\` block.
#
# \`\`\`bash
# log_flow "Compiling..."
# cmd_exec tsc --noEmit
# log_done "Compiled."
# # ▷ Compiling...
# #   src/index.ts(3,1): error TS2304    ← dim + indented
# # ▶ Compiled.
# \`\`\`
cmd_exec() {
    local pad="\$(_pad)  "
    "\$@" 2>&1 | while IFS= read -r line; do
        printf '%s\e[2m%s\e[22m\n' "\$pad" "\$line"
    done
    return "\${PIPESTATUS[0]}"
}

#
# Signal Handling
#

_cleaned=0

# ### \`cleanup\`
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
# Functions
#

# TODO: Add your functions here

#
# Main
#

main() {
    log_flow "Running ${name}..."

    # TODO: Implement main logic
    # cmd_exec some-command --flag

    log_done "${name} complete."
}

main "\$@"
TEMPLATE
}

#
# Main
#

main() {
    local author=""
    local positional=()

    # Parse arguments — positional first, then flags
    while (( $# )); do
        case "$1" in
            -a)
                [[ -z "${2:-}" ]] && die "Option -a requires an argument"
                author="$2"
                shift 2
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            -*)
                die "Unknown option: $1"
                ;;
            *)
                positional+=("$1")
                shift
                ;;
        esac
    done

    # Validate positional arguments
    (( ${#positional[@]} < 2 )) && { usage >&2; die "Missing required arguments"; }

    local target="${positional[0]}"
    local desc="${positional[1]}"
    local date
    date="$(date +%Y-%m-%d)"

    # Default author from git or $USER
    if [[ -z "$author" ]]; then
        author="$(git config user.name 2>/dev/null || echo "${USER}")"
    fi

    # Refuse to overwrite existing files
    [[ -f "$target" ]] && die "File already exists: $target"

    # Create parent directories as needed
    local parent
    parent="$(dirname "$target")"
    [[ -d "$parent" ]] || {
        log_step "Creating directory: $parent"
        mkdir -p "$parent"
    }

    # Generate the script
    log_flow "Generating $target..."
    generate_script "$target" "$desc" "$author" "$date" > "$target"
    chmod +x "$target"

    log_pass "Created $target"
    log_done "Done."
}

main "$@"
