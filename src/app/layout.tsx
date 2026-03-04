import { ClerkProvider } from "@clerk/nextjs"
import { type Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

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
    title: {
        default: "Primus",
        template: "%s | Primus",
    },
    description:
        "An opinionated Next.js template with the best of Vercel, Inngest, and modern tooling.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
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
                        {children}
                        <Toaster richColors position="top-center" />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
