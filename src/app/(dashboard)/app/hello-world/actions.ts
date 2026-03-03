"use server"

import { inngest } from "@/inngest/core/client"
import { appHelloWorld } from "@/inngest/core/events"

/**
 * Trigger the hello-world Inngest function and return a realtime subscription
 * token scoped to the hello-world channel. The token is fetched *before*
 * sending the event so the client can subscribe without racing.
 */
export async function triggerHelloWorld(name: string) {
    const token = await inngest.realtime.getSubscriptionToken({
        channel: "hello-world",
        topics: ["greeting", "farewell"] as const,
    })

    await inngest.send(appHelloWorld.create({ name }))

    return token
}
