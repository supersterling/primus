# <ClerkLoading>

The `<ClerkLoading>` renders its children while Clerk is loading, and is helpful for showing a custom loading state.

## Example

It's not recommended to wrap the entire app in the `<ClerkLoading>` component; instead, only wrap the components that need access to the `Clerk` object.

```tsx {{ filename: 'app/index.tsx' }}
import { ClerkLoading, ClerkLoaded } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

export default function Screen() {
  return (
    <View>
      <ClerkLoading>
        <Text>Clerk is loading</Text>
      </ClerkLoading>
      <ClerkLoaded>
        <Text>Clerk has loaded</Text>
      </ClerkLoaded>
    </View>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
