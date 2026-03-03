# clerkMiddleware()

The `clerkMiddleware()` function checks the request's cookies and headers for a session JWT and if found, attaches the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object to the `request` object under the `auth` key. **It must be set before any other middleware.**

> Even if you are using [`requireAuth()`](https://clerk.com/docs/reference/express/require-auth.md) middleware, you should still use `clerkMiddleware()` as it will provide authentication state to routes that don't use `requireAuth()`. See the [example](#example-use-clerk-middleware-require-auth-and-get-auth-together).

```js
import { clerkMiddleware } from '@clerk/express'

const app = express()

// Pass no parameters
app.use(clerkMiddleware())

// Pass options
app.use(clerkMiddleware(options))
```

## Example: Use `clerkMiddleware()`, `requireAuth()`, and `getAuth()` together

The following example demonstrates how to use `clerkMiddleware()`, [`requireAuth()`](https://clerk.com/docs/reference/express/require-auth.md), and [`getAuth()`](https://clerk.com/docs/reference/express/get-auth.md) together. `clerkMiddleware()` will provide authentication state to routes that don't use `requireAuth()`, `requireAuth()` will provide authentication state to a route and also protect the route based on authentication status, and `getAuth()` can be used in a number of ways. In this example, `getAuth()` is used to protect the route based on authorization status.

```js
import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express'
import express from 'express'

const app = express()
const PORT = 3000

// Apply `clerkMiddleware()` to all routes
app.use(clerkMiddleware())

// Use `getAuth()` to protect a route based on authorization status
const hasPermission = (req, res, next) => {
  const auth = getAuth(req)

  // Handle if the user is not authorized
  if (!auth.has({ permission: 'org:admin:example' })) {
    return res.status(403).send('Forbidden')
  }

  return next()
}

// Use `requireAuth()` to protect a route based on authentication status
// If user is not authenticated, requireAuth() will redirect back to the homepage
// Then, use the `hasPermission` function created above to protect the route based on authorization status
app.get('/path', requireAuth(), hasPermission, (req, res) => res.json(req.auth))

// This route is not protected but it will have authentication state
// attached to the request object because `clerkMiddleware()` was applied to all routes
app.get('/path2', (req, res) => res.json(req.auth))

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
```

### `clerkMiddleware()` options

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

| Name            | Type        | Description                                                                                                                                                                                                         |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clerkClient     | ClerkClient | An instance of the ClerkClient class. This is used to interact with the Clerk API.                                                                                                                                  |
| debug           | boolean     | A flag to enable debug mode. When set to true, the middleware will log debug information to the console. Defaults to false.                                                                                         |
| enableHandshake | boolean     | A flag to enable Clerk's handshake flow, which helps verify the session state when a session JWT has expired. It issues a 307 redirect to refresh the session JWT if the user is still signed in. Defaults to true. |

#### `OrganizationSyncOptions`

The `organizationSyncOptions` property on the [`clerkMiddleware()`](#clerk-middleware-options) options
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
