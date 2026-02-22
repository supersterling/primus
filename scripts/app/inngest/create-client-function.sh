#!/usr/bin/env bash
# = create-client-function.sh
#
# == Description
#
# Create a new Inngest function and register it in functions.ts
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-20
#
# == Usage
#
# ./scripts/app/inngest/create-client-function.sh --client core --path sync/process-batch --events "app/batch-ready"
# ./scripts/app/inngest/create-client-function.sh  # interactive prompt

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
add_flag "path" "FN_PATH" "Function path (slash-delimited kebab-case, e.g. sync/process-batch)"
add_flag "events" "FN_EVENTS" "Event IDs to trigger on (space-separated)"
add_flag "cron" "FN_CRON" "Cron expression (e.g. '0 * * * *')"

#
# Functions
#

fmt() { bunx biome check --write --unsafe "$@" > /dev/null 2>&1 || true; }

discover_clients() {
    local dir="src/inngest"
    [[ -d "$dir" ]] || die "No inngest directory found at $dir — create a client first"
    local clients=()
    for d in "$dir"/*/; do
        [[ -d "$d" ]] || continue
        clients+=("$(basename "$d")")
    done
    (( ${#clients[@]} )) || die "No inngest clients found in $dir — create a client first"
    printf '%s\n' "${clients[@]}"
}

# Validate that each segment of a slash-delimited path is kebab-case.
validate_fn_path() {
    local value="$1"
    if [[ ! "$value" =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*(\/[a-z][a-z0-9]*(-[a-z0-9]+)*)*$ ]]; then
        die "Function path must be slash-delimited kebab-case (e.g. 'sync/process-batch'): got '$value'"
    fi
}

# Validate that all event IDs exist in the client's events.ts.
validate_events_exist() {
    local events_file="$1"
    shift
    local missing=()
    for evt in "$@"; do
        if ! grep -q "\"$evt\"" "$events_file"; then
            missing+=("$evt")
        fi
    done
    if (( ${#missing[@]} )); then
        die "Events not found in $events_file: ${missing[*]}"
    fi
}

# Build the trigger argument for inngest.createFunction().
# Produces either a single object or an array of objects.
build_trigger() {
    local events="$1"
    local cron="$2"
    local triggers=()

    # Word-split intentional: events is space-separated
    for evt in $events; do
        triggers+=("{ event: \"$evt\" }")
    done
    [[ -n "$cron" ]] && triggers+=("{ cron: \"$cron\" }") || true

    if (( ${#triggers[@]} == 1 )); then
        printf '%s' "${triggers[0]}"
    else
        printf '[%s]' "$(IFS=,; printf '%s' "${triggers[*]}" | sed 's/,/, /g')"
    fi
}

write_function_ts() {
    local client_id="$1"
    local fn_path="$2"
    local trigger="$3"
    local dir
    dir="$(dirname "src/inngest/$client_id/functions/$fn_path.ts")"
    local file="src/inngest/$client_id/functions/$fn_path.ts"

    mkdir -p "$dir"
    cat > "$file" <<EOF
import { inngest } from "@/inngest/${client_id}/client"

export const id = "${fn_path}" as const

export default inngest.createFunction(
    { id },
    ${trigger},
    async ({ event, step, publish, logger }) => {
        // TODO: implement
    },
)
EOF
    log_pass "Created $file"
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

    # Prompt for function details
    ask_user_via_prompt FN_PATH "Function path (slash-delimited kebab-case, e.g. sync/process-batch)"
    validate_fn_path "$FN_PATH"

    # Check function doesn't already exist
    local fn_file="src/inngest/$CLIENT_ID/functions/$FN_PATH.ts"
    [[ -f "$fn_file" ]] && die "Function file already exists: $fn_file"

    # Prompt for triggers. If either trigger flag was provided via CLI, default the
    # other to empty so the script doesn't prompt interactively for it.
    if [[ -n "${FN_EVENTS+x}" || -n "${FN_CRON+x}" ]]; then
        FN_EVENTS="${FN_EVENTS:-}"
        FN_CRON="${FN_CRON:-}"
    else
        ask_user_via_prompt FN_EVENTS "Event IDs (space-separated, or leave blank)" ""
        ask_user_via_prompt FN_CRON "Cron expression (or leave blank)" ""
    fi

    if [[ -z "$FN_EVENTS" && -z "$FN_CRON" ]]; then
        die "At least one trigger is required (--events or --cron)"
    fi

    # Validate that all referenced events exist
    if [[ -n "$FN_EVENTS" ]]; then
        local events_file="src/inngest/$CLIENT_ID/events.ts"
        [[ -f "$events_file" ]] || die "Events file not found: $events_file"
        # Word-split intentional: FN_EVENTS is space-separated
        validate_events_exist "$events_file" $FN_EVENTS
    fi

    local trigger
    trigger="$(build_trigger "$FN_EVENTS" "$FN_CRON")"

    log_flow "Creating function '$FN_PATH' in client '$CLIENT_ID'..."

    write_function_ts "$CLIENT_ID" "$FN_PATH" "$trigger"

    if ! output=$(bun scripts/utils/manage-inngest-registries.ts functions insert \
        --file "$functions_file" --path "$FN_PATH" --client "$CLIENT_ID" 2>&1); then
        die "$output"
    fi
    log_pass "Updated $functions_file"

    fmt "$fn_file" "$functions_file"
    log_step "Formatted generated files"

    log_done "Function '$FN_PATH' created."
    log_hint "Implement your function in $fn_file"
}

main "$@"
