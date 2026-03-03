"use client"

import { type Realtime } from "@inngest/realtime"
import { useInngestSubscription } from "@inngest/realtime/hooks"
import { useEffect, useRef, useState } from "react"

type Token = Realtime.Subscribe.Token | null | undefined

type RealtimeDisplayProps = {
    token: Token
    startedAt: number
}

type FeedMessage = {
    id: string
    topic: string
    text: string
    receivedAt: number
}

const ELAPSED_TICK_MS = 100
const MS_PER_SECOND = 1000
const DOT_DELAY_MS = 150

function useElapsed(startedAt: number, stop: boolean) {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        if (stop) {
            return
        }
        setElapsed(Date.now() - startedAt)
        const id = setInterval(() => {
            setElapsed(Date.now() - startedAt)
        }, ELAPSED_TICK_MS)
        return () => clearInterval(id)
    }, [startedAt, stop])

    return elapsed
}

function formatMs(ms: number) {
    if (ms < MS_PER_SECOND) {
        return `${ms}ms`
    }
    return `${(ms / MS_PER_SECOND).toFixed(1)}s`
}

export function RealtimeDisplay({ token, startedAt }: RealtimeDisplayProps) {
    const { data, state } = useInngestSubscription({
        token: token as Parameters<typeof useInngestSubscription>[0]["token"],
    })

    const isActive = state === "active"

    // Accumulate messages with real client-side arrival timestamps
    const [feed, setFeed] = useState<FeedMessage[]>([])
    const seenTopics = useRef<Set<string>>(new Set())

    useEffect(() => {
        for (const m of data) {
            if (m.topic !== "greeting" && m.topic !== "farewell") {
                continue
            }
            const key = `${m.topic}`
            if (seenTopics.current.has(key)) {
                continue
            }
            seenTopics.current.add(key)
            setFeed((prev) => [
                ...prev,
                {
                    id: key,
                    topic: m.topic,
                    text:
                        m.topic === "greeting"
                            ? (m.data as { greeting: string }).greeting
                            : (m.data as { farewell: string }).farewell,
                    receivedAt: Date.now(),
                },
            ])
        }
    }, [data])

    // All 2 messages received = function is done, stop the timer
    const allReceived = feed.length >= 2
    const isDone = state === "closed" || state === "closing" || allReceived
    const elapsed = useElapsed(startedAt, isDone)

    const bottomRef = useRef<HTMLDivElement>(null)
    // biome-ignore lint/correctness/useExhaustiveDependencies: re-scroll on each new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [feed.length])

    const isWaiting = isActive && !allReceived

    return (
        <div className="space-y-3">
            {/* Status bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <StatusDot state={state} />
                    <span className="text-muted-foreground text-xs">
                        {stateLabel[state] ?? state}
                    </span>
                </div>
                <span className="font-mono text-muted-foreground text-xs">{formatMs(elapsed)}</span>
            </div>

            {/* Feed */}
            <div className="flex min-h-[120px] flex-col gap-2 rounded-lg border bg-muted/30 p-3">
                {feed.length === 0 && isActive && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <PulsingDots />
                        <span>Waiting for first message…</span>
                    </div>
                )}

                {feed.map((msg) => (
                    <div
                        key={msg.id}
                        className="fade-in slide-in-from-bottom-1 animate-in duration-300"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="font-mono text-[11px] text-muted-foreground uppercase">
                                {msg.topic}
                            </span>
                            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                                +{formatMs(msg.receivedAt - startedAt)}
                            </span>
                        </div>
                        <p className="mt-0.5 text-sm">{msg.text}</p>
                    </div>
                ))}

                {isWaiting && feed.length > 0 && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <PulsingDots />
                        <span>Waiting for next message…</span>
                    </div>
                )}

                {isDone && feed.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">No messages received.</p>
                )}

                <div ref={bottomRef} />
            </div>
        </div>
    )
}

function dotColorClass(state: string): string {
    if (state === "active") {
        return "bg-green-500"
    }
    if (state === "connecting" || state === "refresh_token") {
        return "bg-yellow-500 animate-pulse"
    }
    if (state === "error") {
        return "bg-red-500"
    }
    return "bg-muted-foreground"
}

function StatusDot({ state }: { state: string }) {
    return <span className={`inline-block h-2 w-2 rounded-full ${dotColorClass(state)}`} />
}

function PulsingDots() {
    return (
        <span className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * DOT_DELAY_MS}ms` }}
                />
            ))}
        </span>
    )
}

const stateLabel: Record<string, string> = {
    closed: "Done",
    error: "Error",
    // biome-ignore lint/style/useNamingConvention: matches InngestSubscriptionState enum value
    refresh_token: "Refreshing…",
    connecting: "Connecting…",
    active: "Connected",
    closing: "Closing…",
}
