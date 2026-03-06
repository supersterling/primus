import { type MetadataRoute } from "next"

/**
 * Generates /manifest.webmanifest via Next.js metadata routes.
 *
 * Enables "Add to Home Screen" on mobile and improves social sharing.
 * Update name, short_name, and theme_color to match your brand.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Primus",
        // biome-ignore lint/style/useNamingConvention: Web App Manifest spec requires snake_case
        short_name: "Primus",
        description: "An opinionated Next.js starter for shipping SaaS products fast.",
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
