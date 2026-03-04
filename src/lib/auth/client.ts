import { createAuthClient } from "better-auth/react"
import { env } from "@/lib/env"

export const authClient = createAuthClient({
    // biome-ignore lint/style/useNamingConvention: better-auth config property
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
})
