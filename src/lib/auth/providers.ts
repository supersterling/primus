import { type SocialProviders } from "@/components/auth/social-button"
import { env } from "@/lib/env"

export function getSocialProviders(): SocialProviders {
    return {
        google: env.GOOGLE_CLIENT_ID != null && env.GOOGLE_CLIENT_SECRET != null,
        github: env.GITHUB_CLIENT_ID != null && env.GITHUB_CLIENT_SECRET != null,
    }
}
