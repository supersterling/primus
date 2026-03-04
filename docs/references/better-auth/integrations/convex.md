# Convex Integration

Integrate Better Auth with Convex.

In this guide, we'll walk through the steps to integrate Better Auth with [Convex](https://www.convex.dev).

    ## Prerequisites

    ### Create a Convex project

    To use Better Auth with Convex, you need a Convex project. If you don’t have one, run the following command to create a new project. For more details, see the [Convex documentation](https://docs.convex.dev/home).

```bash
        npm create convex@latest

        # Choose user authentication:
        # > none
```

```bash
        pnpm create convex

        # Choose user authentication:
        # > none
```

```bash
        yarn create convex

        # Choose user authentication:
        # > none
```

```bash
        bunx create-convex

        # Choose user authentication:
        # > none
```

    ### Run `convex dev`

    Running the CLI during setup will initialize your Convex deployment
    if it doesn't already exist, and keeps generated types current through the process. Keep it running.

```bash
        npx convex dev
```

```bash
        pnpm dlx convex dev
```

```bash
        yarn dlx convex dev
```

```bash
        bun x convex dev
```

    ## Install packages

    Install a pinned version of Better Auth and the Convex component for Better Auth, and make sure you are using the latest version of Convex.

```bash
        npm install better-auth@1.4.9 --save-exact
        npm install @convex-dev/better-auth
```

```bash
        pnpm add better-auth@1.4.9 --save-exact
        pnpm add @convex-dev/better-auth
```

```bash
        yarn add better-auth@1.4.9 --exact
        yarn add @convex-dev/better-auth
```

```bash
        bun add better-auth@1.4.9 --exact
        bun add @convex-dev/better-auth
```

      `@convex-dev/better-auth` is maintained by Convex. For issues or more details, please visit [here](https://github.com/get-convex/better-auth).

    ## Set environment variables

    Generate a secret for encryption and generating hashes. Use the command below if you have openssl installed, or use `@better-auth/cli secret` to generate one.

```bash
        npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

```bash
        pnpm dlx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

```bash
        yarn dlx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

```bash
        bun x convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
```

    Add your site URL to your Convex deployment.

```bash
        npx convex env set SITE_URL http://localhost:3000
```

```bash
        pnpm dlx convex env set SITE_URL http://localhost:3000
```

```bash
        yarn dlx convex env set SITE_URL http://localhost:3000
```

```bash
        bun x convex env set SITE_URL http://localhost:3000
```

    Add environment variables to the `.env.local` file created by `npx convex dev`.
    It will be picked up by your framework dev server.

          Cloud

          Self hosted

```sh
        # Deployment used by `npx convex dev`
        CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name

        NEXT_PUBLIC_CONVEX_URL=https://adjective-animal-123.convex.cloud

        # Same as NEXT_PUBLIC_CONVEX_URL but ends in .site // [!code ++]
        NEXT_PUBLIC_CONVEX_SITE_URL=https://adjective-animal-123.convex.site # [!code ++]

        # Your local site URL // [!code ++]
        NEXT_PUBLIC_SITE_URL=http://localhost:3000 # [!code ++]
```

```sh
        # Deployment used by `npx convex dev`
        CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name

        NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210

        # Will generally be one number higher than NEXT_PUBLIC_CONVEX_URL,
        # so if your convex url is :3212, your site url will be :3213
        NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211 # [!code ++]

        # Your local site URL // [!code ++]
        NEXT_PUBLIC_SITE_URL=http://localhost:3000 # [!code ++]
```

      Since the Better Auth instance runs on Convex, environment variables used by the auth instance should be configured through the Convex CLI or dashboard, not in `.env.local`.

      e.g. `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` ...

    ## Add Convex auth config

    Add a `convex/auth.config.ts` file to configure Better Auth as an authentication provider.

```ts
    import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
    import type { AuthConfig } from "convex/server";

    export default {
      providers: [getAuthConfigProvider()],
    } satisfies AuthConfig;
```

    ## Create the Better Auth Convex Component

    Convex components can be installed from NPM or a local folder. While the NPM version is available [here](https://www.convex.dev/components/better-auth), this guide uses a local folder setup to unlock the full potential of Better Auth.

    ### Create the component definition

    Create a `convex/betterAuth/convex.config.ts` file to define the component. This will signal to Convex that the `convex/betterAuth` directory is a locally installed component.

```ts
    import { defineComponent } from "convex/server";

    const component = defineComponent("betterAuth");

    export default component;
```

    ### Register the component

    Register the Better Auth component in your Convex project.

```ts
    import { defineApp } from "convex/server";
    import betterAuth from "./betterAuth/convex.config";

    const app = defineApp();

    app.use(betterAuth);

    export default app;
```

    ### Create a Better Auth instance

    Create a Better Auth instance and initialize the component.

      * This file is not yet complete before the next step.
      * Some TypeScript errors will show until you save the file.

```ts
    import { createClient } from "@convex-dev/better-auth";
    import { convex } from "@convex-dev/better-auth/plugins";
    import type { GenericCtx } from "@convex-dev/better-auth/utils";
    import type { BetterAuthOptions } from "better-auth";
    import { betterAuth } from "better-auth";
    import { components } from "../_generated/api";
    import type { DataModel } from "../_generated/dataModel";
    import authConfig from "../auth.config";
    import schema from "./schema";

    // Better Auth Component
    export const authComponent = createClient<DataModel, typeof schema>(
      components.betterAuth,
      {
        local: { schema },
        verbose: false,
      },
    );

    // Better Auth Options
    export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
      return {
        appName: "My App",
        baseURL: process.env.SITE_URL,
        secret: process.env.BETTER_AUTH_SECRET,
        database: authComponent.adapter(ctx),
        emailAndPassword: {
          enabled: true,
        },
        plugins: [convex({ authConfig })],
      } satisfies BetterAuthOptions;
    };

    // For `@better-auth/cli`
    export const options = createAuthOptions({} as GenericCtx<DataModel>);

    // Better Auth Instance
    export const createAuth = (ctx: GenericCtx<DataModel>) => {
      return betterAuth(createAuthOptions(ctx));
    };
```

    ### Generate the schema

    After configuring your Better Auth instance, create a `convex/betterAuth/schema.ts` file and run the command below to generate the schema.

```bash
        npx @better-auth/cli generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts
```

```bash
        pnpm dlx @better-auth/cli generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts
```

```bash
        yarn dlx @better-auth/cli generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts
```

```bash
        bun x @better-auth/cli generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts
```

      If you need to modify your Better Auth instance, use this command to update the schema.

    ### Export adapter functions

    Export adapter functions for the Better Auth component.

```ts
    import { createApi } from "@convex-dev/better-auth";
    import { createAuthOptions } from "./auth";
    import schema from "./schema";

    export const {
      create,
      findOne,
      findMany,
      updateOne,
      updateMany,
      deleteOne,
      deleteMany,
    } = createApi(schema, createAuthOptions);
```

    ## Create the Better Auth client instance

    Create the Better Auth client instance for interacting with the Better Auth server from your client.

```ts
    import { convexClient } from "@convex-dev/better-auth/client/plugins";
    import { createAuthClient } from "better-auth/react";

    export const authClient = createAuthClient({
      plugins: [convexClient()],
    });
```

    ## Configure Next.js server helpers

    Configure a set of helper functions for authenticated SSR, server functions, and route handlers.

```ts
    import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

    export const {
      handler,
      preloadAuthQuery,
      isAuthenticated,
      getToken,
      fetchAuthQuery,
      fetchAuthMutation,
      fetchAuthAction,
    } = convexBetterAuthNextJs({
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
      convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
    });
```

    ## Mount handlers

    Register Better Auth route handlers on your Convex deployment.

```ts
    import { httpRouter } from "convex/server";
    import { authComponent, createAuth } from "./betterAuth/auth";

    const http = httpRouter();

    authComponent.registerRoutes(http, createAuth);

    export default http;
```

    Set up route handlers to proxy auth requests from Next.js to your Convex deployment.

```ts
    import { handler } from "@/lib/auth-server";

    export const { GET, POST } = handler;
```

    ## Set up Convex client provider

    Create a `ConvexClientProvider` component.

```tsx
    "use client";

    import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
    import { ConvexReactClient } from "convex/react";
    import { authClient } from "@/lib/auth-client";

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    export function ConvexClientProvider({
      children,
      initialToken,
    }: {
      children: React.ReactNode;
      initialToken?: string | null;
    }) {
      return (
        <ConvexBetterAuthProvider
          client={convex}
          authClient={authClient}
          initialToken={initialToken}
        >
          {children}
        </ConvexBetterAuthProvider>
      );
    }
```

    Wrap your app with the `ConvexClientProvider` component.

```tsx
    import { ConvexClientProvider } from "@/components/ConvexClientProvider";
    import { getToken } from "@/lib/auth-server";

    export default async function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      const token = await getToken();
      return (
        <html>
          <body>
            <ConvexClientProvider initialToken={token}>
              {children}
            </ConvexClientProvider>
          </body>
        </html>
      );
    }
