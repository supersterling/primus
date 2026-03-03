import { inngest } from "@/inngest/core/client"

export const id = "hello-world" as const

export default inngest.createFunction(
    { id },
    { event: "app/hello-world" },
    async ({ event, step, publish, logger }) => {
        const greeting = await step.run("greet", () => {
            logger.info("Greeting user", { name: event.data.name })
            return `Hello, ${event.data.name}!`
        })

        await publish({
            channel: "hello-world",
            topic: "greeting",
            data: { greeting },
        })

        const farewell = await step.run("farewell", () => {
            logger.info("Farewell user", { name: event.data.name })
            return `Goodbye, ${event.data.name}!`
        })

        return { greeting, farewell }
    },
)
