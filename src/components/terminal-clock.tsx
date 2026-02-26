"use client"

import { useEffect, useState } from "react"

export function TerminalClock() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const update = () => {
            const now = new Date()
            const date = now
                .toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .toUpperCase()
            const clock = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
            setTime(`${date} ${clock}`)
        }
        update()
        const tickMs = 1000
        const id = setInterval(update, tickMs)
        return () => clearInterval(id)
    }, [])

    return <span suppressHydrationWarning={true}>{time || "\u00A0"}</span>
}
