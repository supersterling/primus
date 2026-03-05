"use client"

import Image from "next/image"
import { type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import kingSvg from "./king.svg"

type AuthFormShellProps = {
    title: string
    description: string
    className?: string
    socialSection: ReactNode
    footer: ReactNode
    children: ReactNode
}

export function AuthFormShell({
    title,
    description,
    className,
    socialSection,
    footer,
    children,
}: AuthFormShellProps) {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="font-bold text-2xl">{title}</h1>
                                <p className="text-balance text-muted-foreground text-sm">
                                    {description}
                                </p>
                            </div>
                            {children}
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            {socialSection}
                            {footer}
                        </FieldGroup>
                    </div>
                    <div className="relative hidden bg-muted md:block" aria-hidden="true">
                        <Image
                            src={kingSvg}
                            alt=""
                            fill
                            className="object-cover dark:brightness-[0.5] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
