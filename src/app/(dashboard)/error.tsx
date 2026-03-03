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

export default function DashboardError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
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
    )
}
