# useSignIn()

The `useSignIn()` hook provides access to the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object, which allows you to check the current state of a sign-in attempt and manage the sign-in flow. You can use this to create a custom sign-in flow.

## Returns

There are multiple variants of this type available which you can select by clicking on one of the tabs.

**Initialization**

| Name        | Type        | Description                                                                                                                          |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`  | `false`     | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.             |
| `setActive` | `undefined` | A function that sets the active session. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#set-active). |
| `signIn`    | `undefined` | An object that contains the current sign-in attempt status and methods to create a new sign-in attempt.                              |

**Loaded**

| Name          | Type                                                                                                                                                               | Description                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `isLoaded`    | `true`                                                                                                                                                             | A boolean that indicates whether Clerk has completed initialization. Initially `false`, becomes `true` once Clerk loads.             |
| `setActive()` | <code>(setActiveParams: <a href="https://clerk.com/docs/reference/javascript/types/set-active-params.md">`SetActiveParams`</a>) => Promise<void></code> | A function that sets the active session. See the [`reference doc`](https://clerk.com/docs/reference/javascript/clerk.md#set-active). |
| `signIn`      | [`SignInResource`](https://clerk.com/docs/reference/javascript/sign-in.md)                                                                                         | An object that contains the current sign-in attempt status and methods to create a new sign-in attempt.                              |

## Examples

### Check the current state of a sign-in

The following example uses the `useSignIn()` hook to access the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object, which contains the current sign-in attempt status and methods to create a new sign-in attempt. The `isLoaded` property is used to handle the loading state.

```tsx {{ filename: 'src/routes/page.tsx' }}
import { useSignIn } from '@clerk/chrome-extension'

export default function SignInPage() {
  const { isLoaded, signIn } = useSignIn()

  if (!isLoaded) {
    // Handle loading state
    return null
  }

  return <div>The current sign-in attempt status is {signIn?.status}.</div>
}
```

### Create a custom sign-in flow with `useSignIn()`

The `useSignIn()` hook can also be used to build fully custom sign-in flows, if Clerk's prebuilt components don't meet your specific needs or if you require more control over the authentication flow. Different sign-in flows include email and password, email and phone codes, email links, and multifactor (MFA). To learn more about using the `useSignIn()` hook to create custom flows, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
