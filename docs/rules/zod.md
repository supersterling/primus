# Zod

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
