# useAuth()

The `useAuth()` hook provides access to the current user's authentication state and methods to manage the active session. You can use this hook to get the user's authentication and organization information, like their ID, session ID, session token, organization ID, and organization role, and to check if the user is authenticated or authorized to access a specific resource.

> To access auth data server-side, see the [`Auth object reference doc`](https://clerk.com/docs/reference/backend/types/auth-object.md).

## Parameters

| Parameter                    | Type                                                                             | Description                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialAuthStateOrOptions?` | <code>null | Record<string, any> | { treatPendingAsSignedOut?: boolean; }</code> | An object containing the initial authentication state or options for the `useAuth()` hook. If not provided, the hook will attempt to derive the state from the context. `treatPendingAsSignedOut` is a boolean that indicates whether pending sessions are considered as signed out or not. Defaults to `true`. |

## Returns

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**Initialization**

| Name            | Type                                                                                                                                      | Description                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actor`         | `undefined`                                                                                                                               | The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/guides/users/impersonation.md).                                     |
| `getToken()`    | <code>(options?: GetTokenOptions) => Promise<null | string></code>                                                                        | A function that retrieves the current user's session token or a custom JWT template. Returns a promise that resolves to the token. See the [`reference doc`](https://clerk.com/docs/reference/javascript/session.md#get-token). |
| `has`           | `undefined`                                                                                                                               | A function that checks if the user has specific Permissions or Roles. See the [`reference doc`](https://clerk.com/docs/reference/backend/types/auth-object.md#has).                                                             |
| `isLoaded`      | `false`                                                                                                                                   | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                                                                                        |
| `isSignedIn`    | `undefined`                                                                                                                               | A boolean that indicates whether a user is currently signed in.                                                                                                                                                                 |
| `orgId`         | `undefined`                                                                                                                               | The ID of the user's active Organization.                                                                                                                                                                                       |
| `orgRole`       | `undefined`                                                                                                                               | The current user's Role in their active Organization.                                                                                                                                                                           |
| `orgSlug`       | `undefined`                                                                                                                               | The URL-friendly identifier of the user's Active Organization.                                                                                                                                                                  |
| `sessionClaims` | `undefined`                                                                                                                               | The current user's [session claims](https://clerk.com/docs/guides/sessions/session-tokens.md).                                                                                                                                  |
| `sessionId`     | `undefined`                                                                                                                               | The ID for the current session.                                                                                                                                                                                                 |
| `signOut()`     | <code>{ (options?: SignOutOptions): Promise<void>; (signOutCallback?: SignOutCallback, options?: SignOutOptions): Promise<void>; }</code> | A function that signs out the current user. Returns a promise that resolves when complete. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out).                                            |
| `userId`        | `undefined`                                                                                                                               | The ID of the current user.                                                                                                                                                                                                     |

**Signed out**

| Name            | Type                                                                                                                                      | Description                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actor`         | `null`                                                                                                                                    | The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/guides/users/impersonation.md).                                     |
| `getToken()`    | <code>(options?: GetTokenOptions) => Promise<null | string></code>                                                                        | A function that retrieves the current user's session token or a custom JWT template. Returns a promise that resolves to the token. See the [`reference doc`](https://clerk.com/docs/reference/javascript/session.md#get-token). |
| `has()`         | `(params: CheckAuthorizationParamsWithCustomPermissions) => false`                                                             | A function that checks if the user has specific Permissions or Roles. See the [`reference doc`](https://clerk.com/docs/reference/backend/types/auth-object.md#has).                                                             |
| `isLoaded`      | `true`                                                                                                                                    | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                                                                                        |
| `isSignedIn`    | `false`                                                                                                                                   | A boolean that indicates whether a user is currently signed in.                                                                                                                                                                 |
| `orgId`         | `null`                                                                                                                                    | The ID of the user's active Organization.                                                                                                                                                                                       |
| `orgRole`       | `null`                                                                                                                                    | The current user's Role in their active Organization.                                                                                                                                                                           |
| `orgSlug`       | `null`                                                                                                                                    | The URL-friendly identifier of the user's Active Organization.                                                                                                                                                                  |
| `sessionClaims` | `null`                                                                                                                                    | The current user's [session claims](https://clerk.com/docs/guides/sessions/session-tokens.md).                                                                                                                                  |
| `sessionId`     | `null`                                                                                                                                    | The ID for the current session.                                                                                                                                                                                                 |
| `signOut()`     | <code>{ (options?: SignOutOptions): Promise<void>; (signOutCallback?: SignOutCallback, options?: SignOutOptions): Promise<void>; }</code> | A function that signs out the current user. Returns a promise that resolves when complete. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out).                                            |
| `userId`        | `null`                                                                                                                                    | The ID of the current user.                                                                                                                                                                                                     |

**Signed in (no active organization)**

| Name            | Type                                                                                                                                      | Description                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actor`         | `null | { [x: string]: unknown; sub: string; }`                                                                                | The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/guides/users/impersonation.md).                                     |
| `getToken()`    | <code>(options?: GetTokenOptions) => Promise<null | string></code>                                                                        | A function that retrieves the current user's session token or a custom JWT template. Returns a promise that resolves to the token. See the [`reference doc`](https://clerk.com/docs/reference/javascript/session.md#get-token). |
| `has()`         | `(isAuthorizedParams: CheckAuthorizationParamsWithCustomPermissions) => boolean`                                               | A function that checks if the user has specific Permissions or Roles. See the [`reference doc`](https://clerk.com/docs/reference/backend/types/auth-object.md#has).                                                             |
| `isLoaded`      | `true`                                                                                                                                    | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                                                                                        |
| `isSignedIn`    | `true`                                                                                                                                    | A boolean that indicates whether a user is currently signed in.                                                                                                                                                                 |
| `orgId`         | `null`                                                                                                                                    | The ID of the user's active Organization.                                                                                                                                                                                       |
| `orgRole`       | `null`                                                                                                                                    | The current user's Role in their active Organization.                                                                                                                                                                           |
| `orgSlug`       | `null`                                                                                                                                    | The URL-friendly identifier of the user's Active Organization.                                                                                                                                                                  |
| `sessionClaims` | `JwtPayload`                                                                                                                              | The current user's [session claims](https://clerk.com/docs/guides/sessions/session-tokens.md).                                                                                                                                  |
| `sessionId`     | `string`                                                                                                                                  | The ID for the current session.                                                                                                                                                                                                 |
| `signOut()`     | <code>{ (options?: SignOutOptions): Promise<void>; (signOutCallback?: SignOutCallback, options?: SignOutOptions): Promise<void>; }</code> | A function that signs out the current user. Returns a promise that resolves when complete. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out).                                            |
| `userId`        | `string`                                                                                                                                  | The ID of the current user.                                                                                                                                                                                                     |

