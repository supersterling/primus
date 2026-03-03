# useClerk()

> This hook should only be used for advanced use cases, such as building a completely custom OAuth flow or as an escape hatch to access to the `Clerk` object.

The `useClerk()` hook provides access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, allowing you to build alternatives to any Clerk Component.

## Returns

[`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) — The `useClerk()` hook returns the `Clerk` object, which includes all the methods and properties listed in the [`Clerk reference`](https://clerk.com/docs/reference/javascript/clerk.md).

## Example

The following example uses the `useClerk()` hook to access the `clerk` object. The `clerk` object is used to call the [`openSignIn()`](https://clerk.com/docs/reference/javascript/clerk.md#sign-in) method to open the sign-in modal.

```tsx {{ filename: 'app/(clerk)/index.tsx' }}
import { useClerk } from '@clerk/clerk-expo'
import { Text, View, TouchableOpacity } from 'react-native'

export default function Page() {
  const clerk = useClerk()

  return (
    <View>
      <TouchableOpacity onPress={() => clerk.openSignIn({})}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
