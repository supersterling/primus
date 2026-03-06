import { type LoadedDesignSystem } from "@/scripts/style/design-system"
import { type ClassLocation, type Violation } from "@/scripts/style/types"

const RULE_ID = "require-theme-color-token" as const

const COLOR_PATTERN =
    /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|hwb\(|color\()/

const COLOR_ROOTS = new Set([
    "bg",
    "text",
    "border",
    "outline",
    "ring",
    "accent",
    "caret",
    "fill",
    "stroke",
    "decoration",
    "divide",
    "placeholder",
    "from",
    "via",
    "to",
    "shadow",
    "ring-offset",
])

// ── check ───────────────────────────────────────────

function check(
    classes: ClassLocation[],
    designSystem: LoadedDesignSystem,
    file: string,
): Violation[] {
    const violations: Violation[] = []

    for (const cls of classes) {
        const candidates = designSystem.ds.parseCandidate(cls.text)

        for (const candidate of candidates) {
            if (candidate.kind !== "functional") {
                continue
            }

            if (!COLOR_ROOTS.has(candidate.root)) {
                continue
            }

            const value = candidate.value
            if (!value) {
                continue
            }

            if (value.kind === "named") {
                const isInAll = designSystem.allColors.has(value.value)
                const isAllowed = designSystem.allowedColors.has(value.value)

                if (isInAll && !isAllowed) {
                    violations.push({
                        file,
                        line: cls.line,
                        column: cls.column,
                        rule: RULE_ID,
                        message: `Use a theme color token. \`${value.value}\` is not in the design system.`,
                        className: cls.text,
                    })
                }
            }

            if (value.kind === "arbitrary" && COLOR_PATTERN.test(value.value)) {
                violations.push({
                    file,
                    line: cls.line,
                    column: cls.column,
                    rule: RULE_ID,
                    message:
                        "Use a theme color token. Arbitrary color values bypass the design system.",
                    className: cls.text,
                })
            }
        }
    }

    return violations
}

export { check }
