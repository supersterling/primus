import { Globe, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function StackPreview() {
    return (
        <div className="flex min-h-[240px] items-center justify-center bg-muted/50 p-8">
            <div className="relative flex items-center justify-center">
                <div className="absolute size-32 rounded-full border border-border/50" />
                <div className="absolute size-24 rounded-full border border-border/50" />
                <div className="absolute size-16 rounded-full border border-border/50" />
                <ShieldCheck className="relative size-8 text-primary" aria-hidden="true" />
                <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
                    <div className="size-3 rounded-sm bg-primary/60" />
                </div>
                <div className="absolute -bottom-3 left-1 flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
                    <div className="size-3 rounded bg-primary/40" />
                </div>
                <div className="absolute top-2 -left-4 flex size-8 items-center justify-center rounded-full bg-background shadow-sm">
                    <div className="size-3 rounded-full bg-primary/50" />
                </div>
            </div>
        </div>
    )
}

function DxPreview() {
    return (
        <div className="flex min-h-[240px] items-center justify-center bg-muted/50 p-8">
            <div className="relative flex size-36 items-center justify-center">
                <Globe className="relative size-10 text-primary/30" aria-hidden="true" />
                <div className="absolute top-0 left-1/2 size-3 -translate-x-1/2 rounded-full bg-primary/40" />
                <div className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 rounded-full bg-primary/40" />
                <div className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full bg-primary/40" />
                <div className="absolute top-1/2 right-0 size-3 -translate-y-1/2 rounded-full bg-primary/40" />
                <div className="absolute top-1 left-1 size-3 rounded-full bg-primary/40" />
                <div className="absolute right-1 bottom-1 size-3 rounded-full bg-primary/40" />
                <div className="absolute top-3 right-3 size-2 rounded-full bg-muted-foreground/20" />
                <div className="absolute bottom-3 left-3 size-2 rounded-full bg-muted-foreground/20" />
                <div className="absolute right-0 bottom-6 size-2 rounded-full bg-muted-foreground/20" />
                <div className="absolute top-6 left-0 size-2 rounded-full bg-muted-foreground/20" />
            </div>
        </div>
    )
}

export function FeaturesGrid() {
    return (
        <section className="w-full px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <h2 className="text-pretty text-4xl tracking-tight">
                        Built for serious projects
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Where developer experience meets production readiness — designed to scale
                        with your ambitions.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="overflow-hidden border-border/50 py-0">
                        <StackPreview />
                        <CardContent className="space-y-2 py-6">
                            <h3 className="font-semibold">Battle-tested Stack</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Every dependency is chosen for production. Better Auth for security,
                                Drizzle for type-safe queries, Inngest for reliable background
                                processing.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-border/50 py-0">
                        <DxPreview />
                        <CardContent className="space-y-2 py-6">
                            <h3 className="font-semibold">Developer Experience</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Biome for instant linting, GritQL for custom rules, strict
                                TypeScript, and patterns that scale. Your future self will thank
                                you.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
