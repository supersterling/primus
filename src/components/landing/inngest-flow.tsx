"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type StepStatus = "done" | "running" | "waiting"

type Step = {
    name: string
    status: StepStatus
    delay: number
}

const ANIM_DURATION = 0.3
const PROGRESS_DURATION = 2
const PROGRESS_OFFSET = 0.3

const steps: Step[] = [
    { name: "send-welcome-email", status: "done", delay: 0.2 },
    { name: "sync-to-crm", status: "done", delay: 0.6 },
    { name: "provision-workspace", status: "running", delay: 1.0 },
]

function StatusDot({ status }: { status: StepStatus }) {
    if (status === "running") {
        return <div className="size-2 animate-pulse rounded-full bg-primary" />
    }
    if (status === "done") {
        return <div className="size-2 rounded-full bg-green" />
    }
    return <div className="size-2 rounded-full bg-muted-foreground/30" />
}

export function InngestFlow({ className }: { className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-30px" })

    return (
        <div ref={ref} className={cn("flex w-full flex-col gap-2 p-6", className)}>
            <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIM_DURATION }}
                className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5 shadow-sm"
            >
                <div className="size-2 rounded-full bg-green" />
                <span className="flex-1 font-mono text-xs">user.created</span>
                <span className="text-muted-foreground text-xs">event</span>
            </motion.div>

            <div className="ml-5 flex flex-col gap-1.5 border-primary/30 border-l-2 border-dashed py-1 pl-4">
                {steps.map((step) => (
                    <motion.div
                        key={step.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: ANIM_DURATION, delay: step.delay }}
                        className="flex items-center gap-2 rounded-md bg-muted/80 px-2.5 py-1.5"
                    >
                        <StatusDot status={step.status} />
                        <span className="font-mono text-xs">{step.name}</span>
                        {step.status === "running" && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "30%" } : {}}
                                transition={{
                                    duration: PROGRESS_DURATION,
                                    delay: step.delay + PROGRESS_OFFSET,
                                    ease: "easeOut",
                                }}
                                className="ml-auto h-1 rounded-full bg-primary/40"
                            />
                        )}
                        {step.status === "done" && (
                            <span className="ml-auto text-muted-foreground text-xs">✓</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
