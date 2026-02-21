import { parseArgs } from "node:util"
import { Project, type SourceFile } from "ts-morph"

const SEGMENT_SPLIT = /[/-]/
const FUNCTIONS_IMPORT_PATH = /^@\/inngest\/[^/]+\/functions\/(.+)$/
const FUNCTIONS_IMPORT_PREFIX = /^@\/inngest\/[^/]+\/functions\//
const CREATE_EVENT_CALL = /^createEvent\(\s*"([^"]+)"/
const EMPTY_OBJECT = /\{\s*\}/
const EVENTS_OBJ_SUFFIX = /\}\s*as const satisfies EventRecord$/
const EVENTS_OBJ_PREFIX = /^\{/
const TRAILING_COMMA = /,(\s*\})/

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

const FUNCTIONS_EMPTY_TEMPLATE = `import { type InngestFunction } from "inngest"

const functions: InngestFunction.Like[] = []

export { functions }
`

function functionsList(file: string): void {
    const source = loadFile(file)
    const imports = source.getImportDeclarations()

    for (const imp of imports) {
        const specifier = imp.getModuleSpecifierValue()
        const match = specifier.match(FUNCTIONS_IMPORT_PATH)
        if (match) {
            process.stdout.write(`${match[1]}\n`)
        }
    }
}

function functionsInsert(file: string, path: string, client: string): void {
    const camel = toCamelCase(path)
    const importPath = `@/inngest/${client}/functions/${path}`
    const source = loadFile(file)

    const existing = source.getImportDeclaration((d) => d.getModuleSpecifierValue() === importPath)
    if (existing) {
        die(`Function '${path}' already exists in ${file}`)
    }

    const functionsVar = source.getVariableDeclaration("functions")
    if (!functionsVar) {
        die(`No 'functions' variable found in ${file}`)
    }

    const initializer = functionsVar.getInitializer()
    if (!initializer) {
        die(`No initializer for 'functions' in ${file}`)
    }

    const isEmptyArray = initializer.getText().replace(/\s/g, "") === "[]"

    if (isEmptyArray) {
        const content = `import ${camel} from "${importPath}"

const functions = [${camel}]

export { functions }
`
        source.replaceWithText(content)
    } else {
        source.addImportDeclaration({
            defaultImport: camel,
            moduleSpecifier: importPath,
        })

        const arrayText = initializer.getText()
        const inner = arrayText.slice(1, -1).trim()
        const entries = inner
            ? inner
                  .split(",")
                  .map((e) => e.trim())
                  .filter(Boolean)
            : []
        entries.push(camel)
        functionsVar.setInitializer(`[${entries.join(", ")}]`)
    }

    source.saveSync()
}

function functionsRemove(file: string, path: string): void {
    const camel = toCamelCase(path)
    const source = loadFile(file)

    const imp = source.getImportDeclaration(
        (d) =>
            d.getModuleSpecifierValue().match(FUNCTIONS_IMPORT_PREFIX) !== null &&
            d.getModuleSpecifierValue().endsWith(`/${path}`),
    )
    if (!imp) {
        die(`Function '${path}' not found in ${file}`)
    }
    imp.remove()

    const functionsVar = source.getVariableDeclaration("functions")
    if (!functionsVar) {
        die(`No 'functions' variable found in ${file}`)
    }

    const initializer = functionsVar.getInitializer()
    if (!initializer) {
        die(`No initializer for 'functions' in ${file}`)
    }

    const arrayText = initializer.getText()
    const inner = arrayText.slice(1, -1).trim()
    const entries = inner
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e !== "" && e !== camel)

    if (entries.length === 0) {
        source.replaceWithText(FUNCTIONS_EMPTY_TEMPLATE)
    } else {
        functionsVar.setInitializer(`[${entries.join(", ")}]`)
    }

    source.saveSync()
}

//
// Events operations
//

const EVENTS_EMPTY_TEMPLATE = `import { type EventRecord } from "@/lib/inngest"

const events = {} as const satisfies EventRecord

export { events }
`

function ensureEventsImports(source: SourceFile): void {
    const libImport = source.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === "@/lib/inngest",
    )
    if (libImport) {
        const names = libImport.getNamedImports().map((n) => n.getName())
        if (!names.includes("createEvent")) {
            libImport.addNamedImport("createEvent")
        }
        if (!names.includes("InferEventPayload")) {
            libImport.addNamedImport({ name: "InferEventPayload", isTypeOnly: true })
        }
    } else {
        source.addImportDeclaration({
            namedImports: [
                { name: "createEvent" },
                { name: "EventRecord", isTypeOnly: true },
                { name: "InferEventPayload", isTypeOnly: true },
            ],
            moduleSpecifier: "@/lib/inngest",
        })
    }

    const hasZod = source.getImportDeclaration((d) => d.getModuleSpecifierValue() === "zod")
    if (!hasZod) {
        source.addImportDeclaration({
            namedImports: ["z"],
            moduleSpecifier: "zod",
        })
    }
}

