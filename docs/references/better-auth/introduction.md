# Introduction

Introduction to Better Auth.

Better Auth is a framework-agnostic, universal authentication and authorization framework for TypeScript. It provides a comprehensive set of features out of the box and includes a plugin ecosystem that simplifies adding advanced functionalities. Whether you need 2FA, passkey, multi-tenancy, multi-session support, or even enterprise features like SSO, creating your own IDP, it lets you focus on building your application instead of reinventing the wheel.

## Features

Better Auth aims to be the most comprehensive auth library. It provides a wide range of features out of the box and allows you to extend it with plugins. Here are some of the features:

...and much more!

***

## AI tooling

### LLMs.txt

Better Auth exposes an `LLMs.txt` that helps AI models understand how to integrate and interact with your authentication system. See it at [https://better-auth.com/llms.txt](https://better-auth.com/llms.txt).

### Skills

Better Auth provides skills that can be added to your AI coding assistant to help it understand Better Auth best practices and implementation patterns.

```bash
npx skills add better-auth/skills
```

### MCP

Better Auth provides an MCP server so you can use it with any AI model that supports the Model Context Protocol (MCP).

#### CLI Options

Use the Better Auth CLI to easily add the MCP server to your preferred client:

```bash
    npx @better-auth/cli mcp --cursor
```

```bash
    npx @better-auth/cli mcp --claude-code
```

```bash
    npx @better-auth/cli mcp --open-code
```

```bash
    npx @better-auth/cli mcp --manual
```

#### Manual Configuration

Alternatively, you can manually configure the MCP server for each client:

```bash
    claude mcp add --transport http better-auth https://mcp.inkeep.com/better-auth/mcp
```

```json
      {
          "$schema": "https://opencode.ai/config.json",
          "mcp": {
              "better-auth": {
                  "type": "remote",
                  "url": "https://mcp.inkeep.com/better-auth/mcp",
                  "enabled": true,
              }
          }
      }
```

```json
    {
       "better-auth": {
           "url": "https://mcp.inkeep.com/better-auth/mcp"
       }
    }
```

  We provide a first‑party MCP, powered by [Inkeep](https://inkeep.com). You can alternatively use [`context7`](https://context7.com/) and other MCP providers.
