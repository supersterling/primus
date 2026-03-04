import { currentUser } from "@clerk/nextjs/server"
import { type Metadata } from "next"
import { ManageAccountButton } from "@/components/manage-account-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { fallback } from "@/lib/utils"

export const metadata: Metadata = { title: "Settings" }

export default async function SettingsPage() {
    const user = await currentUser()

    const initials = [user?.firstName, user?.lastName]
        .filter(Boolean)
        .map((n) => n?.[0])
        .join("")

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
            </section>
        </div>
    )
}
