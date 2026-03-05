import { type Metadata } from "next"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ChangePasswordForm } from "@/components/settings/change-password-form"
import { EmailField } from "@/components/settings/email-field"
import { UpdateNameForm } from "@/components/settings/update-name-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getSession } from "@/lib/auth/session"
import { getInitials } from "@/lib/auth/utils"

export const metadata: Metadata = { title: "Settings" }

function AccountSectionError() {
    return <p className="text-destructive text-sm">Failed to load account. Refresh to try again.</p>
}

function AccountSectionSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-3 w-64" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-3 w-72" />
            </div>
        </div>
    )
}

async function AccountSection() {
    const session = await getSession()

    if (!session) {
        return <p className="text-muted-foreground text-sm">Not signed in.</p>
    }

    const { user } = session
    const initials = getInitials(user.name)
    const avatarSrc = user.image != null ? user.image : undefined

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={avatarSrc} alt={user.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
            </div>
            <UpdateNameForm defaultName={user.name} />
            <EmailField email={user.email} />
        </div>
    )
}

export default function SettingsPage() {
    return (
        <div className="w-full max-w-2xl p-4 md:p-8">
            <h1 className="text-pretty font-semibold text-2xl">Settings</h1>

            {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for URL hash navigation */}
            <section
                id="appearance"
                aria-labelledby="heading-appearance"
                className="mt-8 scroll-mt-8 space-y-4"
            >
                {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for aria-labelledby */}
                <h2
                    id="heading-appearance"
                    className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-widest"
                >
                    Appearance
                </h2>
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

            <Separator className="my-8" />

            {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for URL hash navigation */}
            <section
                id="account"
                aria-labelledby="heading-account"
                className="scroll-mt-8 space-y-4"
            >
                {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for aria-labelledby */}
                <h2
                    id="heading-account"
                    className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-widest"
                >
                    Account
                </h2>
                <ErrorBoundary fallback={<AccountSectionError />}>
                    <Suspense fallback={<AccountSectionSkeleton />}>
                        <AccountSection />
                    </Suspense>
                </ErrorBoundary>
            </section>

            <Separator className="my-8" />

            {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for URL hash navigation */}
            <section
                id="security"
                aria-labelledby="heading-security"
                className="scroll-mt-8 space-y-4"
            >
                {/* biome-ignore lint/correctness/useUniqueElementIds: stable anchor for aria-labelledby */}
                <h2
                    id="heading-security"
                    className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-widest"
                >
                    Security
                </h2>
                <ChangePasswordForm />
            </section>
        </div>
    )
}
