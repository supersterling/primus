import { eventType } from "inngest"
import { z } from "zod"

export const appHelloWorld = eventType("app/hello-world", {
    schema: z.object({
        name: z.string().describe("The name to greet"),
    }),
})

export const appUserCreated = eventType("app/user.created", {
    schema: z.object({
        name: z.string().describe("The user's display name"),
        email: z.string().email().describe("The user's email address"),
    }),
})
