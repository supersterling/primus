import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from "@clerk/nextjs"
import { type Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
})

export const metadata: Metadata = {
    title: "primus",
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
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
                >
                    <header className="flex items-center justify-between border-border/40 border-b px-6 py-3">
                        <span className="font-serif text-foreground text-lg italic">primus</span>
                        <nav className="flex items-center gap-2">
                            <SignedOut>
                                <SignInButton>
                                    <button
                                        className="rounded-md px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
                                        type="button"
                                    >
                                        Sign in
                                    </button>
                                </SignInButton>
                                <SignUpButton>
                                    <button
                                        className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-sm transition-colors hover:bg-primary/90"
                                        type="button"
                                    >
                                        Get started
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </nav>
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
