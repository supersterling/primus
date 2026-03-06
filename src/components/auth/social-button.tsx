"use client"

import { Loader2 } from "lucide-react"
import { type ReactNode, useCallback, useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/client"
import { result } from "@/lib/either"

export type SocialProviders = {
    google: boolean
    github: boolean
}

type SocialButtonProps = {
    provider: keyof SocialProviders
    enabled: boolean
    icon: ReactNode
    label: string
    callbackUrl?: string
}

export function SocialButton({
    provider,
    enabled,
    icon,
    label,
    callbackUrl = "/app",
}: SocialButtonProps) {
    const [isPending, setIsPending] = useState(false)

    const handleClick = useCallback(async () => {
        setIsPending(true)

        const res = await result.trycatch(async () =>
            // biome-ignore lint/style/useNamingConvention: better-auth API property
            authClient.signIn.social({ provider, callbackURL: callbackUrl }),
        )

        if (!res.ok) {
            toast.error("Unable to sign in. Check your connection and try again.")
            setIsPending(false)
            return
        }

        if (res.value.error) {
            toast.error(res.value.error.message)
            setIsPending(false)
        }
    }, [provider, callbackUrl])

    const isDisabled = !enabled || isPending
    const showDisabledBadge = !enabled
    const buttonIcon = isPending ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    ) : (
        icon
    )

    return (
        <div className="relative">
            <Button
                variant="outline"
                type="button"
                disabled={isDisabled}
                onClick={handleClick}
                className="w-full"
            >
                {buttonIcon}
                <span className="sr-only">{label}</span>
            </Button>
            {showDisabledBadge && (
                <Badge
                    variant="secondary"
                    className="pointer-events-none absolute -top-2 -right-2 text-xs leading-none"
                    aria-hidden="true"
                >
                    Disabled
                </Badge>
            )}
        </div>
    )
}
