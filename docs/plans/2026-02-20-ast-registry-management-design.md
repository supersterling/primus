# AST-Based Inngest Registry Management

## Summary

Replace awk-based marker manipulation in all 4 inngest scripts with a single ts-morph utility (`scripts/utils/manage-inngest-registries.ts`). Shell scripts keep flow/prompts/logging; the TS utility handles all AST reads and writes.

## Problem

The current awk approach relies on positional markers (`// -- id --`, `// # Marker: ...`) and exact line matching. Biome's import sorting separates imports from their markers, breaking removal. Any formatter or IDE refactoring can corrupt the fragile regex patterns.

## Architecture

```
Shell script (flow, prompts, logging, validation)
    |
    v
bun scripts/utils/manage-inngest-registries.ts <type> <action> [flags]
    |
    v
ts-morph AST parse → manipulate → write file
```

- **Shell** owns: user interaction, client discovery, path/event validation, biome formatting, directory management, git
- **TS utility** owns: reading the file, finding/inserting/removing AST nodes, writing the file, resetting to empty templates
- **Contract**: exit 0 on success, non-zero on failure, errors to stderr, `list` outputs to stdout

## CLI Interface

```
bun scripts/utils/manage-inngest-registries.ts <type> <action> [flags]

Types: functions, events
Actions: insert, remove, list
```

### Functions

```bash
# Insert import + array entry
bun scripts/utils/manage-inngest-registries.ts functions insert \
    --file src/inngest/core/functions.ts \
    --path sync/process-batch \
    --client core

# Remove import + array entry (resets to empty template if last)
bun scripts/utils/manage-inngest-registries.ts functions remove \
    --file src/inngest/core/functions.ts \
    --path sync/process-batch

# List function paths to stdout
bun scripts/utils/manage-inngest-registries.ts functions list \
    --file src/inngest/core/functions.ts
```

### Events

```bash
# Insert schema + type + map entry + type export
bun scripts/utils/manage-inngest-registries.ts events insert \
    --file src/inngest/core/events.ts \
    --id app/user-created

# Remove schema + type + map entry + type export (resets if last)
bun scripts/utils/manage-inngest-registries.ts events remove \
    --file src/inngest/core/events.ts \
    --id app/user-created

# List event IDs to stdout
bun scripts/utils/manage-inngest-registries.ts events list \
    --file src/inngest/core/events.ts
```

## AST Operations

### Discovery (list)

- **Functions**: Find import declarations with module specifier matching `@/inngest/*/functions/*`. Extract path suffix.
- **Events**: Find variable declarations whose initializer calls `createEvent(...)`. Extract first argument string.

No markers needed. The AST is the source of truth.

### Functions Insert

1. Parse file with ts-morph
2. Add import: `import {camel} from "@/inngest/{client}/functions/{path}"`
3. Find `functions` variable, append `{camel}` to its array initializer
4. Save

### Functions Remove

1. Parse file
2. Remove import matching module specifier `@/inngest/*/functions/{path}`
3. Remove `{camel}` from the `functions` array
4. If array empty, reset to empty template (with `InngestFunction.Like[]` annotation)
5. Save

### Events Insert

1. Parse file
2. Ensure `z` import from `"zod"` exists
3. Add `const {Pascal}Schema = createEvent("{id}", z.object({}))` before the events variable
4. Add `type {Pascal} = InferEventPayload<typeof {Pascal}Schema>` after the const
5. Add `[{Pascal}Schema.name]: {Pascal}Schema.data` to the events object
6. Add `{Pascal}` to the type export
7. Save

### Events Remove

1. Parse file
2. Remove `{Pascal}Schema` variable declaration and its `{Pascal}` type alias
3. Remove property from events object
4. Remove `{Pascal}` from type export
5. If no events remain, reset to empty template
6. Save

## Empty Templates

Written as string literals (not AST-constructed). Guarantees exact format match with `create-client.sh` output.

### Functions empty template

```ts
import { type InngestFunction } from "inngest"

// # Marker: Function List
//
// ...reference comment...

const functions: InngestFunction.Like[] = []

export { functions }
```

### Events empty template

```ts
import { type EventRecord } from "@/lib/inngest"

// # Marker: Event Map
//
// ...reference comment...

const events = {} as const satisfies EventRecord

export { events }
```

Note: The `// # Marker` comments remain in empty templates for human readability and as reference to the scripts. They are NOT used for AST operations.

## Naming Conventions

Handled inside the TS utility:

| Input | Derived |
|-------|---------|
| Function path `sync/process-batch` | Import name: `syncProcessBatch` (camelCase) |
| Event ID `app/user-created` | Schema name: `AppUserCreatedSchema` (PascalCase) |

## Shell Script Changes

All 4 scripts replace awk calls with `bun` calls. Helpers removed: `require_pattern`, `insert_event`, `insert_function`, `remove_event_block`, `remove_function_entry`, `is_fresh_*`, `has_remaining_*`, `reset_*_file`, `discover_events`, `discover_functions`, `id_to_pascal`, `id_to_camel`.

Helpers retained: logging, flags, signals, `discover_clients`, `validate_*`, `ask_user_*`, `fmt`, `prune_empty_parents`.

## Error Handling

- Exit 0: success
- Exit 1: error (file not found, parse failure, item not found, item already exists)
- Errors to stderr, captured by shell via `2>&1`

## Dependencies

- `ts-morph` (dev dependency)
