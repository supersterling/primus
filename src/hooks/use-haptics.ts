"use client"

import { useWebHaptics } from "web-haptics/react"

/**
 * Haptic feedback for mobile web users.
 *
 * No-ops silently on unsupported platforms (desktop).
 *
 * Presets: "success" | "warning" | "error" | "light" | "medium" | "heavy" |
 *          "soft" | "rigid" | "selection" | "nudge" | "buzz"
 *
 * @example
 * const { trigger } = useHaptics()
 * trigger("success")
 */
export function useHaptics() {
    return useWebHaptics()
}
