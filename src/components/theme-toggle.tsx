"use client"

import { useTheme } from "next-themes"
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher"

type ThemeValue = "light" | "dark" | "system"

function isThemeValue(value: string | undefined): value is ThemeValue {
    return value === "light" || value === "dark" || value === "system"
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const value = isThemeValue(theme) ? theme : "system"

    return <ThemeSwitcher defaultValue="system" onChange={setTheme} value={value} />
}
