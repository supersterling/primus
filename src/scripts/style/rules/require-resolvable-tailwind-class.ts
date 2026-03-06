import { type LoadedDesignSystem } from "@/scripts/style/design-system"
import { type ClassLocation, type Violation } from "@/scripts/style/types"

const RULE_ID = "require-resolvable-tailwind-class" as const

// ── theme namespace mapping ─────────────────────────

const ROOT_TO_NAMESPACE = new Map<string, string>([
    ["bg", "--color"],
    ["text", "--color"],
    ["border", "--color"],
    ["outline", "--color"],
    ["ring", "--color"],
    ["accent", "--color"],
    ["caret", "--color"],
    ["fill", "--color"],
    ["stroke", "--color"],
    ["decoration", "--color"],
    ["divide", "--color"],
    ["placeholder", "--color"],
    ["from", "--color"],
    ["via", "--color"],
    ["to", "--color"],
    ["animate", "--animate"],
    ["rounded", "--radius"],
    ["shadow", "--shadow"],
    ["font", "--font"],
])

// ── levenshtein ─────────────────────────────────────

function levenshtein(a: string, b: string): number {
    const m = a.length
    const n = b.length
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))

    for (let i = 0; i <= m; i += 1) {
        dp[i]![0] = i
    }
    for (let j = 0; j <= n; j += 1) {
        dp[0]![j] = j
    }

    for (let i = 1; i <= m; i += 1) {
        for (let j = 1; j <= n; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1
            dp[i]![j] = Math.min(
                dp[i - 1]?.[j]! + 1,
                dp[i]?.[j - 1]! + 1,
                dp[i - 1]?.[j - 1]! + cost,
            )
        }
    }

    return dp[m]?.[n]!
}

// ── suggestion finder ───────────────────────────────

function findSuggestion(className: string, designSystem: LoadedDesignSystem): string | undefined {
    const candidates = designSystem.ds.parseCandidate(className)
    if (candidates.length === 0) {
        return
    }

    const candidate = candidates[0]!
    if (candidate.kind !== "functional") {
        return
    }

    const root = candidate.root
    const namespace = ROOT_TO_NAMESPACE.get(root)
    if (!namespace) {
        return
    }

    const themeValues = designSystem.themeNamespaces.get(namespace)
    if (!themeValues) {
        return
    }

    const value = candidate.value
    if (!value || value.kind !== "named") {
        return
    }

    let bestMatch: string | undefined
    let bestDistance = 3

    for (const [key] of themeValues) {
        if (key === null) {
            continue
        }
        const distance = levenshtein(value.value, key)
        if (distance < bestDistance) {
            bestDistance = distance
            bestMatch = key
        }
    }

    if (!bestMatch) {
        return
    }

    return `${root}-${bestMatch}`
}

// ── check ───────────────────────────────────────────

function check(
    classes: ClassLocation[],
    designSystem: LoadedDesignSystem,
    file: string,
): Violation[] {
    if (classes.length === 0) {
        return []
    }

    const classNames = classes.map((c) => c.text)
    const results = designSystem.ds.candidatesToCss(classNames)
    const violations: Violation[] = []

    for (let i = 0; i < results.length; i += 1) {
        if (results[i] !== null) {
            continue
        }

        const cls = classes[i]!
        const className = cls.text

        // Skip bare-value utilities the unstable API can't resolve
        if (designSystem.classList.has(className)) {
            continue
        }

        const suggestion = findSuggestion(className, designSystem)
        const message = suggestion
            ? `Use \`${suggestion}\`. \`${className}\` does not resolve to CSS.`
            : `Use a valid Tailwind class. \`${className}\` does not resolve to CSS.`

        violations.push({
            file,
            line: cls.line,
            column: cls.column,
            rule: RULE_ID,
            message,
            className,
        })
    }

    return violations
}

export { check }