**Signed in (with active organization)**

| Name            | Type                                                                                                                                      | Description                                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actor`         | `null | { [x: string]: unknown; sub: string; }`                                                                                | The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/guides/users/impersonation.md).                                     |
| `getToken()`    | <code>(options?: GetTokenOptions) => Promise<null | string></code>                                                                        | A function that retrieves the current user's session token or a custom JWT template. Returns a promise that resolves to the token. See the [`reference doc`](https://clerk.com/docs/reference/javascript/session.md#get-token). |
| `has()`         | `(isAuthorizedParams: CheckAuthorizationParamsWithCustomPermissions) => boolean`                                               | A function that checks if the user has specific Permissions or Roles. See the [`reference doc`](https://clerk.com/docs/reference/backend/types/auth-object.md#has).                                                             |
| `isLoaded`      | `true`                                                                                                                                    | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                                                                                        |
| `isSignedIn`    | `true`                                                                                                                                    | A boolean that indicates whether a user is currently signed in.                                                                                                                                                                 |
| `orgId`         | `string`                                                                                                                                  | The ID of the user's active Organization.                                                                                                                                                                                       |
| `orgRole`       | `string`                                                                                                                                  | The current user's Role in their active Organization.                                                                                                                                                                           |
| `orgSlug`       | `null | string`                                                                                                                | The URL-friendly identifier of the user's Active Organization.                                                                                                                                                                  |
| `sessionClaims` | `JwtPayload`                                                                                                                              | The current user's [session claims](https://clerk.com/docs/guides/sessions/session-tokens.md).                                                                                                                                  |
| `sessionId`     | `string`                                                                                                                                  | The ID for the current session.                                                                                                                                                                                                 |
| `signOut()`     | <code>{ (options?: SignOutOptions): Promise<void>; (signOutCallback?: SignOutCallback, options?: SignOutOptions): Promise<void>; }</code> | A function that signs out the current user. Returns a promise that resolves when complete. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out).                                            |
| `userId`        | `string`                                                                                                                                  | The ID of the current user.                                                                                                                                                                                                     |

## Example

The following example demonstrates how to use the `useAuth()` hook to access the current auth state, like whether the user is signed in or not. It also includes a basic example for using the `getToken()` method to retrieve a session token for fetching data from an external resource.

```tsx {{ filename: 'app/routes/home.tsx' }}
import { useAuth } from '@clerk/react-router'

export default function Home() {
  const { userId, sessionId, getToken, isLoaded, isSignedIn } = useAuth()

  const fetchExternalData = async () => {
    const token = await getToken()

    // Fetch data from an external API
    const response = await fetch('https://api.example.com/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  }

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <div>Sign in to view this page</div>

  return (
    <div>
      <p>
        Hello, {userId}! Your current active session is {sessionId}.
      </p>
      <button onClick={fetchExternalData}>Fetch Data</button>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
