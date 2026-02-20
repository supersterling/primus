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
# ./scripts/initialize-project.sh [options]

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
readonly WARN="!"
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

# ### `ask_user_via_prompt` — Free-text input
#
# Displays a cyan **?** prompt, reads a line into `REPLY`.
# Pass an optional second argument as the default value.
#
# ```bash
# ask_user_via_prompt "Project name" "my-app"
# # ? Project name [my-app]
# #   >
# ```
ask_user_via_prompt() {
    local default="${2:-}"
    if [[ -n "$default" ]]; then
        log_pose "$1 [$default]"
    else
        log_pose "$1"
    fi
    printf '%s  \e[36m>\e[39m ' "$(_pad)"
    read -r REPLY
    [[ -z "$REPLY" && -n "$default" ]] && REPLY="$default" || true
}

# ### `ask_user_via_confirm` — Yes/no confirmation
#
# Prompts with `[Y/n]`, `[y/N]`, or `[y/n]` based on the optional default.
# Sets `REPLY` to `y` or `n`. Returns 0 for yes, 1 for no — works with `if`.
#
# ```bash
# if ask_user_via_confirm "Deploy to production?" "n"; then
#     deploy
# fi
# # ? Deploy to production? [y/N]
# #   >
# ```
ask_user_via_confirm() {
    local prompt="$1"
    local default="${2:-}"
    local hint="y/n"
    [[ "$default" == "y" ]] && hint="Y/n"
    [[ "$default" == "n" ]] && hint="y/N"
    while true; do
        log_pose "$prompt [$hint]"
        printf '%s  \e[36m>\e[39m ' "$(_pad)"
        read -r REPLY
        [[ -z "$REPLY" ]] && REPLY="$default"
        case "$REPLY" in
            [yY]) REPLY="y"; return 0 ;;
            [nN]) REPLY="n"; return 1 ;;
            *) log_warn "Enter y or n" ;;
        esac
    done
}

# ### `ask_user_via_select` — Numbered menu selection
#
# Displays a numbered list, loops until the user picks a valid option.
# `REPLY` is set to the chosen option's **text**, not the number.
#
# ```bash
# ask_user_via_select "Which environment?" "staging" "production"
# # ? Which environment?
# #   1. staging
# #   2. production
# #   >
# ```
ask_user_via_select() {
    local prompt="$1"; shift
    local options=("$@")
    log_pose "$prompt"
    local i=1
    for opt in "${options[@]}"; do
        printf '%s  \e[36m%d.\e[39m %s\n' "$(_pad)" "$i" "$opt"
        (( i++ ))
    done
    while true; do
        printf '%s  \e[36m>\e[39m ' "$(_pad)"
        read -r REPLY
        if [[ "$REPLY" =~ ^[0-9]+$ ]] && (( REPLY >= 1 && REPLY <= ${#options[@]} )); then
            REPLY="${options[$((REPLY - 1))]}"
            return
        fi
        log_warn "Enter a number 1-${#options[@]}"
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

#
# Main
#

main() {
    log_flow "Initializing project..."

    # Prerequisites
    log_flow "Checking prerequisites..."
    require_cmd bun "Install: https://bun.sh"
    require_cmd docref "Install: cargo install docref"
    log_done "Prerequisites satisfied."

    # Install dependencies
    log_flow "Installing dependencies..."
    cmd_exec bun install
    log_done "Dependencies installed."

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
