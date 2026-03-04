import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/lib/db"
import * as authSchema from "@/lib/db/schemas/auth"
import { env } from "@/lib/env"

type SocialProvider = {
    clientId: string
    clientSecret: string
}

function buildSocialProviders(): {
    google?: SocialProvider
    github?: SocialProvider
} {
    const providers: { google?: SocialProvider; github?: SocialProvider } = {}

    if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
        providers.google = {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }
    }

    if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
        providers.github = {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }
    }

    return providers
}

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
    secret: env.BETTER_AUTH_SECRET,
    // biome-ignore lint/style/useNamingConvention: better-auth config property
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
    trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: buildSocialProviders(),
    plugins: [nextCookies()],
})
