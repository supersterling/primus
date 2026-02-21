#!/usr/bin/env bash
# = remove-client-function.sh
#
# == Description
#
# Remove a function from an existing Inngest client's functions.ts
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-20
#
# == Usage
#
# ./scripts/app/inngest/remove-client-function.sh --client core --path sync/process-batch
# ./scripts/app/inngest/remove-client-function.sh  # interactive prompt

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

_indent=0

_pad() { printf '%*s' $(( _indent * 2 )) ''; }
log_bold() { printf '%s\e[1m%s\e[22m\n' "$(_pad)" "$*"; }
log_pass() { printf '%s\e[32m%s\e[39m %s\n' "$(_pad)" "$PASS" "$*"; }
log_done() { (( _indent > 0 )) && _indent=$(( _indent - 1 )) || true; printf '%s\e[30m%s\e[39m %s\n' "$(_pad)" "$DONE" "$*"; }
log_flow() { printf '%s\e[30m%s\e[39m %s\n' "$(_pad)" "$FLOW" "$*"; _indent=$(( _indent + 1 )); }
log_step() { printf '%s\e[2;30m%s\e[22;39m %s\n' "$(_pad)" "$STEP" "$*"; }
log_pose() { printf '%s\e[36m%s\e[39m %s\n' "$(_pad)" "$POSE" "$*"; }
log_dull() { printf '%s\e[2m%s\e[22m\n' "$(_pad)" "$*"; }
log_hint() { printf '%s\e[2m%s %s\e[22m\n' "$(_pad)" "$HINT" "$*"; }
log_warn() { printf '%s\e[33m%s\e[39m %s\n' "$(_pad)" "$WARN" "$*"; }
log_fail() { printf '%s\e[31m%s\e[39m %s\n' "$(_pad)" "$FAIL" "$*" >&2; }
die() { log_fail "$1"; exit "${2:-1}"; }
log_exec() { printf '%s\e[1m%s %s\e[22m\n' "$(_pad)" "$EXEC" "$*"; }

cmd_exec() {
    log_exec "$@"
    local pad="$(_pad)  "
    "$@" 2>&1 | while IFS= read -r line; do
        printf '%s\e[2m%s\e[22m\n' "$pad" "$line"
    done
    return "${PIPESTATUS[0]}"
}

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

#
# Signal Handling
#

_cleaned=0

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

declare -a _flag_names=()
declare -a _flag_vars=()
declare -a _flag_descs=()
declare -a ARGS=()

add_flag() {
    _flag_names+=("$1")
    _flag_vars+=("$2")
    _flag_descs+=("$3")
}

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

usage() {
    printf 'Usage: %s [options]\n\n' "$SCRIPT_NAME"
    printf 'Options:\n'
    for i in "${!_flag_names[@]}"; do
        printf '  --%-20s %s\n' "${_flag_names[$i]} <value>" "${_flag_descs[$i]}"
    done
    printf '  -h, --help             Show this help message\n'
}

add_flag "client" "CLIENT_ID" "Client ID (kebab-case, e.g. core)"
add_flag "path" "FN_PATH" "Function path to remove (e.g. sync/process-batch)"
add_flag "confirm" "CONFIRM" "Confirm removal (y/n)"

#
# Functions
#

fmt() { bunx biome check --write --unsafe "$@" > /dev/null 2>&1 || true; }

