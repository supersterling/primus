# AST-Based Registry Management Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace fragile awk-based marker manipulation in all 4 inngest scripts with a single ts-morph utility that handles AST-based reads and writes.

**Architecture:** A TypeScript utility (`scripts/utils/manage-inngest-registries.ts`) parses and manipulates `events.ts` and `functions.ts` files via ts-morph. Shell scripts call it via `bun` for insert/remove/list operations, keeping flow control, prompts, and logging in bash. The utility owns naming conversions (camelCase, PascalCase), AST manipulation, and empty template resets.

**Tech Stack:** ts-morph, Bun, Bash

**Design doc:** `docs/plans/2026-02-20-ast-registry-management-design.md`

---

### Task 1: Install ts-morph and create utility skeleton

**Files:**
- Create: `scripts/utils/manage-inngest-registries.ts`

**Step 1: Install ts-morph**

```bash
bun add -d ts-morph
```

**Step 2: Create the utility with arg parsing and routing**

Create `scripts/utils/manage-inngest-registries.ts`:

```ts
import { parseArgs } from "node:util"
import { Project, type SourceFile } from "ts-morph"

//
// Naming
//

function toCamelCase(path: string): string {
    return path
        .split(/[/-]/)
        .map((seg, i) => (i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1)))
        .join("")
}

function toPascalCase(id: string): string {
    return id
        .split(/[/-]/)
        .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
        .join("")
}

//
// Helpers
//

function loadFile(filePath: string): SourceFile {
    const project = new Project({ useInMemoryFileSystem: false })
    const source = project.addSourceFileAtPath(filePath)
    return source
}

function die(message: string): never {
    process.stderr.write(`${message}\n`)
    process.exit(1)
}

//
// Functions operations
//

function functionsList(file: string): void {
    die("Not implemented: functions list")
}

function functionsInsert(file: string, path: string, client: string): void {
    die("Not implemented: functions insert")
}

function functionsRemove(file: string, path: string): void {
    die("Not implemented: functions remove")
}

//
// Events operations
//

function eventsList(file: string): void {
    die("Not implemented: events list")
}

function eventsInsert(file: string, id: string): void {
    die("Not implemented: events insert")
}

function eventsRemove(file: string, id: string): void {
    die("Not implemented: events remove")
}

//
// CLI
//

const args = process.argv.slice(2)
const type = args[0]
const action = args[1]
const rest = args.slice(2)

const { values } = parseArgs({
    args: rest,
    options: {
        file: { type: "string" },
        path: { type: "string" },
        client: { type: "string" },
        id: { type: "string" },
    },
    strict: true,
})

if (!type || !action) {
    die("Usage: manage-inngest-registries.ts <functions|events> <insert|remove|list> [flags]")
}

if (!values.file) {
    die("--file is required")
}

if (type === "functions") {
    if (action === "list") {
        functionsList(values.file)
    } else if (action === "insert") {
        if (!values.path || !values.client) die("--path and --client required for functions insert")
        functionsInsert(values.file, values.path, values.client)
    } else if (action === "remove") {
        if (!values.path) die("--path required for functions remove")
        functionsRemove(values.file, values.path)
    } else {
        die(`Unknown action: ${action}`)
    }
} else if (type === "events") {
    if (action === "list") {
        eventsList(values.file)
    } else if (action === "insert") {
        if (!values.id) die("--id required for events insert")
        eventsInsert(values.file, values.id)
    } else if (action === "remove") {
        if (!values.id) die("--id required for events remove")
        eventsRemove(values.file, values.id)
    } else {
        die(`Unknown action: ${action}`)
    }
} else {
    die(`Unknown type: ${type}`)
}
```

**Step 3: Verify skeleton runs**

```bash
bun scripts/utils/manage-inngest-registries.ts
# Expected: stderr "Usage: manage-inngest-registries.ts <functions|events> <insert|remove|list> [flags]", exit 1

bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected: stderr "Not implemented: functions list", exit 1
```

**Step 4: Run checks**

```bash
bun run checks
```

Expected: PASS (same pre-existing errors only)

**Step 5: Commit**

```bash
git add scripts/utils/manage-inngest-registries.ts package.json bun.lock
git commit -m "feat: add manage-inngest-registries.ts skeleton with ts-morph"
```

---

### Task 2: Implement functions operations (list, insert, remove)

