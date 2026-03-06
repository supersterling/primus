# Error Handling

Use [`result.trycatch()`](lib:either.ts#trycatch) from `@/lib/either`. `try/catch` breaks the error-as-value pattern — errors become invisible control flow instead of explicit values the caller must handle.

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
- Use [`result.fail(new Error(...))`](lib:either.ts#fail) when returning failure from a function. Prefer returning over throwing so callers handle failure explicitly.
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

## Error Construction

Always pass an explicit `cause`. It documents the error chain and makes it clear you are not being lazy.

```typescript
// wrapping an external error
throw new Error("database query failed", { cause: res.error })

// no cause chain — document it explicitly
throw new Error("user not found", { cause: undefined })
```

Never use `new Error()` without `{ cause }`. Never use class-based errors (`class Foo extends Error`). Never check `instanceof Error` — use `result.is()` instead.

**Hint — checking for specific error types with `result.is()`:**

[`result.is()`](lib:either.ts#is) walks the full cause chain, so it finds the error even if it has been wrapped.

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
