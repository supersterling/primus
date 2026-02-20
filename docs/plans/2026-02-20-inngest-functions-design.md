# Inngest Function Management Scripts

## Summary

Add `create-client-function.sh` and `remove-client-function.sh` scripts alongside the existing event scripts, plus a `functions.ts` barrel per client that auto-populates when functions are created/removed. Update `create-client.sh` to generate `functions.ts` and fix `route.ts` to import from `functions` instead of `registry`.

## Function File Structure

Each function file exports a const `id` (with `as const`) and a default-exported inngest function:

```ts
// src/inngest/<client>/functions/<path>.ts
import { inngest } from "@/inngest/<client>/client"

export const id = "<path>" as const

export default inngest.createFunction(
    { id },
    [{ event: "<event-id>" }, { cron: "<expression>" }],
    async ({ event, step }) => {
        // TODO: implement
    },
)
```

- Path is relative to `functions/`, kebab-case each segment (e.g. `sync/process-batch`)
- ID equals the path
- Trigger is an array of event triggers and/or cron specs (mixed triggers supported)
- Single trigger uses object form, multiple uses array form

## Functions Barrel (`functions.ts`)

Lives at `src/inngest/<client>/functions.ts`. Uses the same marker pattern as `events.ts`.

### Empty template

```ts
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
```

### With functions

```ts
// -- sync/process-batch --
import syncProcessBatch from "@/inngest/<client>/functions/sync/process-batch"

// -- notifications/send-email --
import notificationsSendEmail from "@/inngest/<client>/functions/notifications/send-email"

// # Marker: Function List
//
// ...

const functions = [
    syncProcessBatch,
    notificationsSendEmail,
]

export { functions }
```

- No type annotation on the array — TypeScript infers the concrete types
- Import names derived from path via camelCase conversion (`sync/process-batch` → `syncProcessBatch`)
- Item markers: `// -- <path> --`
- Section marker: `// # Marker: Function List`

## Scripts

### `create-client-function.sh`

Flags: `--client`, `--path`, `--events`, `--cron`

- `--client`: Client ID (auto-selected if only one client exists)
- `--path`: Relative to `functions/`, kebab-case each segment, validated
- `--events`: Space-separated event IDs (slash-delimited kebab-case)
- `--cron`: Cron expression
- Must provide at least one of `--events` or `--cron`

Actions:
1. Validate path format (kebab-case per segment)
2. Create function file at `src/inngest/<client>/functions/<path>.ts`
3. Insert import + array entry into `functions.ts` using marker pattern
4. Format generated files with biome

### `remove-client-function.sh`

Flags: `--client`, `--path`

- Discovers functions from `// -- <path> --` markers in `functions.ts`
- Interactive selection if multiple functions exist

Actions:
1. Remove the function file
2. Remove import line and array entry from `functions.ts`
3. If no functions remain, reset `functions.ts` to empty template
4. Prune empty parent directories in `functions/`
5. Format with biome

## Changes to Existing Files

### `create-client.sh`

- Generate `functions.ts` (empty template) alongside `client.ts` and `events.ts`
- Update `route.ts` template to import from `./functions` instead of `./registry`

### `src/app/api/inngest/core/route.ts`

- One-time fix: import from `@/inngest/core/functions` instead of `@/inngest/core/registry`

## Type Layer

No custom types in `src/lib/inngest.ts`. The Inngest SDK preserves handler/event types through `createFunction()` generics. Function IDs are not preserved as literals by the SDK, so each function file exports `const id = "..." as const` for easy access.

## Naming Conventions

| Input | Derived |
|-------|---------|
| Path `sync/process-batch` | ID: `sync/process-batch` |
| Path `sync/process-batch` | Import name: `syncProcessBatch` (camelCase) |
| Path `sync/process-batch` | File: `src/inngest/<client>/functions/sync/process-batch.ts` |