**Files:**
- Modify: `scripts/utils/manage-inngest-registries.ts`

**Reference:** Read `src/inngest/core/functions.ts` for the empty template format. Read the design doc at `docs/plans/2026-02-20-ast-registry-management-design.md` for the full spec.

**Step 1: Implement `functionsList`**

Replace the stub with:

```ts
function functionsList(file: string): void {
    const source = loadFile(file)
    const imports = source.getImportDeclarations()

    for (const imp of imports) {
        const specifier = imp.getModuleSpecifierValue()
        // Match: @/inngest/{client}/functions/{path}
        const match = specifier.match(/^@\/inngest\/[^/]+\/functions\/(.+)$/)
        if (match) {
            process.stdout.write(`${match[1]}\n`)
        }
    }
}
```

Test:

```bash
# With the current empty functions.ts, should print nothing
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected: no output, exit 0
```

**Step 2: Implement `functionsInsert`**

The empty functions template. This is written as a string literal to guarantee format match with `create-client.sh`:

```ts
const FUNCTIONS_EMPTY_TEMPLATE = `import { type InngestFunction } from "inngest"

// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the \`functions\` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions: InngestFunction.Like[] = []

export { functions }
`
```

Implement insert:

```ts
function functionsInsert(file: string, path: string, client: string): void {
    const camel = toCamelCase(path)
    const importPath = `@/inngest/${client}/functions/${path}`
    const source = loadFile(file)

    // Check if import already exists
    const existing = source.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === importPath,
    )
    if (existing) {
        die(`Function '${path}' already exists in ${file}`)
    }

    // Find the functions variable
    const functionsVar = source.getVariableDeclaration("functions")
    if (!functionsVar) {
        die(`No 'functions' variable found in ${file}`)
    }

    // Check if array is empty (fresh file)
    const initializer = functionsVar.getInitializer()
    const isEmptyArray =
        initializer && initializer.getText().replace(/\s/g, "") === "[]"

    if (isEmptyArray) {
        // Rewrite the entire file: first function replaces empty template
        const content = `import ${camel} from "${importPath}"

// # Marker: Function List
//
// New function imports are inserted above this marker.
// Function entries are added to the \`functions\` array below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-function.sh for details and usage.

const functions = [${camel}]

export { functions }
`
        source.replaceWithText(content)
    } else {
        // Add import at top of file
        source.addImportDeclaration({
            defaultImport: camel,
            moduleSpecifier: importPath,
        })

        // Add element to the array
        const arrayText = initializer!.getText()
        // Parse out existing entries, append new one
        const inner = arrayText.slice(1, -1).trim()
        const entries = inner
            ? inner.split(",").map((e) => e.trim()).filter(Boolean)
            : []
        entries.push(camel)
        functionsVar.setInitializer(`[${entries.join(", ")}]`)
    }

    source.saveSync()
}
```

Test:

```bash
# Insert first function
bun scripts/utils/manage-inngest-registries.ts functions insert \
    --file src/inngest/core/functions.ts --path sync/process-batch --client core

# Verify file content
cat src/inngest/core/functions.ts
# Expected: import + array with syncProcessBatch

# Verify list works
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected: sync/process-batch

# Insert second function
bun scripts/utils/manage-inngest-registries.ts functions insert \
    --file src/inngest/core/functions.ts --path notifications/send-email --client core

# Verify both listed
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected:
# sync/process-batch
# notifications/send-email
```

**Step 3: Implement `functionsRemove`**

```ts
function functionsRemove(file: string, path: string): void {
    const camel = toCamelCase(path)
    const source = loadFile(file)

    // Find and remove the import
    const imp = source.getImportDeclaration(
        (d) => d.getModuleSpecifierValue().match(/^@\/inngest\/[^/]+\/functions\//) !== null
            && d.getModuleSpecifierValue().endsWith(`/${path}`),
    )
    if (!imp) {
        die(`Function '${path}' not found in ${file}`)
    }
    imp.remove()

    // Find the functions variable and remove the entry
    const functionsVar = source.getVariableDeclaration("functions")
    if (!functionsVar) {
        die(`No 'functions' variable found in ${file}`)
    }

    const initializer = functionsVar.getInitializer()
    if (!initializer) {
        die(`No initializer for 'functions' in ${file}`)
    }

    const arrayText = initializer.getText()
    const inner = arrayText.slice(1, -1).trim()
    const entries = inner
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e !== "" && e !== camel)

    if (entries.length === 0) {
        // Reset to empty template
        source.replaceWithText(FUNCTIONS_EMPTY_TEMPLATE)
    } else {
        functionsVar.setInitializer(`[${entries.join(", ")}]`)
    }

    source.saveSync()
}
```

