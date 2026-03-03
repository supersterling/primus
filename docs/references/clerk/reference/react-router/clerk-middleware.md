# clerkMiddleware() | React Router

The `clerkMiddleware()` helper integrates Clerk authentication into your React Router application through middleware.

## Configure `clerkMiddleware()`

1. React Router middleware requires opting in via a future flag. Add the following to your `react-router.config.ts` file:

   ```ts {{ filename: 'react-router.config.ts', mark: [[6, 8]] }}
   import type { Config } from '@react-router/dev/config'

   export default {
     // ...

     future: {
       v8_middleware: true,
     },
   } satisfies Config
   ```

2. Export `clerkMiddleware()` from your root route file:

   ```tsx {{ filename: 'app/root.tsx' }}
   import { clerkMiddleware } from '@clerk/react-router/server'
   import type { Route } from './+types/root'

   export const middleware: Route.MiddlewareFunction[] = [clerkMiddleware()]
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

The `organizationSyncOptions` property on the [`clerkMiddleware()`](https://clerk.com/docs/reference/react-router/clerk-middleware.md#clerk-middleware-options) options
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
