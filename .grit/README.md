# GritQL Rules

Custom lint rules enforced via Biome's GritQL plugin system.

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