Test round-trip:

```bash
# Remove first function
bun scripts/utils/manage-inngest-registries.ts functions remove \
    --file src/inngest/core/functions.ts --path sync/process-batch

# Verify only send-email remains
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected: notifications/send-email

# Remove last function
bun scripts/utils/manage-inngest-registries.ts functions remove \
    --file src/inngest/core/functions.ts --path notifications/send-email

# Verify file is reset to empty template
cat src/inngest/core/functions.ts
# Expected: matches empty template exactly (InngestFunction.Like[] annotation)

# Verify list is empty
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts
# Expected: no output
```

**Step 4: Run checks and commit**

```bash
bun run checks
git add scripts/utils/manage-inngest-registries.ts
git commit -m "feat: implement functions list/insert/remove in manage-inngest-registries"
```

---

### Task 3: Migrate function shell scripts to use AST utility

**Files:**
- Modify: `scripts/app/inngest/create-client-function.sh`
- Modify: `scripts/app/inngest/remove-client-function.sh`

**Step 1: Modify `create-client-function.sh`**

Remove these functions:
- `require_pattern` (no longer needed)
- `id_to_camel` (moved to TS utility)
- `is_fresh_functions_file` (TS utility handles both cases)
- `write_first_function_barrel` (replaced by TS utility)
- `insert_function` (replaced by TS utility)

In `main()`, replace lines 437-451 (the camel conversion, fresh check, and barrel write) with:

```bash
    if ! output=$(bun scripts/utils/manage-inngest-registries.ts functions insert \
        --file "$functions_file" --path "$FN_PATH" --client "$CLIENT_ID" 2>&1); then
        die "$output"
    fi
    log_pass "Updated $functions_file"
```

Keep everything else: `discover_clients`, `validate_fn_path`, `validate_events_exist`, `build_trigger`, `write_function_ts`, `fmt`, all logging/flags/signals, and `main()`'s flow.

**Step 2: Modify `remove-client-function.sh`**

Remove these functions:
- `require_pattern`
- `id_to_camel`
- `discover_functions` (replaced by TS list)
- `remove_function_entry` (replaced by TS remove)
- `has_remaining_functions` (TS utility handles reset internally)
- `reset_functions_file` (TS utility handles reset internally)

Replace `discover_functions` call in `main()`:

```bash
    # Before:
    mapfile -t fns < <(discover_functions "$functions_file")

    # After:
    mapfile -t fns < <(bun scripts/utils/manage-inngest-registries.ts functions list \
        --file "$functions_file")
```

Replace `remove_function_entry` + `has_remaining_functions` + `reset_functions_file` calls in `main()`:

```bash
    # Before:
    remove_function_entry "$functions_file" "$FN_PATH" "$camel"
    if has_remaining_functions "$functions_file"; then
        log_pass "Updated $functions_file"
    else
        reset_functions_file "$functions_file"
        log_pass "Reset $functions_file (no functions remaining)"
    fi

    # After:
    if ! output=$(bun scripts/utils/manage-inngest-registries.ts functions remove \
        --file "$functions_file" --path "$FN_PATH" 2>&1); then
        die "$output"
    fi
    log_pass "Updated $functions_file"
```

Also remove the `camel` variable and its `id_to_camel` call since the TS utility handles naming.

**Step 3: Test round-trip**

```bash
# Create two functions
./scripts/app/inngest/create-client-function.sh \
    --client core --path sync/process-batch --cron "0 */6 * * *"

./scripts/app/inngest/create-client-function.sh \
    --client core --path notifications/send-email --cron "0 0 * * *"

# Verify functions.ts
cat src/inngest/core/functions.ts

# Run biome to reformat (this is the case that broke awk)
bunx biome check --write --unsafe src/inngest/core/functions.ts

# Verify list still works after biome
bun scripts/utils/manage-inngest-registries.ts functions list \
    --file src/inngest/core/functions.ts

# Remove first function
./scripts/app/inngest/remove-client-function.sh \
    --client core --path sync/process-batch --confirm y

# Verify only send-email remains
cat src/inngest/core/functions.ts

# Remove last function
./scripts/app/inngest/remove-client-function.sh \
    --client core --path notifications/send-email --confirm y

# Verify empty template
cat src/inngest/core/functions.ts

# Run checks
bun run checks
```

