import * as ts from "typescript"
import { type Violation } from "@/scripts/style/types"

const RULE_ID = "require-unique-data-slot-values" as const

type SlotEntry = {
    value: string
    file: string
    line: number
    column: number
}

// ── helpers ─────────────────────────────────────────

function collectDataSlots(sourceFile: ts.SourceFile): SlotEntry[] {
    const slots: SlotEntry[] = []

    function walk(node: ts.Node): void {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
            for (const attr of node.attributes.properties) {
                if (!ts.isJsxAttribute(attr)) {
                    continue
                }
                if (attr.name.getText(sourceFile) !== "data-slot") {
                    continue
                }
                if (!(attr.initializer && ts.isStringLiteral(attr.initializer))) {
                    continue
                }

                const value = attr.initializer.text
                const { line, character } = sourceFile.getLineAndCharacterOfPosition(
                    attr.getStart(sourceFile),
                )

                slots.push({
                    value,
                    file: sourceFile.fileName,
                    line: line + 1,
                    column: character + 1,
                })
            }
        }

        ts.forEachChild(node, walk)
    }

    walk(sourceFile)
    return slots
}

// ── check ───────────────────────────────────────────

function check(sourceFiles: ts.SourceFile[]): Violation[] {
    // Collect all slots grouped by file
    const slotsByFile = new Map<string, SlotEntry[]>()

    for (const sourceFile of sourceFiles) {
        const slots = collectDataSlots(sourceFile)
        if (slots.length > 0) {
            slotsByFile.set(sourceFile.fileName, slots)
        }
    }

    // Build a map of value → first occurrence (file:line)
    const firstSeen = new Map<string, SlotEntry>()
    const violations: Violation[] = []

    for (const [file, slots] of slotsByFile) {
        // Collect unique values within this file (duplicates within same file are fine)
        const seenInFile = new Set<string>()

        for (const slot of slots) {
            if (seenInFile.has(slot.value)) {
                continue
            }
            seenInFile.add(slot.value)

            const existing = firstSeen.get(slot.value)
            if (existing && existing.file !== file) {
                const otherRelative = existing.file
                violations.push({
                    file: slot.file,
                    line: slot.line,
                    column: slot.column,
                    rule: RULE_ID,
                    message: `Use a unique \`data-slot\` value. \`${slot.value}\` is already defined in \`${otherRelative}:${existing.line}\`.`,
                })
            }

            if (!existing) {
                firstSeen.set(slot.value, slot)
            }
        }
    }

    return violations
}

export { check }
