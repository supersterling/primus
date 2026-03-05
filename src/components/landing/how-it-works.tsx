"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type Step = {
    id: string
    title: string
    description: string
    label: string
}

const steps: Step[] = [
    {
        id: "step-1",
        label: "1",
        title: "Clone the repo",
        description:
            "One command to scaffold your project with the entire stack configured and ready.",
    },
    {
        id: "step-2",
        label: "2",
        title: "Configure your services",
        description:
            "Set up Better Auth, Polar, and Inngest with your API keys. Environment validation catches mistakes early.",
    },
    {
        id: "step-3",
        label: "3",
        title: "Build your features",
        description:
            "Focus on your product logic. Auth, payments, and background jobs are already wired up.",
    },
    {
        id: "step-4",
        label: "4",
        title: "Ship to production",
        description: "Deploy to Vercel with zero config. Inngest and Polar webhooks just work.",
    },
]

const dotKeys = [
    "dot-tl",
    "dot-tc",
    "dot-tr",
    "dot-ml",
    "dot-mc",
    "dot-mr",
    "dot-bl",
    "dot-bc",
    "dot-br",
] as const

function VisualPreview() {
    return (
        <div className="flex aspect-square items-center justify-center rounded-xl bg-muted/50">
            <div className="flex flex-col items-center gap-4">
                <div className="grid grid-cols-3 gap-2">
                    {dotKeys.map((key) => (
                        <div key={key} className="size-2 rounded-full bg-muted-foreground/20" />
                    ))}
                </div>
                <div className="h-px w-16 bg-border" />
                <div className="flex gap-2">
                    <div className="h-2 w-12 rounded-full bg-primary/30" />
                    <div className="h-2 w-8 rounded-full bg-muted-foreground/20" />
                </div>
            </div>
        </div>
    )
}

const sectionId = "how-it-works"

export function HowItWorks() {
    return (
        <section id={sectionId} className="w-full px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-16 text-center">
                    <h2 className="text-pretty text-4xl tracking-tight">
                        From clone to production in four steps
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Primus removes the guesswork so you can focus on what makes your product
                        unique.
                    </p>
                </div>

                <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
                    <Accordion type="single" defaultValue="step-1" collapsible>
                        {steps.map((step) => (
                            <AccordionItem key={step.id} value={step.id}>
                                <AccordionTrigger className="text-base">
                                    <span className="flex items-center gap-3">
                                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                                            {step.label}
                                        </span>
                                        {step.title}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="pl-10 text-muted-foreground">
                                    {step.description}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <VisualPreview />
                </div>
            </div>
        </section>
    )
}
