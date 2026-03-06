#!/usr/bin/env bun

/**
 * Style Linter — Design Token Enforcement
 *
 * Loads the Tailwind v4 design system and validates that TSX
 * classes resolve to actual CSS and use theme tokens.
 *
 * Rules:
 *   - require-resolvable-tailwind-class
 *   - require-theme-color-token
 *   - require-theme-spacing-token
 *   - require-theme-radius-token
 *   - require-theme-shadow-token
 *   - require-data-slot-on-components
 *   - require-unique-data-slot-values
 *
 * Usage:
 *   bun src/scripts/style/index.ts              # Check all TSX files
 *   bun src/scripts/style/index.ts src/app/     # Check specific directory
 */

import * as ts from "typescript"
import { extractClasses } from "@/scripts/style/class-extractor"
import { loadDesignSystem } from "@/scripts/style/design-system"
import { check as checkResolvable } from "@/scripts/style/rules/require-resolvable-tailwind-class"
import { check as checkColor } from "@/scripts/style/rules/require-theme-color-token"
import { check as checkRadius } from "@/scripts/style/rules/require-theme-radius-token"
import { check as checkShadow } from "@/scripts/style/rules/require-theme-shadow-token"
import { check as checkSpacing } from "@/scripts/style/rules/require-theme-spacing-token"
import { type Violation } from "@/scripts/style/types"

const SKIP_PATTERNS = [
    "node_modules",
    "src/components/ui/",
    "src/components/kibo-ui/",
    "src/components/icons/",
    "src/components/aceternity/",
    "src/components/emails/",
    ".next",
]

function isSkipped(fileName: string): boolean {
    for (const pattern of SKIP_PATTERNS) {
        if (fileName.includes(pattern)) {
            return true
        }
    }
    return false
}

function createProgram(): ts.Program {
    const configPath = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json")
    if (!configPath) {
        console.error("Could not find tsconfig.json")
        process.exit(1)
    }
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
    const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, "./")
    return ts.createProgram(parsed.fileNames, parsed.options)
}

function collectTsxFiles(program: ts.Program, specificPaths: string[]): ts.SourceFile[] {
    const files: ts.SourceFile[] = []
    for (const sf of program.getSourceFiles()) {
        if (sf.isDeclarationFile) {
            continue
        }
        if (!sf.fileName.endsWith(".tsx")) {
            continue
        }
        if (isSkipped(sf.fileName)) {
            continue
        }
        if (specificPaths.length > 0) {
            const matches = specificPaths.some((p) => sf.fileName.includes(p))
            if (!matches) {
                continue
            }
        }
        files.push(sf)
    }
    return files
}

async function main(): Promise<void> {
    const args = process.argv.slice(2)
    const specificPaths = args.filter((a) => !a.startsWith("--"))

    console.log("Loading design system...")
    const designSystem = await loadDesignSystem(process.cwd())
    console.log(
        `  ${designSystem.allowedColors.size} theme colors, ${designSystem.classList.size} utilities, ${designSystem.allColors.size} total colors`,
    )

    console.log("Creating TypeScript program...")
    const program = createProgram()
    const sourceFiles = collectTsxFiles(program, specificPaths)
    console.log(`  ${sourceFiles.length} TSX files to check`)

    const violations: Violation[] = []

    for (const sourceFile of sourceFiles) {
        const classes = extractClasses(sourceFile.fileName, sourceFile.getFullText())
        if (classes.length > 0) {
            const file = sourceFile.fileName
            violations.push(...checkResolvable(classes, designSystem, file))
            violations.push(...checkColor(classes, designSystem, file))
            violations.push(...checkSpacing(classes, designSystem, file))
            violations.push(...checkRadius(classes, designSystem, file))
            violations.push(...checkShadow(classes, designSystem, file))
        }
    }

    for (const v of violations) {
        const relativePath = v.file.replace(`${process.cwd()}/`, "")
        console.log(`  ${relativePath}:${v.line}:${v.column}`)
        console.log(`    ${v.rule}`)
        console.log(`    ${v.message}`)
        console.log()
    }

    if (violations.length > 0) {
        console.log(
            `Found ${violations.length} style violation(s) in ${new Set(violations.map((v) => v.file)).size} file(s).`,
        )
        process.exit(1)
    }

    console.log("No style violations found.")
}

main().catch((err) => {
    console.error("Style linter failed:", err)
    process.exit(1)
})
