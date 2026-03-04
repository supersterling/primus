import process from "node:process"
import { vercel } from "@t3-oss/env-core/presets-zod"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const isServerRuntime = typeof window === "undefined"

/** Minimum length for auth signing secrets */
const MIN_AUTH_SECRET_LENGTH = 32

if (!process.env.NEXT_RUNTIME && isServerRuntime) {
    // biome-ignore lint/style/noCommonJs: dynamic require needed for conditional env loading outside Next.js runtime
    // biome-ignore lint/correctness/noUndeclaredDependencies: @next/env is a transitive dep from next
    const { loadEnvConfig } = require("@next/env")
    const projectDir = process.cwd()
    loadEnvConfig(projectDir)
}

/**
 * Type-safe environment variables with runtime validation.
 *
 * Validates and exposes env vars at startup. Throws if required vars are missing.
 * Uses @t3-oss/env-nextjs with Zod schemas.
 */
export const env = createEnv({
    extends: [vercel()],
    server: {
        DATABASE_URL: z
            .url()
            // biome-ignore lint/security/noSecrets: intentional local dev default
            .default("postgresql://postgres:postgres@localhost:5432/primus")
            .describe("PostgreSQL connection string"),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development")
            .describe("Node environment"),
        INNGEST_DEV: z
            .enum(["1", "0"])
            .optional()
            .describe("Set to '1' to run Inngest in local dev mode (no signing key required)"),
        INNGEST_EVENT_KEY: z.string().optional().describe("Inngest event key for sending events"),
        INNGEST_SIGNING_KEY: z
            .string()
            .optional()
            .describe("Inngest signing key for webhook verification"),
        POLAR_ACCESS_TOKEN: z
            .string()
            .optional()
            .describe(
                "Polar API access token — get this from your sandbox org settings at sandbox.polar.sh",
            ),
        POLAR_WEBHOOK_SECRET: z
            .string()
            .optional()
            .describe(
                "Polar webhook secret — in dev, copy this from the output of `bun dev:polar`",
            ),
        POLAR_SERVER: z
            .enum(["sandbox", "production"])
            .default("sandbox")
            .describe("Polar server environment — keep 'sandbox' until you're ready to go live"),
        RESEND_API_KEY: z
            .string()
            .optional()
            .describe("Resend API key — get this from resend.com/api-keys"),
        BETTER_AUTH_SECRET: z
            .string()
            .min(MIN_AUTH_SECRET_LENGTH)
            .default("primus-dev-secret-do-not-use-in-production-please")
            .describe("Secret for signing auth sessions — generate with: openssl rand -base64 32"),
        GOOGLE_CLIENT_ID: z.string().optional().describe("Google OAuth client ID"),
        GOOGLE_CLIENT_SECRET: z.string().optional().describe("Google OAuth client secret"),
        GITHUB_CLIENT_ID: z.string().optional().describe("GitHub OAuth client ID"),
        GITHUB_CLIENT_SECRET: z.string().optional().describe("GitHub OAuth client secret"),
    },

    client: {
        NEXT_PUBLIC_BETTER_AUTH_URL: z
            .url()
            .default("http://localhost:3000")
            .describe("Better Auth base URL"),
    },

    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        INNGEST_DEV: process.env.INNGEST_DEV,
        INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
        INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
        POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
        POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
        POLAR_SERVER: process.env.POLAR_SERVER,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    },

    // biome-ignore lint/complexity/noImplicitCoercions: standard idiom for boolean coercion
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
})
