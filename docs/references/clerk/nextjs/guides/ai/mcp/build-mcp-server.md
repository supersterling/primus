# Build an MCP server in your application with Clerk

**Example Repository**

- [Next.js & Clerk MCP Server Repo](https://github.com/clerk/mcp-nextjs-example)

**Before you start**

- [A Clerk application is required](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [Integrate Clerk into your Next.js application](https://clerk.com/docs/nextjs/getting-started/quickstart.md)

This guide demonstrates how to build an MCP server using Clerk's OAuth server in your Next.js app. This example is written for Next.js App Router, but **can be adapted for Next.js Pages Router**. It assumes that you have already integrated Clerk into your app by following the [`quickstart`](https://clerk.com/docs/nextjs/getting-started/quickstart.md).

> For most client implementations of MCP, [dynamic client registration](https://openid.net/specs/openid-connect-registration-1_0.html) is required. This allows MCP-compatible clients to automatically register themselves with your server during the OAuth flow.
> Before proceeding, ensure you have toggled on the **Dynamic client registration** option in the [**OAuth applications**](https://dashboard.clerk.com/~/oauth-applications) page in the Clerk Dashboard.

1. ## Install dependencies

   To get started, this implementation requires the following packages to be installed in your project:

   - [`@vercel/mcp-adapter`](https://github.com/vercel/mcp-adapter): A utility library that simplifies building an MCP server by handling the core protocol logic for you. It also includes an authentication wrapper that allows you to plug in your own token validation - in this case, using Clerk's OAuth tokens.
   - [`@clerk/mcp-tools`](https://github.com/clerk/mcp-tools): A helper library built on top of the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) used to connect Clerk OAuth with MCP easily.

   ```npm
   npm install @vercel/mcp-adapter @clerk/mcp-tools
   ```
2. ## Set up your app with Clerk and MCP imports

   The following code is the starting point for your MCP server. It includes the imports and setup needed to implement an MCP server with Clerk.

   1. In your `app/` directory, create a `[transport]` folder. This dynamic segment allows the MCP server to support different transport protocols used by the LLM tool. Streamable HTTP is the recommended default transport in the [current MCP spec](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports), and uses `/mcp` as the base path. SSE is also supported, and uses `/sse` as the base path.
   2. Inside this directory, create a `route.ts` file with the following code.

   ```ts {{ filename: 'app/[transport]/route.ts' }}
   import { verifyClerkToken } from '@clerk/mcp-tools/next'
   import { createMcpHandler, withMcpAuth } from '@vercel/mcp-adapter'
   import { auth, clerkClient } from '@clerk/nextjs/server'

   const clerk = await clerkClient()
   ```
3. ## Create your MCP server and define tools

   To let external LLM-powered tools securely interact with your app, you need to define an MCP server, and expose one or more [resources](https://modelcontextprotocol.io/docs/concepts/resources), [prompts](https://modelcontextprotocol.io/docs/concepts/prompts), and/or [tools](https://modelcontextprotocol.io/docs/concepts/tools).

   For this guide, you'll implement a single, example tool called `get_clerk_user_data` that retrieves information about the authenticated Clerk user. For more documentation on how to build MCP tools, see the [MCP documentation](https://modelcontextprotocol.io/docs/concepts/tools).

   Vercel's `createMcpHandler()` function is used to handle the connection and transports required by the MCP protocol. Within its callback function, you can define tools that external LLM-based apps can invoke using `server.tool()`. Each tool includes:

   - A name (`get-clerk-user-data`).
   - A description of what the tool does.
   - Input parameters (none in this case).
   - A function that represents the implementation of the tool. In this case, it extracts the user ID, which is provided by Clerk's OAuth authentication, and then fetches the user's data using Clerk's [`getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md) method. The response is then returned in MCP's expected response format.

   ```ts {{ filename: 'app/[transport]/route.ts', mark: [[7, 25]] }}
   import { verifyClerkToken } from '@clerk/mcp-tools/next'
   import { createMcpHandler, withMcpAuth } from '@vercel/mcp-adapter'
   import { auth, clerkClient } from '@clerk/nextjs/server'

   const clerk = await clerkClient()

   const handler = createMcpHandler((server) => {
     server.tool(
       'get-clerk-user-data',
       'Gets data about the Clerk user that authorized this request',
       {},
       async (_, { authInfo }) => {
         const userId = authInfo!.extra!.userId! as string
         const userData = await clerk.users.getUser(userId)

         return {
           content: [{ type: 'text', text: JSON.stringify(userData) }],
         }
       },
     )
   })
   ```

   ## Secure your MCP server

   Now that your MCP server and tools are defined, the next step is to secure your endpoints with OAuth. This ensures only authenticated clients with valid Clerk-issued tokens can access your tools.

   Add the following code to your `route.ts` file. This uses Vercel's `withMcpAuth()` function to wrap the MCP handler in authentication logic and uses Clerk's [`auth()`](https://clerk.com/docs/reference/nextjs/app-router/auth.md) helper to parse the incoming OAuth token and extract the session context. This data is then passed into Clerk's `verifyClerkToken()` helper method, which verifies the OAuth token, extracts key metadata, and makes the current user'd ID available to tool call functions. To learn more about verifying OAuth tokens in Next.js apps, see the [`dedicated guide`](https://clerk.com/docs/nextjs/guides/development/verifying-oauth-access-tokens.md).

   > OAuth tokens are machine tokens. Machine token usage is free during our public beta period but will be subject to pricing once generally available. Pricing is expected to be competitive and below market averages.

   The `authHandler` is then exported for both `GET` and `POST` methods. The `GET` method is required for SSE support only - if you do not need to support SSE, you can export only `POST` (and the `[transport]` part of the route).

   ```ts {{ filename: 'app/[transport]/route.ts' }}
   // The rest of your code...

   const authHandler = withMcpAuth(
     handler,
     async (_, token) => {
       const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
       return verifyClerkToken(clerkAuth, token)
     },
     {
       required: true,
       resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp',
     },
   )

   export { authHandler as GET, authHandler as POST }
   ```

   ## Expose MCP metadata endpoints

   To comply with the MCP specification, your server must expose [OAuth protected resource metadata](https://datatracker.ietf.org/doc/html/rfc9728#section-4.1) at a specific endpoint (`.well-known/oauth-protected-resource`).

   Older versions of the MCP spec required that you also expose [OAuth authorization server metadata](https://datatracker.ietf.org/doc/html/rfc8414) at a specific endpoint (`.well-known/oauth-authorization-server`). This is no longer required by the current MCP spec, but it may be necessary for some clients that only support older versions of the spec.

   These metadata endpoints allow clients to discover where to authenticate, and some details about how the authentication service works. Clerk provides prebuilt helpers via [`@clerk/mcp-tools`](https://github.com/clerk/mcp-tools) that handle this for you:

   - `protectedResourceHandlerClerk`: Next.js route handler that serves OAuth **protected resource metadata** in the format expected by MCP clients. This handler lets you define specific supported OAuth scopes to declare what access levels your resource requires.
   - `authServerMetadataHandlerClerk`: Next.js route handler that serves OAuth **authorization server metadata** in the format expected by MCP clients.
   - `metadataCorsOptionsRequestHandler`: Handles CORS preflight (`OPTIONS`) requests for OAuth metadata endpoints. Required to ensure public, browser-based MCP clients can access these endpoints.

   > For a more in-depth explanation of these helpers, see the [MCP Next.js reference](https://github.com/clerk/mcp-tools/tree/main/next).

   To expose your MCP metadata endpoints:

   1. In your `app/` directory, create a `.well-known` folder.
   2. Inside this directory, create two subdirectories called `oauth-protected-resource` and `oauth-authorization-server`.
   3. Inside the `oauth-protected-resource` directory, create a `mcp` subdirectory.
   4. In the `mcp` subdirectory, create a `route.ts` file with the following code for that specific route.
   5. In the `oauth-authorization-server` directory, create a `route.ts` file with the following code for that specific route.

      **oauth-authorization-server**

      ```ts {{ filename: 'app/.well-known/oauth-authorization-server/route.ts' }}
      import {
        authServerMetadataHandlerClerk,
        metadataCorsOptionsRequestHandler,
      } from '@clerk/mcp-tools/next'

      const handler = authServerMetadataHandlerClerk()
      const corsHandler = metadataCorsOptionsRequestHandler()

      export { handler as GET, corsHandler as OPTIONS }
      ```

      **oauth-protected-resource**

      ```ts {{ filename: 'app/.well-known/oauth-protected-resource/mcp/route.ts' }}
      import {
        metadataCorsOptionsRequestHandler,
        protectedResourceHandlerClerk,
      } from '@clerk/mcp-tools/next'

      const handler = protectedResourceHandlerClerk({
        // Specify which OAuth scopes this protected resource supports
        scopes_supported: ['profile', 'email'],
      })
      const corsHandler = metadataCorsOptionsRequestHandler()

      export { handler as GET, corsHandler as OPTIONS }
      ```
   6. Your `.well-known` endpoints must be **publicly accessible** for MCP clients to discover OAuth metadata. When protecting routes, consider these paths and ensure they are not protected. For example, if you're using [`clerkMiddleware() to protect all routes`](https://clerk.com/docs/reference/nextjs/clerk-middleware.md#protect-all-routes), you can exclude the `.well-known` endpoints like this:

      > If you're using Next.js ≤15, name your file `middleware.ts` instead of `proxy.ts`. The code itself remains the same; only the filename changes.

      ```ts {{ filename: 'proxy.ts' }}
      import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

      const isPublicRoute = createRouteMatcher([
        '/.well-known/oauth-authorization-server(.*)',
        '/.well-known/oauth-protected-resource(.*)',
      ])

      export default clerkMiddleware(async (auth, req) => {
        if (isPublicRoute(req)) return // Allow public access to .well-known endpoints
        await auth.protect() // Protect all other routes
      })
      ```
4. ## Finished 🎉

   Once this is complete, clients that support the latest MCP spec can now invoke the `get-clerk-user-data` tool to securely fetch user data from your app, assuming the request is authorized with a Clerk OAuth token. To test this out, [learn how to connect your client LLM to the MCP server](https://clerk.com/docs/guides/ai/mcp/connect-mcp-client.md).

   The next step is to replace the demo tool with your own tools, resources, and/or prompts that are relevant to your app. You can learn more about how to do this in the [MCP SDK documentation](https://modelcontextprotocol.io/docs/concepts/tools).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
