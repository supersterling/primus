# Protect content and read user data

> The Remix SDK is in maintenance mode and will only receive security updates. Please migrate to the [`React Router SDK`](https://clerk.com/docs/react-router/getting-started/quickstart.md) for continued development and new features.

Clerk provides a set of [`hooks and helpers`](https://clerk.com/docs/reference/remix/overview.md) that you can use to protect content and read user data in your Remix application. Here are examples of how to use these helpers in both the client and server-side to get you started.

## Server-side

### `getAuth()`

The [`getAuth()`](https://clerk.com/docs/reference/remix/overview.md#get-auth) helper allows you to access the [`Auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md), which includes the current user's `userId` and the `isAuthenticated` property, which can be used to protect your routes.

In the following example, the `userId` is passed to the JS Backend SDK's [`getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md) method to get the user's full `User` object. For information on how to use the JS Backend SDK, see the [`reference documentation`](https://clerk.com/docs/js-backend/getting-started/quickstart.md).

**Loader Function**

```tsx {{ filename: 'routes/profile.tsx' }}
import { LoaderFunction, redirect } from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from '@clerk/remix/api.server'

export const loader: LoaderFunction = async (args) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = await getAuth(args)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect('/sign-in?redirect_url=' + args.request.url)
  }

  // Initialize the JS Backend SDK and get the user's full `Backend User` object
  const user = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.getUser(
    userId,
  )

  // Return the retrieved user data
  return { serialisedUser: JSON.stringify(user) }
}
```

**Action Function**

```tsx {{ filename: 'routes/profile.tsx' }}
import { ActionFunction, redirect } from '@remix-run/node'
import { getAuth } from '@clerk/remix/ssr.server'
import { createClerkClient } from '@clerk/remix/api.server'

export const action: ActionFunction = async (args) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = await getAuth(args)

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return redirect('/sign-in?redirect_url=' + args.request.url)
  }

  // Initialize the JS Backend SDK and get the user's full `Backend User` object
  const updatedUser = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId)

  // Return the retrieved user data
  return { serialisedUser: JSON.stringify(updatedUser) }
}
```

## Client Side

### `useAuth()`

The following example uses the [`useAuth()`](https://clerk.com/docs/reference/hooks/use-auth.md) hook to access the current auth state, as well as helper methods to manage the current session.

```tsx {{ filename: 'example.tsx' }}
export default function Example() {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()

  const fetchExternalData = async () => {
    // Use `getToken()` to get the current user's session token
    const token = await getToken()

    // Use `token` to fetch data from an external API
    const response = await fetch('https://api.example.com/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  }

  // Use `isLoaded` to check if Clerk is loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Use `isSignedIn` to check if the user is signed in
  if (!isSignedIn) {
    // You could also add a redirect to the sign-in page here
    return <div>Sign in to view this page</div>
  }

  return (
    <div>
      Hello, {userId}! Your current active session is {sessionId}.
    </div>
  )
}
```

### `useUser()`

The following example uses the [`useUser()`](https://clerk.com/docs/reference/hooks/use-user.md) hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains the current user's data such as their full name. The following example demonstrates how to use `useUser()` to check if the user is signed in and display their first name.

```tsx {{ filename: 'src/Example.tsx' }}
export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Use `isLoaded` to check if Clerk is loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Use `isSignedIn` to protect the content
  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  // Use `user` to access the current user's data
  return <div>Hello {user.firstName}!</div>
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
