# Inngest Function Management Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add scripts to create/remove inngest functions with an auto-populated `functions.ts` barrel per client.

**Architecture:** Shell scripts following the exact patterns of `create-client-event.sh` / `remove-client-event.sh`. A `functions.ts` barrel per client uses marker-based awk insertion, mirroring `events.ts`. Each function file default-exports its `inngest.createFunction()` result and named-exports a const `id`.

**Tech Stack:** Bash, awk, Inngest SDK, Biome formatter

**Design doc:** `docs/plans/2026-02-20-inngest-functions-design.md`

---

### Task 1: Fix existing infrastructure

Update `create-client.sh` and the existing `core` client to use `functions.ts` instead of `registry`.

**Files:**
- Modify: `scripts/app/inngest/create-client.sh:630-644` (write_route_ts) and `:669-675` (main)
- Modify: `src/app/api/inngest/core/route.ts`
- Create: `src/inngest/core/functions.ts`

**Step 1: Add `write_functions_ts` to `create-client.sh`**

Insert after `write_events_ts` (after line 628):

```bash
write_functions_ts() {
    local dir="$1"
    local file="$dir/functions.ts"

    cat > "$file" <<'EOF'
// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the `functions` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions = []

export { functions }
EOF
    log_pass "Created $file"
}
```

**Step 2: Fix `write_route_ts` import**

Change line 639 from:
```bash
import { functions } from "@/inngest/${client_id}/registry"
```
to:
```bash
import { functions } from "@/inngest/${client_id}/functions"
```

**Step 3: Call `write_functions_ts` in `main`**

After `write_events_ts` call (line 672), add:
```bash
write_functions_ts "$client_dir"
```

Remove the `mkdir -p "$client_dir/functions"` line (673-674) — the `functions/` directory will be created by `create-client-function.sh` when the first function is added.

**Step 4: Create `functions.ts` for the existing `core` client**

Write `src/inngest/core/functions.ts` with the empty template (same content as `write_functions_ts` generates).

**Step 5: Fix existing `route.ts`**

In `src/app/api/inngest/core/route.ts`, change:
```ts
import { functions } from "@/inngest/core/registry"
```
to:
```ts
import { functions } from "@/inngest/core/functions"
```

**Step 6: Remove the empty `functions/` directory**

```bash
rmdir src/inngest/core/functions
```

It was created by `create-client.sh` but is empty. The directory will be re-created by `create-client-function.sh` when functions are added.

**Step 7: Run checks**

```bash
bun run checks
```

Expected: PASS (tsc, biome, docref)

**Step 8: Format and commit**

```bash
bunx biome check --write --unsafe src/inngest/core/functions.ts src/app/api/inngest/core/route.ts
git add scripts/app/inngest/create-client.sh src/inngest/core/functions.ts src/app/api/inngest/core/route.ts
git commit -m "feat: add functions.ts barrel and fix route.ts registry import"
```

---

### Task 2: Create `create-client-function.sh`

**Files:**
- Create: `scripts/app/inngest/create-client-function.sh`

**Reference files to study:**
- `scripts/app/inngest/create-client-event.sh` — primary template (marker insertion, client discovery, validation)
- `scripts/app/inngest/create-client.sh` — boilerplate template (full logging + flag framework)

**Step 1: Write the script**

Use `create-client-event.sh` as the structural template. The script boilerplate (constants, logging, signal handling, flags, parse_flags, usage) is identical — copy from `create-client-event.sh`.

Flags to register:
```bash
add_flag "client" "CLIENT_ID" "Client ID (kebab-case, e.g. core)"
add_flag "path" "FN_PATH" "Function path (slash-delimited kebab-case, e.g. sync/process-batch)"
add_flag "events" "FN_EVENTS" "Event IDs to trigger on (space-separated)"
add_flag "cron" "FN_CRON" "Cron expression (e.g. '0 * * * *')"
```

Helper functions to implement:

