import { currentUser } from "@clerk/nextjs/server"
import { type Metadata } from "next"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ManageAccountButton } from "@/components/manage-account-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { fallback } from "@/lib/utils"

export const metadata: Metadata = { title: "Settings" }

function AccountSectionError() {
    return <p className="text-destructive text-sm">Failed to load account. Refresh to try again.</p>
}

function AccountSectionSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </div>
            <Skeleton className="h-9 w-20" />
        </div>
    )
}

async function AccountSection() {
    const user = await currentUser()

    const initials = [user?.firstName, user?.lastName]
        .filter(Boolean)
        .map((n) => n?.[0])
        .join("")

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={user?.imageUrl} alt={fallback(user?.fullName, "")} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{user?.fullName}</p>
                    <p className="text-muted-foreground text-sm">
                        {user?.emailAddresses[0]?.emailAddress}
                    </p>
                </div>
            </div>
            <ManageAccountButton />
        </div>
    )
}

export default function SettingsPage() {
    return (
        <div className="max-w-2xl p-8">
            <h1 className="text-pretty font-semibold text-2xl">Settings</h1>

            <section className="mt-8 space-y-4">
                <p className="text-muted-foreground text-sm">Appearance</p>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Theme</p>
                        <p className="text-muted-foreground text-sm">
                            Choose your preferred color theme.
                        </p>
                    </div>
                    <ThemeToggle />
                </div>
            </section>

            <Separator className="my-6" />

            <section className="space-y-4">
                <p className="text-muted-foreground text-sm">Account</p>
                <ErrorBoundary fallback={<AccountSectionError />}>
                    <Suspense fallback={<AccountSectionSkeleton />}>
                        <AccountSection />
                    </Suspense>
                </ErrorBoundary>
            </section>
        </div>
    )
}
