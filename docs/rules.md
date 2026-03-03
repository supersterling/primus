# Coding Rules

Rules enforced by GritQL lint rules in `.grit/`. Each section explains the why behind the constraint.

---

## Error Handling

Use `result.trycatch()` from `@/lib/either`. `try/catch` breaks the error-as-value pattern — errors become invisible control flow instead of explicit values the caller must handle.

```typescript
import { result } from "@/lib/either"

// sync
const parsed = result.trycatch(() => JSON.parse(raw))
if (!parsed.ok) {
    logger.error({ error: parsed.error }, "config parse failed")
    throw new Error("config parse failed", { cause: parsed.error })
}
const config = parsed.value

// async
const res = await result.trycatch(async () => {
    const r = await fetch(url)
    if (!r.ok) {
        throw new Error("bad response", { cause: undefined })
    }
    return r.json()
})
if (!res.ok) {
    logger.error({ error: res.error }, "fetch failed")
    throw new Error("fetch failed", { cause: res.error })
}
const user = res.value
```

**Rules:**
- Always assign the result. Never `void`, `return`, or discard it.
- Check `if (!res.ok)` immediately after. No code between the call and the check.
- Use `result.fail(new Error(...))` when returning failure from a function. Prefer returning over throwing so callers handle failure explicitly.
- Prefer `AsyncDisposableStack` / `DisposableStack` over `try/finally` for cleanup.

**Hint — cleanup with `AsyncDisposableStack`:**

Instead of `try/finally`, register cleanup with a stack. It runs automatically when the scope exits, even on error.

```typescript
await using stack = new AsyncDisposableStack()

const conn = await openConnection()
stack.defer(async () => {
    await conn.close()
})

const res = await result.trycatch(() => doWork(conn))
if (!res.ok) {
    logger.error({ error: res.error }, "work failed")
    throw new Error("work failed", { cause: res.error })
}
// conn.close() runs here automatically
```

### Error Construction

Always pass an explicit `cause`. It documents the error chain and makes it clear you are not being lazy.

```typescript
// wrapping an external error
throw new Error("database query failed", { cause: res.error })

// no cause chain — document it explicitly
throw new Error("user not found", { cause: undefined })
```

Never use `new Error()` without `{ cause }`. Never use class-based errors (`class Foo extends Error`). Never check `instanceof Error` — use `result.is()` instead.

**Hint — checking for specific error types with `result.is()`:**

`result.is()` walks the full cause chain, so it finds the error even if it has been wrapped.

```typescript
class HttpError extends Error {
    constructor(
        readonly status: number,
        message: string,
    ) {
        super(message)
    }
}

const res = await result.trycatch(() => fetchUser(id))
if (!res.ok) {
    const http = result.is(res.error, HttpError)
    if (http && http.status === 404) {
        logger.warn({ id }, "user not found")
        return result.fail(new Error("user not found", { cause: res.error }))
    }

    logger.error({ error: res.error }, "fetch failed")
    throw new Error("fetch failed", { cause: res.error })
}
```

---

## Logging

Use `logger` from `@/lib/logger`. Never use `console.log`, `console.error`, or any other `console` method.

```typescript
import { logger } from "@/lib/logger"

logger.info({ userId }, "user created")
logger.warn({ attempt, backoff }, "retry attempt")
logger.error({ error: res.error }, "operation failed")
logger.debug({ id }, "processing item")
```

**Rules:**
- Always log before throwing, passing, or failing. Silent outcomes are invisible.
- First argument must be a non-empty object with structured context.
- Second argument must be a plain string literal. No template literals, no variables.
- Use terse, lowercase messages. Action-oriented verbs: `"user created"`, `"fetch failed"`, `"processing item"`.

**In Inngest functions**, use the `logger` parameter from the function handler instead of importing directly. Inngest's logger handles serverless log flushing and memoization edge cases.

```typescript
inngest.createFunction({ id: "my-function" }, { event: "app/thing.happened" }, async ({ event, logger }) => {
    logger.info({ id: event.data.id }, "processing event")
})
```

**Hint — child loggers for request context:**

Use pino's child logger to bind context once rather than repeating it in every call.

```typescript
const log = logger.child({ requestId, userId })

log.info({}, "request started")
log.debug({ query }, "running query")
log.info({ durationMs }, "request complete")
```

---

## Type Safety

Use type guards. `as Type` lies to the compiler — it silences errors without proving anything at runtime.

```typescript
// wrong
const input = event.target as HTMLInputElement

// right
if (!(event.target instanceof HTMLInputElement)) {
    return
}
const input = event.target
```

**Allowed `as` uses:**
- `as const` — const assertions
- DOM/browser type casts (`as HTMLInputElement`, `as MouseEvent`, etc.) — these are structurally safe

**Rules:**
- No `any`. Use `unknown` and narrow explicitly.
- No non-null assertions (`!`). Check for null/undefined first.
- No `??`. Fix the source of nullability — `??` hides the problem, it doesn't solve it.
- No `||` for fallbacks. Use explicit null checks.

**Hint — type predicate functions:**

When you need to narrow `unknown` to a known type, write a type predicate. The compiler treats the type as proven after the check passes.

