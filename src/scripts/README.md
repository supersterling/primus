# scripts

Project automation scripts. Run via `bun run <script>` from the package.json scripts.

## Scripts

### generate-env-example.ts

Generates `.env.example` from the Zod schemas in `src/lib/env.ts`. Extracts key names, types, enum values, descriptions, and defaults — no need to maintain `.env.example` by hand.

```bash
bun run env:example
```

Runs automatically via the post-commit hook when `src/lib/env.ts` changes.
