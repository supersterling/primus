import type * as ts from "typescript"

type RuleId =
    | "require-explicit-nullability-over-logical-or"
    | "require-early-return-over-wrapping-conditional"
    | "require-reachable-nullish-check"
    | "require-reachable-logical-or-branch"
    | "require-single-nullability-representation"

type Violation = {
    file: string
    line: number
    column: number
    rule: RuleId
    message: string
}

type LintRule = {
    id: RuleId
    check: (sourceFile: ts.SourceFile, checker: ts.TypeChecker) => Violation[]
}

export type { LintRule, RuleId, Violation }
