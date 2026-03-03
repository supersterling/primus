import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { ChessKing } from "lucide-react"
import { type Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Welcome" }

export default function LandingPage() {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center px-6">
            <div className="flex max-w-lg flex-col items-center gap-8 text-center">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                    <ChessKing className="size-5" aria-hidden="true" />
                    <span className="font-mono text-sm uppercase tracking-widest">Primus</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl leading-tight tracking-tight">
                        The foundation for what comes next.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        An opinionated Next.js starter with Clerk, Inngest, and the modern tooling
                        you actually want to ship with.
                    </p>
                </div>

                <div className="flex gap-3">
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/app">
                            <Button size="lg">Get started</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Button asChild size="lg">
                            <Link href="/app">Go to app</Link>
                        </Button>
                    </SignedIn>
                </div>
            </div>
        </main>
    )
}
