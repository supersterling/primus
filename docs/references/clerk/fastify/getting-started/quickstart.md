# Fastify Quickstart

**Example Repository**

- [Fastify Quickstart Repo](https://github.com/clerk/clerk-fastify-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [Add Fastify as your backend](https://fastify.dev/docs/latest/Guides/Getting-Started)

Learn how to integrate Clerk into your Fastify backend for secure user authentication and management. This guide uses TypeScript and allows you to choose your frontend framework.

> [Fastify is only compatible with Next.js versions 13.4 and below](https://github.com/fastify/fastify-nextjs). If you're using a newer version of Next.js, consider using a different backend framework that supports the latest Next.js features.
>
> This guide uses ECMAScript Modules (ESM). To use ESM in your project, you must include `"type": "module"` in your `package.json`.

1. ## Install `@clerk/fastify`

   The [`Clerk Fastify SDK`](https://clerk.com/docs/reference/fastify/overview.md) provides a range of backend utilities to simplify user authentication and management in your application.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/fastify
   ```
2. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```
3. ## Configure `clerkPlugin()` for all routes

   The [`clerkPlugin()`](https://clerk.com/docs/reference/fastify/clerk-plugin.md) function is a Fastify plugin provided by Clerk to integrate authentication into your Fastify application. To ensure that Clerk's authentication and user management features are applied across your Fastify application, configure the `clerkPlugin()` to handle all routes or limit it to specific ones.

   The following example registers the plugin for all routes. To register the plugin for specific routes, see the [`reference docs`](https://clerk.com/docs/reference/fastify/overview.md).

   > The `dotenv/config` module must be imported before any Clerk modules. This order is important because Clerk instances are created during the import process and rely on environment variables, such as API keys, to be initialized correctly. For more information, refer to the [Fastify docs](https://fastify.dev/docs/latest/Guides/Getting-Started/#loading-order-of-your-plugins).

   ```ts {{ filename: 'index.ts', mark: [3, 7] }}
   import 'dotenv/config'
   import Fastify from 'fastify'
   import { clerkPlugin } from '@clerk/fastify'

   const fastify = Fastify({ logger: true })

   fastify.register(clerkPlugin)

   const start = async () => {
     try {
       await fastify.listen({ port: 8080 })
     } catch (error) {
       fastify.log.error(error)
       process.exit(1)
     }
   }

   start()
   ```
4. ## Protect your routes using `getAuth()`

   The [`getAuth()`](https://clerk.com/docs/reference/fastify/get-auth.md) helper retrieves the current user's authentication state from the `request` object. It returns the [`Auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }}.

   The following example uses `getAuth()` to protect a route and load the user's data. If the user is authenticated, their `userId` is passed to [`clerkClient.users.getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} to get the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }} object. If not authenticated, the request is rejected with a `401` status code.

   ```ts {{ collapsible: true }}
   // dotenv must be imported before @clerk/fastify
   import 'dotenv/config'
   import Fastify from 'fastify'
   import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'

   const fastify = Fastify({ logger: true })

   fastify.register(clerkPlugin)

   // Use `getAuth()` to protect this route
   fastify.get('/protected', async (request, reply) => {
     try {
       // Use `getAuth()` to access `isAuthenticated` and the user's ID
       const { isAuthenticated, userId } = getAuth(request)

       // If user isn't authenticated, return a 401 error
       if (!isAuthenticated) {
         return reply.code(401).send({ error: 'User not authenticated' })
       }

       // Use `clerkClient` to access Clerk's JS Backend SDK methods
       // and get the user's User object
       const user = await clerkClient.users.getUser(userId)

       return reply.send({
         message: 'User retrieved successfully',
         user,
       })
     } catch (error) {
       fastify.log.error(error)
       return reply.code(500).send({ error: 'Failed to retrieve user' })
     }
   })

   const start = async () => {
     try {
       await fastify.listen({ port: 8080 })
     } catch (error) {
       fastify.log.error(error)
       process.exit(1)
     }
   }

   start()
   ```

## Next steps

Learn how to protect routes, handle authentication and authorization, and prepare your Clerk app for production using the following guides.

- [Protect routes using clerkPlugin()](https://clerk.com/docs/reference/fastify/clerk-plugin.md): Learn how to protect specific routes from unauthenticated users.
- [Protect routes based on authorization status](https://clerk.com/docs/reference/fastify/get-auth.md): Learn how to protect a route based on both authentication and authorization status.
- [Deploy to production](https://clerk.com/docs/guides/development/deployment/production.md): Learn how to deploy your Clerk app to production.
- [Clerk Fastify SDK reference](https://clerk.com/docs/reference/fastify/overview.md): Learn about the Clerk Fastify SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
