import { type Route } from "next"

export function isRelativePath(url: string): url is Route {
    return url.startsWith("/") && !url.startsWith("//")
}

export function getInitials(name: string | undefined): string {
    if (!name) {
        return ""
    }
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
}
