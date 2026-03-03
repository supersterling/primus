# useSession()

The `useSession()` hook provides access to the current user's [`Session`](https://clerk.com/docs/reference/javascript/session.md) object, as well as helpers for setting the active session.

## Returns

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**Initialization**

| Name         | Type        | Description                                                                                                              |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `false`     | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `undefined` | A boolean that indicates whether a user is currently signed in.                                                          |
| `session`    | `undefined` | The current session for the user.                                                                                        |

**Signed out**

| Name         | Type    | Description                                                                                                              |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `true`  | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `false` | A boolean that indicates whether a user is currently signed in.                                                          |
| `session`    | `null`  | The current session for the user.                                                                                        |

**Signed in**

| Name         | Type                                                                                | Description                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`   | `true`                                                                              | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads. |
| `isSignedIn` | `boolean`                                                                           | A boolean that indicates whether a user is currently signed in.                                                          |
| `session`    | [`SignedInSessionResource`](https://clerk.com/docs/reference/javascript/session.md) | The current session for the user.                                                                                        |

## Example

### Access the `Session` object

The following example uses the `useSession()` hook to access the `Session` object, which has the `lastActiveAt` property. The `lastActiveAt` property is a `Date` object used to show the time the session was last active.

```tsx {{ filename: 'src/routes/page.tsx' }}
import { useSession } from '@clerk/chrome-extension'

export default function HomePage() {
  const { isLoaded, session, isSignedIn } = useSession()

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  // Protect the page from unauthenticated users
  if (!isSignedIn) return <div>Sign in to view this page</div>

  return (
    <div>
      <p>This session has been active since {session.lastActiveAt.toLocaleString()}</p>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
