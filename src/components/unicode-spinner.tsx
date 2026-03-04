"use client"

import { useEffect, useState } from "react"
import spinners, { type BrailleSpinnerName } from "unicode-animations"

import { cn } from "@/lib/utils"

type UnicodeSpinnerProps = {
    spinner?: BrailleSpinnerName
    className?: string
}

function UnicodeSpinner({ spinner = "braille", className }: UnicodeSpinnerProps) {
    const s = spinners[spinner]

    const [frame, setFrame] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame((f) => (f + 1) % s.frames.length)
        }, s.interval)

        return () => clearInterval(timer)
    }, [s.interval, s.frames.length])

    return (
        <output aria-label="Loading" className={cn("font-mono", className)}>
            <span aria-hidden="true">{s.frames[frame]}</span>
        </output>
    )
}

export { UnicodeSpinner }
export type { UnicodeSpinnerProps }
