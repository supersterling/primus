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

```tsx {{ filename: 'src/pages/Example.tsx' }}
import { useUser } from '@clerk/clerk-react'

export default function Example() {
  const { isSignedIn, user, isLoaded } = useUser()

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <div>Sign in to view this page</div>

  return <div>Hello {user.firstName}!</div>
}
```

### Update user data

The following example uses the `useUser()` hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`update()`](https://clerk.com/docs/reference/javascript/user.md#update) method to update the current user's information.

```tsx {{ filename: 'src/pages/Example.tsx' }}
import { useUser } from '@clerk/clerk-react'

export default function Example() {
  const { isSignedIn, isLoaded, user } = useUser()

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <div>Sign in to view this page</div>

  const updateUser = async () => {
    await user.update({
      firstName: 'John',
      lastName: 'Doe',
    })
  }

  return (
    <>
      <button onClick={updateUser}>Update your name</button>
      <p>user.firstName: {user.firstName}</p>
      <p>user.lastName: {user.lastName}</p>
    </>
  )
}
```

### Reload user data

The following example uses the `useUser()` hook to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`reload()`](https://clerk.com/docs/reference/javascript/user.md#reload) method to get the latest user's information.

```tsx {{ filename: 'src/pages/Home.tsx' }}
import { useUser } from '@clerk/clerk-react'

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser()

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <div>Sign in to view this page</div>

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
    <>
      <button onClick={updateUser}>Update your metadata</button>
      <p>user role: {user.publicMetadata.role}</p>
    </>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
