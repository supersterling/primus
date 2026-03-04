# MCP

MCP provider plugin for Better Auth

`OAuth` `MCP`

  This plugin will soon be deprecated in favor of the [OAuth Provider Plugin](/docs/plugins/oauth-provider).

The **MCP** plugin lets your app act as an OAuth provider for MCP clients. It handles authentication and makes it easy to issue and manage access tokens for MCP applications.

  This plugin is based on OIDC Provider plugin. It's currently not ready for production use. We are working on it and will update this documentation when it's ready.

## Installation

    ### Add the Plugin

    Add the MCP plugin to your auth configuration and specify the login page path.

```ts
    import { betterAuth } from "better-auth";
    import { mcp } from "better-auth/plugins";

    export const auth = betterAuth({
        plugins: [
            mcp({
                loginPage: "/sign-in" // path to your login page
            })
        ]
    });
```

      This doesn't have a client plugin, so you don't need to make any changes to your authClient.

    ### Generate Schema

    Run the migration or generate the schema to add the necessary fields and tables to the database.

```bash
            npx @better-auth/cli migrate
```

```bash
            pnpm dlx @better-auth/cli migrate
```

```bash
            yarn dlx @better-auth/cli migrate
```

```bash
            bun x @better-auth/cli migrate
```

```bash
            npx @better-auth/cli generate
```

```bash
            pnpm dlx @better-auth/cli generate
```

```bash
            yarn dlx @better-auth/cli generate
```

```bash
            bun x @better-auth/cli generate
```

    The MCP plugin uses the same schema as the OIDC Provider plugin. See the [OIDC Provider Schema](/docs/plugins/oidc-provider#schema) section for details.

## Usage

### OAuth Discovery Metadata

Better Auth already handles the `/api/auth/.well-known/oauth-authorization-server` route automatically but some client may fail to parse the `WWW-Authenticate` header and default to `/.well-known/oauth-authorization-server` (this can happen, for example, if your CORS configuration doesn't expose the `WWW-Authenticate`). For this reason it's better to add a route to expose OAuth metadata for MCP clients:

```ts
import { oAuthDiscoveryMetadata } from "better-auth/plugins";
import { auth } from "../../../lib/auth";

export const GET = oAuthDiscoveryMetadata(auth);
```

### OAuth Protected Resource Metadata

Better Auth already handles the `/api/auth/.well-known/oauth-protected-resource` route automatically but some client may fail to parse the `WWW-Authenticate` header and default to `/.well-known/oauth-protected-resource` (this can happen, for example, if your CORS configuration doesn't expose the `WWW-Authenticate`). For this reason it's better to add a route to expose OAuth metadata for MCP clients:

```ts
import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
import { auth } from "@/lib/auth";

export const GET = oAuthProtectedResourceMetadata(auth);
```

### MCP Session Handling

You can use the helper function `withMcpAuth` to get the session and handle unauthenticated calls automatically.

```ts
import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";

const handler = withMcpAuth(auth, (req, session) => {
    // session contains the access token record with scopes and user ID
    return createMcpHandler(
        (server) => {
            server.tool(
                "echo",
                "Echo a message",
                { message: z.string() },
                async ({ message }) => {
                    return {
                        content: [{ type: "text", text: `Tool echo: ${message}` }],
                    };
                },
            );
        },
        {
            capabilities: {
                tools: {
                    echo: {
                        description: "Echo a message",
                    },
                },
            },
        },
        {
            redisUrl: process.env.REDIS_URL,
            basePath: "/api",
            verboseLogs: true,
            maxDuration: 60,
        },
    )(req);
});

export { handler as GET, handler as POST, handler as DELETE };
```

You can also use `auth.api.getMcpSession` to get the session using the access token sent from the MCP client:

```ts
import { auth } from "@/lib/auth";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = async (req: Request) => {
     // session contains the access token record with scopes and user ID
    const session = await auth.api.getMcpSession({
        headers: req.headers
    })
    if(!session){
        //this is important and you must return 401
        return new Response(null, {
            status: 401
        })
    }
    return createMcpHandler(
        (server) => {
            server.tool(
                "echo",
                "Echo a message",
                { message: z.string() },
                async ({ message }) => {
                    return {
                        content: [{ type: "text", text: `Tool echo: ${message}` }],
                    };
                },
            );
        },
        {
            capabilities: {
                tools: {
                    echo: {
                        description: "Echo a message",
                    },
                },
            },
        },
        {
            redisUrl: process.env.REDIS_URL,
            basePath: "/api",
            verboseLogs: true,
            maxDuration: 60,
        },
    )(req);
}

export { handler as GET, handler as POST, handler as DELETE };
```

## Configuration

The MCP plugin accepts the following configuration options:

### OIDC Configuration

The plugin supports additional OIDC configuration options through the `oidcConfig` parameter:

## Schema

The MCP plugin uses the same schema as the OIDC Provider plugin. See the [OIDC Provider Schema](/docs/plugins/oidc-provider#schema) section for details.
