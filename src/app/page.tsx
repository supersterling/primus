import { ChessKing } from "lucide-react"
import { type Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getSession } from "@/lib/auth/session"

export const metadata: Metadata = { title: "Welcome" }

async function HeroAction() {
    const session = await getSession()
    const isSignedIn = session != null
    const href = isSignedIn ? "/app" : "/sign-in"
    const label = isSignedIn ? "Go to app" : "Get started"

    return (
        <Button asChild size="lg">
            <Link href={href}>{label}</Link>
        </Button>
    )
}

function HeroActionSkeleton() {
    return <Skeleton className="h-11 w-32 rounded-md" />
}

function HeroActionFallback() {
    return (
        <Button asChild size="lg">
            <Link href="/sign-in">Get started</Link>
        </Button>
    )
}

export default function LandingPage() {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center px-6 py-6">
            <div className="flex max-w-lg flex-col items-center gap-8 text-center">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                    <ChessKing className="size-5" aria-hidden="true" />
                    <span className="font-mono text-sm uppercase tracking-widest">Primus</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-pretty text-5xl leading-tight tracking-tight">
                        The foundation for what comes next.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        An opinionated Next.js starter with Inngest, Polar, and the modern tooling
                        you actually want to ship with.
                    </p>
                </div>

                <div className="flex gap-3">
                    <ErrorBoundary fallback={<HeroActionFallback />}>
                        <Suspense fallback={<HeroActionSkeleton />}>
                            <HeroAction />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </main>
    )
}
