import { eventType } from "inngest"
import { z } from "zod"

export const appHelloWorld = eventType("app/hello-world", {
    schema: z.object({
        name: z.string().describe("The name to greet"),
    }),
})
