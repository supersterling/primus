import { ArrowLeft } from "lucide-react"
import { type Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

/**
 * Auth pages are functional — not content pages.
 * Prevent them from appearing in search results.
 */
export const metadata: Metadata = {
    robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex min-h-svh items-center justify-center p-6 md:p-10">
            <Button variant="ghost" size="sm" asChild className="absolute top-4 left-4">
                <Link href="/">
                    <ArrowLeft className="mr-1.5 size-4" aria-hidden="true" />
                    Back
                </Link>
            </Button>
            {children}
        </main>
    )
}