**Step 4: Clean up and commit**

```bash
git checkout src/inngest/core/functions.ts
rm -rf src/inngest/core/functions/
git add scripts/app/inngest/create-client-function.sh scripts/app/inngest/remove-client-function.sh
git commit -m "refactor: migrate function scripts from awk to AST utility"
```

---

### Task 4: Implement events operations (list, insert, remove)

**Files:**
- Modify: `scripts/utils/manage-inngest-registries.ts`

**Reference:** Read `src/inngest/core/events.ts` for the empty template. Read `src/lib/inngest.ts` for `createEvent` signature and types. Read `create-client-event.sh` lines 250-310 and `remove-client-event.sh` lines 262-321 for the current behavior.

**Step 1: Implement `eventsList`**

```ts
function eventsList(file: string): void {
    const source = loadFile(file)

    // Find all variable declarations whose initializer calls createEvent()
    for (const decl of source.getVariableDeclarations()) {
        const init = decl.getInitializer()
        if (!init) continue
        const text = init.getText()
        // Match: createEvent("some/event-id", ...)
        const match = text.match(/^createEvent\(\s*"([^"]+)"/)
        if (match) {
            process.stdout.write(`${match[1]}\n`)
        }
    }
}
```

Test:

```bash
# Empty events file, should print nothing
bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
# Expected: no output, exit 0
```

**Step 2: Implement `eventsInsert`**

Add the events empty template constant:

```ts
const EVENTS_EMPTY_TEMPLATE = `import { type EventRecord } from "@/lib/inngest"

// # Marker: Event Map
//
// New event schemas are inserted above this marker.
// Event map entries are added to the \`events\` object below.
//
// ## Reference
//
// See scripts/app/inngest/create-client-event.sh for details and usage.

const events = {} as const satisfies EventRecord

export { events }
`
```

Implement insert:

```ts
function eventsInsert(file: string, id: string): void {
    const pascal = toPascalCase(id)
    const source = loadFile(file)

    // Check for duplicate
    const existing = source.getVariableDeclaration(`${pascal}Schema`)
    if (existing) {
        die(`Event '${id}' already exists in ${file}`)
    }

    // Find the events variable declaration
    const eventsVar = source.getVariableDeclaration("events")
    if (!eventsVar) {
        die(`No 'events' variable found in ${file}`)
    }
    const eventsStatement = eventsVar.getVariableStatement()
    if (!eventsStatement) {
        die(`No 'events' statement found in ${file}`)
    }

    // Ensure imports exist
    const hasCreateEvent = source.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === "@/lib/inngest",
    )
    if (!hasCreateEvent) {
        source.addImportDeclaration({
            namedImports: [
                { name: "createEvent" },
                { name: "EventRecord", isTypeOnly: true },
                { name: "InferEventPayload", isTypeOnly: true },
            ],
            moduleSpecifier: "@/lib/inngest",
        })
    } else {
        // Ensure createEvent and InferEventPayload are imported
        const namedImports = hasCreateEvent.getNamedImports()
        const names = namedImports.map((n) => n.getName())
        if (!names.includes("createEvent")) {
            hasCreateEvent.addNamedImport("createEvent")
        }
        if (!names.includes("InferEventPayload")) {
            hasCreateEvent.addNamedImport({ name: "InferEventPayload", isTypeOnly: true })
        }
    }

    // Ensure zod import exists
    const hasZod = source.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === "zod",
    )
    if (!hasZod) {
        source.addImportDeclaration({
            namedImports: ["z"],
            moduleSpecifier: "zod",
        })
    }

    // Insert schema const + type alias before the events variable
    const insertIndex = eventsStatement.getChildIndex()
    source.insertStatements(insertIndex, [
        `const ${pascal}Schema = createEvent("${id}", z.object({}))`,
        `type ${pascal} = InferEventPayload<typeof ${pascal}Schema>`,
    ])

    // Add property to events object: [PascalSchema.name]: PascalSchema.data
    const initializer = eventsVar.getInitializer()
    if (!initializer) {
        die(`No initializer for 'events' in ${file}`)
    }
    const objText = initializer.getText()
    // Parse as object literal, add new property
    const propEntry = `[${pascal}Schema.name]: ${pascal}Schema.data`
    if (objText.match(/\{\s*\}/)) {
        // Empty object — replace with single property
        eventsVar.setInitializer(`{ ${propEntry} } as const satisfies EventRecord`)
    } else {
        // Has properties — add to end
        const inner = objText.replace(/\}\s*as const satisfies EventRecord$/, "").replace(/^\{/, "").trim()
        eventsVar.setInitializer(`{ ${inner}, ${propEntry} } as const satisfies EventRecord`)
    }

    // Add or update type export
    const typeExport = source.getExportDeclaration(
        (d) => d.isTypeOnly(),
    )
    if (typeExport) {
        typeExport.addNamedExport(pascal)
    } else {
        source.addExportDeclaration({
            isTypeOnly: true,
            namedExports: [pascal],
        })
    }

    source.saveSync()
}
```

