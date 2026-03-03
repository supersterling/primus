# clerkMiddleware() | Astro

The `clerkMiddleware()` helper integrates Clerk authentication into your Astro application through middleware.

## Configure `clerkMiddleware()`

Create a `middleware.ts` file inside your `src/` directory.

```ts {{ filename: 'src/middleware.ts' }}
import { clerkMiddleware } from '@clerk/astro/server'

export const onRequest = clerkMiddleware()
```

## `createRouteMatcher()`

`createRouteMatcher()` is a Clerk helper function that allows you to protect multiple routes. `createRouteMatcher()` accepts an array of routes and checks if the route the user is trying to visit matches one of the routes passed to it.

The `createRouteMatcher()` helper returns a function that, if called with the `context.request` object from the Middleware, will return `true` if the user is trying to access a route that matches one of the routes passed to `createRouteMatcher()`.

In the following example, `createRouteMatcher()` sets all `/dashboard` and `/forum` routes as protected routes.

```ts
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])
```

## Protect routes

You can protect routes by checking either or both of the following:

- [`User authentication status`](https://clerk.com/docs/reference/astro/clerk-middleware.md#protect-routes-based-on-user-authentication-status) -- user is signed in or out
- [`User authorization status`](https://clerk.com/docs/reference/astro/clerk-middleware.md#protect-routes-based-on-user-authorization-status) -- user has the required Role or Permission

### Protect routes based on user authentication status

To protect routes based on user authentication status, use [`auth().isAuthenticated`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} to check if `isAuthenticated` is true. If it's not, the user is not authenticated, and you can redirect them to the sign-in page.

```tsx {{ filename: 'src/middleware.ts' }}
import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn } = auth()

  if (!isAuthenticated && isProtectedRoute(context.request)) {
    // Add custom logic to run before redirecting

    return redirectToSignIn()
  }
})
```

### Protect routes based on user authorization status

To protect routes based on user authorization status, use [`auth().has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has){{ target: '_blank' }} to check if the user has the required Roles or Custom Permissions.

```tsx {{ filename: 'src/middleware.ts' }}
import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
  const { has, redirectToSignIn } = auth()

  // Restrict admin routes to users with specific Permissions
  if (
    (isProtectedRoute(context.request) && !has({ permission: 'org:admin:example1' })) ||
    !has({ permission: 'org:admin:example2' })
  ) {
    // Add logic to run if the user does not have the required Permissions; for example, redirecting to the sign-in page
    return redirectToSignIn()
  }
})
```

## Protect all routes

To protect all routes in your application and define specific routes as public, you can use any of the above methods and simply invert the `if` condition.

```tsx
import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn, userId } = auth()

  if (!isPublicRoute(context.request) && !isAuthenticated) {
    return redirectToSignIn()
  }
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

The `organizationSyncOptions` property on the [`clerkMiddleware()`](https://clerk.com/docs/reference/astro/clerk-middleware.md#clerk-middleware-options) options
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
