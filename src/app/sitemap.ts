import { type MetadataRoute } from "next"
import { baseUrl } from "@/lib/utils"

/**
 * Generates /sitemap.xml via Next.js metadata routes.
 *
 * Only public, indexable pages are listed. Authenticated routes (/app) and
 * API routes are excluded — they are disallowed in robots.txt as well.
 *
 * Update this file whenever you add a new public-facing route
 * (e.g. /blog, /docs, /changelog).
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const url = baseUrl()
    return [
        {
            url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${url}/sign-in`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${url}/sign-up`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ]
}
