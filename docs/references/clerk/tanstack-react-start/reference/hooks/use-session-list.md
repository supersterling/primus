# useSessionList()

The `useSessionList()` hook returns an array of [`Session`](https://clerk.com/docs/reference/javascript/session.md) objects that have been registered on the client device.

## Returns

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**Initialization**

| Name        | Type        | Description                                                                                                                                              |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isLoaded`  | `false`     | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                 |
| `sessions`  | `undefined` | A list of sessions that have been registered on the client device.                                                                                       |
| `setActive` | `undefined` | A function that sets the active session and/or Organization. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#set-active). |

**Loaded**

| Name          | Type                                                                                                                                                               | Description                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isLoaded`    | `true`                                                                                                                                                             | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.                                 |
| `sessions`    | <code><a href="https://clerk.com/docs/reference/javascript/session.md">`SessionResource`</a>[]</code>                                                   | A list of sessions that have been registered on the client device.                                                                                       |
| `setActive()` | <code>(setActiveParams: <a href="https://clerk.com/docs/reference/javascript/types/set-active-params.md">`SetActiveParams`</a>) => Promise<void></code> | A function that sets the active session and/or Organization. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#set-active). |

## Example

### Get a list of sessions

The following example uses `useSessionList()` to get a list of sessions that have been registered on the client device. The `sessions` property is used to show the number of times the user has visited the page.

```tsx {{ filename: 'app/routes/index.tsx' }}
import { useSessionList } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

export default function Home() {
  const { isLoaded, sessions } = useSessionList()

  // Handle loading state
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <p>Welcome back. You've been here {sessions.length} times before.</p>
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
