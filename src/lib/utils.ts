import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "@/lib/env"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Returns the canonical base URL of the app.
 * On Vercel, uses VERCEL_URL (injected automatically). Locally, falls back to localhost:3000.
 */
export function baseUrl(): string {
    if (env.VERCEL_URL != null) {
        return `https://${env.VERCEL_URL}`
    }
    return "http://localhost:3000"
}
