# useUser()

The `useUser()` hook provides access to the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains all the data for a single user in your application and provides methods to manage their account. This hook also allows you to check if the user is signed in and if Clerk has loaded and initialized.

## Returns

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**Initialization**

| Name         | Type        | Description                                                                                                              |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `false`     | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `undefined` | A boolean that returns `true` if the user is signed in.                                                                  |
| `user`       | `undefined` | The `User` object for the current user.                                                                                  |

**Signed out**

| Name         | Type    | Description                                                                                                              |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `true`  | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `false` | A boolean that returns `true` if the user is signed in.                                                                  |
| `user`       | `null`  | The `User` object for the current user.                                                                                  |

**Signed in**

| Name         | Type                                                                  | Description                                                                                                              |
| ------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `true`                                                                | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `true`                                                                | A boolean that returns `true` if the user is signed in.                                                                  |
| `user`       | [`UserResource`](https://clerk.com/docs/reference/javascript/user.md) | The `User` object for the current user.                                                                                  |

## Examples

### Get the current user

The following example uses the `useUser()` hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains the current user's data such as their full name. The `isLoaded` and `isSignedIn` properties are used to handle the loading state and to check if the user is signed in, respectively.

```tsx {{ filename: 'app/(user)/index.tsx' }}
import { useUser } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Handle loading state
  if (!isLoaded) return <View>Loading...</View>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <View>Sign in to view this page</View>

  return (
    <View>
      <Text>Hello {user.firstName}!</Text>
    </View>
  )
}
```

### Update user data

The following example uses the `useUser()` hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`update()`](https://clerk.com/docs/reference/javascript/user.md#update) method to update the current user's information.

```tsx {{ filename: 'app/(user)/index.tsx' }}
import { useUser } from '@clerk/clerk-expo'
import { Text, View, TouchableOpacity } from 'react-native'

export default function Page() {
  const { isSignedIn, isLoaded, user } = useUser()

  // Handle loading state
  if (!isLoaded) return <View>Loading...</View>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <View>Sign in to view this page</View>

  const updateUser = async () => {
    await user.update({
      firstName: 'John',
      lastName: 'Doe',
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={updateUser}>
        <Text>Update your name</Text>
      </TouchableOpacity>
      <Text>user.firstName: {user.firstName}</Text>
      <Text>user.lastName: {user.lastName}</Text>
    </View>
  )
}
```

### Reload user data

The following example uses the `useUser()` hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`reload()`](https://clerk.com/docs/reference/javascript/user.md#reload) method to get the latest user's information.

```tsx {{ filename: 'app/(user)/index.tsx' }}
import { useUser } from '@clerk/clerk-expo'
import { Text, View, TouchableOpacity } from 'react-native'

export default function Page() {
  const { isSignedIn, isLoaded, user } = useUser()

  // Handle loading state
  if (!isLoaded) return <View>Loading...</View>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <View>Sign in to view this page</View>

  const updateUser = async () => {
    // Update data via an API endpoint
    const updateMetadata = await fetch('/api/updateMetadata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'admin',
      }),
    })

    // Check if the update was successful
    if ((await updateMetadata.json()).message !== 'success') {
      throw new Error('Error updating')
    }

    // If the update was successful, reload the user data
    await user.reload()
  }

  return (
    <View>
      <TouchableOpacity onPress={updateUser}>
        <Text>Update your metadata</Text>
      </TouchableOpacity>
      <Text>user role: {user.publicMetadata.role}</Text>
    </View>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