```typescript
function isUser(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof (value as Record<string, unknown>).id === "string"
    )
}

const data: unknown = await res.json()
if (!isUser(data)) {
    throw new Error("unexpected response shape", { cause: undefined })
}
data.id // string — compiler knows
```

**Hint — `satisfies` instead of `as` for config objects:**

`satisfies` validates the shape without widening the type, so literal types are preserved.

```typescript
// wrong — loses literal types
const config = {
    dialect: "postgresql",
    schema: "./src/db/schemas/core.ts",
} as Config

// right — validates shape, preserves literals
const config = {
    dialect: "postgresql",
    schema: "./src/db/schemas/core.ts",
} satisfies Config
```

**Hint — discriminated unions instead of class hierarchies:**

Use a tagged union instead of subclassing. The compiler exhaustively narrows each branch.

```typescript
type ApiResult =
    | { ok: true; data: User }
    | { ok: false; status: 404 }
    | { ok: false; status: 500; retryAfter: number }

function handle(res: ApiResult) {
    if (!res.ok) {
        if (res.status === 404) {
            return null
        }
        if (res.status === 500) {
            return retry(res.retryAfter)
        }
    }
    return res.data
}
```

---

## Imports

Use `@/` imports. Relative paths break when files move.

```typescript
// wrong
import { db } from "../../lib/db"
import { logger } from "./logger"

// right
import { db } from "@/lib/db"
import { logger } from "@/lib/logger"
```

No exceptions. Even co-located files in the same directory must use `@/`.

---

## Database

Pass explicit columns to `select()`. Fetching everything is wasteful and fragile — schema changes silently break consumers.

```typescript
// wrong
db.select().from(users).where(eq(users.id, id))
db.insert(users).values(data).returning()

// right
db.select({ id: users.id, name: users.name }).from(users).where(eq(users.id, id))
db.insert(users).values(data).returning({ id: users.id })
```

**Hint — derive types from your queries:**

Use `Awaited<ReturnType<...>>` to derive types directly from queries rather than duplicating them.

```typescript
const getUser = db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.id, sql.placeholder("id")))
    .prepare("get_user")

type User = Awaited<ReturnType<typeof getUser.execute>>[number]
```

---

## Zod

Use `safeParse`. `parse` throws, which breaks the error-as-value pattern.

```typescript
// wrong
const data = schema.parse(input)

// right
const parsed = schema.safeParse(input)
if (!parsed.success) {
    logger.error({ error: parsed.error }, "validation failed")
    throw new Error("validation failed", { cause: parsed.error })
}
const data = parsed.data
```

**Hint — infer types from schemas:**

Derive TypeScript types from Zod schemas so the schema is the single source of truth.

```typescript
import { z } from "zod"

const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
})

type User = z.infer<typeof UserSchema>
```

---

## React & Tailwind

### Inline styles

Use Tailwind classes. `style={{}}` bypasses the design system.

```tsx
// wrong
<div style={{ color: "red", padding: "16px" }}>

// right
<div className="text-destructive p-4">
```

**Hint — CSS variables with arbitrary properties:**

When you need a dynamic value that can't be expressed as a class, set a CSS variable using Tailwind's arbitrary property syntax and consume it elsewhere.

```tsx
<div className="[--progress:75%]">
    <div className="w-[--progress] bg-primary h-2" />
</div>
```

### Theme tokens

Use theme tokens. Raw Tailwind colors bypass the design system.

```tsx
// wrong
<div className="bg-blue-500 text-red-400">

// right
<div className="bg-primary text-destructive">
```

Available tokens are defined in `src/app/globals.css`. Any `--color-*` variable maps to a Tailwind utility — `--color-primary` becomes `bg-primary`, `text-primary`, `border-primary`, etc.

### Fragments

Use `<Fragment>`. `<>` is ambiguous and harder to grep.

```tsx
import { Fragment } from "react"

// wrong
<><Child /></>

// right
<Fragment><Child /></Fragment>
```

### Ternaries

Assign the ternary to a variable. Inline ternaries hide branching logic.

```tsx
// wrong
<div>{isLoading ? <Spinner /> : <Content data={data} />}</div>

// right
const body = isLoading ? <Spinner /> : <Content data={data} />
return <div>{body}</div>
```

Conditional rendering with `&&` is fine — this rule is specifically about `? :`.

**Hint — use early returns for loading/error/empty states:**

```tsx
if (isLoading) {
    return <Spinner />
}
if (error) {
    return <ErrorMessage error={error} />
}
return <Content data={data} />
```

---

## Code Style

### IIFEs

Use a named function. IIFEs obscure intent and can't be tested.

```typescript
// wrong
const value = (() => {
    return computeSomething()
})()

// right
function computeSomething() { ... }
const value = computeSomething()
```

**Hint — top-level `await` replaces async IIFEs in scripts:**

```typescript
// wrong
;(async () => {
    await runMigration()
})()

// right
await runMigration()
```

### Nullish coalescing

Fix the source of nullability. `??` hides the problem, it doesn't solve it.

```typescript
// wrong
const name = user.name ?? "Anonymous"

// right — make name required in the schema
const UserSchema = z.object({ name: z.string().min(1) })

// right — if it's genuinely optional, handle it explicitly
if (!user.name) {
    logger.warn({ userId: user.id }, "user has no name")
    return
}
const name = user.name
```
