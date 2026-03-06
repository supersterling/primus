/**
 * Generated Open Graph / Twitter card image.
 * Served at /opengraph-image — Next.js injects the <meta> tags automatically.
 *
 * Satori (the renderer) only supports inline CSS flexbox — no Tailwind.
 * Linter is disabled for this file in biome.json.
 *
 * Custom fonts: add a TTF/OTF to public/fonts/ and load with readFile().
 * Satori does NOT support WOFF or WOFF2.
 */

import { ImageResponse } from "next/og"

export const alt = "Primus — Ship your next SaaS in days, not months"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
    return new ImageResponse(
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                background: "#09090b",
                padding: "72px",
            }}
        >
            <span style={{ color: "white", fontSize: "28px", fontWeight: 600 }}>Primus</span>

            <div style={{ flex: 1 }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                    style={{
                        color: "white",
                        fontSize: "72px",
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: "-2.5px",
                    }}
                >
                    Ship your next SaaS
                </span>
                <span
                    style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "72px",
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: "-2.5px",
                    }}
                >
                    in days, not months.
                </span>
            </div>
        </div>,
        size,
    )
}
