import { type MetadataRoute } from "next"
import site from "@/lib/seo/site.json" with { type: "json" }

/**
 * Generates /manifest.webmanifest via Next.js metadata routes.
 *
 * Enables "Add to Home Screen" on mobile and improves social sharing.
 * Update name, short_name, and theme_color to match your brand.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: site.name,
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case
        short_name: site.name,
        description: site.description,
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case
        start_url: "/",
        display: "standalone",
        // --background light: oklch(1 0 0)
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case
        background_color: "#ffffff",
        // --background dark: oklch(0.145 0 0)
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case
        theme_color: "#09090b",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    }
}
