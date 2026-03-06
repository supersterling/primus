# Type Safety

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
- No `??`. Fix the source of nullability — `??` hides the problem, it doesn't solve it. When a fallback is genuinely required, write an explicit null check so the intent is impossible to miss.
- No `||` for fallbacks. Use explicit null checks.

**Hint — explicit null checks instead of `??`:**

```typescript
// wrong
const name = user.name ?? "Anonymous"

// right — fix the source: make name required in the schema
const UserSchema = z.object({ name: z.string().min(1) })

// right — if a fallback is genuinely needed, be explicit about why
const name = user.name != null ? user.name : "Anonymous"

// right — for repeated use, extract a named function that documents the intent
function displayName(name: string | null | undefined): string {
    if (name === null || name === undefined) {
        return "Anonymous"
    }
    return name
}
```

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
