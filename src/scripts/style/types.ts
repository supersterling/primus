type RuleId =
    | "require-resolvable-tailwind-class"
    | "require-theme-color-token"
    | "require-theme-spacing-token"
    | "require-theme-radius-token"
    | "require-theme-shadow-token"

type Violation = {
    file: string
    line: number
    column: number
    rule: RuleId
    message: string
    className?: string
    componentName?: string
}

type ClassLocation = {
    text: string
    line: number
    column: number
}

export type { ClassLocation, RuleId, Violation }