```

## Done 🎉

You're now ready to start using Better Auth with Convex.

***

## Usage

### Create your functions

Better Auth's `auth.api` methods would normally run in your server, but with Convex being your backend, these methods need to run in a Convex function. The Convex function can then be called from the client via hooks like `useMutation` or in server functions and other server code using one of the auth-server utilities like `fetchAuthMutation`.

Convex has a convention of creating functions in the `convex/` directory. For example, you can create auth-related functions in the `convex/auth.ts` file like this:

```ts
import { query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return identity;
  },
});

// ... other functions
```

### Using the Better Auth client

You can use the `authClient` like the Better Auth client normally.

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
          });
        }}
      >
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default Page;
```

### Using the Convex React hooks

If you've created Convex functions, you can use the Convex React hooks to query or mutate data in the client side like the usual way.

```tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const user = useQuery(api.auth.getCurrentUser);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Page;
```

### Using the server helpers

You can use the server helpers to perform authentication related operations in the server side.

```tsx
import { isAuthenticated } from "@/lib/auth-server";

const Page = async () => {
  const hasToken = await isAuthenticated();
  if (!hasToken) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default Page;
```

### SSR with server components

Convex queries can be preloaded in server components and rendered in client components via `preloadAuthQuery` and `usePreloadedAuthQuery`.

  `preloadAuthQuery` is recommended for use when you want to handle different UI based on the data state, rather than for protecting resources.

*Preloading in a server component:*

```tsx
import { api } from "@/convex/_generated/api";
import { preloadAuthQuery } from "@/lib/auth-server";
import Header from "./header";

const Page = async () => {
  const preloadedUserQuery = await preloadAuthQuery(api.auth.getCurrentUser);

  return (
    <div>
      <Header preloadedUserQuery={preloadedUserQuery} />
    </div>
  );
};

export default Page;
```

*Rendering preloaded data in a client component:*

```tsx
"use client";

import { usePreloadedAuthQuery } from "@convex-dev/better-auth/nextjs/client";
import type { Preloaded } from "convex/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { api } from "@/convex/_generated/api";

export const Header = ({
  preloadedUserQuery,
}: {
  preloadedUserQuery: Preloaded<typeof api.auth.getCurrentUser>;
}) => {
  const user = usePreloadedAuthQuery(preloadedUserQuery);
  return (
    <div>
      {user ? (
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default Header;
```

## Additional Resources

* [Convex Documentation](https://docs.convex.dev/home)
* [`@convex-dev/better-auth` Documentation](https://labs.convex.dev/better-auth)
* [`@convex-dev/better-auth` GitHub Repository](https://github.com/get-convex/better-auth)
