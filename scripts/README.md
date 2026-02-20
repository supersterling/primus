# scripts

Project automation scripts. All new scripts should be created with the meta generator to ensure consistent structure and logging.

## meta

Tooling for generating scripts.

### [create-sh-script.sh](scripts:meta/create-sh-script.sh)

Generates bash scripts with standard boilerplate: structured logging, signal handling, and cleanup guards.

```bash
./scripts/meta/create-sh-script.sh SCRIPT_PATH "description" [-a author]
```

| Argument | Required | Description |
| -------- | -------- | ----------- |
| `SCRIPT_PATH` | yes | Where the new script will be created (fails if exists) |
| `description` | yes | One-line description baked into the script header |
| `-a author` | no | Author name (defaults to `git config user.name` or `$USER`) |

Parent directories are created automatically. The generated script is `chmod +x` on creation.

### What you get

Every generated script includes:

- **Logging** — [log_flow](scripts:meta/create-sh-script.sh#log_flow) / [log_done](scripts:meta/create-sh-script.sh#log_done) pairs for nested indented blocks, [log_pass](scripts:meta/create-sh-script.sh#log_pass) / [log_fail](scripts:meta/create-sh-script.sh#log_fail) for success/error, [log_step](scripts:meta/create-sh-script.sh#log_step) for progress, [log_warn](scripts:meta/create-sh-script.sh#log_warn) for non-fatal issues
- **Command execution** — [cmd_exec](scripts:meta/create-sh-script.sh#cmd_exec) runs commands with dimmed, indented output and preserved exit codes
- **Signal handling** — traps for INT/TERM/HUP with a [cleanup](scripts:meta/create-sh-script.sh#cleanup) guard you can override
- **[die](scripts:meta/create-sh-script.sh#die)** — fatal error + exit in one call
- **`set -euo pipefail`** — strict mode out of the box

### Output style

```
▷ Building project...
  ● Compiling sources...
  ✔ Compiled 42 files
    src/index.ts: OK           ← dim (cmd_exec)
▶ Build complete.
```
