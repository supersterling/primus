# clerkMiddleware() | Nuxt

The `clerkMiddleware()` helper allows you to protect your Nuxt application **on the server-side**. It can be used to validate a user's authentication status or authorization status.

> `clerkMiddleware()` should be used to protect API routes only. It's not recommended to use `clerkMiddleware()` to protect pages as it will **only work on initial page reload**. On subsequent navigations, it won't be triggered because client-side navigation will bypass the middleware. To protect pages, see the [dedicated guide](https://clerk.com/docs/guides/secure/protect-pages.md).

## Configure `clerkMiddleware()`

By default, the Nuxt SDK **automatically** adds the `clerkMiddleware()` helper to your Nuxt application.

To **manually** configure the middleware:

1. In your `nuxt.config.ts` file, under the `clerk` property, set `skipServerMiddleware: true`.

   ```ts {{ filename: 'nuxt.config.ts', mark: [[3, 5]] }}
   export default defineNuxtConfig({
     modules: ['@clerk/nuxt'],
     clerk: {
       skipServerMiddleware: true,
     },
   })
   ```
2. In your `server/middleware/` directory, create a file named `clerk.ts` with the following code:

   ```ts {{ filename: 'server/middleware/clerk.ts' }}
   import { clerkMiddleware } from '@clerk/nuxt/server'
   export default clerkMiddleware()
   ```

## Protect API routes

You can protect API routes using either or both of the following:

- [`Authentication-based protection`](https://clerk.com/docs/reference/nuxt/clerk-middleware.md#authentication-based-protection): Verify if the user is signed in.
- [`Authorization-based protection`](https://clerk.com/docs/reference/nuxt/clerk-middleware.md#authorization-based-protection): Verify if the user has the required privileges, such as a Role, Permission, Feature, or Plan. Learn more about [authorization checks](https://clerk.com/docs/guides/secure/authorization-checks.md).

You can also [`protect multiple routes`](https://clerk.com/docs/reference/nuxt/clerk-middleware.md#protect-multiple-routes) using the `createRouteMatcher()` helper.

### Authentication-based protection

To protect routes based on user authentication status, you can check if the user is signed in by checking the `isAuthenticated` property on the [`auth`](https://clerk.com/docs/reference/nuxt/overview.md#auth-object) object.

In the following example, the `clerkMiddleware()` helper checks if the user is signed in and accessing a protected route. If they aren't signed in, an error is thrown using Nuxt's [`createError()`](https://nuxt.com/docs/api/utils/create-error) utility.

```tsx {{ filename: 'server/middleware/clerk.ts' }}
import { clerkMiddleware } from '@clerk/nuxt/server'

export default clerkMiddleware((event) => {
  const { isAuthenticated } = event.context.auth()
  const isAdminRoute = event.path.startsWith('/api/admin')

  if (!isAuthenticated && isAdminRoute) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: User not signed in',
    })
  }
})
```

### Authorization-based protection

To protect routes based on user authorization status, you can use the `has()` helper to check if the user has the required [privileges, such as a Role, Permission, Feature, or Plan](https://clerk.com/docs/guides/secure/authorization-checks.md). The `has()` helper is available on the [`auth`](https://clerk.com/docs/reference/nuxt/overview.md#auth-object) object.

#### Example: Protect routes based on Custom Permissions

In the following example, the `clerkMiddleware()` helper checks if the user is accessing a protected route. If so, it checks if the user has the required Custom Permission. If they don't, an error is thrown using Nuxt's [`createError()`](https://nuxt.com/docs/api/utils/create-error) utility.

```ts {{ filename: 'server/middleware/clerk.ts' }}
import { clerkMiddleware } from '@clerk/nuxt/server'

export default clerkMiddleware((event) => {
  const { has } = event.context.auth()
  const isInvoicesRoute = event.path.startsWith('/api/invoices')
  const canCreateInvoices = has({
    permission: 'org:invoices:create',
  })

  // Check if the user is accessing a protected route
  if (isInvoicesRoute) {
    // Check if the user has the required Permission
    if (!canCreateInvoices) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized: Missing Permission to create invoices',
      })
    }
  }
})
```

#### Example: Protect routes based on default Roles

> It's best practice to use Permission-based authorization over Role-based authorization, as it reduces complexity and increases security. Usually, complex Role checks can be refactored with a single Permission check.

In the following example, the `clerkMiddleware()` helper checks if the user is accessing a protected route. If so, it checks if the user has the required admin Role. If they don't, an error is thrown using Nuxt's [`createError()`](https://nuxt.com/docs/api/utils/create-error) utility.

```ts {{ filename: 'server/middleware/clerk.ts' }}
import { clerkMiddleware } from '@clerk/nuxt/server'

export default clerkMiddleware((event) => {
  const { has } = event.context.auth()
  const isAdminRoute = event.path.startsWith('/api/admin')
  const isAdmin = has({
    role: 'org:admin',
  })

  // Check if the user is accessing a protected route
  if (isAdminRoute) {
    // Check if the user has the required Role
    if (!isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized: Admin access required',
      })
    }
  }
})
```

### Protect multiple routes

You can protect multiple routes at once by using Clerk's `createRouteMatcher()` helper function. The `createRouteMatcher()` helper accepts an array of route patterns and checks if the route the user is trying to visit matches one of the patterns passed to it.

Let's take the [`first example`](https://clerk.com/docs/reference/nuxt/clerk-middleware.md#authentication-based-protection) from this guide and add the `createRouteMatcher()` helper. Instead of only checking `/api/admin/**` routes, the following example checks both `/api/invoices/**` _and_ `/api/admin/**` routes.

```ts {{ filename: 'server/middleware/clerk.ts' }}
+ import { clerkMiddleware, createRouteMatcher } from '@clerk/nuxt/server'

  export default clerkMiddleware((event) => {
    const { isAuthenticated } = event.context.auth()
-   const isAdminRoute = event.path.startsWith('/api/admin')
+   const isProtectedRoute = createRouteMatcher(['/api/invoices(.*)', '/api/admin(.*)'])

    // Check if the user is not signed in
    // and is trying to access a protected route. If so, throw a 401 error.
    if (!isAuthenticated && isProtectedRoute(event)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: User not signed in',
      })
    }
  })
```

Now, let's add authorization-based protection to the example so that you can see how to combine everything you've learned so far.

```ts {{ filename: 'server/middleware/clerk.ts' }}
  import { clerkMiddleware, createRouteMatcher } from '@clerk/nuxt/server'

  export default clerkMiddleware((event) => {
    const { isAuthenticated } = event.context.auth()
    const isProtectedRoute = createRouteMatcher(['/api/invoices(.*)', '/api/admin(.*)'])
+   const canCreateInvoices = has({
+     permission: 'org:invoices:create',
+   })

    // Check if the user is not signed in
    // and is trying to access a protected route. If so, throw a 401 error.
    if (!isAuthenticated && isProtectedRoute(event)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: User not signed in',
      })
    }

+   // Check if the user doesn't have the required Permission
+   // and is accessing a protected route. If so, throw a 403 error.
+   if (!canCreateInvoices && isProtectedRoute(event)) {
+     throw createError({
+       statusCode: 403,
+       statusMessage: 'Unauthorized: Missing Permission to create invoices',
+     })
+   }
  })
```

## `clerkMiddleware()` options

The `clerkMiddleware()` function accepts an optional object. The following options are available:

| Name                     | Type                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audience?                | string | string[]                  | A string or list of audiences. If passed, it is checked against the aud claim in the token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| authorizedParties?       | string[]                            | An allowlist of origins to verify against, to protect your application from the subdomain cookie leaking attack. For example: ['http\://localhost:3000', 'https\://example.com']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| clockSkewInMs?           | number                               | Specifies the allowed time difference (in milliseconds) between the Clerk server (which generates the token) and the clock of the user's application server when validating a token. Defaults to 5000 ms (5 seconds).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| domain?                  | string                               | The domain used for satellites to inform Clerk where this application is deployed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| isSatellite?             | boolean                              | When using Clerk's satellite feature, this should be set to true for secondary domains.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| jwtKey                   | string                               | Used to verify the session token in a networkless manner. Supply the JWKS Public Key from the API keys page in the Clerk Dashboard. It's recommended to use the environment variable instead. For more information, refer to Manual JWT verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| organizationSyncOptions? | OrganizationSyncOptions | undefined | Used to activate a specific Organization or Personal AccountPersonal Accounts are individual workspaces that allow users to operate independently without belonging to an Organization. Learn more about Personal Accounts. based on URL path parameters. If there's a mismatch between the Active OrganizationA user can be a member of multiple Organizations, but only one can be active at a time. The Active Organization determines which Organization-specific data the user can access and which Role and related Permissions they have within the Organization. in the session (e.g., as reported by auth()) and the Organization indicated by the URL, the middleware will attempt to activate the Organization specified in the URL. |
| proxyUrl?                | string                               | Specify the URL of the proxy, if using a proxy.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| signInUrl                | string                               | The full URL or path to your sign-in page. Needs to point to your primary application on the client-side. Required for a satellite application in a development instance. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| signUpUrl                | string                               | The full URL or path to your sign-up page. Needs to point to your primary application on the client-side. Required for a satellite application in a development instance. It's recommended to use the environment variable instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| publishableKey           | string                               | The Clerk Publishable KeyYour Clerk Publishable Key tells your app what your FAPI URL is, enabling your app to locate and communicate with your dedicated FAPI instance. You can find it on the API keys page in the Clerk Dashboard. for your instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| secretKey?               | string                               | The Clerk Secret KeyYour Clerk Secret Key is used to authenticate requests from your backend to Clerk's API. You can find it on the API keys page in the Clerk Dashboard. Do not expose this on the frontend with a public environment variable. for your instance. The CLERK\_ENCRYPTION\_KEY environment variable must be set when providing secretKey as an option, refer to Dynamic keys.                                                                                                                                                                                                                                                                                                                                                   |

### `OrganizationSyncOptions`

The `organizationSyncOptions` property on the [`clerkMiddleware()`](https://clerk.com/docs/reference/nuxt/clerk-middleware.md#clerk-middleware-options) options
object has the type `OrganizationSyncOptions`, which has the following properties:

| Name                                  | Type                                | Description |
| ------------------------------------- | ----------------------------------- | ----------- |
| ["/orgs/:slug", "/orgs/:slug/(.\*)"] | ["/orgs/:id", "/orgs/:id/(.\*)"]   |             |
| ["/me", "/me/(.\*)"]                 | ["/user/:any", "/user/:any/(.\*)"] |             |

### Pattern

A `Pattern` is a `string` that represents the structure of a URL path. In addition to any valid URL, it may include:

- Named path parameters prefixed with a colon (e.g., `:id`, `:slug`, `:any`).
- Wildcard token, `(.*)`, which matches the remainder of the path.

#### Examples

- `/orgs/:slug`

| URL                       | Matches | `:slug` value |
| ------------------------- | ------- | ------------- |
| `/orgs/acmecorp`          | ✅       | `acmecorp`    |
| `/orgs`                   | ❌       | n/a           |
| `/orgs/acmecorp/settings` | ❌       | n/a           |

- `/app/:any/orgs/:id`

| URL                             | Matches | `:id` value |
| ------------------------------- | ------- | ----------- |
| `/app/petstore/orgs/org_123`    | ✅       | `org_123`   |
| `/app/dogstore/v2/orgs/org_123` | ❌       | n/a         |

- `/personal-account/(.*)`

| URL                          | Matches |
| ---------------------------- | ------- |
| `/personal-account/settings` | ✅       |
| `/personal-account`          | ❌       |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
