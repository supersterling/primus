import { FileQuestion } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
    return (
        <div className="flex min-h-svh">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FileQuestion aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>Page not found</EmptyTitle>
                    <EmptyDescription>This page could not be found.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button asChild variant="outline">
                        <Link href="/app">Go home</Link>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}
