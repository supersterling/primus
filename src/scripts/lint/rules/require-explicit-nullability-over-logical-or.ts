import * as ts from "typescript"
import { type Violation } from "@/scripts/lint/types"

/**
 * Bans logical OR (||) for fallback/default values.
 *
 * Allowed:
 *   - Conditionals: if, while, do-while, for (boolean logic)
 *   - Return statements (boolean expressions)
 *   - Both operands are boolean type (boolean logic in assignment)
 *
 * Banned:
 *   - Non-boolean assignment: const x = a || "default"
 *   - Function arguments: fn(a || b)
 *   - Object properties: { key: a || b }
 */

function isAllowedParent(current: ts.Node, parent: ts.Node): boolean {
    if (ts.isIfStatement(parent)) {
        return parent.expression === current
    }
    if (ts.isWhileStatement(parent)) {
        return parent.expression === current
    }
    if (ts.isDoStatement(parent)) {
        return parent.expression === current
    }
    if (ts.isForStatement(parent)) {
        return parent.condition === current
    }
    if (ts.isReturnStatement(parent)) {
        return true
    }
    return false
}

function shouldContinueUp(parent: ts.Node): boolean {
    return (
        ts.isParenthesizedExpression(parent) ||
        ts.isBinaryExpression(parent) ||
        ts.isPrefixUnaryExpression(parent)
    )
}

function isInAllowedPosition(node: ts.Node): boolean {
    let current: ts.Node = node
    let { parent } = current

    while (parent) {
        if (isAllowedParent(current, parent)) {
            return true
        }
        if (!shouldContinueUp(parent)) {
            break
        }
        current = parent
        ;({ parent } = parent)
    }

    return false
}

const BOOLEAN_LIKE = ts.TypeFlags.BooleanLike

function isBooleanType(type: ts.Type): boolean {
    // biome-ignore lint/suspicious/noBitwiseOperators: TypeScript type flags are bitwise
    if ((type.flags & BOOLEAN_LIKE) !== 0) {
        return true
    }
    if (type.isUnion()) {
        return type.types.every(isBooleanType)
    }
    return false
}

function isBooleanExpression(node: ts.BinaryExpression, checker: ts.TypeChecker): boolean {
    const leftType = checker.getTypeAtLocation(node.left)
    const rightType = checker.getTypeAtLocation(node.right)
    return isBooleanType(leftType) && isBooleanType(rightType)
}

function isLogicalOr(node: ts.Node): node is ts.BinaryExpression {
    return ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.BarBarToken
}

function createViolation(sourceFile: ts.SourceFile, node: ts.BinaryExpression): Violation {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(
        node.operatorToken.getStart(sourceFile),
    )
    return {
        file: sourceFile.fileName,
        line: line + 1,
        column: character + 1,
        rule: "require-explicit-nullability-over-logical-or",
        message: 'Use an explicit null check. `||` hides falsy values like `0`, `""`, and `false`.',
    }
}

function check(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Violation[] {
    const violations: Violation[] = []

    function walk(node: ts.Node): void {
        if (isLogicalOr(node)) {
            const allowed = isInAllowedPosition(node) || isBooleanExpression(node, checker)
            if (!allowed) {
                violations.push(createViolation(sourceFile, node))
            }
        }
        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return violations
}

export { check }
