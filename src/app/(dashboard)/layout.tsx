import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ChessKing, LayoutDashboard, Settings } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { Fragment } from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
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

const LABELS: Record<string, string> = {
    app: "Dashboard",
    settings: "Settings",
}

function toLabel(segment: string): string {
    return LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = (await headers()).get("x-pathname") ?? "/"
    const segments = pathname.split("/").filter(Boolean)
    const crumbs = segments.map((segment, i) => ({
        label: toLabel(segment),
        href: `/${segments.slice(0, i + 1).join("/")}`,
    }))

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
                                                    <BreadcrumbLink href={crumb.href}>
                                                        {crumb.label}
                                                    </BreadcrumbLink>
                                                    <BreadcrumbSeparator />
                                                </Fragment>
                                            )}
                                        </BreadcrumbItem>
                                    )
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2">
                        <SignedOut>
                            <SignInButton>
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
