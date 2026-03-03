import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { type Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { TerminalClock } from "@/components/terminal-clock"
import "./globals.css"

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
                <body className={`${geistMono.variable} antialiased`}>
                    <header className="flex items-center justify-between border-border border-b bg-panel px-4 py-2 font-mono text-[11px] uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <span className="inline-block h-3.5 w-1 bg-accent" />
                            <span className="font-bold text-foreground">PRIMUS</span>
                            <span className="text-border">│</span>
                            <span className="text-green">SYS:ONLINE</span>
                            <span className="text-border">│</span>
                            <SignedOut>
                                <span className="text-dim">AUTH:--</span>
                            </SignedOut>
                            <SignedIn>
                                <span className="text-green">AUTH:OK</span>
                            </SignedIn>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="hidden text-muted-foreground sm:inline">
                                <TerminalClock />
                            </span>
                            <span className="hidden text-border sm:inline">│</span>
                            <SignedOut>
                                <SignInButton>
                                    <button
                                        className="text-accent transition-colors hover:text-foreground"
                                        type="button"
                                    >
                                        LOGIN ▶
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
