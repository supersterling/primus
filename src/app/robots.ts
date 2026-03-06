import { type MetadataRoute } from "next"
import { baseUrl } from "@/lib/utils"

/**
 * Generates /robots.txt via Next.js metadata routes.
 *
 * - Public marketing pages are fully indexed.
 * - Authenticated app routes (/app) and raw API routes are blocked from crawlers.
 * - Points crawlers at /sitemap.xml for efficient page discovery.
 */
export default function robots(): MetadataRoute.Robots {
    const url = baseUrl()
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/app", "/api/"],
            },
        ],
        sitemap: `${url}/sitemap.xml`,
        host: url,
    }
}
