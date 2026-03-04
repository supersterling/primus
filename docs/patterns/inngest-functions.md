# Inngest Function Patterns

Patterns for writing durable Inngest functions. This document covers the execution model, step patterns, error handling, flow control, and the design principles that make functions replay-safe and composable.

Primus uses Inngest v4 (`inngest@^4.0.0-beta.2`). All examples use v4 syntax.

---

## Durable Execution Model

The single most important concept. Get this wrong and everything else falls apart.

**The function handler re-executes from the top on every invocation.** Completed steps return their cached result; the function continues until it hits an uncached step, executes it, persists the result, and halts. The next invocation replays all cached steps and runs the next uncached one.

Each `step.*()` call is a **separate network request** to and from Inngest's infrastructure -- not a memoized computation on the same process. Your function may execute across different servers, different deploys, different points in time.

### What this means in practice

```
BAD -- code outside steps runs multiple times:

async ({ event, step, logger }) => {
    const now = Date.now()              // different value on every invocation
    logger.info("starting")             // logs once per invocation, not once total

    const user = await step.run("get-user", () => db.users.findOne(event.data.userId))
    const order = await step.run("create-order", () => db.orders.create({ userId: user.id }))
}


GOOD -- all non-deterministic logic inside steps:

async ({ event, step, logger }) => {
    const user = await step.run("get-user", () => {
        logger.info({ userId: event.data.userId }, "fetching user")
        return db.users.findOne(event.data.userId)
    })

    const order = await step.run("create-order", () => {
        logger.info({ userId: user.id }, "creating order")
        return db.orders.create({ userId: user.id })
    })
}
```

### Rules

- **All non-deterministic logic must be inside `step.run()`.** DB calls, API calls, `Date.now()`, `crypto.randomUUID()`, `Math.random()`.
- **Step IDs are memoization keys.** They must be unique within a function and stable across deploys. Renaming a step ID invalidates its cached result.
- **Step return values are JSON-serialized.** `Date` objects become ISO strings. Non-serializable objects (functions, circular references) break silently. Plan your data shapes accordingly.
- **Log inside steps, not between them.** Logs outside steps execute on every invocation.

### Memory and size limits

| Constraint | Limit |
|---|---|
| Total step output per function run | 4 MB |
| Max steps per function | 1,000 |
| Event payload size | 512 KB |
| Batch payload size | 10 MiB |
| Max sleep duration | 1 year (7 days on free tier) |

---

## Function Anatomy

The full pipeline: define an event type, create a function, register it, serve it.

### 1. Define the event type

```tsx
// src/inngest/core/events.ts
import { eventType } from "inngest"
import { z } from "zod"

export const orderCreated = eventType("app/order.created", {
    schema: z.object({
        orderId: z.string(),
        userId: z.string(),
        items: z.array(z.object({
            productId: z.string(),
            quantity: z.number(),
        })),
    }),
})
```

### 2. Create the function

```tsx
// src/inngest/core/functions/process-order.ts
import { inngest } from "@/inngest/core/client"
import { orderCreated } from "@/inngest/core/events"

export default inngest.createFunction(
    { id: "process-order", triggers: [orderCreated] },
    async ({ event, step, logger }) => {
        // event.data is typed from the Zod schema
        const { orderId, userId, items } = event.data
        // ...
    },
)
```

### 3. Register in the function array

```tsx
// src/inngest/core/functions.ts
import processOrder from "@/inngest/core/functions/process-order"

const functions = [processOrder]
export { functions }
```

### 4. Serve at the API route

```tsx
// src/app/api/inngest/core/route.ts
import { serve } from "inngest/next"
import { inngest } from "@/inngest/core/client"
import { functions } from "@/inngest/core/functions"

export const { GET, POST, PUT } = serve({ client: inngest, functions })
```

### Reference

