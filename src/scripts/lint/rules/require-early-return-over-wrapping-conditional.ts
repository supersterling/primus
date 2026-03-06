import * as ts from "typescript"
import { type Violation } from "@/scripts/lint/types"

/**
 * Require early return over wrapping conditionals.
 *
 * Three sub-checks:
 *   1. Wrapping if: function body is a single if (no else) wrapping 3+ statements.
 *   2. Unnecessary else: if-block ends with return/throw but has an else.
 *   3. Deep nesting: 3+ levels of if nesting inside a function.
 */

const MIN_STATEMENTS = 3
const MAX_NESTING = 3

// ── helpers ──────────────────────────────────────────

function countStatements(node: ts.Node): number {
    if (ts.isBlock(node)) {
        return node.statements.length
    }
    return 1
}

function terminates(node: ts.Node): boolean {
    if (ts.isReturnStatement(node) || ts.isThrowStatement(node)) {
        return true
    }
    if (ts.isContinueStatement(node) || ts.isBreakStatement(node)) {
        return true
    }
    if (!ts.isBlock(node)) {
        return false
    }
    const last = node.statements.at(-1)
    if (!last) {
        return false
    }
    return terminates(last)
}

function isTrivialSetup(stmt: ts.Statement): boolean {
    return ts.isVariableStatement(stmt) || ts.isExpressionStatement(stmt)
}

function elseDepthOf(ifNode: ts.IfStatement, depth: number): number {
    if (!ifNode.elseStatement) {
        return depth
    }
    // else-if chains are syntactically flat — same indentation level
    if (ts.isIfStatement(ifNode.elseStatement)) {
        return getIfNestingDepth(ifNode.elseStatement, depth)
    }
    return getIfNestingDepth(ifNode.elseStatement, depth + 1)
}

function getIfNestingDepth(node: ts.Node, depth = 0): number {
    if (ts.isIfStatement(node)) {
        const thenDepth = getIfNestingDepth(node.thenStatement, depth + 1)
        return Math.max(thenDepth, elseDepthOf(node, depth))
    }
    if (!ts.isBlock(node)) {
        return depth
    }
    let maxDepth = depth
    for (const stmt of node.statements) {
        maxDepth = Math.max(maxDepth, getIfNestingDepth(stmt, depth))
    }
    return maxDepth
}

// ── violation factory ────────────────────────────────

function violationAt(sourceFile: ts.SourceFile, node: ts.Node, message: string): Violation {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
    return {
        file: sourceFile.fileName,
        line: line + 1,
        column: character + 1,
        rule: "require-early-return-over-wrapping-conditional",
        message,
    }
}

// ── check 1: wrapping if ─────────────────────────────

function findWrappingIf(statements: ts.NodeArray<ts.Statement>): ts.IfStatement | undefined {
    for (let i = 0; i < statements.length; i += 1) {
        const stmt = statements[i]
        if (!stmt) {
            continue
        }
        if (ts.isIfStatement(stmt) && i === statements.length - 1) {
            return stmt
        }
        if (!isTrivialSetup(stmt)) {
            return
        }
    }
    return
}

function checkWrappingIf(sourceFile: ts.SourceFile, body: ts.Block, violations: Violation[]): void {
    const ifStmt = findWrappingIf(body.statements)
    if (!ifStmt) {
        return
    }
    if (ifStmt.elseStatement) {
        return
    }
    if (countStatements(ifStmt.thenStatement) < MIN_STATEMENTS) {
        return
    }
    violations.push(
        violationAt(
            sourceFile,
            ifStmt,
            "Invert the condition and return early. Function body is wrapped in a single conditional.",
        ),
    )
}

// ── check 2: unnecessary else after return/throw ─────

function hasUnnecessaryElse(stmt: ts.IfStatement): boolean {
    if (!stmt.elseStatement) {
        return false
    }
    if (!terminates(stmt.thenStatement)) {
        return false
    }
    if (ts.isIfStatement(stmt.elseStatement)) {
        return false
    }
    if (countStatements(stmt.elseStatement) < MIN_STATEMENTS) {
        return false
    }
    // Don't flag symmetric forks (both branches substantial)
    if (countStatements(stmt.thenStatement) >= MIN_STATEMENTS) {
        return false
    }
    return true
}

function checkUnnecessaryElse(
    sourceFile: ts.SourceFile,
    block: ts.Block,
    violations: Violation[],
): void {
    for (const stmt of block.statements) {
        if (ts.isIfStatement(stmt) && hasUnnecessaryElse(stmt) && stmt.elseStatement) {
            violations.push(
                violationAt(
                    sourceFile,
                    stmt.elseStatement,
                    "Remove `else` after `return`/`throw`. The `if` already exits — dedent the else body.",
                ),
            )
        }
    }
}

// ── check 3: deep nesting ────────────────────────────

function checkDeepNesting(
    sourceFile: ts.SourceFile,
    body: ts.Block,
    funcNode: ts.Node,
    violations: Violation[],
): void {
    const depth = getIfNestingDepth(body)
    if (depth < MAX_NESTING) {
        return
    }
    violations.push(
        violationAt(
            sourceFile,
            funcNode,
            `Flatten nested conditionals (${depth} levels). Use guard clauses to return early.`,
        ),
    )
}

// ── walker ────────────────────────────────────────────

function hasFunctionBody(node: ts.Node): node is ts.Node & { body: ts.Block } {
    if (ts.isFunctionDeclaration(node) && node.body) {
        return true
    }
    if (ts.isMethodDeclaration(node) && node.body) {
        return true
    }
    if (ts.isFunctionExpression(node) && node.body) {
        return true
    }
    if (ts.isArrowFunction(node) && ts.isBlock(node.body)) {
        return true
    }
    return false
}

function check(sourceFile: ts.SourceFile, _checker: ts.TypeChecker): Violation[] {
    const violations: Violation[] = []

    function walk(node: ts.Node): void {
        if (hasFunctionBody(node)) {
            const { body } = node
            if (body.statements.length > 0) {
                checkWrappingIf(sourceFile, body, violations)
                checkUnnecessaryElse(sourceFile, body, violations)
                checkDeepNesting(sourceFile, body, node, violations)
            }
        }
        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return violations
}

export { check }