```bash
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

require_pattern() {
    local file="$1" pattern="$2" label="$3"
    if ! grep -q "$pattern" "$file"; then
        die "Missing required pattern in $file: $label"
    fi
}

# Validate that each segment of a slash-delimited path is kebab-case.
validate_fn_path() {
    local value="$1"
    if [[ ! "$value" =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*(\/[a-z][a-z0-9]*(-[a-z0-9]+)*)*$ ]]; then
        die "Function path must be slash-delimited kebab-case (e.g. 'sync/process-batch'): got '$value'"
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

# Build the trigger argument for inngest.createFunction().
# Produces either a single object or an array of objects.
build_trigger() {
    local events="$1"
    local cron="$2"
    local triggers=()

    for evt in $events; do
        triggers+=("{ event: \"$evt\" }")
    done
    [[ -n "$cron" ]] && triggers+=("{ cron: \"$cron\" }")

    if (( ${#triggers[@]} == 1 )); then
        printf '%s' "${triggers[0]}"
    else
        printf '[%s]' "$(IFS=,; printf '%s' "${triggers[*]}" | sed 's/,/, /g')"
    fi
}

# Check whether functions.ts has no function definitions yet.
is_fresh_functions_file() {
    local file="$1"
    ! grep -q '^// -- .* --$' "$file"
}
```

Function file writer:

```bash
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
    async ({ event, step }) => {
        // TODO: implement
    },
)
EOF
    log_pass "Created $file"
}
```

First function barrel writer (rewrites `functions.ts` from scratch):

```bash
write_first_function_barrel() {
    local file="$1"
    local client_id="$2"
    local fn_path="$3"
    local camel="$4"

    cat > "$file" <<EOF
// -- ${fn_path} --
import ${camel} from "@/inngest/${client_id}/functions/${fn_path}"

// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the \`functions\` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions = [
    ${camel},
]

export { functions }
EOF
    log_pass "Updated $file (first function)"
}
```

Subsequent function inserter:

```bash
insert_function() {
    local file="$1"
    local client_id="$2"
    local fn_path="$3"
    local camel="$4"

    require_pattern "$file" '// # Marker: Function List' 'Function List marker'
    require_pattern "$file" '^]$' 'closing bracket for functions array'

    awk -v path="$fn_path" -v client="$client_id" -v camel="$camel" '
        /^\/\/ # Marker: Function List$/ {
            print "// -- " path " --"
            print "import " camel " from \"@/inngest/" client "/functions/" path "\""
            print ""
        }
        /^\]$/ {
            print "    " camel ","
        }
        { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"

    if ! grep -q "import ${camel} from" "$file"; then
        die "Failed to insert function '$fn_path' — file may be corrupted"
    fi
}
```

Main function:

```bash
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

    # Require at least one trigger
    ask_user_via_prompt FN_EVENTS "Event IDs (space-separated, or leave blank)" ""
    ask_user_via_prompt FN_CRON "Cron expression (or leave blank)" ""

    if [[ -z "$FN_EVENTS" && -z "$FN_CRON" ]]; then
        die "At least one trigger is required (--events or --cron)"
    fi

    local camel
    camel="$(id_to_camel "$FN_PATH")"

    local trigger
    trigger="$(build_trigger "$FN_EVENTS" "$FN_CRON")"

    log_flow "Creating function '$FN_PATH' in client '$CLIENT_ID'..."

    write_function_ts "$CLIENT_ID" "$FN_PATH" "$trigger"

    if is_fresh_functions_file "$functions_file"; then
        write_first_function_barrel "$functions_file" "$CLIENT_ID" "$FN_PATH" "$camel"
    else
        insert_function "$functions_file" "$CLIENT_ID" "$FN_PATH" "$camel"
    fi

    fmt "$fn_file" "$functions_file"
    log_step "Formatted generated files"

    log_done "Function '$FN_PATH' created."
    log_hint "Implement your function in $fn_file"
}

main "$@"
```

**Step 2: Make executable**

```bash
chmod +x scripts/app/inngest/create-client-function.sh
```

**Step 3: Test — create a single function**

