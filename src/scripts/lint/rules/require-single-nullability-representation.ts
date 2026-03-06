import * as ts from "typescript"
import { type Violation } from "@/scripts/lint/types"

/**
 * Bans types that include both null AND undefined at function boundaries.
 *
 * Checks: function parameters, return types, property signatures.
 * Skips: variable declarations (allows Zod .nullable().optional() for
 * normalization at API boundaries).
 *
 * The fix: pick one. Prefer undefined (optional) for internal types.
 * Use null only when writing to an external API that requires it.
 */

function typeIncludesNull(typeNode: ts.TypeNode): boolean {
    if (ts.isUnionTypeNode(typeNode)) {
        return typeNode.types.some(typeIncludesNull)
    }
    if (ts.isLiteralTypeNode(typeNode)) {
        return typeNode.literal.kind === ts.SyntaxKind.NullKeyword
    }
    return typeNode.kind === ts.SyntaxKind.NullKeyword
}

function hasBothNullAndUndefined(type: ts.Type, checker: ts.TypeChecker): boolean {
    const typeStr = checker.typeToString(type)
    return typeStr.includes("null") && typeStr.includes("undefined")
}

function stripNullUndefined(typeStr: string): string {
    return typeStr
        .replace(/\s*\|\s*null/g, "")
        .replace(/\s*\|\s*undefined/g, "")
        .replace(/null\s*\|\s*/g, "")
        .replace(/undefined\s*\|\s*/g, "")
        .trim()
}

function getNodeName(node: ts.NamedDeclaration, sourceFile: ts.SourceFile): string {
    const { name } = node
    if (!name) {
        return "(anonymous)"
    }
    if (ts.isIdentifier(name)) {
        return name.text
    }
    return name.getText(sourceFile)
}

function getFunctionName(
    node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ArrowFunction | ts.FunctionExpression,
    sourceFile: ts.SourceFile,
): string {
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        return getNodeName(node, sourceFile)
    }
    const { parent } = node
    if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
        return parent.name.text
    }
    return "(anonymous)"
}

function violationAt(sourceFile: ts.SourceFile, node: ts.Node, message: string): Violation {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
    return {
        file: sourceFile.fileName,
        line: line + 1,
        column: character + 1,
        rule: "require-single-nullability-representation",
        message,
    }
}

function checkProperty(
    node: ts.PropertySignature | ts.PropertyDeclaration,
    sourceFile: ts.SourceFile,
    violations: Violation[],
): void {
    if (node.questionToken === undefined) {
        return
    }
    if (!node.type) {
        return
    }
    if (!typeIncludesNull(node.type)) {
        return
    }
    const propName = getNodeName(node, sourceFile)
    const baseType = stripNullUndefined(node.type.getText(sourceFile))
    violations.push(
        violationAt(
            sourceFile,
            node.name,
            `Pick one: \`${propName}?: ${baseType}\` (optional) or \`${propName}: ${baseType} | null\` (nullable). Both creates triple-state confusion.`,
        ),
    )
}

function checkParameter(
    node: ts.ParameterDeclaration,
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    violations: Violation[],
): void {
    if (!node.type) {
        return
    }
    const isOptional = node.questionToken !== undefined
    const paramName = getNodeName(node, sourceFile)
    const baseType = stripNullUndefined(node.type.getText(sourceFile))

    if (isOptional && typeIncludesNull(node.type)) {
        violations.push(
            violationAt(
                sourceFile,
                node.name,
                `Pick one: \`${paramName}?: ${baseType}\` (optional) or \`${paramName}: ${baseType} | null\` (nullable). Both creates triple-state confusion.`,
            ),
        )
        return
    }

    if (isOptional) {
        return
    }

    const type = checker.getTypeFromTypeNode(node.type)
    if (!hasBothNullAndUndefined(type, checker)) {
        return
    }
    if (!ts.isUnionTypeNode(node.type)) {
        return
    }
    violations.push(
        violationAt(
            sourceFile,
            node.name,
            `Pick one: \`${paramName}: ${baseType} | null\` or \`${paramName}: ${baseType} | undefined\`. Having both is ambiguous.`,
        ),
    )
}

function checkReturnType(
    node: ts.FunctionDeclaration | ts.MethodDeclaration | ts.ArrowFunction | ts.FunctionExpression,
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    violations: Violation[],
): void {
    if (!node.type) {
        return
    }
    if (!ts.isUnionTypeNode(node.type)) {
        return
    }
    const type = checker.getTypeFromTypeNode(node.type)
    if (!hasBothNullAndUndefined(type, checker)) {
        return
    }
    const funcName = getFunctionName(node, sourceFile)
    const typeStr = node.type.getText(sourceFile)
    const baseType = stripNullUndefined(typeStr)
    violations.push(
        violationAt(
            sourceFile,
            node.type,
            `Function \`${funcName}\` returns \`${typeStr}\`. Pick one: \`${baseType} | null\` or \`${baseType} | undefined\`.`,
        ),
    )
}

function isFunctionLike(
    node: ts.Node,
): node is
    | ts.FunctionDeclaration
    | ts.MethodDeclaration
    | ts.ArrowFunction
    | ts.FunctionExpression {
    return (
        ts.isFunctionDeclaration(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isArrowFunction(node) ||
        ts.isFunctionExpression(node)
    )
}

function check(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Violation[] {
    const violations: Violation[] = []

    function walk(node: ts.Node): void {
        if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) {
            checkProperty(node, sourceFile, violations)
        }
        if (ts.isParameter(node)) {
            checkParameter(node, sourceFile, checker, violations)
        }
        if (isFunctionLike(node)) {
            checkReturnType(node, sourceFile, checker, violations)
        }
        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return violations
}

export { check }
