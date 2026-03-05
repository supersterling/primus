"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type Message = {
    id: number
    name: string
    avatar: string
    text: string
    isUser: boolean
}

type ChatConversationProps = {
    className?: string
    messages?: Message[]
}

const STAGGER_DELAY = 0.3
const TEXT_OFFSET = 0.15
const SLIDE_DISTANCE = 10

const defaultMessages: Message[] = [
    {
        id: 1,
        name: "Sarah",
        avatar: "https://assets.aceternity.com/avatars/1.webp",
        text: "Hey! Are you free for a quick call?",
        isUser: false,
    },
    {
        id: 2,
        name: "You",
        avatar: "https://assets.aceternity.com/avatars/manu.webp",
        text: "Sure, give me 5 minutes!",
        isUser: true,
    },
    {
        id: 3,
        name: "Tyler",
        avatar: "https://assets.aceternity.com/avatars/8.webp",
        text: "Sounds good",
        isUser: false,
    },
    {
        id: 4,
        name: "Sarah",
        avatar: "https://assets.aceternity.com/avatars/manu.webp",
        text: "I'm not sure if I can make it.",
        isUser: true,
    },
]

export function ChatConversation({ className, messages }: ChatConversationProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const items = messages ? messages : defaultMessages

    return (
        <div className={cn("flex min-h-60 items-center justify-center p-4", className)}>
            <div ref={ref} className="flex flex-col justify-center gap-3">
                {items.map((message, index) => {
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
                                className="rounded-xl bg-white px-3 py-2 text-neutral-700 text-sm shadow-black/5 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200"
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
