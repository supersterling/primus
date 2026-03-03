# GritQL Rules

Custom lint rules enforced via Biome's GritQL plugin system.

## Naming

Rule files use long, descriptive names that describe the **required behavior**, not what's banned.

- `require-*` — error severity, bans a pattern by requiring the correct alternative
- `request-*` — warning severity, nudges toward a preferred pattern

```
require-result-trycatch-for-error-handling.grit    ✓ (describes the requirement)
no-try-catch.grit                                  ✗ (describes the ban, not the requirement)

request-result-fail-over-throw.grit                ✓ (explicit severity)
prefer-result-fail.grit                            ✗ (ambiguous severity)
```

Files are grouped into subdirectories by concern: `database/`, `error-handling/`, `imports/`, `react/`, `style/`.

## Message Voice

Rule diagnostic messages follow a consistent two-sentence style:

1. **Imperative fix.** What to do instead.
2. **Terse reason.** Why the banned pattern is a problem.

```
Use `result.trycatch(fn)`. `try/catch` breaks the error-as-value pattern.
Use `@/` imports. Relative paths break when files move.
Use Tailwind classes. `style={{}}` bypasses the design system.
```

### Rules

- Imperative, not passive. "Use X" not "X should be used."
- Fix first, reason second.
- One sentence each. No conjunctions connecting them.
- Backtick code inline. No code blocks.
- End both sentences with a period.
- No links to docs or rules files.
