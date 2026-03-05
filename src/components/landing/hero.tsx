import { Sparkles } from "lucide-react"
import { type ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

type HeroProps = {
    children: ReactNode
}

const sectionId = "hero"

export function Hero({ children }: HeroProps) {
    return (
        <section
            id={sectionId}
            className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background px-6 pt-24 pb-16 text-center"
        >
            <Badge variant="outline" className="mb-6 gap-1.5 px-3 py-1.5">
                <Sparkles className="size-3.5" />
                Built for modern teams
            </Badge>

            <h1 className="max-w-3xl font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
                Ship your next SaaS in days, not months.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                An opinionated Next.js starter with auth, payments, background jobs, and the modern
                tooling you actually want to ship with.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>

            <div className="mt-16 w-full max-w-4xl">
                <div className="rounded-xl border bg-gradient-to-br from-muted/60 to-muted/20 p-1">
                    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed bg-background/50 sm:h-80">
                        <span className="text-muted-foreground text-sm">Dashboard preview</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