Test:

```bash
# Insert first event
bun scripts/utils/manage-inngest-registries.ts events insert \
    --file src/inngest/core/events.ts --id app/user-created

# Verify
cat src/inngest/core/events.ts
bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
# Expected: app/user-created

# Insert second event
bun scripts/utils/manage-inngest-registries.ts events insert \
    --file src/inngest/core/events.ts --id app/order-placed

bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
# Expected:
# app/user-created
# app/order-placed
```

**Step 3: Implement `eventsRemove`**

```ts
function eventsRemove(file: string, id: string): void {
    const pascal = toPascalCase(id)
    const source = loadFile(file)

    // Remove schema variable
    const schemaVar = source.getVariableDeclaration(`${pascal}Schema`)
    if (!schemaVar) {
        die(`Event '${id}' not found in ${file}`)
    }
    const schemaStatement = schemaVar.getVariableStatement()
    schemaStatement?.remove()

    // Remove type alias
    const typeAlias = source.getTypeAlias(pascal)
    typeAlias?.remove()

    // Remove property from events object
    const eventsVar = source.getVariableDeclaration("events")
    if (!eventsVar) {
        die(`No 'events' variable found in ${file}`)
    }

    const initializer = eventsVar.getInitializer()
    if (initializer) {
        const objText = initializer.getText()
        // Remove the property entry for this event
        const propPattern = new RegExp(
            `\\[${pascal}Schema\\.name\\]:\\s*${pascal}Schema\\.data,?\\s*`,
        )
        const cleaned = objText.replace(propPattern, "").replace(/,(\s*\})/, "$1")
        eventsVar.setInitializer(cleaned)
    }

    // Remove from type export
    const typeExport = source.getExportDeclaration((d) => d.isTypeOnly())
    if (typeExport) {
        const namedExport = typeExport.getNamedExports().find(
            (e) => e.getName() === pascal,
        )
        if (namedExport) {
            namedExport.remove()
        }
        // If type export is empty, remove it
        if (typeExport.getNamedExports().length === 0) {
            typeExport.remove()
        }
    }

    // Check if any events remain
    const remaining = source.getVariableDeclarations().filter((d) => {
        const init = d.getInitializer()
        return init && /^createEvent\(/.test(init.getText())
    })

    if (remaining.length === 0) {
        source.replaceWithText(EVENTS_EMPTY_TEMPLATE)
    }

    source.saveSync()
}
```

Test round-trip:

```bash
# Remove first event
bun scripts/utils/manage-inngest-registries.ts events remove \
    --file src/inngest/core/events.ts --id app/user-created

bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
# Expected: app/order-placed

# Remove last event
bun scripts/utils/manage-inngest-registries.ts events remove \
    --file src/inngest/core/events.ts --id app/order-placed

cat src/inngest/core/events.ts
# Expected: matches empty template exactly

bun run checks
```

**Step 4: Clean up and commit**

```bash
git checkout src/inngest/core/events.ts
git add scripts/utils/manage-inngest-registries.ts
git commit -m "feat: implement events list/insert/remove in manage-inngest-registries"
```

---

### Task 5: Migrate event shell scripts to use AST utility

