import { parseArgs } from "node:util"
import { Project, type SourceFile } from "ts-morph"

const SEGMENT_SPLIT = /[/-]/

//
// Naming
//

function toCamelCase(path: string): string {
    return path
        .split(SEGMENT_SPLIT)
        .map((seg, i) => (i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1)))
        .join("")
}

function toPascalCase(id: string): string {
    return id
        .split(SEGMENT_SPLIT)
        .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
        .join("")
}

//
// Helpers
//

function loadFile(filePath: string): SourceFile {
    const project = new Project({ useInMemoryFileSystem: false })
    const source = project.addSourceFileAtPath(filePath)
    return source
}

function die(message: string): never {
    process.stderr.write(`${message}\n`)
    process.exit(1)
}

//
// Functions operations
//

function functionsList(file: string): void {
    die("Not implemented: functions list")
}

function functionsInsert(file: string, path: string, client: string): void {
    die("Not implemented: functions insert")
}

function functionsRemove(file: string, path: string): void {
    die("Not implemented: functions remove")
}

//
// Events operations
//

function eventsList(file: string): void {
    die("Not implemented: events list")
}

function eventsInsert(file: string, id: string): void {
    die("Not implemented: events insert")
}

function eventsRemove(file: string, id: string): void {
    die("Not implemented: events remove")
}

//
// CLI
//

const [type, action, ...rest] = process.argv.slice(2)

const { values } = parseArgs({
    args: rest,
    options: {
        file: { type: "string" },
        path: { type: "string" },
        client: { type: "string" },
        id: { type: "string" },
    },
    strict: true,
})

if (!(type && action)) {
    die("Usage: manage-inngest-registries.ts <functions|events> <insert|remove|list> [flags]")
}

if (!values.file) {
    die("--file is required")
}

if (type === "functions") {
    if (action === "list") {
        functionsList(values.file)
    } else if (action === "insert") {
        if (!(values.path && values.client)) {
            die("--path and --client required for functions insert")
        }
        functionsInsert(values.file, values.path, values.client)
    } else if (action === "remove") {
        if (!values.path) {
            die("--path required for functions remove")
        }
        functionsRemove(values.file, values.path)
    } else {
        die(`Unknown action: ${action}`)
    }
} else if (type === "events") {
    if (action === "list") {
        eventsList(values.file)
    } else if (action === "insert") {
        if (!values.id) {
            die("--id required for events insert")
        }
        eventsInsert(values.file, values.id)
    } else if (action === "remove") {
        if (!values.id) {
            die("--id required for events remove")
        }
        eventsRemove(values.file, values.id)
    } else {
        die(`Unknown action: ${action}`)
    }
} else {
    die(`Unknown type: ${type}`)
}
