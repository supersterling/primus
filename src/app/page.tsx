import { type Metadata } from "next"
import Link from "next/link"
import { Fragment, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Bento } from "@/components/landing/bento"
import { Cta } from "@/components/landing/cta"
import { Faq } from "@/components/landing/faq"
import { FeaturesGrid } from "@/components/landing/features-grid"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Logos } from "@/components/landing/logos"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Skeleton } from "@/components/ui/skeleton"
import { getSession } from "@/lib/auth/session"
import { baseUrl } from "@/lib/utils"

export const metadata: Metadata = {
    title: "Welcome",
    description:
        "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
    alternates: { canonical: "/" },
    openGraph: {
        url: "/",
        title: "Primus — Ship your next SaaS in days, not months",
        description:
            "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
    },
}

async function HeroActions() {
    const session = await getSession()
    const isSignedIn = session != null

    if (isSignedIn) {
        return (
            <RainbowButton asChild size="lg">
                <Link href="/app">Go to app</Link>
            </RainbowButton>
        )
    }

    return (
        <Fragment>
            <RainbowButton asChild size="lg">
                <Link href="/sign-in">Get Started</Link>
            </RainbowButton>
            <Button asChild variant="outline" size="lg">
                <Link href="/sign-in">Log in</Link>
            </Button>
        </Fragment>
    )
}

function HeroActionsSkeleton() {
    return (
        <div className="flex gap-4">
            <Skeleton className="h-11 w-32 rounded-md" />
            <Skeleton className="h-11 w-24 rounded-md" />
        </div>
    )
}

function HeroActionsFallback() {
    return (
        <Fragment>
            <RainbowButton asChild size="lg">
                <Link href="/sign-in">Get Started</Link>
            </RainbowButton>
            <Button asChild variant="outline" size="lg">
                <Link href="/sign-in">Log in</Link>
            </Button>
        </Fragment>
    )
}

export default function LandingPage() {
    const url = baseUrl()

    return (
        <main>
            <JsonLd
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Primus",
                    url,
                    description:
                        "An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.",
                }}
            />

            <Navbar />

            <Hero>
                <ErrorBoundary fallback={<HeroActionsFallback />}>
                    <Suspense fallback={<HeroActionsSkeleton />}>
                        <HeroActions />
                    </Suspense>
                </ErrorBoundary>
            </Hero>

            <Logos />
            <Bento />
            <HowItWorks />
            <FeaturesGrid />
            <Pricing />
            <Faq />
            <Cta />
            <Footer />
        </main>
    )
}
