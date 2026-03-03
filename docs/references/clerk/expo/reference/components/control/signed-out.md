# <SignedOut>

The `<SignedOut>` component offers authentication checks as a cross-cutting concern. Any child nodes wrapped by a `<SignedOut>` component will be rendered only if there's no User signed in to your application.

## Example

```tsx {{ filename: 'app/index.tsx' }}
import { SignedOut } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

export default function Screen() {
  return (
    <View>
      <SignedOut>
        <Text>You are signed out.</Text>
      </SignedOut>
      <Text>This content is always visible.</Text>
    </View>
  )
}
```

## Properties

| Name                     | Type    | Description                                                                                 |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------- |
| treatPendingAsSignedOut? | boolean | A boolean that indicates whether to treat pending sessions as signed out. Defaults to true. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
