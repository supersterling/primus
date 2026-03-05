import { ChessKing, LayoutDashboard, Settings } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/auth/user-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { getSession } from "@/lib/auth/session"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <ChessKing aria-hidden="true" />
                                    <span className="font-serif text-lg">Primus</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Dashboard">
                                        <Link href="/app">
                                            <LayoutDashboard aria-hidden="true" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Settings">
                                        <Link href="/app/settings">
                                            <Settings aria-hidden="true" />
                                            <span>Settings</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex items-center justify-between border-b px-4 py-2">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                    </div>
                    <div className="flex items-center gap-2">
                        <UserMenu session={session} />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
