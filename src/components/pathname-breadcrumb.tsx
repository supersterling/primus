"use client"

import { type Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const LABELS: Record<string, string> = {
    app: "Dashboard",
    settings: "Settings",
}

function toLabel(segment: string): string {
    return LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

export function PathnameBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)
    const crumbs = segments.map((segment, i) => ({
        label: toLabel(segment),
        href: `/${segments.slice(0, i + 1).join("/")}`,
    }))

    if (crumbs.length === 0) {
        return null
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1
                    return (
                        <BreadcrumbItem key={crumb.href}>
                            {isLast ? (
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            ) : (
                                <Fragment>
                                    <BreadcrumbLink asChild>
                                        <Link href={crumb.href as Route}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </Fragment>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
