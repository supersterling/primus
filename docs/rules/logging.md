# Logging

Use [`logger`](lib:logger.ts#logger) from `@/lib/logger`. Never use `console.log`, `console.error`, or any other `console` method.

```typescript
import { logger } from "@/lib/logger"

logger.info({ userId }, "user created")
logger.warn({ attempt, backoff }, "retry attempt")
logger.error({ error: res.error }, "operation failed")
logger.debug({ id }, "processing item")
```

**Rules:**
- Always log before throwing or failing. Silent failures are invisible.
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
