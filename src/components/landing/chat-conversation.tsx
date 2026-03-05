"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const STAGGER_DELAY = 0.3
const TEXT_OFFSET = 0.15
const SLIDE_DISTANCE = 10

const messages = [
    {
        id: 1,
        name: "Sarah",
        avatar: "https://assets.aceternity.com/avatars/1.webp",
        text: "Just signed in with Google — took 2 seconds!",
        isUser: false,
    },
    {
        id: 2,
        name: "You",
        avatar: "https://assets.aceternity.com/avatars/manu.webp",
        text: "Session synced across all my devices",
        isUser: true,
    },
    {
        id: 3,
        name: "Tyler",
        avatar: "https://assets.aceternity.com/avatars/8.webp",
        text: "Email/password works too — zero config",
        isUser: false,
    },
    {
        id: 4,
        name: "You",
        avatar: "https://assets.aceternity.com/avatars/manu.webp",
        text: "Better Auth handles it all.",
        isUser: true,
    },
]

export function ChatConversation({ className }: { className?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <div className={cn("flex min-h-60 items-center justify-center p-4", className)}>
            <div ref={ref} className="flex flex-col justify-center gap-3">
                {messages.map((message, index) => {
                    const baseDelay = index * STAGGER_DELAY
                    const directionClass = message.isUser ? "flex-row-reverse" : ""
                    const slideX = message.isUser ? SLIDE_DISTANCE : -SLIDE_DISTANCE
                    return (
                        <div
                            key={message.id}
                            className={`flex items-start gap-3 ${directionClass}`}
                        >
                            {/* biome-ignore lint/performance/noImgElement: motion.img doesn't support next/image */}
                            {/* biome-ignore lint/correctness/useImageSize: external avatar URLs */}
                            <motion.img
                                src={message.avatar}
                                alt={message.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: STAGGER_DELAY, delay: baseDelay }}
                                className="size-8 shrink-0 rounded-full object-cover"
                            />
                            <motion.div
                                initial={{ opacity: 0, x: slideX }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: STAGGER_DELAY,
                                    delay: baseDelay + TEXT_OFFSET,
                                }}
                                className="rounded-xl bg-background px-3 py-2 text-sm shadow-sm ring-1 ring-border"
                            >
                                {message.text}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
