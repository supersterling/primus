import { inngest } from "@/inngest/core/client"
import { appHelloWorld } from "@/inngest/core/events"

export const id = "hello-world" as const

export default inngest.createFunction(
    { id, triggers: [appHelloWorld] },
    async ({ event, step, logger }) => {
        const greeting = await step.run("greet", () => {
            logger.info({ name: event.data.name }, "Greeting user")
            return `Hello, ${event.data.name}!`
        })

        await step.realtime.publish("publish-greeting", {
            channel: "hello-world",
            topic: "greeting",
            data: { greeting },
        })

        const farewell = await step.run("farewell", () => {
            logger.info({ name: event.data.name }, "Farewell user")
            return `Goodbye, ${event.data.name}!`
        })

        await step.realtime.publish("publish-farewell", {
            channel: "hello-world",
            topic: "farewell",
            data: { farewell },
        })

        return { greeting, farewell }
    },
)
