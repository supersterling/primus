---
name: inngest-realtime
description: Stream data from Inngest functions to browsers using @inngest/realtime. Use when building live UIs, streaming LLM output, progress indicators, or human-in-the-loop flows. Covers typed channels, publish inside steps, subscription tokens, useInngestSubscription hook, and Next.js server action patterns.
---

# Inngest Realtime

Stream data from Inngest functions to browsers in real time — no additional infrastructure. Inngest manages the WebSocket server.

> **Developer preview** — APIs may change. Requires `@inngest/realtime >= 0.4.0` and `inngest >= 3.32.0`.

## Core Concepts

- **channel** — namespace scoping who sees what (e.g. `user:123`)
- **topic** — category of data within a channel (e.g. `ai`, `progress`)
- **publish** — send data from a function to a channel/topic
- **subscribe** — listen to a channel/topic from browser or server
- **at-most-once** — messages are ephemeral; browser must be subscribed before function publishes

## Setup

Add `realtimeMiddleware()` to your Inngest client:

```ts
// src/inngest/core/client.ts
import { Inngest } from "inngest"
import { realtimeMiddleware } from "@inngest/realtime/middleware"

export const inngest = new Inngest({
    id: "my-app",
    middleware: [realtimeMiddleware()],
})
```

## Define Typed Channels

Follow the same pattern as `events.ts` — one const per channel, collected into a record:

```ts
// src/inngest/core/channels.ts
import { channel, topic } from "@inngest/realtime"
import { z } from "zod"

const UserChannel = channel((userId: string) => `user:${userId}`)
    .addTopic(topic("ai").schema(z.object({ text: z.string(), done: z.boolean() })))
    .addTopic(topic("progress").type<{ step: string; percent: number }>())

const channels = {
    [UserChannel.name]: UserChannel,
} as const

export { channels, UserChannel }
```

## Publishing from a Function

**Call `publish` inside `step.run`** — this is the correct pattern per the Inngest docs. Calling `publish` outside of a step will trigger a `NESTING_STEPS` warning on the next step (see Gotchas).

```ts
// src/inngest/functions/generate.ts
import { inngest } from "@/inngest/core/client"
import { UserChannel } from "@/inngest/core/channels"

export const generateRecommendation = inngest.createFunction(
    { id: "generate-recommendation" },
    { event: "ai/recommendation.requested" },
    async ({ event, step, publish }) => {
        await step.run("generate", async () => {
            const text = await llm.generate(event.data.prompt)
            await publish(UserChannel(event.data.userId).ai({ text, done: true }))
            return text
        })
    },
)
```

## Subscription Token (Server Action)

Always create server-side after verifying auth. Scopes the token to specific channels and topics.

```ts
// src/app/actions/realtime.ts
"use server"

import { getSubscriptionToken, type Realtime } from "@inngest/realtime"
import { inngest } from "@/inngest/core/client"
import { UserChannel } from "@/inngest/core/channels"
import { auth } from "@/lib/auth"

export type UserToken = Realtime.Token<typeof UserChannel, ["ai", "progress"]>

export async function fetchUserToken(): Promise<UserToken> {
    const { userId } = await auth()

    return getSubscriptionToken(inngest, {
        channel: `user:${userId}`,
        topics: ["ai", "progress"],
    })
}
```

## Subscribing in React

```tsx
// src/app/generate/page.tsx
"use client"

import { useInngestSubscription } from "@inngest/realtime/hooks"
import { fetchUserToken } from "@/app/actions/realtime"

export default function GeneratePage() {
    const { data, latestData, state, error } = useInngestSubscription({
        refreshToken: fetchUserToken,
    })

    return (
        <div>
            {state === "loading" && <p>Connecting...</p>}
            {error && <p>Error: {error.message}</p>}
            {data.map((msg, i) => (
                <p key={i}>{msg.data.text}</p>
            ))}
        </div>
    )
}
```

`useInngestSubscription` returns:
- `data` — all messages received since mount
- `latestData` — most recent message
- `freshData` — messages since last reconnect
- `state` — `"loading" | "connected" | "closed"`
- `error` — any connection error

## Human-in-the-Loop Pattern

```ts
export const reviewDocument = inngest.createFunction(
    { id: "review-document" },
    { event: "doc/review.requested" },
    async ({ event, step, publish }) => {
        const summary = await step.run("summarize", async () => {
            const text = await llm.summarize(event.data.content)
            await publish(UserChannel(event.data.reviewerId).ai({ text, done: true }))
            return text
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

**`NESTING_STEPS` warning** — `publish` uses step machinery internally. Calling it outside a `step.run` causes a false-positive `NESTING_STEPS` warning on the next step. Always call `publish` inside `step.run`. The warning message itself acknowledges this can be a false positive and the function still executes correctly.

**At-most-once delivery** — messages are ephemeral. The browser must be subscribed before the function publishes. Mount the component and establish the subscription before triggering the function.

**Subscription tokens are scoped** — tokens are bound to a specific channel and topics. A token for `user:123` cannot subscribe to `user:456`. Always generate tokens server-side after verifying the user is authorized for that channel.

**Max message size** — 512KB per message.
