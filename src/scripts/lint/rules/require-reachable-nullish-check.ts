import * as ts from "typescript"
import { type Violation } from "@/scripts/lint/types"

/**
 * Flags null/undefined checks on values whose type is never nullish.
 *
 * Catches: x === null, x !== undefined, x == null, etc.
 * where the type checker knows x can never be null/undefined.
 *
 * Skips dynamic accesses (array[i], for-of bindings, destructured params)
 * where TypeScript's type may not reflect runtime reality.
 */

function isNullOrUndefined(node: ts.Node): boolean {
    if (node.kind === ts.SyntaxKind.NullKeyword) {
        return true
    }
    if (ts.isIdentifier(node) && node.text === "undefined") {
        return true
    }
    return false
}

type NullishCheck = {
    variable: ts.Node
    isNegated: boolean
}

function parseNullishCheck(node: ts.BinaryExpression): NullishCheck | undefined {
    const { kind } = node.operatorToken
    if (
        kind !== ts.SyntaxKind.EqualsEqualsEqualsToken &&
        kind !== ts.SyntaxKind.ExclamationEqualsEqualsToken
    ) {
        return
    }

    const isNegated = kind === ts.SyntaxKind.ExclamationEqualsEqualsToken

    if (isNullOrUndefined(node.right)) {
        return { variable: node.left, isNegated }
    }
    if (isNullOrUndefined(node.left)) {
        return { variable: node.right, isNegated }
    }
    return
}

function isNonLiteralElementAccess(node: ts.ElementAccessExpression): boolean {
    const { argumentExpression } = node
    return !(ts.isStringLiteral(argumentExpression) || ts.isNumericLiteral(argumentExpression))
}

function isDeclDynamic(decl: ts.VariableDeclaration): boolean {
    if (decl.initializer && ts.isElementAccessExpression(decl.initializer)) {
        if (isNonLiteralElementAccess(decl.initializer)) {
            return true
        }
    }
    const grandparent = decl.parent?.parent
    if (grandparent && ts.isForOfStatement(grandparent)) {
        return true
    }
    if (grandparent && ts.isForInStatement(grandparent)) {
        return true
    }
    return false
}

function isIdentifierDynamic(node: ts.Identifier, checker: ts.TypeChecker): boolean {
    const symbol = checker.getSymbolAtLocation(node)
    if (!symbol) {
        return false
    }
    const decls = symbol.getDeclarations()
    if (!decls) {
        return false
    }
    const [decl] = decls
    if (!decl) {
        return false
    }
    if (ts.isBindingElement(decl)) {
        return true
    }
    if (!ts.isVariableDeclaration(decl)) {
        return false
    }
    if (!decl.initializer) {
        return false
    }
    return isDeclDynamic(decl)
}

function isDynamicAccess(node: ts.Node, checker: ts.TypeChecker): boolean {
    if (ts.isElementAccessExpression(node)) {
        return isNonLiteralElementAccess(node)
    }
    if (ts.isIdentifier(node)) {
        return isIdentifierDynamic(node, checker)
    }
    return false
}

const NULL_FLAG = ts.TypeFlags.Null
const UNDEFINED_FLAG = ts.TypeFlags.Undefined
const ANY_OR_UNKNOWN = ts.TypeFlags.Any | ts.TypeFlags.Unknown

function hasNullishFlag(t: ts.Type): boolean {
    return (t.flags & NULL_FLAG) !== 0 || (t.flags & UNDEFINED_FLAG) !== 0
}

function canBeNullish(type: ts.Type): boolean {
    if ((type.flags & ANY_OR_UNKNOWN) !== 0) {
        return true
    }
    const typeStr = type.symbol?.name
    if (typeStr === "null" || typeStr === "undefined") {
        return true
    }
    if (type.isUnion()) {
        return type.types.some(hasNullishFlag)
    }
    return hasNullishFlag(type)
}

function createViolation(sourceFile: ts.SourceFile, node: ts.Node, typeStr: string): Violation {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
    return {
        file: sourceFile.fileName,
        line: line + 1,
        column: character + 1,
        rule: "require-reachable-nullish-check",
        message: `Remove unnecessary null/undefined check. Type \`${typeStr}\` is never nullish.`,
    }
}

function checkBinaryExpression(
    node: ts.BinaryExpression,
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    violations: Violation[],
): void {
    const parsed = parseNullishCheck(node)
    if (!parsed) {
        return
    }
    if (isDynamicAccess(parsed.variable, checker)) {
        return
    }
    const type = checker.getTypeAtLocation(parsed.variable)
    if (canBeNullish(type)) {
        return
    }
    const typeStr = checker.typeToString(type)
    violations.push(createViolation(sourceFile, node, typeStr))
}

function check(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Violation[] {
    const violations: Violation[] = []

    function walk(node: ts.Node): void {
        if (ts.isBinaryExpression(node)) {
            checkBinaryExpression(node, sourceFile, checker, violations)
        }
        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return violations
}

export { check }
