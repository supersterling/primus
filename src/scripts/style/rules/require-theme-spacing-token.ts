import { type LoadedDesignSystem } from "@/scripts/style/design-system"
import { type ClassLocation, type Violation } from "@/scripts/style/types"

const RULE_ID = "require-theme-spacing-token" as const

const SPACING_ROOTS = new Set([
    "p",
    "px",
    "py",
    "pt",
    "pr",
    "pb",
    "pl",
    "ps",
    "pe",
    "m",
    "mx",
    "my",
    "mt",
    "mr",
    "mb",
    "ml",
    "ms",
    "me",
    "gap",
    "gap-x",
    "gap-y",
    "space-x",
    "space-y",
    "w",
    "h",
    "min-w",
    "min-h",
    "max-w",
    "max-h",
    "size",
    "top",
    "right",
    "bottom",
    "left",
    "inset",
    "inset-x",
    "inset-y",
    "translate-x",
    "translate-y",
    "scroll-m",
    "scroll-mx",
    "scroll-my",
    "scroll-mt",
    "scroll-mr",
    "scroll-mb",
    "scroll-ml",
    "scroll-ms",
    "scroll-me",
    "scroll-p",
    "scroll-px",
    "scroll-py",
    "scroll-pt",
    "scroll-pr",
    "scroll-pb",
    "scroll-pl",
    "scroll-ps",
    "scroll-pe",
])

// CSS units that have no theme equivalent — they're relative to content, not the design system
const INTRINSIC_UNITS = /\d+(lh|ch|cap|ex|ic|rlh|dvh|svh|lvh|dvw|svw|lvw|cqw|cqh|cqi|cqb)$/

function isExempt(value: string): boolean {
    if (value.includes("var(--")) {
        return true
    }
    if (value.includes("--spacing(")) {
        return true
    }
    if (INTRINSIC_UNITS.test(value)) {
        return true
    }
    return false
}

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

            if (!SPACING_ROOTS.has(candidate.root)) {
                continue
            }

            const value = candidate.value
            if (!value || value.kind !== "arbitrary") {
                continue
            }

            if (isExempt(value.value)) {
                continue
            }

            violations.push({
                file,
                line: cls.line,
                column: cls.column,
                rule: RULE_ID,
                message:
                    "Use a theme spacing token. Arbitrary spacing values bypass the design system.",
                className: cls.text,
            })
        }
    }

    return violations
}

export { check }
