"use client"

import { type Realtime } from "@inngest/realtime"
import { useInngestSubscription } from "@inngest/realtime/hooks"

type Token = Realtime.Subscribe.Token | null | undefined

type RealtimeDisplayProps = {
    token: Token
}

function dotColor(state: string): string {
    if (state === "active") {
        return "bg-green-500"
    }
    if (state === "connecting" || state === "refresh_token") {
        return "bg-yellow-500"
    }
    if (state === "error") {
        return "bg-red-500"
    }
    return "bg-muted-foreground"
}

const stateLabel: Record<string, string> = {
    closed: "Disconnected",
    error: "Error",
    // biome-ignore lint/style/useNamingConvention: matches InngestSubscriptionState enum value
    refresh_token: "Refreshing…",
    connecting: "Connecting…",
    active: "Connected",
    closing: "Closing…",
}

export function RealtimeDisplay({ token }: RealtimeDisplayProps) {
    // Cast: @inngest/realtime types are pinned to v3; core v4 types are structurally identical at runtime
    const { data, state } = useInngestSubscription({
        token: token as Parameters<typeof useInngestSubscription>[0]["token"],
    })

    const greeting = data.findLast((m) => m.topic === "greeting")
    const farewell = data.findLast((m) => m.topic === "farewell")

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${dotColor(state)}`} />
                <span className="text-muted-foreground text-xs">{stateLabel[state] ?? state}</span>
            </div>

            <div className="grid gap-3">
                <MessageCard
                    label="Greeting"
                    message={greeting?.topic === "greeting" ? greeting.data.greeting : undefined}
                />
                <MessageCard
                    label="Farewell"
                    message={farewell?.topic === "farewell" ? farewell.data.farewell : undefined}
                />
            </div>
        </div>
    )
}

function MessageCard({ label, message }: { label: string; message?: string }) {
    return (
        <div className="rounded-lg border bg-muted/40 p-4">
            <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                {label}
            </p>
            {message ? (
                <p className="text-sm">{message}</p>
            ) : (
                <p className="text-muted-foreground text-sm italic">Waiting…</p>
            )}
        </div>
    )
}