```bash
./scripts/app/inngest/create-client-function.sh \
    --client core \
    --path sync/process-batch \
    --events "app/batch-ready" \
    --cron "0 * * * *"
```

Verify:
- `src/inngest/core/functions/sync/process-batch.ts` exists with correct content
- `src/inngest/core/functions.ts` has the import and array entry
- `bun run checks` passes

**Step 4: Test — create a second function**

```bash
./scripts/app/inngest/create-client-function.sh \
    --client core \
    --path notifications/send-email \
    --events "app/email-requested"
```

Verify:
- Second function file exists
- `functions.ts` has both imports and both array entries
- `bun run checks` passes

**Step 5: Clean up test functions and commit**

```bash
rm -rf src/inngest/core/functions/
git checkout src/inngest/core/functions.ts
git add scripts/app/inngest/create-client-function.sh
git commit -m "feat: add create-client-function.sh script"
```

---

### Task 3: Create `remove-client-function.sh`

**Files:**
- Create: `scripts/app/inngest/remove-client-function.sh`

**Reference files:**
- `scripts/app/inngest/remove-client-event.sh` — primary template
- `scripts/app/inngest/create-client-function.sh` — shares helpers (`discover_clients`, `id_to_camel`, `validate_fn_path`)

**Step 1: Write the script**

Copy boilerplate from `remove-client-event.sh`. Register flags:

```bash
add_flag "client" "CLIENT_ID" "Client ID (kebab-case, e.g. core)"
add_flag "path" "FN_PATH" "Function path to remove (e.g. sync/process-batch)"
```

Helper functions (reuse patterns from remove-client-event.sh):

```bash
fmt() { bunx biome check --write --unsafe "$@" > /dev/null 2>&1 || true; }

discover_clients() {
    # Same as create-client-function.sh
}

require_pattern() {
    local file="$1" pattern="$2" label="$3"
    if ! grep -q "$pattern" "$file"; then
        die "Missing required pattern in $file: $label"
    fi
}

id_to_camel() {
    # Same as create-client-function.sh
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
        index($0, camel ",") > 0 && /^[[:space:]]/ { next }
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
// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the `functions` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions = []

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
```

Main function:

```bash
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
```

**Step 2: Make executable**

```bash
chmod +x scripts/app/inngest/remove-client-function.sh
```

**Step 3: Test round-trip — create then remove**

```bash
# Create two functions
./scripts/app/inngest/create-client-function.sh \
    --client core --path sync/process-batch --events "app/batch-ready"

./scripts/app/inngest/create-client-function.sh \
    --client core --path notifications/send-email --cron "0 * * * *"

# Remove the first one
./scripts/app/inngest/remove-client-function.sh \
    --client core --path sync/process-batch --confirm y

# Verify: functions.ts has only send-email, process-batch file is gone
# Verify: bun run checks passes

# Remove the last one
./scripts/app/inngest/remove-client-function.sh \
    --client core --path notifications/send-email --confirm y

# Verify: functions.ts is reset to empty template
# Verify: functions/ directory is pruned
# Verify: bun run checks passes
```

**Step 4: Clean up and commit**

```bash
git add scripts/app/inngest/remove-client-function.sh
git commit -m "feat: add remove-client-function.sh script"
```

---

### Task 4: Final integration test and cleanup

**Step 1: Full round-trip test**

```bash
# Create a function with mixed triggers
./scripts/app/inngest/create-client-function.sh \
    --client core \
    --path sync/process-batch \
    --events "app/batch-ready app/manual-sync" \
    --cron "0 */6 * * *"

# Verify function file has array trigger with 3 items
# Verify functions.ts barrel is correct
# Verify bun run checks passes

# Remove it
./scripts/app/inngest/remove-client-function.sh \
    --client core --path sync/process-batch --confirm y

# Verify clean state
```

**Step 2: Clean up test artifacts and commit**

```bash
git add -A
git status  # verify no unexpected files
git commit -m "chore: clean up after integration testing"
```
