# Fullstack SDK

A fullstack SDK combines the [frontend-only SDK](https://clerk.com/docs/guides/development/sdk-development/frontend-only.md) and [backend-only SDK](https://clerk.com/docs/guides/development/sdk-development/backend-only.md) into one. A fullstack SDK is necessary for frameworks that support multiple rendering strategies (SSR, SSG, etc.), middleware, data fetching, and more. Examples of such frameworks would be Next.js or Rails.

## Expected features

- User only needs to provide their Publishable Key and Secret Key
- User only needs to adjust one or two files to add Clerk to their app (e.g. adding Clerk to the configuration file of that framework)
- User can use [`Clerk’s components`](https://clerk.com/docs/nextjs/reference/components/overview.md) in their choice of framework (e.g. in a React-based framework you import these components as React components)
- Give users access to [`Client`](https://clerk.com/docs/reference/javascript/client.md){{ target: '_blank' }}, [`Session`](https://clerk.com/docs/reference/javascript/session.md){{ target: '_blank' }}, [`User`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }}, and [`Organization`](https://clerk.com/docs/reference/javascript/organization.md){{ target: '_blank' }} properties through the framework’s choice of state management
- User should be able to use [ClerkJS options](https://clerk.com/docs/reference/javascript/clerk.md#clerk-options){{ target: '_blank' }}
- Centralized request authentication (e.g. in a middleware or plugin)
- Give access to the instance of [BAPI](https://clerk.com/docs/guides/development/sdk-development/terminology.md) client (so that users can use all methods)
- User should be able to limit access to routes by checking for [Roles and Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md)

## Optional features

- User should be able to enforce authentication on individual routes (e.g. with a [`requireAuth`](https://clerk.com/docs/guides/development/sdk-development/backend-only.md#create-a-require-auth-helper) helper)
- Use singleton pattern to only create a pre-configured instance of Clerk backend client

## Implementation

See the respective [frontend-only SDK](https://clerk.com/docs/guides/development/sdk-development/frontend-only.md) and [backend-only SDK](https://clerk.com/docs/guides/development/sdk-development/backend-only.md) implementation instructions.

In addition to these instructions, you'll need to go through the following steps to support all required features.

> If you're looking for a real-world example, have a look at [`@clerk/nextjs`](https://github.com/clerk/javascript/tree/main/packages/nextjs).

1. ### Add handshake support

   Inside your Clerk middleware, add checks for the `headers` on the `requestState`. Apply these headers to the `Response` and handle any existing `location` headers (e.g. redirects).

   ```ts {{ filename: 'clerk-middleware.ts', mark: [[9, 20]] }}
   import { clerkClient as defaultClerkClient } from './client.ts'

   const clerkMiddleware = (options) => {
     return async (context, next) => {
       const clerkClient = options.clerkClient || defaultClerkClient

       const requestState = await clerkClient.authenticateRequest(context.req, {
         authorizedParties: ['https://example.com'],
       })

       if (requestState.headers) {
         // This adds observability headers to the res
         requestState.headers.forEach((value, key) => context.res.headers.append(key, value))

         const locationHeader = requestState.headers.get('location')

         if (locationHeader) {
           return context.redirect(locationHeader, 307)
         } else if (requestState.status === 'handshake') {
           throw new Error('Clerk: unexpected handshake without redirect')
         }
       }

       context.set('clerkAuth', requestState.toAuth())
       context.set('clerk', clerkClient)

       await next()
     }
   }
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