- [`Event types`](inngest:core/events.ts#appHelloWorld) -- event type definitions
- [`Inngest client`](inngest:core/client.ts#inngest) -- client configuration
- [`Function registry`](inngest:core/functions.ts#functions) -- function registration array

---

## Designing for Idempotency and Composability

The most important design principle for Inngest functions: **inject identity, don't generate it.**

All IDs, references, and deterministic inputs should be provided by the caller via the event payload. The function itself is a pure pipeline: fetch, transform, dispatch. This makes functions replay-safe by construction -- re-sending the same event with the same data produces the same result without side-channel coordination.

This is dependency injection applied to durable workflows. In traditional DI, you inject services so functions don't create their own dependencies. Here, you inject *identity* so functions don't create their own state.

### The pattern

```
BAD -- function generates its own identity:

async ({ event, step }) => {
    const orderId = await step.run("gen-id", () => crypto.randomUUID())
    // orderId is memoized for THIS run, but a new invocation
    // from the same trigger gets a different orderId.
    // Can't replay. Can't trace. Can't compose.
}


GOOD -- caller provides identity:

// Caller (route handler, another function, etc.)
await inngest.send(orderCreated.create({
    orderId: crypto.randomUUID(),   // caller owns the ID
    userId: user.id,
    items: cartItems,
}))

// Function is a pure pipeline
async ({ event, step }) => {
    const { orderId, userId, items } = event.data
    // orderId is stable across retries, replays, and re-invocations
}
```

### Why this matters

1. **Replay-safe.** Re-send the exact same event and get the exact same behavior. The Inngest dashboard's replay feature works correctly because the inputs fully determine the outputs.
2. **Composable.** A batch function can fan out by creating events with pre-determined IDs. Each child function doesn't care whether it was invoked from a batch or directly.
3. **Testable.** Provide known inputs, assert known outputs. No mocking of ID generation.
4. **Traceable.** IDs flow from caller to function to downstream events. You can follow an entity through the entire pipeline by its ID.

### Fan-out with pre-determined identity

```tsx
// Batch function: caller provides contextBundleId for each item
async ({ event, step, logger }) => {
    const { questions, batchId } = event.data

    await step.sendEvent("fan-out", questions.map((q) => ({
        name: "app/question.provision",
        data: {
            contextBundleId: q.contextBundleId,  // pre-generated by caller
            questionId: q.questionId,
            batchId,
        },
    })))
}
```

### When ID generation inside functions is acceptable

- **Batch-internal IDs** like `batchId` that are generated once in a step and then passed to child events within the same function. The step memoization ensures stability across retries.
- **Ephemeral IDs** for tracking within a single function run that are never persisted or referenced externally.

The rule: if an ID crosses a function boundary (via `step.sendEvent` or `step.invoke`), it should be provided by the caller.

---

## Step Patterns

### `step.run(id, handler)` -- Retryable work unit

The fundamental building block. Each step has its own independent retry counter.

```tsx
const user = await step.run("get-user", async () => {
    return db.users.findOne(event.data.userId)
})
```

### `step.sleep(id, duration)` -- Time-based pause

Function is suspended -- no compute consumed, no concurrency slot held.

```tsx
await step.sleep("wait-30-min", "30m")
await step.sleep("wait-until-tomorrow", "1d")
```

### `step.sleepUntil(id, datetime)` -- Sleep to specific time

```tsx
await step.sleepUntil("remind-at", event.data.remindAt)
```

Accepts: `Date`, ISO 8601 string, `Temporal.Instant`, `Temporal.ZonedDateTime`.

### `step.waitForEvent(id, options)` -- Event-based pause

Suspends until a matching event arrives or timeout expires. Returns the event payload or `null` on timeout.

```tsx
const approval = await step.waitForEvent("wait-for-approval", {
    event: "app/invoice.approved",
    timeout: "7d",
    match: "data.invoiceId",  // shorthand: trigger.data.invoiceId == waited.data.invoiceId
})

if (!approval) {
    // timed out -- send reminder
}
```

For complex matching, use `if` with a CEL expression:

```tsx
const subscription = await step.waitForEvent("wait-for-sub", {
    event: "app/subscription.created",
    timeout: "30d",
    if: "event.data.userId == async.data.userId && async.data.plan == 'pro'",
})
```

In CEL expressions: `event` = the original trigger event, `async` = the incoming (waited-for) event.

### `step.sendEvent(id, payload)` -- Fire-and-forget fan-out

Sends events to Inngest. Use this instead of `inngest.send()` inside functions -- it's durable (retried on failure).

```tsx
// Single event
await step.sendEvent("notify-user", {
    name: "app/user.notified",
    data: { userId: event.data.userId },
})

// Batch fan-out
await step.sendEvent("fan-out", items.map((item) => ({
    name: "app/item.process",
    data: { itemId: item.id },
})))
```

### `step.invoke(id, options)` -- Function-to-function RPC

Calls another function and **waits for its return value**. The invoked function runs with its own configuration (retries, concurrency, etc.).

```tsx
const result = await step.invoke("compute", {
    function: computeSquare,
    data: { number: 4 },
    timeout: "1h",
})
```

**All failures throw `NonRetriableError`** to prevent cascading retry multiplication. This includes: function not found, exhausted retries, timeout. Handle with try/catch if you need fallback behavior.

Each `step.invoke()` is a network request that creates a new function run. It is not a local function call.

### `step.invoke` vs `step.sendEvent`

| | `step.invoke` | `step.sendEvent` |
|---|---|---|
| Returns result | Yes (RPC) | No (fire-and-forget) |
| Failure behavior | Throws NonRetriableError | Event is enqueued; target retries independently |
| Targets | One specific function | Any function(s) triggered by the event |
| Use case | Coordinated workflows, need return value | Fan-out, decoupled triggers |

---

## Parallel Execution

Do not await steps individually when they are independent. Collect promises, then `Promise.all()`.

```
BAD -- sequential execution (a finishes before b starts):

const a = await step.run("a", () => fetchA())
const b = await step.run("b", () => fetchB())


GOOD -- parallel execution:

const [a, b] = await Promise.all([
    step.run("a", () => fetchA()),
    step.run("b", () => fetchB()),
])
```

### Dynamic parallelism

```tsx
const results = await Promise.all(
    items.map((item, i) =>
        step.run(`process-${item.id}`, () => processItem(item))
    )
)
```

Use a stable, meaningful ID (like `item.id`) rather than array index when possible.

### Constraints

- Total parallel step output must stay under 4 MB.
- Max 1,000 steps per function.
- With `optimizeParallelism: true` (v4 default), `Promise.race` waits for ALL parallel steps to complete before returning. Use `group.parallel()` if you need true race semantics.

---

## Error Handling

### Default retry behavior

4 retries per step (5 total attempts). Each `step.run()` has its own independent retry counter. Backoff is exponential with jitter.

```tsx
inngest.createFunction(
    { id: "my-fn", retries: 10 },  // override default
    // ...
)
```

### `NonRetriableError` -- permanent failure

Immediately fails the step. No further retries. Use for cases where retrying is pointless (invalid input, resource not found).

```tsx
import { NonRetriableError } from "inngest"

const user = await step.run("get-user", async () => {
    const u = await db.users.findOne(userId)
    if (!u) {
        throw new NonRetriableError(`user ${userId} not found`)
    }
    return u
})
```

### `RetryAfterError` -- controlled retry timing

Overrides exponential backoff. Use for respecting external rate-limit headers.

```tsx
import { RetryAfterError } from "inngest"

await step.run("send-sms", async () => {
    const { success, retryAfter } = await twilio.messages.create({ /* ... */ })
    if (!success && retryAfter) {
        throw new RetryAfterError("rate limited", retryAfter)
    }
})
```

### Step-level rollbacks

When a step exhausts all retries, it throws a `StepError`. Catch it for rollback logic:

```tsx
async ({ step }) => {
    const charge = await step.run("charge-card", () =>
        stripe.charges.create({ /* ... */ })
    )

    try {
        await step.run("provision-access", () => grantAccess(userId))
    } catch (err) {
        // provision failed after all retries -- rollback
        await step.run("refund-charge", () =>
            stripe.refunds.create({ charge: charge.id })
        )
    }
}
```

### `onFailure` -- terminal failure handler

Runs after all retries are exhausted for the entire function.

```tsx
inngest.createFunction(
    {
        id: "update-subscription",
        retries: 5,
        onFailure: async ({ event, error }) => {
            await unsubscribeUser(event.data.userId)
            await alertOpsTeam(error)
        },
    },
    // ...
)
```

### Global failure listener

```tsx
inngest.createFunction(
    { id: "handle-any-failure", triggers: [{ event: "inngest/function.failed" }] },
    async ({ event }) => { /* alert, log, etc. */ },
)
```

---

## Flow Control

Each mechanism solves a different problem. Picking the wrong one leads to data loss or unexpected queuing.

### Decision tree

| Need | Mechanism | Behavior |
|---|---|---|
| Limit concurrent step execution | `concurrency` | Steps queue FIFO; sleeping/waiting steps don't count |
| Limit rate of new function starts (lossless) | `throttle` | Excess runs queue FIFO, no events dropped |
| Hard limit, drop excess (lossy) | `rateLimit` | Excess events are skipped entirely |
| Wait for events to stop, use last | `debounce` | Timer resets on each event; runs with last event's data |
| Run once per unique key per 24h | `idempotency` | Duplicate events within window are ignored |
| Process events in batches | `batchEvents` | Collects events, delivers as array to single invocation |

### Concurrency

Limits the number of **steps** (not function runs) executing simultaneously. Sleeping/waiting steps do not consume a slot.

```tsx
inngest.createFunction({
    id: "ai-summarize",
    concurrency: [{
        scope: "account",           // "fn" (default) | "env" | "account"
        key: `"openai"`,            // CEL expression -> virtual queue
        limit: 60,
    }],
})
```

Max 2 concurrency constraints per function. Keys are CEL expressions evaluated against the event.

### Throttle (lossless rate limiting)

Limits how fast new runs **start**. Excess events queue FIFO -- nothing is dropped.

```tsx
inngest.createFunction({
    id: "sync-data",
    throttle: { limit: 10, period: "1m", key: "event.data.accountId" },
})
```

### Rate limit (lossy)

Hard cap. Excess events are **skipped** (not queued). Max period: 24 hours.

```tsx
inngest.createFunction({
    id: "sync-data",
    rateLimit: { limit: 1, period: "4h", key: "event.data.companyId" },
})
```

### Debounce

Delays execution until events stop arriving. Runs with the **last** event's data.

```tsx
inngest.createFunction({
    id: "handle-webhook",
    debounce: { key: "event.data.accountId", period: "5m", timeout: "10m" },
})
```

`timeout` prevents infinite deferral -- forces execution after the max wait.

### Idempotency

Function-level dedup via CEL expression. Each unique key runs the function once per 24 hours.

```tsx
inngest.createFunction({
    id: "send-receipt",
    idempotency: "event.data.orderId",
})
```

This is *platform-level* dedup. For *structural* idempotency (functions that are replay-safe by design), see "Designing for Idempotency and Composability" above.

---

## Cancellation

Cancel long-running or sleeping functions when a later event makes them irrelevant.

```tsx
inngest.createFunction(
    {
        id: "schedule-reminder",
        cancelOn: [{
            event: "app/task.deleted",
            if: "event.data.taskId == async.data.taskId",
        }],
    },
    { event: "app/reminder.scheduled" },
    async ({ event, step }) => {
        await step.sleepUntil("wait", event.data.remindAt)
        await step.run("send-reminder", () => sendPush(event.data.userId))
    },
)
```

In CEL: `event` = the original trigger, `async` = the cancellation event.

**Active step execution is NOT stopped.** If a step is currently running when cancellation fires, that step completes. Cancellation prevents the *next* step from starting.

Cancelled runs trigger the `inngest/function.cancelled` system event -- use for cleanup.

---

## Fan-Out

### One event, multiple functions

The simplest pattern. Send one event, multiple functions listen independently.

```tsx
// Route handler sends a single event
await inngest.send(userSignedUp.create({
    userId: user.id,
    email: user.email,
}))

// Each function handles its own concern independently
// Function A: send welcome email
// Function B: start trial
// Function C: sync to CRM
```

Each function has independent retries, concurrency, and error handling. A failure in one does not affect the others.

### Dynamic fan-out via `step.sendEvent`

For fanning out within a function:

```tsx
await step.sendEvent("fan-out", items.map((item) => ({
    name: "app/item.process",
    data: {
        itemId: item.id,
        batchId: event.data.batchId,
    },
})))
```

Prefer `step.sendEvent` over `inngest.send()` inside functions -- it's a durable step that retries on failure.

---

## Logging

Use `logger` from the **function handler context**, not the imported `logger` from `@/lib/logger`. The context logger is enriched with function name, run ID, and event name via pino's `.child()` mechanism.

```tsx
async ({ event, step, logger }) => {
    // Use this logger -- it has run context
    await step.run("process", () => {
        logger.info({ orderId: event.data.orderId }, "processing order")
    })
}
```

Syntax follows pino convention enforced by project rules: **object first, string literal second.**

```tsx
logger.info({ key: "value" }, "description of what happened")
logger.warn({ questionId }, "invalid difficulty")
logger.error({ error: res.error }, "webhook handler failed")
```

### Reference

- [`Inngest client`](inngest:core/client.ts#inngest) -- pino logger and ConsoleLogger for SDK internals