discover_clients() {
    local dir="src/inngest"
    [[ -d "$dir" ]] || die "No inngest directory found at $dir"
    local clients=()
    for d in "$dir"/*/; do
        [[ -d "$d" ]] || continue
        clients+=("$(basename "$d")")
    done
    (( ${#clients[@]} )) || die "No inngest clients found in $dir"
    printf '%s\n' "${clients[@]}"
}

require_pattern() {
    local file="$1" pattern="$2" label="$3"
    if ! grep -q "$pattern" "$file"; then
        die "Missing required pattern in $file: $label"
    fi
}

# Convert slash-delimited kebab-case to camelCase.
# e.g. sync/process-batch → syncProcessBatch
id_to_camel() {
    local id="$1"
    printf '%s' "$id" | awk -F'[/-]' '{
        for (i=1; i<=NF; i++) {
            if (i == 1) {
                printf "%s", $i
            } else {
                printf "%s%s", toupper(substr($i,1,1)), substr($i,2)
            }
        }
    }'
}

# Extract function paths from functions.ts by parsing "// -- PATH --" markers.
discover_functions() {
    local file="$1"
    grep '^// -- .* --$' "$file" | sed 's|^// -- \(.*\) --$|\1|'
}

# Remove a function's import and array entry from functions.ts.
remove_function_entry() {
    local file="$1"
    local fn_path="$2"
    local camel="$3"
    local marker="// -- ${fn_path} --"

    require_pattern "$file" "$marker" "function marker for $fn_path"

    awk -v marker="$marker" -v camel="$camel" '
        $0 == marker { skip=1; next }
        skip && (/^\/\/ -- / || /^\/\/ # Marker:/) { skip=0 }
        skip { next }
        $0 ~ "^import " camel " from " { next }
        index($0, camel ",") > 0 && /^[[:space:]]/ { next }
        /^const functions = \[/ && /\]$/ {
            # Single-line array: remove this camel entry
            gsub(camel ", ", "", $0)
            gsub(", " camel, "", $0)
            gsub(camel, "", $0)
        }
        { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"

    # Clean up double blank lines
    awk 'NF || !blank { print } { blank = !NF }' "$file" > "$file.tmp" && mv "$file.tmp" "$file"

    if grep -q "import ${camel} from" "$file"; then
        die "Failed to remove function '$fn_path' — file may be corrupted"
    fi
}

# Check if any functions remain after removal.
has_remaining_functions() {
    local file="$1"
    grep -q '^// -- .* --$' "$file"
}

# Reset functions.ts to the empty template.
reset_functions_file() {
    local file="$1"

    cat > "$file" <<'EOF'
import { type InngestFunction } from "inngest"

// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the `functions` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions: InngestFunction.Like[] = []

export { functions }
EOF
}

# Prune empty parent directories up to stop point.
prune_empty_parents() {
    local dir="$1"
    local stop="$2"
    while [[ "$dir" != "$stop" && -d "$dir" && -z "$(ls -A "$dir")" ]]; do
        rmdir "$dir"
        log_step "Pruned empty $dir/"
        dir="$(dirname "$dir")"
    done
}

#
# Main
#

main() {
    parse_flags "$@"

    # Discover and select client
    local clients
    mapfile -t clients < <(discover_clients)

    if (( ${#clients[@]} == 1 )); then
        CLIENT_ID="${CLIENT_ID:-${clients[0]}}"
        log_step "Using client: $CLIENT_ID"
    else
        ask_user_via_select CLIENT_ID "Which client?" "${clients[@]}"
    fi

    local functions_file="src/inngest/$CLIENT_ID/functions.ts"
    [[ -f "$functions_file" ]] || die "Functions file not found: $functions_file"

    # Discover functions in this client
    local fns
    mapfile -t fns < <(discover_functions "$functions_file")
    (( ${#fns[@]} )) || die "No functions found in $functions_file"

    if (( ${#fns[@]} == 1 )); then
        FN_PATH="${FN_PATH:-${fns[0]}}"
        log_step "Found function: $FN_PATH"
    else
        ask_user_via_select FN_PATH "Which function to remove?" "${fns[@]}"
    fi

    if ! ask_user_via_confirm CONFIRM "Remove function '$FN_PATH' from client '$CLIENT_ID'?" "n"; then
        log_dull "Aborted."
        return
    fi

    local camel
    camel="$(id_to_camel "$FN_PATH")"

    local fn_file="src/inngest/$CLIENT_ID/functions/$FN_PATH.ts"

    log_flow "Removing function '$FN_PATH' from client '$CLIENT_ID'..."

    # Remove function file
    if [[ -f "$fn_file" ]]; then
        rm "$fn_file"
        log_pass "Removed $fn_file"
    else
        log_dull "Not found: $fn_file (skipping)"
    fi

    # Update functions.ts
    remove_function_entry "$functions_file" "$FN_PATH" "$camel"

    if has_remaining_functions "$functions_file"; then
        log_pass "Updated $functions_file"
    else
        reset_functions_file "$functions_file"
        log_pass "Reset $functions_file (no functions remaining)"
    fi

    # Prune empty parent directories
    local fn_dir
    fn_dir="$(dirname "$fn_file")"
    prune_empty_parents "$fn_dir" "src/inngest/$CLIENT_ID/functions"

    fmt "$functions_file"

    log_done "Function '$FN_PATH' removed."
}

main "$@"
