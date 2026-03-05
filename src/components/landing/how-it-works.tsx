"use client"

import {
    CheckCircle2,
    ChevronRight,
    File,
    Folder,
    FolderOpen,
    GitBranch,
    Globe,
    Terminal,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const ANIM_DURATION = 0.25

type Step = {
    id: string
    label: string
    title: string
    description: string
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

function TerminalLine({ dim, children }: { dim?: boolean; children: string }) {
    return (
        <div
            className={cn(
                "font-mono text-xs",
                dim ? "text-muted-foreground/60" : "text-foreground",
            )}
        >
            {children}
        </div>
    )
}

function CloneVisual() {
    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <Terminal className="size-4" />
                <span className="font-mono text-xs">Terminal</span>
            </div>
            <div className="space-y-1">
                <TerminalLine>$ bunx degit supersterling/primus my-saas</TerminalLine>
                <TerminalLine dim> cloned supersterling/primus#HEAD</TerminalLine>
                <TerminalLine>$ cd my-saas &amp;&amp; bun install</TerminalLine>
                <TerminalLine dim> Resolving dependencies...</TerminalLine>
                <TerminalLine dim> Installed 847 packages</TerminalLine>
                <div className="mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-green" />
                    <span className="font-mono text-green text-xs">Done in 4.2s</span>
                </div>
            </div>
        </div>
    )
}

function ConfigureVisual() {
    const envVars = [
        { key: "DATABASE_URL", value: "postgresql://..." },
        { key: "BETTER_AUTH_SECRET", value: "sk_live_..." },
        { key: "POLAR_ACCESS_TOKEN", value: "pat_..." },
        { key: "INNGEST_EVENT_KEY", value: "evt_..." },
        { key: "INNGEST_SIGNING_KEY", value: "signkey-..." },
        { key: "NEXT_PUBLIC_APP_URL", value: "http://localhost:3000" },
    ]

    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <File className="size-4" />
                <span className="font-mono text-xs">.env.local</span>
            </div>
            <div className="space-y-1">
                {envVars.map((v) => (
                    <div key={v.key} className="font-mono text-xs">
                        <span className="text-muted-foreground">{v.key}</span>
                        <span className="text-muted-foreground/50">=</span>
                        <span className="text-foreground/70">{v.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

type TreeEntry = {
    name: string
    icon: "folder" | "folder-open" | "file"
    padding: string
}

const treeEntries: TreeEntry[] = [
    { name: "src/", icon: "folder-open", padding: "pl-0" },
    { name: "app/", icon: "folder-open", padding: "pl-4" },
    { name: "(dashboard)/", icon: "folder", padding: "pl-8" },
    { name: "api/", icon: "folder", padding: "pl-8" },
    { name: "page.tsx", icon: "file", padding: "pl-8" },
    { name: "components/", icon: "folder", padding: "pl-4" },
    { name: "lib/", icon: "folder-open", padding: "pl-4" },
    { name: "auth/", icon: "folder", padding: "pl-8" },
    { name: "db/", icon: "folder", padding: "pl-8" },
    { name: "env.ts", icon: "file", padding: "pl-8" },
    { name: "inngest/", icon: "folder", padding: "pl-4" },
]

function TreeIcon({ type }: { type: TreeEntry["icon"] }) {
    if (type === "folder-open") {
        return <FolderOpen className="size-3.5 text-primary/70" />
    }
    if (type === "folder") {
        return <Folder className="size-3.5 text-muted-foreground" />
    }
    return <File className="size-3.5 text-muted-foreground/60" />
}

function BuildVisual() {
    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <Folder className="size-4" />
                <span className="font-mono text-xs">Project structure</span>
            </div>
            <div className="space-y-0.5">
                {treeEntries.map((entry) => (
                    <div
                        key={`${entry.padding}-${entry.name}`}
                        className={cn(
                            "flex items-center gap-1.5 rounded px-1 py-0.5",
                            entry.padding,
                        )}
                    >
                        <TreeIcon type={entry.icon} />
                        <span className="font-mono text-xs">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

type Deployment = {
    id: string
    env: string
    branch: string
    commit: string
    time: string
    current: boolean
}

const deployments: Deployment[] = [
    {
        id: "dpl_7xK2m",
        env: "Production",
        branch: "main",
        commit: "feat: add landing page",
        time: "38s",
        current: true,
    },
    {
        id: "dpl_3fN9p",
        env: "Preview",
        branch: "feat/dashboard",
        commit: "add analytics chart",
        time: "35s",
        current: false,
    },
    {
        id: "dpl_1qW4r",
        env: "Production",
        branch: "main",
        commit: "fix: session handling",
        time: "37s",
        current: false,
    },
]

function DeployVisual() {
    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="size-4" />
                    <span className="font-mono text-xs">Deployments</span>
                </div>
            </div>
            <div className="space-y-2">
                {deployments.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 rounded-md border px-3 py-2">
                        <div className="size-2 rounded-full bg-green" />
                        <div className="flex-1 space-y-0.5">
                            <div className="flex items-center gap-2">
                                <span className="font-medium font-mono text-xs">{d.id}</span>
                                {d.current === true && (
                                    <span className="rounded-full bg-green/10 px-1.5 py-0.5 text-green text-xs">
                                        Current
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                <span>{d.env}</span>
                                <ChevronRight className="size-3" />
                                <GitBranch className="size-3" />
                                <span className="font-mono">{d.branch}</span>
                            </div>
                        </div>
                        <span className="text-muted-foreground text-xs">{d.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const visualMap: Record<string, () => React.JSX.Element> = {
    "step-1": CloneVisual,
    "step-2": ConfigureVisual,
    "step-3": BuildVisual,
    "step-4": DeployVisual,
}

const sectionId = "how-it-works"

export function HowItWorks() {
    const [activeStep, setActiveStep] = useState("step-1")

    const handleValueChange = useCallback((value: string) => {
        if (value) {
            setActiveStep(value)
        }
    }, [])

    const ActiveVisual = visualMap[activeStep]

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
                    <Accordion
                        type="single"
                        defaultValue="step-1"
                        collapsible
                        onValueChange={handleValueChange}
                    >
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

                    <div className="rounded-xl bg-muted/50 p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: ANIM_DURATION }}
                            >
                                {ActiveVisual ? <ActiveVisual /> : null}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
