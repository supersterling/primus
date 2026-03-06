"use client"

import { ChessKing, Menu, Moon, Sun, X } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Fragment, type MouseEvent, useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
]

function smoothScroll(e: MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href")
    if (!href?.startsWith("#")) {
        return
    }
    e.preventDefault()
    const target = document.getElementById(href.slice(1))
    if (target) {
        target.scrollIntoView({ behavior: "smooth" })
    }
}

function scrollToTop(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
}

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    const toggleTheme = useCallback(() => {
        const next = resolvedTheme === "dark" ? "light" : "dark"
        setTheme(next)
    }, [resolvedTheme, setTheme])

    const toggleMenu = useCallback(() => {
        setMobileOpen((prev) => !prev)
    }, [])

    const handleMobileLink = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        smoothScroll(e)
        setMobileOpen(false)
    }, [])

    const menuIcon = mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />

    return (
        <Fragment>
            <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
                <nav
                    className={cn(
                        "flex w-full max-w-3xl items-center justify-between",
                        "rounded-full border bg-background/80 px-4 py-2 shadow-sm backdrop-blur-md",
                    )}
                >
                    <a
                        href="/"
                        onClick={scrollToTop}
                        className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest"
                    >
                        <ChessKing className="size-5" />
                        <span>Primus</span>
                    </a>

                    <div className="hidden items-center gap-6 md:flex">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={smoothScroll}
                                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Button asChild size="sm" className="hidden md:inline-flex">
                            <Link href="/sign-in">Get started</Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {menuIcon}
                        </Button>
                    </div>
                </nav>
            </header>

            {mobileOpen === true && (
                <div className="fixed inset-x-0 top-18 z-40 border-b bg-background/95 px-6 py-4 backdrop-blur-md md:hidden">
                    <div className="flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                                onClick={handleMobileLink}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button asChild size="sm" className="w-full">
                            <Link href="/sign-in">Get started</Link>
                        </Button>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
