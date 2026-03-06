/**
 * Tailwind v4 design system loader.
 *
 * Reads the project's CSS entry point, resolves all @import statements,
 * and loads the full design system via the unstable Tailwind API.
 * Exports the loaded design system along with theme token metadata
 * for use by style lint rules.
 */

import * as fs from "node:fs"
import * as path from "node:path"
import { __unstable__loadDesignSystem } from "tailwindcss"
import { logger } from "@/lib/logger"

// ── types ────────────────────────────────────────────

type LoadedDesignSystem = {
    /** The raw Tailwind DesignSystem instance */
    ds: Awaited<ReturnType<typeof __unstable__loadDesignSystem>>
    /** Every valid utility class (no variants) */
    classList: Set<string>
    /** Theme color tokens that reference CSS variables (bg-primary, etc.) */
    allowedColors: Set<string>
    /** All color tokens including raw Tailwind colors (blue-500, etc.) */
    allColors: Set<string>
    /** Theme namespace map for targeted diagnostics */
    themeNamespaces: Map<string, Map<string | null, string>>
}

// ── color utility detection ──────────────────────────

const COLOR_UTILITIES = new Set([
    "bg",
    "text",
    "border",
    "outline",
    "ring",
    "shadow",
    "accent",
    "caret",
    "fill",
    "stroke",
    "decoration",
    "divide",
    "placeholder",
    "from",
    "via",
    "to",
    "ring-offset",
])

function isColorUtility(className: string): boolean {
    for (const prefix of COLOR_UTILITIES) {
        if (className.startsWith(`${prefix}-`)) {
            return true
        }
    }
    return false
}

// ── stylesheet resolution ────────────────────────────

function resolvePackageStylesheet(id: string, base: string): { path: string; content: string } {
    // Try to resolve as a package — walk up from base looking for node_modules
    const parts = id.split("/")
    const isScoped = id.startsWith("@") && parts.length >= 2
    const packageName = isScoped ? `${parts[0]}/${parts[1]}` : parts[0]
    const subpath = isScoped ? parts.slice(2).join("/") : parts.slice(1).join("/")

    let searchDir = base
    for (;;) {
        const candidate = path.join(searchDir, "node_modules", packageName)
        if (fs.existsSync(candidate)) {
            // If there's a subpath, resolve it directly
            if (subpath) {
                const resolved = path.join(candidate, subpath)
                if (fs.existsSync(resolved)) {
                    return { path: resolved, content: fs.readFileSync(resolved, "utf-8") }
                }
                // Try with .css extension
                const withExt = `${resolved}.css`
                if (fs.existsSync(withExt)) {
                    return { path: withExt, content: fs.readFileSync(withExt, "utf-8") }
                }
            }

            // Read package.json to find the style/main entry
            const pkgJsonPath = path.join(candidate, "package.json")
            if (fs.existsSync(pkgJsonPath)) {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"))

                // Check exports for the subpath or "." entry with "style" condition
                if (pkgJson.exports) {
                    const exportKey = subpath ? `./${subpath}` : "."
                    const exportEntry = pkgJson.exports[exportKey]
                    if (typeof exportEntry === "string") {
                        const resolved = path.join(candidate, exportEntry)
                        return { path: resolved, content: fs.readFileSync(resolved, "utf-8") }
                    }
                    if (exportEntry && typeof exportEntry === "object") {
                        let styleEntry = exportEntry.style
                        if (!styleEntry) {
                            styleEntry = exportEntry.import
                        }
                        if (!styleEntry) {
                            styleEntry = exportEntry.default
                        }
                        if (typeof styleEntry === "string") {
                            const resolved = path.join(candidate, styleEntry)
                            return { path: resolved, content: fs.readFileSync(resolved, "utf-8") }
                        }
                    }
                }

                // Fallback: "style" field in package.json
                if (pkgJson.style) {
                    const resolved = path.join(candidate, pkgJson.style)
                    return { path: resolved, content: fs.readFileSync(resolved, "utf-8") }
                }

                // Fallback: "main" field
                if (pkgJson.main?.endsWith(".css")) {
                    const resolved = path.join(candidate, pkgJson.main)
                    return { path: resolved, content: fs.readFileSync(resolved, "utf-8") }
                }
            }

            // Last resort: index.css in the package root
            const indexCss = path.join(candidate, "index.css")
            if (fs.existsSync(indexCss)) {
                return { path: indexCss, content: fs.readFileSync(indexCss, "utf-8") }
            }

            logger.error({ id, candidate }, "stylesheet entry unresolvable")
            return { path: id, content: "" }
        }

        const parent = path.dirname(searchDir)
        if (parent === searchDir) {
            break
        }
        searchDir = parent
    }

    logger.error({ packageName, base }, "could not find package")
    return { path: id, content: "" }
}

