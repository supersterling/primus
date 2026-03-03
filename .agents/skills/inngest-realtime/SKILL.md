---
name: inngest-realtime
description: Stream data from Inngest functions to browsers using Inngest v4's native realtime API. Use when building live UIs, streaming LLM output, progress indicators, or human-in-the-loop flows. Covers step.realtime.publish, subscription tokens, typed message patterns, useInngestSubscription hook, and Next.js server action patterns.
---

# Inngest Realtime (v4)

Stream data from Inngest functions to browsers in real time — no additional infrastructure. Inngest manages the WebSocket server.

> **Developer preview** — APIs may change.
> **SDK version** — requires `inngest >= 4.0.0` (v4 beta: `inngest@beta`).

## What Changed from v3

In v3, realtime required `realtimeMiddleware()` from `@inngest/realtime/middleware` which injected a `publish()` function into the handler context. In v4:

- `realtimeMiddleware()` is **not needed** — realtime is native to the core SDK
- **`step.realtime.publish(stepId, message)`** replaces `publish()` in function handlers
- **`inngest.realtime.getSubscriptionToken()`** replaces `getSubscriptionToken(inngest, {...})` from `@inngest/realtime`
- **`inngest.realtime.publish()`** is available for publishing outside of functions
- `channel()` and `topic()` builders from `@inngest/realtime` still exist but have no integration with the new `step.realtime.publish` API — use plain TypeScript types instead (see Typing section)

## Client Setup

No middleware needed. Just create the client normally:

```ts
// src/inngest/core/client.ts
import { Inngest, wrapStringFirstLogger } from "inngest"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

export const inngest = new Inngest({
    id: "my-app",
    logger: wrapStringFirstLogger(logger), // if your logger is string-first
    isDev: env.INNGEST_DEV === "1",
    signingKey: env.INNGEST_SIGNING_KEY,
})
```

## Publishing from a Function

Use **`step.realtime.publish(stepId, message)`**. This is a durable step — it gets checkpointed and appears in the run trace:

```ts
// src/inngest/functions/generate.ts
import { inngest } from "@/inngest/core/client"

export const generateRecommendation = inngest.createFunction(
    { id: "generate-recommendation", triggers: [{ event: "ai/recommendation.requested" }] },
    async ({ event, step }) => {
        const text = await step.run("generate", () => llm.generate(event.data.prompt))

        await step.realtime.publish("publish-result", {
            channel: `user:${event.data.userId}`,
            topic: "ai",
            data: { text, done: true },
        })
    },
)
```

`step.realtime.publish` signature:
```ts
step.realtime.publish(
    stepId: string,
    message: { channel: string; topic: string; data: unknown }
): Promise<unknown>
```

## Publishing Outside a Function

Use `inngest.realtime.publish()` to publish from server code that isn't inside a function handler:

```ts
await inngest.realtime.publish({
    channel: "global",
    topic: "alert",
    data: { message: "Deployment complete" },
})
```

## Subscription Token (Server Action)

Use `inngest.realtime.getSubscriptionToken()` directly on the client. Create tokens server-side after verifying auth:

```ts
// src/app/actions/realtime.ts
"use server"

import { inngest } from "@/inngest/core/client"
import { auth } from "@/lib/auth"

export async function fetchUserToken() {
    const { userId } = await auth()

    return inngest.realtime.getSubscriptionToken({
        channel: `user:${userId}`,
        topics: ["ai", "progress"] as const,
    })
}
```

**Get the token before sending the event** to avoid missing messages:

```ts
"use server"

export async function triggerAndSubscribe(prompt: string) {
    const { userId } = await auth()

    // Token first, then send — so client can subscribe before function publishes
    const token = await inngest.realtime.getSubscriptionToken({
        channel: `user:${userId}`,
        topics: ["ai"] as const,
    })

    await inngest.send(recommendationRequested.create({ userId, prompt }))

    return token
}
```

## Subscribing in React

`useInngestSubscription` from `@inngest/realtime/hooks` still works in v4. Pass the token directly via the `token` prop, or use `refreshToken` for auto-renewal:

```tsx
// src/app/generate/page.tsx
"use client"

import { useInngestSubscription } from "@inngest/realtime/hooks"
import { fetchUserToken } from "@/app/actions/realtime"

export default function GeneratePage() {
    const { data, latestData, state } = useInngestSubscription({
        refreshToken: fetchUserToken,
    })

    return (
        <div>
            {state === "connecting" && <p>Connecting…</p>}
            {data.map((msg, i) => (
                <p key={i}>{String(msg.data)}</p>
            ))}
        </div>
    )
}
```