function addEventsProperty(
    eventsVar: ReturnType<SourceFile["getVariableDeclaration"]>,
    pascal: string,
    file: string,
): void {
    if (!eventsVar) {
        die(`No 'events' variable found in ${file}`)
    }
    const initializer = eventsVar.getInitializer()
    if (!initializer) {
        die(`No initializer for 'events' in ${file}`)
    }
    const objText = initializer.getText()
    const propEntry = `[${pascal}Schema.name]: ${pascal}Schema.data`
    if (EMPTY_OBJECT.test(objText)) {
        eventsVar.setInitializer(`{ ${propEntry} } as const satisfies EventRecord`)
    } else {
        const inner = objText.replace(EVENTS_OBJ_SUFFIX, "").replace(EVENTS_OBJ_PREFIX, "").trim()
        eventsVar.setInitializer(`{ ${inner}, ${propEntry} } as const satisfies EventRecord`)
    }
}

function eventsList(file: string): void {
    const source = loadFile(file)

    for (const decl of source.getVariableDeclarations()) {
        const init = decl.getInitializer()
        if (!init) {
            continue
        }
        const match = init.getText().match(CREATE_EVENT_CALL)
        if (match) {
            process.stdout.write(`${match[1]}\n`)
        }
    }
}

function eventsInsert(file: string, id: string): void {
    const pascal = toPascalCase(id)
    const source = loadFile(file)

    const existing = source.getVariableDeclaration(`${pascal}Schema`)
    if (existing) {
        die(`Event '${id}' already exists in ${file}`)
    }

    const eventsVar = source.getVariableDeclaration("events")
    if (!eventsVar) {
        die(`No 'events' variable found in ${file}`)
    }
    const eventsStatement = eventsVar.getVariableStatement()
    if (!eventsStatement) {
        die(`No 'events' statement found in ${file}`)
    }

    ensureEventsImports(source)

    const insertIndex = eventsStatement.getChildIndex()
    source.insertStatements(insertIndex, [
        `const ${pascal}Schema = createEvent("${id}", z.object({}))`,
        `type ${pascal} = InferEventPayload<typeof ${pascal}Schema>`,
    ])

    addEventsProperty(eventsVar, pascal, file)

    const typeExport = source.getExportDeclaration((d) => d.isTypeOnly())
    if (typeExport) {
        typeExport.addNamedExport(pascal)
    } else {
        source.addExportDeclaration({
            isTypeOnly: true,
            namedExports: [pascal],
        })
    }

    source.saveSync()
}

function eventsRemove(file: string, id: string): void {
    const pascal = toPascalCase(id)
    const source = loadFile(file)

    // Remove schema variable
    const schemaVar = source.getVariableDeclaration(`${pascal}Schema`)
    if (!schemaVar) {
        die(`Event '${id}' not found in ${file}`)
    }
    schemaVar.getVariableStatement()?.remove()

    // Remove type alias
    source.getTypeAlias(pascal)?.remove()

    // Remove property from events object
    const eventsVar = source.getVariableDeclaration("events")
    if (!eventsVar) {
        die(`No 'events' variable found in ${file}`)
    }

    const initializer = eventsVar.getInitializer()
    if (initializer) {
        const propPattern = new RegExp(
            `\\[${pascal}Schema\\.name\\]:\\s*${pascal}Schema\\.data,?\\s*`,
        )
        const cleaned = initializer.getText().replace(propPattern, "").replace(TRAILING_COMMA, "$1")
        eventsVar.setInitializer(cleaned)
    }

    // Remove from type export
    const typeExport = source.getExportDeclaration((d) => d.isTypeOnly())
    if (typeExport) {
        typeExport
            .getNamedExports()
            .find((e) => e.getName() === pascal)
            ?.remove()
        if (typeExport.getNamedExports().length === 0) {
            typeExport.remove()
        }
    }

    // Reset to empty template if no events remain
    const hasEvents = source.getVariableDeclarations().some((d) => {
        const init = d.getInitializer()
        return init && CREATE_EVENT_CALL.test(init.getText())
    })

    if (!hasEvents) {
        source.replaceWithText(EVENTS_EMPTY_TEMPLATE)
    }

    source.saveSync()
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
