import { CheckCircle2, Crown, Terminal } from "lucide-react"
import { BetterAuthIcon } from "@/components/icons/better-auth"
import { BiomeIcon } from "@/components/icons/biome"
import { DrizzleIcon } from "@/components/icons/drizzle"
import { InngestIcon } from "@/components/icons/inngest"
import { NextjsIcon } from "@/components/icons/nextjs"
import { PolarIcon } from "@/components/icons/polar"
import { Card, CardContent } from "@/components/ui/card"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

function StackPreview() {
    return (
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-muted/50">
            <div className="relative flex size-full items-center justify-center">
                <Crown className="size-8 text-foreground" aria-hidden="true" />

                <OrbitingCircles iconSize={32} radius={70} speed={0.5}>
                    <NextjsIcon className="size-5" />
                    <DrizzleIcon className="size-5" />
                    <BetterAuthIcon className="size-5" />
                </OrbitingCircles>

                <OrbitingCircles iconSize={32} radius={120} speed={0.3} reverse>
                    <PolarIcon className="size-5" />
                    <InngestIcon className="h-3.5 w-auto" />
                    <BiomeIcon className="size-5" />
                </OrbitingCircles>
            </div>
        </div>
    )
}

function DxPreview() {
    return (
        <div className="flex min-h-[280px] items-center justify-center bg-muted/50 p-6">
            <div className="w-full rounded-lg border bg-card p-4">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                    <Terminal className="size-4" />
                    <span className="font-mono text-xs">bun run checks</span>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-green" />
                        <span className="font-mono text-xs">tsc --noEmit</span>
                        <span className="ml-auto text-muted-foreground text-xs">0 errors</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-green" />
                        <span className="font-mono text-xs">biome check</span>
                        <span className="ml-auto text-muted-foreground text-xs">139 files</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-green" />
                        <span className="font-mono text-xs">docref check</span>
                        <span className="ml-auto text-muted-foreground text-xs">42 refs</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-green" />
                        <span className="font-mono text-xs">grit test</span>
                        <span className="ml-auto text-muted-foreground text-xs">18 rules</span>
                    </div>
                    <div className="mt-1 border-t pt-2">
                        <span className="font-mono text-green text-xs">
                            All checks passed in 1.8s
                        </span>
                    </div>
                </div>
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
