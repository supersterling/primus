# Sign in with Apple

This guide will teach you how to add native [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/) to your Clerk Expo application.

> Apple Sign-In works on both iOS Simulators and physical devices. However, physical devices provide full functionality including biometric authentication (Face ID/Touch ID), while simulators have limited support. Always test on a physical device before releasing to production.

1. ## Add your Native Application

   Add your iOS application to the [**Native applications**](https://dashboard.clerk.com/~/native-applications) page in the Clerk Dashboard. You will need your iOS app's **App ID Prefix** (Team ID) and **Bundle ID**.
2. ## Enable Apple as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Apple** from the provider list.
   4. Ensure that **Enable for sign-up and sign-in** is toggled on.

   > Apple provides a privacy feature called [Hide My Email](https://support.apple.com/en-us/HT210425#hideemail), allowing users to sign in to your app with Apple without disclosing their actual email addresses. Instead, your instance receives an app-specific email address that forwards any emails to the user's real address. To be able to send emails properly to users with hidden addresses, you must configure an additional setting in the Apple Developer portal. See [Configure Email Source for Apple Private Relay](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/apple.md#configure-email-source-for-apple-private-relay){{ target: '_blank' }} for more information.
3. ## Install dependencies

   The [Expo Apple Authentication library](https://docs.expo.dev/versions/latest/sdk/apple-authentication/) provides access to Apple's native Sign in with Apple functionality from your Expo app.

   Run the following command to install the library:

   ```npm {{ filename: 'terminal' }}
   npx expo install expo-apple-authentication
   ```
4. ## Add `expo-apple-authentication` to your app config

   Add the `expo-apple-authentication` plugin to your `app.json` or `app.config.js`.

   **app.json**

   ```json {{ filename: 'app.json' }}
   {
     "expo": {
       "plugins": ["expo-apple-authentication"]
     }
   }
   ```

   **app.config.js**

   ```js {{ filename: 'app.config.js' }}
   export default {
     expo: {
       plugins: ['expo-apple-authentication'],
     },
   }
   ```
5. ## Build your authentication flow

   The following example demonstrates how to use the [`useSignInWithApple()`](https://clerk.com/docs/reference/expo/use-sign-in-with-apple.md) hook to manage the Apple authentication flow. Because the `useSignInWithApple()` hook automatically manages the transfer flow between sign-up and sign-in, you can use this component for both your sign-up and sign-in pages.

   ```tsx {{ filename: 'components/AppleSignInButton.tsx', collapsible: true }}
   import { useSignInWithApple } from '@clerk/clerk-expo'
   import { useRouter } from 'expo-router'
   import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

   // Example props that you could pass to your button
   interface AppleSignInButtonProps {
     // Callback function that is called when the sign-in is complete
     onSignInComplete?: () => void
     // Whether to show a divider between the button and the text
     showDivider?: boolean
   }

   export function AppleSignInButton({
     onSignInComplete,
     showDivider = true,
   }: AppleSignInButtonProps) {
     const { startAppleAuthenticationFlow } = useSignInWithApple()
     const router = useRouter()

     // Only render on iOS
     if (Platform.OS !== 'ios') {
       return null
     }

     const handleAppleSignIn = async () => {
       try {
         const { createdSessionId, setActive } = await startAppleAuthenticationFlow()

         if (createdSessionId && setActive) {
           // Set the created session as the active session
           await setActive({ session: createdSessionId })

           // Once the session is set as active,
           // if a callback function is provided, call it.
           // Otherwise, redirect to the home page.
           onSignInComplete ? onSignInComplete() : router.replace('/')
         }
       } catch (err: any) {
         // User canceled the sign-in flow
         if (err.code === 'ERR_REQUEST_CANCELED') return

         Alert.alert('Error', err.message || 'An error occurred during Apple Sign-In')
         console.error('Apple Sign-In error:', JSON.stringify(err, null, 2))
       }
     }

     return (
       <>
         <TouchableOpacity style={styles.appleButton} onPress={handleAppleSignIn}>
           <Text style={styles.appleButtonText}>Sign in with Apple</Text>
         </TouchableOpacity>

         {showDivider && (
           <View style={styles.divider}>
             <View style={styles.dividerLine} />
             <Text style={styles.dividerText}>OR</Text>
             <View style={styles.dividerLine} />
           </View>
         )}
       </>
     )
   }

   const styles = StyleSheet.create({
     appleButton: {
       backgroundColor: '#000',
       padding: 15,
       borderRadius: 8,
       alignItems: 'center',
       marginBottom: 10,
     },
     appleButtonText: {
       color: '#fff',
       fontSize: 16,
       fontWeight: '600',
     },
     divider: {
       flexDirection: 'row',
       alignItems: 'center',
       marginVertical: 20,
     },
     dividerLine: {
       flex: 1,
       height: 1,
       backgroundColor: '#ccc',
     },
     dividerText: {
       marginHorizontal: 10,
       color: '#666',
     },
   })
   ```
6. ## Create a native build

   Create a native build with EAS Build or a local prebuild, since Apple Authentication is not supported in Expo Go.

   ```bash {{ filename: 'terminal' }}
   # Using EAS Build
   eas build --platform ios

   # Or using local prebuild
   npx expo prebuild && npx expo run:ios --device
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
