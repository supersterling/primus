"use client"

import { useTheme } from "next-themes"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-32">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
    )
}
