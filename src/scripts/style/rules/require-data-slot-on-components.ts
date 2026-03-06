import * as ts from "typescript"
import { type Violation } from "@/scripts/style/types"

const RULE_ID = "require-data-slot-on-components" as const

const COMPONENTS_PREFIX = "src/components"
const SKIP_DIRS = ["src/components/landing", "src/components/ui", "src/components/kibo-ui"]

// ── helpers ─────────────────────────────────────────

function isComponentFile(fileName: string): boolean {
    if (!fileName.includes(COMPONENTS_PREFIX)) {
        return false
    }
    for (const dir of SKIP_DIRS) {
        if (fileName.includes(dir)) {
            return false
        }
    }
    return true
}

function isPascalCase(name: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name)
}

function jsxHasDataSlot(node: ts.Node): boolean {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        for (const attr of node.attributes.properties) {
            if (ts.isJsxAttribute(attr) && attr.name.getText() === "data-slot") {
                return true
            }
        }
    }

    return ts.forEachChild(node, jsxHasDataSlot) === true
}

function findReturnedJsx(body: ts.Node): ts.Node | undefined {
    let found: ts.Node | undefined

    function walk(node: ts.Node): void {
        if (found) {
            return
        }

        if (ts.isReturnStatement(node) && node.expression) {
            if (
                ts.isJsxElement(node.expression) ||
                ts.isJsxSelfClosingElement(node.expression) ||
                ts.isJsxFragment(node.expression) ||
                ts.isParenthesizedExpression(node.expression)
            ) {
                found = node.expression
                return
            }
        }

        // Skip nested functions — they're different components
        if (
            ts.isFunctionDeclaration(node) ||
            ts.isFunctionExpression(node) ||
            ts.isArrowFunction(node)
        ) {
            return
        }

        ts.forEachChild(node, walk)
    }

    // Arrow functions with expression body (no block)
    if (ts.isArrowFunction(body) && !ts.isBlock(body.body)) {
        const expr = body.body
        if (
            ts.isJsxElement(expr) ||
            ts.isJsxSelfClosingElement(expr) ||
            ts.isJsxFragment(expr) ||
            ts.isParenthesizedExpression(expr)
        ) {
            return expr
        }
        return
    }

    walk(body)
    return found
}

// ── component finders ───────────────────────────────

function checkFunctionDeclaration(
    sourceFile: ts.SourceFile,
    node: ts.FunctionDeclaration,
    violations: Violation[],
): void {
    const name = node.name?.getText(sourceFile)
    if (!(name && isPascalCase(name) && node.body)) {
        return
    }

    const jsx = findReturnedJsx(node)
    if (!jsx) {
        return
    }

    if (!jsxHasDataSlot(jsx)) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(
            node.getStart(sourceFile),
        )
        violations.push({
            file: sourceFile.fileName,
            line: line + 1,
            column: character + 1,
            rule: RULE_ID,
            message: `Add \`data-slot\` to component \`${name}\`. Components need data-slot for CSS targeting.`,
            componentName: name,
        })
    }
}

function checkVariableStatement(
    sourceFile: ts.SourceFile,
    node: ts.VariableStatement,
    violations: Violation[],
): void {
    for (const decl of node.declarationList.declarations) {
        const name = decl.name.getText(sourceFile)
        if (!(isPascalCase(name) && decl.initializer)) {
            continue
        }

        const init = decl.initializer

        // Arrow function or function expression
        if (!(ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
            continue
        }

        const jsx = findReturnedJsx(init)
        if (!jsx) {
            continue
        }

        if (!jsxHasDataSlot(jsx)) {
            const { line, character } = sourceFile.getLineAndCharacterOfPosition(
                decl.getStart(sourceFile),
            )
            violations.push({
                file: sourceFile.fileName,
                line: line + 1,
                column: character + 1,
                rule: RULE_ID,
                message: `Add \`data-slot\` to component \`${name}\`. Components need data-slot for CSS targeting.`,
                componentName: name,
            })
        }
    }
}

// ── check ───────────────────────────────────────────

function check(sourceFile: ts.SourceFile): Violation[] {
    if (!isComponentFile(sourceFile.fileName)) {
        return []
    }

    const violations: Violation[] = []

    ts.forEachChild(sourceFile, (node) => {
        if (ts.isFunctionDeclaration(node)) {
            checkFunctionDeclaration(sourceFile, node, violations)
        }
        if (ts.isVariableStatement(node)) {
            checkVariableStatement(sourceFile, node, violations)
        }
    })

    return violations
}

export { check }
