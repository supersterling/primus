# authenticateRequest()

Authenticates a token passed from the frontend. Networkless if the `jwtKey` is provided. Otherwise, performs a network call to retrieve the JWKS from the [Backend API](https://clerk.com/docs/reference/backend-api/tag/jwks/get/jwks.md){{ target: '_blank' }}.

```ts
function authenticateRequest(
  request: Request,
  options: AuthenticateRequestOptions,
): Promise<RequestState>
```

## Parameters

| Name     | Type                       | Description                                       |
| -------- | -------------------------- | ------------------------------------------------- |
| request  | Request                    | Request object                                    |
| options? | AuthenticateRequestOptions | Optional options to configure the authentication. |

## `AuthenticateRequestOptions`

It is recommended to set these options as [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md#api-and-sdk-configuration) where possible, and then pass them to the function. For example, you can set the `secretKey` option using the `CLERK_SECRET_KEY` environment variable, and then pass it to the function like this: `createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })`.

> You must provide either `jwtKey` or `secretKey`.
>
> For better security, it's highly recommended to explicitly set the `authorizedParties` option when authorizing requests. The value should be a list of domains that are allowed to make requests to your application. Not setting this value can open your application to [CSRF attacks](https://owasp.org/www-community/attacks/csrf).

| Property                                                        | Type                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="acceptstoken"></a> `acceptsToken?`                       | `"api_key" | "oauth_token" | "session_token" | "m2m_token" | ("api_key" | "oauth_token" | "session_token" | "m2m_token")[] | "any"` | The type of token to accept. Defaults to `'session_token'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="aftersigninurl"></a> `afterSignInUrl?`                   | `string`                                                                                                                                       | Full URL or path to navigate to after successful sign in. Defaults to `'/'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="aftersignupurl"></a> `afterSignUpUrl?`                   | `string`                                                                                                                                       | Full URL or path to navigate to after successful sign up. Defaults to `'/'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="apiurl"></a> `apiUrl?`                                   | `string`                                                                                                                                       | The [Clerk Backend API](https://clerk.com/docs/reference/backend-api.md){{ target: '_blank' }} endpoint. Defaults to `'https://api.clerk.com'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="apiversion"></a> `apiVersion?`                           | `string`                                                                                                                                       | The version passed to the Clerk API. Defaults to `'v1'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="audience"></a> `audience?`                               | `string | string[]`                                                                                                                 | A string or list of [audiences](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3). If passed, it is checked against the `aud` claim in the token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="authorizedparties"></a> `authorizedParties?`             | `string[]`                                                                                                                          | An allowlist of origins to verify against, to protect your application from the subdomain cookie leaking attack. Example: `['http://localhost:3000', 'https://example.com']`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="clockskewinms"></a> `clockSkewInMs?`                     | `number`                                                                                                                                       | Specifies the allowed time difference (in milliseconds) between the Clerk server (which generates the token) and the clock of the user's application server when validating a token. Defaults to `5000`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="domain"></a> `domain?`                                   | `string`                                                                                                                                       | The domain of a [satellite application](https://clerk.com/docs/guides/dashboard/dns-domains/satellite-domains.md) in a multi-domain setup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="headertype"></a> `headerType?`                           | `string | string[]`                                                                                                                 | A string or list of allowed [header types](https://datatracker.ietf.org/doc/html/rfc7515#section-4.1.9). Defaults to `'JWT'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="issatellite"></a> `isSatellite?`                         | `boolean`                                                                                                                                      | Whether the instance is a satellite domain in a multi-domain setup. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="jwkscachettlinms"></a> ~~`jwksCacheTtlInMs?`~~           | `number`                                                                                                                                       | **Deprecated.** This cache TTL will be removed in the next major version. Specifying a cache TTL is a no-op.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="jwtkey"></a> `jwtKey?`                                   | `string`                                                                                                                                       | Used to verify the session token in a networkless manner. Supply the PEM public key from the **[**API keys**](https://dashboard.clerk.com/last-active?path=api-keys) page -> Show JWT public key -> PEM Public Key** section in the Clerk Dashboard. **It's recommended to use [the environment variable](https://clerk.com/docs/guides/development/clerk-environment-variables.md) instead.** For more information, refer to [Manual JWT verification](https://clerk.com/docs/guides/sessions/manual-jwt-verification.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="machinesecretkey"></a> `machineSecretKey?`               | `string`                                                                                                                                       | The machine secret key to use when verifying machine-to-machine tokens. This will override the Clerk secret key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| <a id="organizationsyncoptions"></a> `organizationSyncOptions?` | `{ organizationPatterns?: string[]; personalAccountPatterns?: string[]; }`                                                          | Used to activate a specific [Organization](https://clerk.com/docs/guides/organizations/overview.md) or [Personal Account](https://clerk.com/docs/guides/dashboard/overview.md) based on URL path parameters. If there's a mismatch between the Active Organization in the session (e.g., as reported by `auth()`) and the Organization indicated by the URL, an attempt to activate the Organization specified in the URL will be made. If the activation can't be performed, either because an Organization doesn't exist or the user lacks access, the Active Organization in the session won't be changed. Ultimately, it's the responsibility of the page to verify that the resources are appropriate to render given the URL and handle mismatches appropriately (e.g., by returning a 404).                                                                                                                                                                                                                                               |
| `organizationSyncOptions.organizationPatterns?`                 | `string[]`                                                                                                                          | Specifies URL patterns that are Organization-specific, containing an Organization ID or slug as a path parameter. If a request matches this path, the Organization identifier will be used to set that Organization as active. If the route also matches the `personalAccountPatterns` prop, this prop takes precedence. Patterns must have a path parameter named either `:id` (to match a Clerk Organization ID) or `:slug` (to match a Clerk Organization slug). If the Organization can't be activated—either because it doesn't exist or the user lacks access—the previously active Organization will remain unchanged. Components must detect this case and provide an appropriate error and/or resolution pathway, such as calling `notFound()` or displaying an [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md). Examples: `["/orgs/:slug",, "/orgs/:slug/(.*)"]`, `["/orgs/:id",, "/orgs/:id/(.*)"]`, `["/app/:any/orgs/:slug",, "/app/:any/orgs/:slug/(.*)"]`. |
| `organizationSyncOptions.personalAccountPatterns?`              | `string[]`                                                                                                                          | URL patterns for resources that exist within the context of a [Clerk Personal Account](https://clerk.com/docs/guides/dashboard/overview.md) (user-specific, outside any Organization). If the route also matches the `organizationPattern` prop, the `organizationPattern` prop takes precedence. Examples: `["/user",, "/user/(.*)"]`, `["/user/:any",, "/user/:any/(.*)"]`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| <a id="proxyurl"></a> `proxyUrl?`                               | `string`                                                                                                                                       | The proxy URL from a multi-domain setup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="publishablekey"></a> `publishableKey?`                   | `string`                                                                                                                                       | The Clerk Publishable Key from the [**API keys**](https://dashboard.clerk.com/last-active?path=api-keys) page in the Clerk Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="secretkey"></a> `secretKey?`                             | `string`                                                                                                                                       | The Clerk Secret Key from the [**API keys**](https://dashboard.clerk.com/last-active?path=api-keys) page in the Clerk Dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| <a id="signinurl"></a> `signInUrl?`                             | `string`                                                                                                                                       | The sign-in URL from a multi-domain setup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="signupurl"></a> `signUpUrl?`                             | `string`                                                                                                                                       | The sign-up URL from a multi-domain setup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="skipjwkscache"></a> `skipJwksCache?`                     | `boolean`                                                                                                                                      | A flag to ignore the JWKS cache and always fetch JWKS before each JWT verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Returns

| Name                    | Type                                                             | Description                                                                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isAuthenticated         | boolean                                                          | A boolean that indicates whether the incoming request is authenticated. Initially false, becomes true once the request is authenticated.                                                           |
| isSignedIn (deprecated) | boolean                                                          | Deprecated. Use isAuthenticated instead. Indicates whether the incoming request is authenticated.                                                                                                  |
| status                  | 'signed-in' | 'signed-out' | 'handshake'                       | The authentication state.                                                                                                                                                                          |
| reason                  | string | null                                                   | The error code or reason for the current state. When there is a signed-in user, the value will be null.                                                                                            |
| message                 | string | null                                                   | The full error message or additional context. When there is a signed-in user, the value will be null.                                                                                              |
| tokenType               | 'session\_token' | 'oauth\_token' | 'm2m\_token' | 'api\_key' | The type of token.                                                                                                                                                                                 |
| token                   | string                                                           | The value of the token.                                                                                                                                                                            |
| headers                 | Headers                                                          | A Headers object containing debug or status headers.                                                                                                                                               |
| toAuth()                | function                                                         | A function that returns the Auth object. This JavaScript object contains important information like the current user's session ID, user ID, and Organization ID. Learn more about the Auth object. |

## Examples

**JS Backend SDK**

If you are using the [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) on its own, you need to provide the `secretKey` and `publishableKey` to `createClerkClient()` so that it is passed to `authenticateRequest()`. You can set these values as [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md#clerk-publishable-and-secret-keys) and then pass them to the function.

```tsx
import { createClerkClient } from '@clerk/backend'

export async function GET(req: Request) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })

  const { isAuthenticated } = await clerkClient.authenticateRequest(req, {
    authorizedParties: ['https://example.com'],
  })

  if (!isAuthenticated) {
    return Response.json({ status: 401 })
  }

  // Add logic to perform protected actions

  return Response.json({ message: 'This is a reply' })
}
```

**With other Clerk SDKs**

`authenticateRequest()` requires `publishableKey` to be set. If you are importing `clerkClient` from a higher-level SDK, such as Next.js, then `clerkClient` infers the `publishableKey` from your [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md#clerk-publishable-and-secret-keys). **The following example uses Next.js, but you can use the comments in the example to help you adapt it to other SDKs.**

```tsx
import { clerkClient } from '@clerk/nextjs/server'

// Initialize the JS Backend SDK
// This varies depending on the SDK you're using
// https://clerk.com/docs/js-backend/getting-started/quickstart
const client = await clerkClient()

export async function GET(req: Request) {
  // Use the `authenticateRequest()` method to verify the token
  const { isAuthenticated } = await client.authenticateRequest(req, {
    authorizedParties: ['https://example.com'],
  })

  // Protect the route from unauthenticated users
  if (!isAuthenticated) {
    return Response.json({ status: 401 })
  }

  // Add logic to perform protected actions

  return Response.json({ message: 'This is a reply' })
}
```

### Machine authentication

By default, `authenticateRequest()` will authenticate a session request. To authenticate a machine request, you need to set the `acceptsToken` option to a machine token type, such as `'api_key'`, `'oauth_token'` or `'m2m_token'`.

**JS Backend SDK**

```tsx
import { createClerkClient } from '@clerk/backend'

export async function GET(request: Request) {
  // Initialize the JS Backend SDK
  // This varies depending on the SDK you're using
  // https://clerk.com/docs/js-backend/getting-started/quickstart
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })

  // Use the `authenticateRequest()` method to verify the token
  const { isAuthenticated } = await clerkClient.authenticateRequest(request, {
    acceptsToken: 'oauth_token',
  })

  // Protect the route from unauthenticated users
  if (!isAuthenticated) {
    return Response.json({ status: 401 })
  }

  // Add logic to perform protected actions

  return Response.json({ message: 'This is a machine-to-machine reply' })
}
```

**With other Clerk SDKs**

**This example uses Next.js, but you can use the comments in the example to help you adapt it to other SDKs.**

```tsx
import { clerkClient } from '@clerk/nextjs/server'

// Initialize the JS Backend SDK
// This varies depending on the SDK you're using
// https://clerk.com/docs/js-backend/getting-started/quickstart
const client = await clerkClient()

export async function GET(req: Request) {
  // Use the `authenticateRequest()` method to verify the token
  const { isAuthenticated } = await client.authenticateRequest(request, {
    acceptsToken: 'oauth_token',
  })

  // Protect the route from unauthenticated users
  if (!isAuthenticated) {
    return Response.json({ status: 401 })
  }

  // Add logic to perform protected actions

  return Response.json({ message: 'This is a machine-to-machine reply' })
}
```

### Networkless token verification

The following example uses the `authenticateRequest()` method with the [`JS Backend SDK`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) to verify the token passed by the frontend, and performs a networkless authentication by passing `jwtKey`. This will verify if the user is signed into the application or not.

**Next.js**

```tsx {{ filename: 'app/api/example/route.ts' }}
import { clerkClient } from '@clerk/nextjs/server'

// Initialize the JS Backend SDK
// This varies depending on the SDK you're using
// https://clerk.com/docs/js-backend/getting-started/quickstart
const client = await clerkClient()

export async function GET(req: Request) {
  // Use the `authenticateRequest()` method to verify the token
  const { isAuthenticated } = await client.authenticateRequest(req, {
    authorizedParties: ['https://example.com'],
    jwtKey: process.env.CLERK_JWT_KEY,
  })

  // Protect the route from unauthenticated users
  if (!isAuthenticated) {
    return Response.json({ status: 401 })
  }

  // Add logic to perform protected actions

  return Response.json({ message: 'This is a reply' })
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
