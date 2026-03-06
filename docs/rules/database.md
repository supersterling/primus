# Database

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
