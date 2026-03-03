# JavaScript Backend SDK

[Clerk's JavaScript Backend SDK](https://clerk.com/docs/reference/backend/overview.md) exposes the [Backend API](https://clerk.com/docs/reference/backend-api.md){{ target: '_blank' }} resources and low-level authentication utilities **for JavaScript environments**.

For example, if you wanted to get a list of all users in your application, instead of creating a fetch to [`https://api.clerk.com/v1/users`](https://clerk.com/docs/reference/backend-api/tag/users/get/users.md){{ target: '_blank' }} endpoint, you can use the [`users.getUserList()`](https://clerk.com/docs/reference/backend/user/get-user-list.md) method provided by the JS Backend SDK.

## Installation

**JS Backend SDK**

If you are using the JS Backend SDK on its own, you can install it using the following command:

```npm {{ filename: 'terminal' }}
npm install @clerk/backend
```

**With other SDKs**

Clerk SDKs expose an instance of the JS Backend SDK for use in server environments, so there is no need to install it separately.

## Usage

All resource operations are mounted as sub-APIs on the `clerkClient` object. For example, if you would like to get a list of all of your application's users, you can use the `getUserList()` method on the `users` sub-API. You can find the full list of available sub-APIs and their methods in the sidenav.

To access a resource, you must first instantiate a `clerkClient` instance.

**JS Backend SDK**

To instantiate a `clerkClient` instance, you must call `createClerkClient()` and pass in [`options`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#create-clerk-client-options).

> This example uses `process.env` to import environment variables. You may need to use an alternative method, such as `import.meta.env`, to set environment variables for your project.

```ts
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
```

**With other SDKs**

### Instantiate a default `clerkClient` instance

You can use the default instance of `clerkClient` provided by whichever SDK you are using, and skip the need to pass [`configuration options`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#create-clerk-client-options), unless you are using Remix. For Remix, see the following section.

To use the default `clerkClient` instance, set your `CLERK_SECRET_KEY` [environment variable](https://clerk.com/docs/guides/development/clerk-environment-variables.md#clerk-publishable-and-secret-keys) and then import the `clerkClient` instance from the SDK as shown in the following example:

**Next.js**

```jsx
import { clerkClient } from '@clerk/nextjs/server'
```

**Astro**

```js
import { clerkClient } from '@clerk/astro/server'
```

**Express**

```js
import { clerkClient } from '@clerk/express'
```

**Fastify**

```jsx
import { clerkClient } from '@clerk/fastify'
```

**Nuxt**

```js
import { clerkClient } from '@clerk/nuxt/server'
```

**React Router**

If you are using React Router, see the following section for how to instantiate `clerkClient`.

**Remix**

If you are using Remix, see the following section for how to instantiate `clerkClient`.

**TanStack React Start**

```js
import { clerkClient } from '@clerk/tanstack-react-start/server'
```

### Instantiate a custom `clerkClient` instance

If you would like to customize the behavior of the JS Backend SDK, you can instantiate a `clerkClient` instance yourself by calling `createClerkClient()` and passing in [`options`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#create-clerk-client-options).

**Next.js**

```jsx
import { createClerkClient } from '@clerk/nextjs/server'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const client = await clerkClient()

const userList = await client.users.getUserList()
```

**Astro**

If you are using Astro, you must pass the [endpoint context](https://docs.astro.build/en/reference/api-reference/#endpoint-context) when invoking the `clerkClient` function.

```jsx
import { clerkClient } from '@clerk/astro/server'

export async function GET(context) {
  const { isAuthenticated, userId, redirectToSignIn } = context.locals.auth()

  if (!isAuthenticated) {
    return redirectToSignIn()
  }

  const user = await clerkClient(context).users.getUser(userId)

  return new Response(JSON.stringify({ user }))
}
```

**Express**

```js
import { createClerkClient } from '@clerk/express'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const userList = await clerkClient.users.getUserList()
```

**Fastify**

```jsx
import { createClerkClient } from '@clerk/fastify'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const userList = await clerkClient.users.getUserList()
```

**Nuxt**

```tsx {{ filename: 'server/api/users/index.ts' }}
import { createClerkClient } from '@clerk/nuxt/server'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const clerkClient = createClerkClient({ secretKey: config.clerk.secretKey })
  const userList = await clerkClient.users.getUserList()

  return { userList }
})
```

**React Router**

```tsx {{ filename: 'app/routes/example.tsx' }}
import { createClerkClient } from '@clerk/react-router/api.server'

export async function loader(args: Route.LoaderArgs) {
  const userList = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUserList()

  return {
    userList: JSON.stringify(userList),
  }
}

export default function Users({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>List of users</h1>
      <pre>
        `{JSON.stringify(loaderData, null, 2)}`
      </pre>
    </div>
  )
}
```

**Remix**

If you are using Remix, you must instantiate `clerkClient` by calling the `createClerkClient()` function and passing in [`options`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#create-clerk-client-options).

```jsx
import { createClerkClient } from '@clerk/remix/api.server'
```

Use the following tabs to see examples of how to use the JS Backend SDK in Remix Loader and Action functions.

**Loader Function**

```tsx {{ filename: 'routes/profile.tsx' }}
import { LoaderFunction, redirect } from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from '@clerk/remix/api.server'

export const loader: LoaderFunction = async (args) => {
  // Use getAuth to retrieve user data
  const { isAuthenticated, userId } = await getAuth(args)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect('/sign-in?redirect_url=' + args.request.url)
  }

  // Initialize clerkClient and perform the action,
  // which in this case is to get the user
  const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
    userId,
  )

  // Return the user
  return { serialisedUser: JSON.stringify(user) }
}
```

**Action Function**

```tsx {{ filename: 'routes/profile.tsx' }}
import { ActionFunction, redirect } from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from '@clerk/remix/api.server'

export const action: ActionFunction = async (args) => {
  // Use getAuth to retrieve user data
  const { isAuthenticated, userId } = await getAuth(args)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect('/sign-in?redirect_url=' + args.request.url)
  }

  // Initialize clerkClient and perform the action,
  // which in this case is to get the user
  const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
    userId,
  )
  // Return the user
  return { serialisedUser: JSON.stringify(user) }
}
```

**TanStack React Start**

```tsx {{ filename: 'app/routes/api/example.tsx' }}
import { clerkClient } from '@clerk/tanstack-react-start/server'
import { json } from '@tanstack/react-start'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute().methods({
  GET: async ({ request, params }) => {
    const userList = await clerkClient({
      secretKey: import.meta.env.CLERK_SECRET_KEY,
    }).users.getUserList()

    return json({ userList })
  },
})
```

## Error handling

JS Backend SDK functions throw errors (`ClerkAPIResponseError`) when something goes wrong. You'll need to catch them in a `try/catch` block and handle them gracefully. For example:

```ts {{ filename: 'example.ts' }}
try {
  const res = await someBackendApiCall()
} catch (error) {
  // Error handling
}
```

## `createClerkClient({ options })`

The `createClerkClient()` function requires an `options` object. It is recommended to set these options as [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md#api-and-sdk-configuration) where possible, and then pass them to the function. For example, you can set the `secretKey` option using the `CLERK_SECRET_KEY` environment variable, and then pass it to the function like this: `createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })`.

The following options are available:

| Name                 | Type                                   | Description                                                                                                                                                                                                                                                                                          |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secretKey (required) | string                                 | Your Clerk Secret KeyYour Clerk Secret Key is used to authenticate requests from your backend to Clerk's API. You can find it on the API keys page in the Clerk Dashboard. Do not expose this on the frontend with a public environment variable..                                                   |
| jwtKey?              | string                                 | The JWKS Public Key from the API keys in the Clerk Dashboard. For more information, refer to Manual JWT verification.                                                                                                                                                                                |
| publishableKey?      | string                                 | Your Clerk Publishable KeyYour Clerk Publishable Key tells your app what your FAPI URL is, enabling your app to locate and communicate with your dedicated FAPI instance. You can find it on the API keys page in the Clerk Dashboard..                                                              |
| domain?              | string                                 | The domain of a satellite application in a multi-domain setup.                                                                                                                                                                                                                                       |
| isSatellite?         | boolean                                | Whether the instance is a satellite domain in a multi-domain setup. Defaults to false.                                                                                                                                                                                                               |
| proxyUrl?            | string                                 | The proxy URL from a multi-domain setup.                                                                                                                                                                                                                                                             |
| sdkMetadata?         | { name: string, version: string }     | Metadata about the SDK.                                                                                                                                                                                                                                                                              |
| telemetry?           | { disabled: boolean, debug: boolean } | Telemetry configuration.                                                                                                                                                                                                                                                                             |
| userAgent?           | string                                 | The User-Agent request header passed to the Clerk API.                                                                                                                                                                                                                                               |
| apiUrl?              | string                                 | The Clerk Backend API endpoint. Defaults to 'https\://api.clerk.com'.                                                                                                                                                                                                                                |
| apiVersion?          | string                                 | The version passed to the Clerk API. Defaults to 'v1'.                                                                                                                                                                                                                                               |
| audience?            | string | string[]                    | A string or list of audiences.                                                                                                                                                                                                                                                                       |
| taskUrls?            | Record<SessionTask['key'], string>   | The URL paths users are redirected to after sign-up or sign-in when specific session tasks need to be completed. For example, { 'choose-organization': '/onboarding/choose-organization' } redirects users to /onboarding/choose-organization after sign-up if they need to choose an Organization. |

## Get the `userId` and other properties

The [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object contains important information like the current user's session ID, user ID, and Organization ID.

The `Auth` object is available on the `request` object in server contexts. Some frameworks provide a helper that returns the `Auth` object. See the following table for more information.

| Framework            | How to access the `Auth` object                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| Next.js App Router   | [`auth()`](https://clerk.com/docs/reference/nextjs/app-router/auth.md)          |
| Next.js Pages Router | [`getAuth()`](https://clerk.com/docs/reference/nextjs/pages-router/get-auth.md) |
| Astro                | [`locals.auth()`](https://clerk.com/docs/reference/astro/locals.md#locals-auth) |
| Express              | [`req.auth`](https://clerk.com/docs/reference/express/overview.md)              |
| React Router         | [`getAuth()`](https://clerk.com/docs/reference/react-router/get-auth.md)        |
| Remix                | [`getAuth()`](https://clerk.com/docs/reference/remix/overview.md#get-auth)      |
| TanStack React Start | [`auth()`](https://clerk.com/docs/reference/tanstack-react-start/auth.md)       |
| Other                | `request.auth`                                                                  |

**JS Backend SDK**

The following example demonstrates how to retrieve the authenticated user's ID using `request.auth` when you're not using a specific framework helper. It also shows how to use the JS Backend SDK's [`getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md) method to get the [Backend `User` object](https://clerk.com/docs/reference/backend/types/backend-user.md).

```js
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

async function getUserId(request) {
  // Use the `request.auth` object to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = request.auth

  // If user isn't authenticated, return null
  if (!isAuthenticated) {
    return null
  }

  // Use the JS Backend SDK's `getUser()` method to get the Backend User object
  const user = await clerkClient.users.getUser(userId)

  // Return the Backend User object
  return user
}
```

**With other SDKs**

The following examples demonstrate how to retrieve the authenticated user's ID using framework-specific auth helpers and how to use the JS Backend SDK's [`getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md) method to get the [Backend `User` object](https://clerk.com/docs/reference/backend/types/backend-user.md).

**If your SDK isn't listed, you can use the comments in the example to help you adapt it to your SDK.**

**Next.js**

For Next.js, the `Auth` object is accessed using the `auth()` helper in App Router apps and the `getAuth()` function in Pages Router apps. [`Learn more about using these helpers`](https://clerk.com/docs/nextjs/guides/users/reading.md#server-side).

Use the following tabs to see examples of how to use these helpers to access the user's ID in your App Router or Pages Router app.

**App Router**

```tsx {{ filename: 'app/api/example/route.ts' }}
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, userId } = await auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const client = await clerkClient()

  // Initialize the JS Backend SDK
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  const user = await client.users.getUser(userId)

  // Return the Backend User object
  return NextResponse.json({ user: user }, { status: 200 })
}
```

**Pages Router**

```tsx {{ filename: 'pages/api/auth.ts' }}
import { getAuth, clerkClient } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = getAuth(req)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Initialize the JS Backend SDK
  const client = await clerkClient()

  // Get the user's full Backend User object
  const user = await client.users.getUser(userId)

  return res.status(200).json({ user })
}
```

**Astro**

For Astro, the `Auth` object is accessed using the `locals.auth()` function. [`Learn more about using locals.auth()`](https://clerk.com/docs/astro/guides/users/reading.md#server-side).

```tsx {{ filename: 'src/api/example.ts' }}
import { clerkClient } from '@clerk/astro/server'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, userId } = context.locals.auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Initialize the JS Backend SDK
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  const user = await clerkClient(context).users.getUser(userId)

  // Return the Backend User object
  return new Response(JSON.stringify({ user }))
}
```

**Express**

For Express, the `Auth` object is accessed using the `getAuth()` function. [`Learn more about using getAuth()`](https://clerk.com/docs/reference/express/overview.md#get-auth).

```js {{ filename: 'index.js' }}
import { createClerkClient, getAuth } from '@clerk/express'
import express from 'express'

const app = express()
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

app.get('/user', async (req, res) => {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, userId } = getAuth(req)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    res.status(401).json({ error: 'User not authenticated' })
  }

  // Initialize the JS Backend SDK
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  // Use the `getUser()` method to get the Backend User object
  const user = await clerkClient.users.getUser(userId)

  // Return the Backend User object
  res.json(user)
})
```

**React Router**

For React Router, the `Auth` object is accessed using the `getAuth()` function. [`Learn more about using getAuth()`](https://clerk.com/docs/react-router/guides/users/reading.md#server-side).

```tsx {{ filename: 'app/routes/profile.tsx' }}
import { redirect } from 'react-router'
import { clerkClient, getAuth } from '@clerk/react-router/server'
import type { Route } from './+types/profile'

export async function loader(args: Route.LoaderArgs) {
  // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
  // Accessing the `Auth` object differs depending on the SDK you're using
  // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
  const { isAuthenticated, userId } = await getAuth(args)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect('/sign-in?redirect_url=' + args.request.url)
  }

  // Use the JS Backend SDK's `getUser()` method to get the Backend User object
  const user = await clerkClient(args).users.getUser(userId)

  // Return the Backend User object
  return {
    user: JSON.stringify(user),
  }
}
```

**TanStack React Start**

For TanStack React Start, the `Auth` object is accessed using the `auth()` function. [`Learn more about using auth()`](https://clerk.com/docs/tanstack-react-start/guides/users/reading.md#server-side).

```tsx {{ filename: 'app/routes/api/example.tsx' }}
import { json } from '@tanstack/react-start'
import { createFileRoute } from '@tanstack/react-router'
import { auth, clerkClient } from '@clerk/tanstack-react-start/server'

export const ServerRoute = createFileRoute('/api/example')({
  server: {
    handlers: {
      GET: async () => {
        // The `Auth` object gives you access to properties like `isAuthenticated` and `userId`
        // Accessing the `Auth` object differs depending on the SDK you're using
        // https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object
        const { isAuthenticated, userId } = await auth()

        // Protect the route by checking if the user is signed in
        if (!isAuthenticated) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Initialize the JS Backend SDK
        // This varies depending on the SDK you're using
        // https://clerk.com/docs/js-backend/getting-started/quickstart
        // Use the `getUser()` method to get the Backend User object
        const user = await clerkClient().users.getUser(userId)

        // Return the Backend User object
        return json({ user })
      },
    },
  },
})
```

## Next steps

Learn more about the Clerk JS Backend SDK and Clerk's Backend API using the following guides.

- [Explore the JS Backend resources](https://clerk.com/docs/reference/backend/overview.md#resources): Learn more about the available Backend API resources in the JS Backend SDK.
- [Authentication utilities](https://clerk.com/docs/reference/backend/overview.md#authentication-utilities): Learn more about the authentication utilities provided by the JS Backend SDK.
- [Backend API reference](https://clerk.com/docs/reference/backend-api.md): Learn more about Clerk's Backend API endpoints and how to use them.
- [Clerk JS Backend SDK reference](https://clerk.com/docs/reference/backend/overview.md): Learn about the Clerk JS Backend SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
