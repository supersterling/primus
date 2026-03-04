import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Explicitly provide a fallback for a nullable value.
 *
 * Use instead of `??` to make the intent clear: you know the value can be
 * null or undefined and have consciously chosen a default.
 *
 * @example
 * fallback(user.name, "Anonymous")  // instead of user.name ?? "Anonymous"
 */
export function fallback<T>(value: T | null | undefined, def: NonNullable<T>): NonNullable<T> {
    if (value === null || value === undefined) {
        return def
    }

    return value
}
