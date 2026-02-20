# scripts

Project automation scripts. All new scripts should be created with the meta generator to ensure consistent structure and logging.

**Prefer shell scripts.** Both `create-sh-script.sh` and `create-ts-script.ts` generators exist, but default to shell — it runs on any machine without a runtime dependency. Use the TypeScript generator only when the script genuinely needs TypeScript: Bun APIs, type-safe data manipulation, complex object graphs, or importing project modules directly.

## meta

Tooling for generating scripts.

### [create-sh-script.sh](scripts:meta/create-sh-script.sh)

Generates bash scripts with standard boilerplate: structured logging, signal handling, and cleanup guards.

```bash
./scripts/meta/create-sh-script.sh SCRIPT_PATH "description" [-a author]
```

### create-ts-script.ts

Generates Bun TypeScript scripts with the same standard library, adapted to TypeScript idioms (`camelCase`, `async/await`, return values instead of `$REPLY`).

```bash
./scripts/meta/create-ts-script.ts SCRIPT_PATH "description" [-a author]
```

### Arguments (both generators)

| Argument | Required | Description |
| -------- | -------- | ----------- |
| `SCRIPT_PATH` | yes | Where the new script will be created (fails if exists) |
| `description` | yes | One-line description baked into the script header |
| `-a author` | no | Author name (defaults to `git config user.name` or `$USER`) |

Parent directories are created automatically. Generated scripts are `chmod +x` on creation.

### What you get

Every generated script includes:

- **Logging** — [log_flow](scripts:meta/create-sh-script.sh#log_flow) / [log_done](scripts:meta/create-sh-script.sh#log_done) pairs for nested indented blocks, [log_pass](scripts:meta/create-sh-script.sh#log_pass) / [log_fail](scripts:meta/create-sh-script.sh#log_fail) for success/error, [log_step](scripts:meta/create-sh-script.sh#log_step) for progress, [log_warn](scripts:meta/create-sh-script.sh#log_warn) for warnings, [log_bold](scripts:meta/create-sh-script.sh#log_bold) for emphasis, [log_pose](scripts:meta/create-sh-script.sh#log_pose) for questions
- **User input** — [ask_user_via_prompt](scripts:meta/create-sh-script.sh#ask_user_via_prompt) for free text (with optional default), [ask_user_via_confirm](scripts:meta/create-sh-script.sh#ask_user_via_confirm) for y/n, [ask_user_via_select](scripts:meta/create-sh-script.sh#ask_user_via_select) for numbered menus
- **Command execution** — [cmd_exec](scripts:meta/create-sh-script.sh#cmd_exec) runs commands with dimmed, indented output and preserved exit codes
- **Signal handling** — traps for INT/TERM/HUP with a [cleanup](scripts:meta/create-sh-script.sh#cleanup) guard you can override
- **[die](scripts:meta/create-sh-script.sh#die)** — fatal error + exit in one call
- **Strict mode** — `set -euo pipefail` (shell) or equivalent error handling (TypeScript)

### Output style

```
▷ Building project...
  ● Compiling sources...
  ✔ Compiled 42 files
    src/index.ts: OK           ← dim (cmd_exec)
▶ Build complete.
? Deploy now?                  ← cyan (ask_user_via_*)
  > yes
! Config not found             ← yellow (log_warn)
```