Or with a token obtained from a form action (subscribe then send pattern):

```tsx
"use client"

import { useInngestSubscription } from "@inngest/realtime/hooks"
import { triggerAndSubscribe } from "@/app/actions/realtime"
import type { Realtime } from "@inngest/realtime"

type Token = Awaited<ReturnType<typeof triggerAndSubscribe>>

export default function GeneratePage() {
    const [token, setToken] = useState<Token | null>(null)

    const { data, state } = useInngestSubscription({
        // Cast needed: @inngest/realtime types are pinned to v3;
        // structurally identical at runtime with v4
        token: token as Realtime.Subscribe.Token,
    })

    async function handleSubmit(prompt: string) {
        const t = await triggerAndSubscribe(prompt)
        setToken(t)
    }

    // ...
}
```

## Typing Messages

v4 has no native typed channel/topic builder. The `channel()` and `topic()` builders from `@inngest/realtime` return `Promise<message>` which `step.realtime.publish` doesn't accept directly.

Use plain TypeScript union types with `satisfies` instead:

```ts
// src/inngest/core/channels.ts
type UserMessages =
    | { channel: `user:${string}`; topic: "ai"; data: { text: string; done: boolean } }
    | { channel: `user:${string}`; topic: "progress"; data: { step: string; percent: number } }

// Publishing — TypeScript enforces shape per topic:
await step.realtime.publish("publish-ai", {
    channel: `user:${userId}`,
    topic: "ai",
    data: { text, done: true },
} satisfies UserMessages)

// Narrows correctly — TS error if topic/data mismatch
```

For the subscribe side, annotate `data` after narrowing on `topic`:

```ts
const { data } = useInngestSubscription({ token })

for (const msg of data) {
    if (msg.topic === "ai") {
        // cast since useInngestSubscription data is untyped without the channel builder
        const { text, done } = msg.data as { text: string; done: boolean }
    }
}
```

## @inngest/realtime Peer Dep Override

`@inngest/realtime` declares `peerDependencies: { inngest: "^3" }`. With `inngest@4` you need an override in `package.json`:

```json
{
    "overrides": {
        "@inngest/realtime": {
            "inngest": "4.0.0-beta.2"
        }
    }
}
```

The parts of `@inngest/realtime` that still work with v4 (`useInngestSubscription`, `channel`, `topic`) don't touch anything that changed between v3 and v4 at runtime.

## Human-in-the-Loop Pattern

```ts
export const reviewDocument = inngest.createFunction(
    { id: "review-document", triggers: [{ event: "doc/review.requested" }] },
    async ({ event, step }) => {
        const summary = await step.run("summarize", () =>
            llm.summarize(event.data.content)
        )

        await step.realtime.publish("publish-summary", {
            channel: `user:${event.data.reviewerId}`,
            topic: "ai",
            data: { text: summary, done: true },
        })

        const decision = await step.waitForEvent("wait-for-decision", {
            event: "doc/review.decided",
            timeout: "7d",
            match: "data.documentId",
        })

        if (!decision) return // timed out

        await step.run("apply-decision", () =>
            applyDecision(event.data.documentId, decision.data.action)
        )
    },
)
```

## Gotchas

**`step.realtime.publish` is a durable step** — unlike the v3 `publish()` which could detect replays and skip, `step.realtime.publish` always creates a checkpoint. It shows up in the run trace and adds a small amount of latency. For functions with many publish calls this is a tradeoff to be aware of.

**At-most-once delivery** — messages are ephemeral. The browser must be subscribed before the function publishes. Always get the subscription token before sending the event.

**Token before event** — get the subscription token, return it to the client, let it subscribe, *then* send the triggering event. If you send the event first the function may publish before the browser is connected.

**Subscription tokens are scoped** — tokens are bound to a specific channel and topics. A token for `user:123` cannot subscribe to `user:456`. Always generate tokens server-side after verifying the user is authorized for that channel.

**`@inngest/realtime` v4 not yet released** — there's no official v4-native `@inngest/realtime`. The peer dep override approach works today but should be replaced once Inngest ships a v4-compatible package.

**Max message size** — 512KB per message.
