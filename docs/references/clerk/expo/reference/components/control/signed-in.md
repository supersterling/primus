# <SignedIn>

## Overview

The `<SignedIn>` component offers authentication checks as a cross-cutting concern. Any children components wrapped by a `<SignedIn>` component will be rendered only if there's a user with an active session signed in your application.

> This component only **visually hides** its children when the current user is not authenticated. The contents of its children remain accessible via the browser's source code even if the user fails the authentication check. Do not use this component to hide sensitive information that should be completely inaccessible to unauthorized users. For truly sensitive data, perform authorization checks on the server before sending the data to the client.

## Example

```tsx {{ filename: 'app/index.tsx' }}
import { SignedIn } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

export default function Screen() {
  return (
    <View>
      <SignedIn>
        <Text>You are signed in.</Text>
      </SignedIn>
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
