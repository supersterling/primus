/**
 * TSX class name extractor.
 *
 * Walks the AST of a TSX source file and extracts all CSS class names from:
 *   - className="..." string literals
 *   - className={cn("...", ...)} and similar utility calls
 *   - Template literals in className attributes
 *   - Conditional expressions (ternary branches)
 *   - Binary expressions (&& right side, || both sides)
 *   - Object literal keys in cn() calls
 */

import * as ts from "typescript"
import { type ClassLocation } from "@/scripts/style/types"

// ── constants ────────────────────────────────────────

/** Function names recognized as class-merging utilities */
const CLASS_MERGE_FUNCTIONS = new Set(["cn", "clsx", "classNames", "cva", "cx", "twMerge"])

// ── helpers ──────────────────────────────────────────

function getLineAndColumn(
    sourceFile: ts.SourceFile,
    pos: number,
): { line: number; column: number } {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(pos)
    return { line: line + 1, column: character + 1 }
}

function splitClasses(text: string, sourceFile: ts.SourceFile, pos: number): ClassLocation[] {
    const results: ClassLocation[] = []
    const classes = text.split(/\s+/)
    let offset = 0

    for (const cls of classes) {
        if (cls.length === 0) {
            offset += 1
            continue
        }

        const classStart = text.indexOf(cls, offset)
        const { line, column } = getLineAndColumn(sourceFile, pos + classStart)
        results.push({ text: cls, line, column })
        offset = classStart + cls.length
    }

    return results
}

// ── expression walkers ───────────────────────────────

function extractFromStringLiteral(
    node: ts.StringLiteral,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    // +1 to skip the opening quote character
    return splitClasses(node.text, sourceFile, node.getStart(sourceFile) + 1)
}

function extractFromNoSubstitutionTemplateLiteral(
    node: ts.NoSubstitutionTemplateLiteral,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    // +1 to skip the backtick
    return splitClasses(node.text, sourceFile, node.getStart(sourceFile) + 1)
}

function extractFromTemplateLiteral(
    node: ts.TemplateExpression,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    const results: ClassLocation[] = []

    // Head text (before first ${...})
    const head = node.head
    if (head.text.trim()) {
        results.push(...splitClasses(head.text, sourceFile, head.getStart(sourceFile) + 1))
    }

    // Each template span's literal portion (after ${...})
    for (const span of node.templateSpans) {
        const literal = span.literal
        const text = literal.text
        if (text.trim()) {
            // +1 to skip the } or ` character
            results.push(...splitClasses(text, sourceFile, literal.getStart(sourceFile) + 1))
        }

        // Also walk the expression inside ${...}
        results.push(...extractFromExpression(span.expression, sourceFile))
    }

    return results
}

function extractFromObjectLiteral(
    node: ts.ObjectLiteralExpression,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    const results: ClassLocation[] = []

    for (const prop of node.properties) {
        if (!ts.isPropertyAssignment(prop)) {
            continue
        }

        // The key is the class name (e.g. { "font-bold": condition })
        const name = prop.name
        if (ts.isStringLiteral(name)) {
            results.push(...extractFromStringLiteral(name, sourceFile))
        } else if (ts.isComputedPropertyName(name)) {
            results.push(...extractFromExpression(name.expression, sourceFile))
        }
    }

    return results
}

