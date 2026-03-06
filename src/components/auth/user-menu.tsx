"use client"

import { LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth/client"
import { getInitials } from "@/lib/auth/utils"
import { result } from "@/lib/either"
import { type Nullable } from "@/lib/types"

type UserMenuSession = {
    user: {
        name: string
        image?: Nullable<string>
    }
}

export function UserMenu({ session }: { session: UserMenuSession | null }) {
    const router = useRouter()

    const handleSignOut = useCallback(async () => {
        const res = await result.trycatch(async () => authClient.signOut())

        if (!res.ok) {
            toast.error("Unable to sign out. Check your connection and try again.")
            return
        }

        if (res.value.error) {
            toast.error(res.value.error.message)
            return
        }

        router.push("/")
        router.refresh()
    }, [router])

    if (!session) {
        return (
            <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
            </Button>
        )
    }

    const { user } = session
    const initials = getInitials(user.name)
    // Normalize Better Auth's string | null | undefined to string | undefined
    const avatarSrc = user.image != null ? user.image : undefined

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-11 rounded-full p-0" aria-label="User menu">
                    <Avatar className="size-8">
                        <AvatarImage src={avatarSrc} alt={user.name} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="/app/settings">
                        <Settings className="mr-2 size-4" aria-hidden="true" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 size-4" aria-hidden="true" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
