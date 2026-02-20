#!/usr/bin/env bash
# = create-client-event.sh
#
# == Description
#
# Add an event schema to an existing Inngest client's events.ts
#
# == Metadata
#
# Author:  supersterling
# Created: 2026-02-20
#
# == Usage
#
# ./scripts/app/inngest/create-client-event.sh --client core --id app/user-created --name "User Created" --desc "Fired when a new user registers"
# ./scripts/app/inngest/create-client-event.sh  # interactive prompt

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
add_flag "id" "EVENT_ID" "Event ID (slash-delimited kebab-case, e.g. app/user-created)"
add_flag "name" "EVENT_NAME" "Human-readable event name"
add_flag "desc" "EVENT_DESC" "Event description"

#
# Functions
#

ensure_dep() {
    local pkg="$1"
    if ! grep -q "\"$pkg\"" package.json; then
        log_step "Installing $pkg..."
        cmd_exec bun add "$pkg"
    fi
}

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

validate_event_id() {
    local value="$1"
    if [[ ! "$value" =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*(\/[a-z][a-z0-9]*(-[a-z0-9]+)*)+$ ]]; then
        die "Event ID must be slash-delimited kebab-case (e.g. 'app/user-created'): got '$value'"
    fi
}

# Convert event ID to PascalCase.
# e.g. app/user-created → AppUserCreated
id_to_pascal() {
    local id="$1"
    printf '%s' "$id" | awk -F'[/-]' '{
        for (i=1; i<=NF; i++) {
            printf "%s%s", toupper(substr($i,1,1)), substr($i,2)
        }
    }'
}

# Check whether events.ts is the empty template (no event definitions yet).
is_fresh_events_file() {
    local file="$1"
    grep -q 'const events = {} as const satisfies EventRecord' "$file"
}

# Write events.ts from scratch for the first event.
write_first_event() {
    local file="$1"
    local event_id="$2"
    local event_name="$3"
    local event_desc="$4"
    local pascal="$5"

    cat > "$file" <<EOF
import { createEvent, type EventRecord, type InferEventPayload } from "@/lib/inngest"
import { z } from "zod"

// -- ${event_id} --
/**
 * ${event_name} — ${event_desc}
 */
const ${pascal}Schema = createEvent("${event_id}", z.object({}))
type ${pascal} = InferEventPayload<typeof ${pascal}Schema>

// -- Event Map --

const events = {
    [${pascal}Schema.name]: ${pascal}Schema.data,
} as const satisfies EventRecord

export { events }
export type { ${pascal} }
EOF
}

# Insert a new event into an existing events.ts that already has events.
insert_event() {
    local file="$1"
    local event_id="$2"
    local event_name="$3"
    local event_desc="$4"
    local pascal="$5"

    awk -v eid="$event_id" -v ename="$event_name" -v edesc="$event_desc" -v pascal="$pascal" '
        /^\/\/ -- Event Map --/ {
            print "// -- " eid " --"
            print "/**"
            print " * " ename " \342\200\224 " edesc
            print " */"
            print "const " pascal "Schema = createEvent(\"" eid "\", z.object({}))"
            print "type " pascal " = InferEventPayload<typeof " pascal "Schema>"
            print ""
        }
        /^\} as const satisfies EventRecord/ {
            print "    [" pascal "Schema.name]: " pascal "Schema.data,"
        }
        /^export type \{/ {
            sub(/ \}/, ", " pascal " }")
        }
        { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
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

    local events_file="src/inngest/$CLIENT_ID/events.ts"
    [[ -f "$events_file" ]] || die "Events file not found: $events_file"

    # Prompt for event details
    ask_user_via_prompt EVENT_ID "Event ID (slash-delimited kebab-case, e.g. app/user-created)"
    validate_event_id "$EVENT_ID"

    # Check event doesn't already exist
    if grep -q "\"$EVENT_ID\"" "$events_file"; then
        die "Event '$EVENT_ID' already exists in $events_file"
    fi

    ask_user_via_prompt EVENT_NAME "Event name (human-readable)"
    ask_user_via_prompt EVENT_DESC "Event description"

    local pascal
    pascal="$(id_to_pascal "$EVENT_ID")"

    ensure_dep "zod"

    log_flow "Adding event '$EVENT_ID' to client '$CLIENT_ID'..."

    if is_fresh_events_file "$events_file"; then
        write_first_event "$events_file" "$EVENT_ID" "$EVENT_NAME" "$EVENT_DESC" "$pascal"
        log_pass "Wrote $events_file (first event)"
    else
        insert_event "$events_file" "$EVENT_ID" "$EVENT_NAME" "$EVENT_DESC" "$pascal"
        log_pass "Updated $events_file"
    fi

    fmt "$events_file"

    log_done "Event '$EVENT_ID' added."
    log_hint "Edit the z.object({}) in $events_file to define your event data schema."
}

main "$@"
