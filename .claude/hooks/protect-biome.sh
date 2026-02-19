#!/bin/bash
# Require human approval for any Edit/Write to biome.json

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE_PATH" == *biome.json* ]]; then
    echo "$INPUT" | jq -n '{
        hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "ask",
            permissionDecisionReason: "biome.json is a protected config — human approval required"
        }
    }'
fi
