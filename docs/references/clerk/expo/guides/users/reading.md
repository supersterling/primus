# Protect content and read user data

Clerk offers a comprehensive suite of hooks that expose low-level access to authentication, session management, and multi-tenancy. With Clerk hooks, you can access and manage user data, handle sign-in and sign-up flows, control session management, and implement advanced flows like session reverification for sensitive actions. By using these hooks, you can extend or replace Clerk's built-in components and customize how authentication behaves in your application.

This guide demonstrates how to use the `useAuth()` and `useUser()` hooks to protect content and read user data in your Expo application.

## Session data example

The [`useAuth()`](https://clerk.com/docs/expo/reference/hooks/use-auth.md){{ target: '_blank' }} hook provides information about the current auth state, as well as helper methods to manage the current session.

The following example demonstrates how to use the available properties of the `useAuth()` hook.

```tsx {{ filename: 'components/UseAuthExample.tsx' }}
import { useAuth } from '@clerk/clerk-expo'
import { Text, View, TouchableOpacity } from 'react-native'

export default function UseAuthExample() {
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
    return <Text>Loading...</Text>
  }

  // Use `isSignedIn` to check if the user is signed in
  if (!isSignedIn) {
    // You could also add a redirect to the sign-in page here
    return <Text>Sign in to view this page</Text>
  }

  return (
    <View>
      <Text>
        Hello, {userId}! Your current active session is {sessionId}.
      </Text>
      <TouchableOpacity onPress={fetchExternalData}>
        <Text>Fetch Data</Text>
      </TouchableOpacity>
    </View>
  )
}
```

## User data example

The [`useUser()`](https://clerk.com/docs/expo/reference/hooks/use-user.md){{ target: '_blank' }} hook enables you to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains the current user's data such as their full name.

The following example demonstrates how to use `useUser()` to check if the user is signed in and display their first name.

```tsx {{ filename: 'src/Example.tsx' }}
import { useUser } from '@clerk/clerk-expo'
import { Text } from 'react-native'

export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Use `isLoaded` to check if Clerk is loaded
  if (!isLoaded) {
    return <Text>Loading...</Text>
  }

  // Use `isSignedIn` to protect the content
  if (!isSignedIn) {
    return <Text>Sign in to view this page</Text>
  }

  // Use `user` to access the current user's data
  return <Text>Hello {user.firstName}!</Text>
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
