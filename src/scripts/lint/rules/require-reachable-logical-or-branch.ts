import * as ts from "typescript"
import { type Violation } from "@/scripts/lint/types"

/**
 * Flags || where the left operand is always truthy, making the
 * right side unreachable dead code.
 *
 * Uses the type checker to determine truthiness:
 *   - Object types are always truthy
 *   - Non-empty string/number literals are always truthy
 *   - Unions are truthy only if every member is truthy
 *   - Primitives (string, number, boolean, bigint) might be falsy
 *   - Types containing null/undefined might be falsy
 */

const POSSIBLY_FALSY_PRIMITIVES =
    ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean | ts.TypeFlags.BigInt

function isPossiblyFalsyPrimitive(type: ts.Type): boolean {
    return (type.flags & POSSIBLY_FALSY_PRIMITIVES) !== 0
}

function isLiteralTruthy(type: ts.Type): boolean {
    if (type.isStringLiteral()) {
        return type.value !== ""
    }
    if (type.isNumberLiteral()) {
        return type.value !== 0 && !Number.isNaN(type.value)
    }
    return false
}

function isAlwaysTruthy(type: ts.Type, checker: ts.TypeChecker): boolean {
    const typeStr = checker.typeToString(type)
    if (typeStr.includes("null") || typeStr.includes("undefined")) {
        return false
    }
    if (isPossiblyFalsyPrimitive(type)) {
        return false
    }
    if (type.isUnion()) {
        return type.types.every((t) => isAlwaysTruthy(t, checker))
    }
    if ((type.flags & ts.TypeFlags.Object) !== 0) {
        return true
    }
    return isLiteralTruthy(type)
}

function check(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Violation[] {
    const violations: Violation[] = []

    function walk(node: ts.Node): void {
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
            const leftType = checker.getTypeAtLocation(node.left)
            if (isAlwaysTruthy(leftType, checker)) {
                const { line, character } = sourceFile.getLineAndCharacterOfPosition(
                    node.operatorToken.getStart(sourceFile),
                )
                const typeStr = checker.typeToString(leftType)
                violations.push({
                    file: sourceFile.fileName,
                    line: line + 1,
                    column: character + 1,
                    rule: "require-reachable-logical-or-branch",
                    message: `Remove dead \`||\` branch. Left side \`${typeStr}\` is always truthy.`,
                })
            }
        }
        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return violations
}

export { check }
