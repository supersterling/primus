# useOAuth() (deprecated)

> This feature is deprecated. Use [`useSSO()`](https://clerk.com/docs/reference/expo/use-sso.md) instead.

The `useOAuth()` hook is used to create a new OAuth flow. It can be used in both web and native apps.

## Parameters

| Name            | Type                 | Description                                                                                         |
| --------------- | -------------------- | --------------------------------------------------------------------------------------------------- |
| strategy        | OAuthStrategy        | The strategy corresponding to the OAuth provider. For example: oauth\_facebook, oauth\_github, etc. |
| redirectUrl?    | string               | The full URL or path to redirect to after the OAuth flow is complete.                               |
| unsafeMetadata? | SignUpUnsafeMetadata | Unsafe metadata to be passed to the OAuth provider.                                                 |

## Returns

The `useOAuth()` hook returns the `startOAuthFlow()` method, which you can use to initiate the OAuth flow.

The `startOAuthFlow()` method has the following signature:

```ts
const startOAuthFlow: (
  startOAuthFlowParams?: StartOAuthFlowParams,
) => Promise<StartOAuthFlowReturnType>
```

It accepts the following parameters (`StartOAuthFlowParams`):

| Name            | Type                 | Description                                                      |
| --------------- | -------------------- | ---------------------------------------------------------------- |
| redirectUrl?    | string               | The URL or path to redirect to after the OAuth flow is complete. |
| unsafeMetadata? | SignUpUnsafeMetadata | Unsafe metadata to be passed to the OAuth provider.              |

## How to use the `useOAuth()` hook

The following example demonstrates how to create a custom OAuth sign-in flow for [Google accounts](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google.md).

```tsx {{ filename: 'app/(auth)/sign-in.tsx', collapsible: true }}
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Text, View, Button } from 'react-native'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Page() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View>
      <Link href="/">
        <Text>Home</Text>
      </Link>
      <Button title="Sign in with Google" onPress={onPress} />
    </View>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
