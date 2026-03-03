"use client"

import { type Realtime } from "@inngest/realtime"
import { useCallback, useId, useState, useTransition } from "react"
import { triggerHelloWorld } from "@/app/(dashboard)/app/hello-world/actions"
import { RealtimeDisplay } from "@/app/(dashboard)/app/hello-world/realtime-display"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Token = Awaited<ReturnType<typeof triggerHelloWorld>>

type Run = {
    token: Token
    startedAt: number
}

export default function HelloWorldPage() {
    const inputId = useId()
    const [name, setName] = useState("")
    const [run, setRun] = useState<Run | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim()) {
            return
        }

        setRun(null)
        startTransition(async () => {
            const startedAt = Date.now()
            const token = await triggerHelloWorld(name.trim())
            setRun({ token, startedAt })
        })
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="font-bold text-2xl">Hello World</h1>
                <p className="mt-1 text-muted-foreground text-sm">
                    Fires <code className="font-mono text-xs">app/hello-world</code>, streams a
                    greeting immediately, sleeps 3 seconds, then streams a farewell — all via
                    Inngest Realtime.
                </p>
            </div>

            <div className="max-w-sm space-y-6">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1.5">
                        <Label htmlFor={inputId}>Name</Label>
                        <Input
                            id={inputId}
                            placeholder="World"
                            value={name}
                            onChange={handleNameChange}
                            disabled={isPending}
                        />
                    </div>
                    <Button type="submit" disabled={isPending || !name.trim()}>
                        {isPending ? "Sending…" : "Send event"}
                    </Button>
                </form>

                {run !== null && (
                    <RealtimeDisplay
                        token={run?.token as Realtime.Subscribe.Token}
                        startedAt={run?.startedAt ?? 0}
                    />
                )}
            </div>
        </div>
    )
}