async function resolveStylesheet(
    id: string,
    base: string,
): Promise<{ path: string; base: string; content: string }> {
    // Relative import
    if (id.startsWith("./") || id.startsWith("../")) {
        const resolved = path.resolve(base, id)
        const content = fs.readFileSync(resolved, "utf-8")
        return { path: resolved, base: path.dirname(resolved), content }
    }

    // Package import
    const result = resolvePackageStylesheet(id, base)
    return { path: result.path, base: path.dirname(result.path), content: result.content }
}

// ── theme extraction ─────────────────────────────────

// ── entry point resolution ───────────────────────────

function findCssEntryPath(projectRoot: string): string {
    // Check for index.css first (some setups use a separate entry)
    const indexCss = path.join(projectRoot, "src/app/index.css")
    if (fs.existsSync(indexCss)) {
        return indexCss
    }

    // Read components.json for the configured CSS path
    const componentsJsonPath = path.join(projectRoot, "components.json")
    if (fs.existsSync(componentsJsonPath)) {
        const config = JSON.parse(fs.readFileSync(componentsJsonPath, "utf-8"))
        const cssPath = config?.tailwind?.css
        if (cssPath) {
            const resolved = path.join(projectRoot, cssPath)
            if (fs.existsSync(resolved)) {
                return resolved
            }
        }
    }

    // Final fallback
    const globalsCss = path.join(projectRoot, "src/app/globals.css")
    if (fs.existsSync(globalsCss)) {
        return globalsCss
    }

    logger.error({ projectRoot }, "could not find CSS entry point")
    process.exit(1)
}

// ── public API ───────────────────────────────────────

async function loadDesignSystem(projectRoot: string): Promise<LoadedDesignSystem> {
    const entryPath = findCssEntryPath(projectRoot)
    const css = fs.readFileSync(entryPath, "utf-8")
    const base = path.dirname(path.resolve(entryPath))

    console.log(`Loading design system from ${path.relative(projectRoot, entryPath)}`)

    const ds = await __unstable__loadDesignSystem(css, {
        base,
        loadStylesheet: async (id, sheetBase) => resolveStylesheet(id, sheetBase),
    })

    const classList = new Set(ds.getClassList().map(([name]) => name))

    const allColors = new Set<string>()
    const allowedColors = new Set<string>()
    const colorEntries = ds.theme.namespace("--color")
    for (const [key, value] of colorEntries) {
        if (key === null) {
            continue
        }
        allColors.add(key)
        if (value.includes("var(--")) {
            allowedColors.add(key)
        }
    }

    const NamespacePrefixes = [
        "--color",
        "--animate",
        "--ease",
        "--font",
        "--radius",
        "--shadow",
        "--spacing",
        "--breakpoint",
        "--inset-shadow",
        "--drop-shadow",
    ]
    const themeNamespaces = new Map<string, Map<string | null, string>>()
    for (const prefix of NamespacePrefixes) {
        const ns = ds.theme.namespace(prefix)
        if (ns.size > 0) {
            themeNamespaces.set(prefix, ns)
        }
    }

    console.log(`  Classes: ${classList.size}`)
    console.log(`  Allowed colors: ${allowedColors.size}`)
    console.log(`  All colors: ${allColors.size}`)

    return { ds, classList, allowedColors, allColors, themeNamespaces }
}

export { COLOR_UTILITIES, isColorUtility, loadDesignSystem }
export type { LoadedDesignSystem }