function extractFromExpression(node: ts.Expression, sourceFile: ts.SourceFile): ClassLocation[] {
    // String literal: "flex items-center"
    if (ts.isStringLiteral(node)) {
        return extractFromStringLiteral(node, sourceFile)
    }

    // No-substitution template: `flex items-center`
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
        return extractFromNoSubstitutionTemplateLiteral(node, sourceFile)
    }

    // Template expression: `flex ${condition ? "block" : "hidden"}`
    if (ts.isTemplateExpression(node)) {
        return extractFromTemplateLiteral(node, sourceFile)
    }

    // Conditional (ternary): condition ? "block" : "hidden"
    if (ts.isConditionalExpression(node)) {
        return [
            ...extractFromExpression(node.whenTrue, sourceFile),
            ...extractFromExpression(node.whenFalse, sourceFile),
        ]
    }

    // Binary expression: && or ||
    if (ts.isBinaryExpression(node)) {
        if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
            // condition && "class" — only the right side has classes
            return extractFromExpression(node.right, sourceFile)
        }
        if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
            // "class-a" || "class-b" — both sides
            return [
                ...extractFromExpression(node.left, sourceFile),
                ...extractFromExpression(node.right, sourceFile),
            ]
        }
    }

    // Parenthesized expression: (expr)
    if (ts.isParenthesizedExpression(node)) {
        return extractFromExpression(node.expression, sourceFile)
    }

    // Call expression: cn(...), clsx(...), etc.
    if (ts.isCallExpression(node)) {
        return extractFromCallExpression(node, sourceFile)
    }

    // Object literal: { "font-bold": condition }
    if (ts.isObjectLiteralExpression(node)) {
        return extractFromObjectLiteral(node, sourceFile)
    }

    // Array literal: ["flex", condition && "block"]
    if (ts.isArrayLiteralExpression(node)) {
        const results: ClassLocation[] = []
        for (const element of node.elements) {
            results.push(...extractFromExpression(element, sourceFile))
        }
        return results
    }

    return []
}

function extractFromCallExpression(
    node: ts.CallExpression,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    const callee = node.expression

    // Check if it's a known class-merging function
    let isClassMerge = false
    if (ts.isIdentifier(callee) && CLASS_MERGE_FUNCTIONS.has(callee.text)) {
        isClassMerge = true
    }
    // Also handle property access: e.g. clsx.default(...)
    if (ts.isPropertyAccessExpression(callee) && CLASS_MERGE_FUNCTIONS.has(callee.name.text)) {
        isClassMerge = true
    }

    if (!isClassMerge) {
        return []
    }

    const results: ClassLocation[] = []
    for (const arg of node.arguments) {
        results.push(...extractFromExpression(arg, sourceFile))
    }
    return results
}

// ── JSX attribute walker ─────────────────────────────

function isClassNameAttribute(node: ts.JsxAttribute): boolean {
    if (!ts.isIdentifier(node.name)) {
        return false
    }
    return node.name.text === "className" || node.name.text === "class"
}

function extractFromJsxAttribute(
    attr: ts.JsxAttribute,
    sourceFile: ts.SourceFile,
): ClassLocation[] {
    if (!attr.initializer) {
        return []
    }

    // className="..."
    if (ts.isStringLiteral(attr.initializer)) {
        return extractFromStringLiteral(attr.initializer, sourceFile)
    }

    // className={...}
    if (ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
        return extractFromExpression(attr.initializer.expression, sourceFile)
    }

    return []
}

// ── public API ───────────────────────────────────────

function extractClasses(filePath: string, content: string): ClassLocation[] {
    const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    )

    const results: ClassLocation[] = []

    function walk(node: ts.Node): void {
        // JSX attributes: className="..." or className={...}
        if (ts.isJsxAttribute(node) && isClassNameAttribute(node)) {
            results.push(...extractFromJsxAttribute(node, sourceFile))
            return
        }

        // Top-level cn/clsx/cva calls outside JSX (e.g. const classes = cn("..."))
        if (ts.isCallExpression(node)) {
            const callee = node.expression
            const isClassMerge =
                (ts.isIdentifier(callee) && CLASS_MERGE_FUNCTIONS.has(callee.text)) ||
                (ts.isPropertyAccessExpression(callee) &&
                    CLASS_MERGE_FUNCTIONS.has(callee.name.text))

            if (isClassMerge) {
                // Check if this call is NOT already inside a className attribute
                // (those are handled by the JSX attribute path above)
                let parent = node.parent
                let insideClassName = false
                while (parent) {
                    if (ts.isJsxAttribute(parent) && isClassNameAttribute(parent)) {
                        insideClassName = true
                        break
                    }
                    parent = parent.parent
                }

                if (!insideClassName) {
                    for (const arg of node.arguments) {
                        results.push(...extractFromExpression(arg, sourceFile))
                    }
                    return
                }
            }
        }

        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return results
}

export { CLASS_MERGE_FUNCTIONS, extractClasses }
