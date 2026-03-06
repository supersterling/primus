#!/usr/bin/env bun

/**
 * Type-aware linter — complements Biome with rules requiring
 * TypeScript's type checker.
 *
 * Rules:
 *   - require-explicit-nullability-over-logical-or
 *   - require-early-return-over-wrapping-conditional
 *
 * Usage:
 *   bun src/scripts/lint/index.ts              # Check all files
 *   bun src/scripts/lint/index.ts src/foo.ts   # Check specific file
 */

import * as ts from "typescript"
import { check as checkEarlyReturn } from "@/scripts/lint/rules/require-early-return-over-wrapping-conditional"
import { check as checkLogicalOr } from "@/scripts/lint/rules/require-explicit-nullability-over-logical-or"
import { type LintRule, type Violation } from "@/scripts/lint/types"

const rules: LintRule[] = [
    { id: "require-explicit-nullability-over-logical-or", check: checkLogicalOr },
    { id: "require-early-return-over-wrapping-conditional", check: checkEarlyReturn },
]

const SKIP_PATTERNS = [
    "node_modules",
    "src/components/ui/",
    "src/components/kibo-ui/",
    "src/components/icons/",
    "src/components/aceternity/",
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

function main(): void {
    const args = process.argv.slice(2)
    const specificFiles = args.filter((a) => !a.startsWith("--"))

    console.log("Creating TypeScript program...")
    const program = createProgram()
    const checker = program.getTypeChecker()

    let sourceFiles = program.getSourceFiles().filter((sf) => !sf.isDeclarationFile)

    if (specificFiles.length > 0) {
        sourceFiles = sourceFiles.filter((sf) => {
            for (const f of specificFiles) {
                if (sf.fileName.includes(f)) {
                    return true
                }
            }
            return false
        })
    }

    const violations: Violation[] = []

    for (const sourceFile of sourceFiles) {
        if (isSkipped(sourceFile.fileName)) {
            continue
        }
        for (const rule of rules) {
            violations.push(...rule.check(sourceFile, checker))
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
            `Found ${violations.length} violation(s) in ${new Set(violations.map((v) => v.file)).size} file(s).`,
        )
        process.exit(1)
    }

    console.log("No type-aware lint violations found.")
}

main()
