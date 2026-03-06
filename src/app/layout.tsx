import { type Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { ViewTransition } from "react"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { baseUrl } from "@/lib/utils"
import "@/lib/styles/globals.css"

const geist = Geist({
    variable: "--font-geist",
    subsets: ["latin"],
    display: "swap",
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
})

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
})

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl()),

    applicationName: "Primus",
    title: {
        default: "Primus",
        template: "%s | Primus",
    },
    description:
        "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
    keywords: ["Next.js starter", "SaaS boilerplate", "TypeScript", "Vercel"],
    authors: [{ name: "Primus" }],
    creator: "Primus",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Primus",
        title: "Primus — Ship your next SaaS in days, not months",
        description:
            "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
    },

    twitter: {
        card: "summary_large_image",
        title: "Primus — Ship your next SaaS in days, not months",
        description:
            "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ViewTransition>{children}</ViewTransition>
                    <Toaster richColors position="top-center" />
                </ThemeProvider>
            </body>
        </html>
    )
}
