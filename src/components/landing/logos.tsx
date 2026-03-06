import { type ReactNode } from "react"
import { BetterAuthIcon } from "@/components/icons/better-auth"
import { BiomeIcon } from "@/components/icons/biome"
import { DrizzleIcon } from "@/components/icons/drizzle"
import { InngestIcon } from "@/components/icons/inngest"
import { NextjsIcon } from "@/components/icons/nextjs"
import { PolarIcon } from "@/components/icons/polar"
import { ShadcnIcon } from "@/components/icons/shadcn"
import { VercelIcon } from "@/components/icons/vercel"

type StackItem = {
    name: string
    icon: ReactNode
}

const STACK: StackItem[] = [
    { name: "Next.js", icon: <NextjsIcon className="size-5" /> },
    { name: "Vercel", icon: <VercelIcon className="size-5" /> },
    { name: "Inngest", icon: <InngestIcon className="h-4 w-auto" /> },
    { name: "Polar", icon: <PolarIcon className="size-5" /> },
    { name: "Drizzle", icon: <DrizzleIcon className="size-5" /> },
    { name: "Better Auth", icon: <BetterAuthIcon className="size-5" /> },
    { name: "Biome", icon: <BiomeIcon className="size-5" /> },
    { name: "shadcn/ui", icon: <ShadcnIcon className="size-5" /> },
]

export function Logos() {
    return (
        <section className="border-y bg-muted/30 py-12">
            <p className="mb-8 text-center font-medium text-muted-foreground text-sm uppercase tracking-widest">
                Built with the best
            </p>

            <div className="mx-auto grid max-w-4xl grid-cols-2 border-t border-l md:grid-cols-4">
                {STACK.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-center gap-2.5 border-r border-b px-4 py-6"
                    >
                        {item.icon}
                        <span className="font-semibold text-foreground text-sm tracking-tight">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
