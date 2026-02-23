#!/usr/bin/env bash
# = create-client-endpoint.sh
#
# == Description
#
# Create a durable endpoint route for an Inngest client
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-22
#
# == Usage
#
# ./scripts/app/inngest/create-client-endpoint.sh --client core --path webhooks/stripe
# ./scripts/app/inngest/create-client-endpoint.sh  # interactive prompt

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
add_flag "path" "ROUTE_PATH" "Route path (slash-delimited kebab-case, e.g. webhooks/stripe)"

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

validate_route_path() {
    local value="$1"
    if [[ ! "$value" =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*(\/[a-z][a-z0-9]*(-[a-z0-9]+)*)*$ ]]; then
        die "Route path must be slash-delimited kebab-case (e.g. 'webhooks/stripe'): got '$value'"
    fi
}

write_endpoint_route_ts() {
    local client_id="$1"
    local route_path="$2"
    local dir="src/app/api/$route_path"
    local file="$dir/route.ts"

    mkdir -p "$dir"
    cat > "$file" <<EOF
import { step } from "inngest"
import { inngest } from "@/inngest/${client_id}/client"
import { type NextRequest } from "next/server"

export const GET = inngest.endpoint(async (req: NextRequest) => {
    const url = new URL(req.url)

    // TODO: implement
    const result = await step.run("placeholder", async () => {
        return await Promise.resolve({ url: url.toString() })
    })

    return Response.json(result)
})
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

    local client_file="src/inngest/$CLIENT_ID/client.ts"
    [[ -f "$client_file" ]] || die "Client file not found: $client_file"

    # Prompt for route path
    ask_user_via_prompt ROUTE_PATH "Route path (slash-delimited kebab-case, e.g. webhooks/stripe)"
    validate_route_path "$ROUTE_PATH"

    # Check route doesn't already exist
    local route_file="src/app/api/$ROUTE_PATH/route.ts"
    [[ -f "$route_file" ]] && die "Route file already exists: $route_file"

    log_flow "Creating endpoint '$ROUTE_PATH' for client '$CLIENT_ID'..."

    write_endpoint_route_ts "$CLIENT_ID" "$ROUTE_PATH"

    fmt "$route_file"
    log_step "Formatted generated files"

    log_done "Endpoint '$ROUTE_PATH' created."
    log_hint "Implement your endpoint in $route_file"
}

main "$@"
