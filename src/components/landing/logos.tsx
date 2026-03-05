import { type ReactNode } from "react"
import { BetterAuthDarkIcon, BetterAuthIcon } from "@/components/icons/better-auth"
import { BiomeIcon } from "@/components/icons/biome"
import { DrizzleDarkIcon, DrizzleIcon } from "@/components/icons/drizzle"
import { InngestDarkIcon, InngestIcon } from "@/components/icons/inngest"
import { NextjsDarkIcon, NextjsIcon } from "@/components/icons/nextjs"
import { PolarDarkIcon, PolarIcon } from "@/components/icons/polar"
import { ShadcnDarkIcon, ShadcnIcon } from "@/components/icons/shadcn"
import { VercelDarkIcon, VercelIcon } from "@/components/icons/vercel"

type StackItem = {
    name: string
    lightIcon: ReactNode
    darkIcon: ReactNode
}

const STACK: StackItem[] = [
    {
        name: "Next.js",
        lightIcon: <NextjsIcon className="size-5" />,
        darkIcon: <NextjsDarkIcon className="size-5" />,
    },
    {
        name: "Vercel",
        lightIcon: <VercelIcon className="size-5" />,
        darkIcon: <VercelDarkIcon className="size-5" />,
    },
    {
        name: "Inngest",
        lightIcon: <InngestIcon className="h-4 w-auto" />,
        darkIcon: <InngestDarkIcon className="h-4 w-auto" />,
    },
    {
        name: "Polar",
        lightIcon: <PolarIcon className="size-5" />,
        darkIcon: <PolarDarkIcon className="size-5" />,
    },
    {
        name: "Drizzle",
        lightIcon: <DrizzleIcon className="size-5" />,
        darkIcon: <DrizzleDarkIcon className="size-5" />,
    },
    {
        name: "Better Auth",
        lightIcon: <BetterAuthIcon className="size-5" />,
        darkIcon: <BetterAuthDarkIcon className="size-5" />,
    },
    {
        name: "Biome",
        lightIcon: <BiomeIcon className="size-5" />,
        darkIcon: <BiomeIcon className="size-5" />,
    },
    {
        name: "shadcn/ui",
        lightIcon: <ShadcnIcon className="size-5" />,
        darkIcon: <ShadcnDarkIcon className="size-5" />,
    },
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
                        <span className="dark:hidden">{item.lightIcon}</span>
                        <span className="hidden dark:inline">{item.darkIcon}</span>
                        <span className="font-semibold text-foreground text-sm tracking-tight">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