**Files:**
- Modify: `scripts/app/inngest/create-client-event.sh`
- Modify: `scripts/app/inngest/remove-client-event.sh`

**Step 1: Modify `create-client-event.sh`**

Remove these functions:
- `require_pattern`
- `id_to_pascal`
- `is_fresh_events_file`
- `write_first_event`
- `insert_event`

In `main()`, replace lines 342-355 (the pascal conversion, fresh check, and event write) with:

```bash
    if ! output=$(bun scripts/utils/manage-inngest-registries.ts events insert \
        --file "$events_file" --id "$EVENT_ID" 2>&1); then
        die "$output"
    fi
    log_pass "Updated $events_file"
```

Also replace the duplicate check (line 338) — the TS utility handles this via exit code.

Keep: `discover_clients`, `validate_event_id`, `ensure_dep`, `fmt`, all logging/flags/signals, and `main()`'s flow.

**Step 2: Modify `remove-client-event.sh`**

Remove these functions:
- `require_pattern`
- `id_to_pascal`
- `discover_events`
- `remove_event_block`
- `has_remaining_events`
- `reset_events_file`

Replace `discover_events` call:

```bash
    mapfile -t events < <(bun scripts/utils/manage-inngest-registries.ts events list \
        --file "$events_file")
```

Replace `remove_event_block` + `has_remaining_events` + `reset_events_file`:

```bash
    if ! output=$(bun scripts/utils/manage-inngest-registries.ts events remove \
        --file "$events_file" --id "$EVENT_ID" 2>&1); then
        die "$output"
    fi
    log_pass "Updated $events_file"
```

Remove the `pascal` variable and `id_to_pascal` call. Remove the grep-based existence check on line 357 — the TS utility verifies this.

**Step 3: Test round-trip**

```bash
# Create an event
./scripts/app/inngest/create-client-event.sh --client core --id app/user-created

# Verify
cat src/inngest/core/events.ts

# Create a second event
./scripts/app/inngest/create-client-event.sh --client core --id app/order-placed

# Run biome to reformat
bunx biome check --write --unsafe src/inngest/core/events.ts

# Verify list still works after biome
bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts

# Remove first event
./scripts/app/inngest/remove-client-event.sh --client core --id app/user-created

# Verify
cat src/inngest/core/events.ts

# Remove last event
./scripts/app/inngest/remove-client-event.sh --client core --id app/order-placed

# Verify empty template
cat src/inngest/core/events.ts

bun run checks
```

**Step 4: Clean up and commit**

```bash
git checkout src/inngest/core/events.ts
git add scripts/app/inngest/create-client-event.sh scripts/app/inngest/remove-client-event.sh
git commit -m "refactor: migrate event scripts from awk to AST utility"
```

---

### Task 6: Final integration test

**Step 1: Full cross-type round-trip**

```bash
# Create an event
./scripts/app/inngest/create-client-event.sh --client core --id app/batch-ready

# Create a function that references it
./scripts/app/inngest/create-client-function.sh \
    --client core --path sync/process-batch --events "app/batch-ready"

# Create a cron-only function
./scripts/app/inngest/create-client-function.sh \
    --client core --path health/check --cron "*/5 * * * *"

# Verify all files
cat src/inngest/core/events.ts
cat src/inngest/core/functions.ts
cat src/inngest/core/functions/sync/process-batch.ts
cat src/inngest/core/functions/health/check.ts

# Run biome (the formatter that used to break everything)
bunx biome check --write --unsafe src/inngest/core/events.ts src/inngest/core/functions.ts

# Verify list operations still work after biome
bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
bun scripts/utils/manage-inngest-registries.ts functions list --file src/inngest/core/functions.ts

# Run checks
bun run checks

# Remove function
./scripts/app/inngest/remove-client-function.sh \
    --client core --path sync/process-batch --confirm y

# Remove other function
./scripts/app/inngest/remove-client-function.sh \
    --client core --path health/check --confirm y

# Remove event
./scripts/app/inngest/remove-client-event.sh --client core --id app/batch-ready

# Verify clean state
cat src/inngest/core/events.ts
cat src/inngest/core/functions.ts

# Final checks
bun run checks
```

**Step 2: Clean up test artifacts**

```bash
git checkout src/inngest/core/events.ts src/inngest/core/functions.ts
rm -rf src/inngest/core/functions/
```
