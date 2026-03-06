import { type LoadedDesignSystem } from "@/scripts/style/design-system"
import { type ClassLocation, type Violation } from "@/scripts/style/types"

const RULE_ID = "require-theme-shadow-token" as const

const SHADOW_ROOTS = new Set(["shadow", "drop-shadow"])

function isThemeReference(value: string): boolean {
    return value.includes("var(--") || value.includes("--shadow(")
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

            if (!SHADOW_ROOTS.has(candidate.root)) {
                continue
            }

            const value = candidate.value
            if (!value || value.kind !== "arbitrary") {
                continue
            }

            if (isThemeReference(value.value)) {
                continue
            }

            violations.push({
                file,
                line: cls.line,
                column: cls.column,
                rule: RULE_ID,
                message:
                    "Use a theme shadow token. Arbitrary shadow values bypass the design system.",
                className: cls.text,
            })
        }
    }

    return violations
}

export { check }
