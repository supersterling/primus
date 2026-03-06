# Code Style

## IIFEs

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

## Nullish coalescing

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
