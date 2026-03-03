"use client"

import { type Realtime } from "@inngest/realtime"
import { useCallback, useId, useState, useTransition } from "react"
import { triggerHelloWorld } from "@/app/(dashboard)/app/hello-world/actions"
import { RealtimeDisplay } from "@/app/(dashboard)/app/hello-world/realtime-display"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Token = Awaited<ReturnType<typeof triggerHelloWorld>>

export default function HelloWorldPage() {
    const inputId = useId()
    const [name, setName] = useState("")
    const [token, setToken] = useState<Token | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim()) {
            return
        }

        setToken(null)
        startTransition(async () => {
            const t = await triggerHelloWorld(name.trim())
            setToken(t)
        })
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="font-bold text-2xl">Hello World</h1>
                <p className="mt-1 text-muted-foreground text-sm">
                    Triggers the <code className="font-mono text-xs">app/hello-world</code> Inngest
                    function and streams the response back in realtime.
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

                {Boolean(token) && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm">Realtime</p>
                        <RealtimeDisplay token={token as Realtime.Subscribe.Token} />
                    </div>
                )}
            </div>
        </div>
    )
}
