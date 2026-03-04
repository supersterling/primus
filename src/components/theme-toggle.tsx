"use client"

import { useTheme } from "next-themes"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    const setLight = useCallback(() => setTheme("light"), [setTheme])
    const setDark = useCallback(() => setTheme("dark"), [setTheme])
    const setSystem = useCallback(() => setTheme("system"), [setTheme])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-24">
                    Theme
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={setLight}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={setDark}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={setSystem}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
