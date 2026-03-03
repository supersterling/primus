"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import "./globals.css"

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className="flex min-h-svh">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <AlertCircle aria-hidden="true" />
                        </EmptyMedia>
                        <EmptyTitle>Something went wrong</EmptyTitle>
                        <EmptyDescription>An unexpected error occurred.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button variant="outline" onClick={reset}>
                            Try again
                        </Button>
                    </EmptyContent>
                </Empty>
            </body>
        </html>
    )
}
