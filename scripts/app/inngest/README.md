# scripts/app/inngest

Inngest client management scripts. Each script handles one operation (create or remove) on one resource type (client, event, function, or endpoint). All scripts auto-discover clients in `src/inngest/*/` and support both interactive and non-interactive usage via CLI flags.

## Client

### [create-client.sh](create-client.sh)

Create a new Inngest client directory with `client.ts`, `events.ts`, `functions.ts`, and an API route. Realtime middleware and `endpointAdapter` are always enabled — no prompts or flags needed.

```bash
./scripts/app/inngest/create-client.sh --id core
./scripts/app/inngest/create-client.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--id` | Client ID (kebab-case, e.g. `core`) |

Registry mutations (imports, array entries, object properties) are handled by the [manage-inngest-registries.ts](../../utils/manage-inngest-registries.ts) AST utility. Shell scripts own the workflow: prompts, validation, file creation, and formatting.

## Events

### [create-client-event.sh](create-client-event.sh)

Add an event schema to a client's `events.ts`. Validates the event ID format via [validate_event_id](create-client-event.sh#validate_event_id), ensures [zod is installed](create-client-event.sh#ensure_dep), then delegates to [eventsInsert](../../utils/manage-inngest-registries.ts#eventsInsert) which adds the schema variable, type alias, events object property, and type export.

```bash
./scripts/app/inngest/create-client-event.sh --client core --id app/user-created
./scripts/app/inngest/create-client-event.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID (kebab-case, e.g. `core`) |
| `--id` | Event ID (slash-delimited kebab-case, e.g. `app/user-created`) |

### [remove-client-event.sh](remove-client-event.sh)

Remove an event schema from a client's `events.ts`. Lists existing events via [eventsList](../../utils/manage-inngest-registries.ts#eventsList), prompts for confirmation via [ask_user_via_confirm](remove-client-event.sh#ask_user_via_confirm), then delegates to [eventsRemove](../../utils/manage-inngest-registries.ts#eventsRemove). Resets to the empty template when the last event is removed.

```bash
./scripts/app/inngest/remove-client-event.sh --client core --id app/user-created --confirm y
./scripts/app/inngest/remove-client-event.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID |
| `--id` | Event ID to remove |
| `--confirm` | Skip confirmation prompt (`y` or `n`) |

## Functions

### [create-client-function.sh](create-client-function.sh)

Add a function to a client. Validates the function path via [validate_fn_path](create-client-function.sh#validate_fn_path), optionally [validates referenced events exist](create-client-function.sh#validate_events_exist), [builds the trigger](create-client-function.sh#build_trigger) from event IDs or a cron expression, [writes the function file](create-client-function.sh#write_function_ts) from a template, then delegates to [functionsInsert](../../utils/manage-inngest-registries.ts#functionsInsert) to register the import and array entry.

```bash
./scripts/app/inngest/create-client-function.sh --client core --path sync/process-batch --trigger app/user-created
./scripts/app/inngest/create-client-function.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID |
| `--path` | Function path (slash-delimited kebab-case, e.g. `sync/process-batch`) |
| `--trigger` | Event ID(s) or cron expression for the trigger |

### [remove-client-function.sh](remove-client-function.sh)

Remove a function from a client. Lists existing functions via [functionsList](../../utils/manage-inngest-registries.ts#functionsList), prompts for confirmation, delegates to [functionsRemove](../../utils/manage-inngest-registries.ts#functionsRemove), then [prunes empty parent directories](remove-client-function.sh#prune_empty_parents). Resets to the empty template when the last function is removed.

```bash
./scripts/app/inngest/remove-client-function.sh --client core --path sync/process-batch --confirm y
./scripts/app/inngest/remove-client-function.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID |
| `--path` | Function path to remove |
| `--confirm` | Skip confirmation prompt (`y` or `n`) |

## Endpoints

### [create-client-endpoint.sh](create-client-endpoint.sh)

Create a durable endpoint route for a client. Validates the route path format, checks `src/app/api/<path>/route.ts` doesn't already exist, then [writes the route file](create-client-endpoint.sh#write_endpoint_route_ts) with an `inngest.endpoint()` wrapper. Only `GET` is supported (durable endpoints don't support POST body yet).

```bash
./scripts/app/inngest/create-client-endpoint.sh --client core --path webhooks/stripe
./scripts/app/inngest/create-client-endpoint.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID (kebab-case, e.g. `core`) |
| `--path` | Route path (slash-delimited kebab-case, e.g. `webhooks/stripe`) |

### [remove-client-endpoint.sh](remove-client-endpoint.sh)

Remove a durable endpoint route from a client. Discovers existing endpoints by scanning `src/app/api/` for `route.ts` files importing the client, prompts for confirmation via [ask_user_via_confirm](remove-client-endpoint.sh#ask_user_via_confirm), deletes the route file, then [prunes empty parent directories](remove-client-endpoint.sh#prune_empty_parents).

```bash
./scripts/app/inngest/remove-client-endpoint.sh --client core --path webhooks/stripe --confirm y
./scripts/app/inngest/remove-client-endpoint.sh  # interactive
```

| Flag | Description |
| ---- | ----------- |
| `--client` | Client ID |
| `--path` | Route path to remove |
| `--confirm` | Skip confirmation prompt (`y` or `n`) |

## AST Utility

All four scripts delegate registry mutations to [manage-inngest-registries.ts](../../utils/manage-inngest-registries.ts), a ts-morph AST utility that reads and writes `events.ts` and `functions.ts` files structurally. No marker comments — the AST finds imports by module specifier patterns, functions by array variable name, and events by [createEvent](lib:inngest.ts#createEvent) call sites.

| Operation | What it does |
| --------- | ------------ |
| [functionsList](../../utils/manage-inngest-registries.ts#functionsList) | Print registered function paths to stdout |
| [functionsInsert](../../utils/manage-inngest-registries.ts#functionsInsert) | Add import + array entry, or reset from [empty template](../../utils/manage-inngest-registries.ts#FUNCTIONS_EMPTY_TEMPLATE) |
| [functionsRemove](../../utils/manage-inngest-registries.ts#functionsRemove) | Remove import + array entry, reset if last |
| [eventsList](../../utils/manage-inngest-registries.ts#eventsList) | Print registered event IDs to stdout |
| [eventsInsert](../../utils/manage-inngest-registries.ts#eventsInsert) | Add schema, type, property, and type export |
| [eventsRemove](../../utils/manage-inngest-registries.ts#eventsRemove) | Remove all traces of an event, reset if last |

```bash
bun scripts/utils/manage-inngest-registries.ts events list --file src/inngest/core/events.ts
bun scripts/utils/manage-inngest-registries.ts functions insert --file src/inngest/core/functions.ts --path send-welcome --client core
```

## Type System

Events are defined using [createEvent](lib:inngest.ts#createEvent) which pairs a const-narrowed name with a Zod data schema into a frozen [Event](lib:inngest.ts#Event) object. These are collected into an [EventRecord](lib:inngest.ts#EventRecord) and passed to `EventSchemas.fromSchema()` for end-to-end type safety across triggers and sends.
