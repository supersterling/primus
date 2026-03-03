import { z } from "zod"
import { createEvent, type EventRecord, type InferEventPayload } from "@/lib/inngest"

const AppHelloWorldSchema = createEvent(
    "app/hello-world",
    z.object({
        name: z.string().describe("The name to greet"),
    }),
)
type AppHelloWorld = InferEventPayload<typeof AppHelloWorldSchema>

const events = {
    [AppHelloWorldSchema.name]: AppHelloWorldSchema.data,
} as const satisfies EventRecord

export { events }
export type { AppHelloWorld }
