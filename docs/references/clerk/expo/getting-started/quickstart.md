# Expo Quickstart

**Example Repository**

- [Expo Quickstart Repo](https://github.com/clerk/clerk-expo-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

1. ## Enable Native API

   In the Clerk Dashboard, navigate to the [**Native applications**](https://dashboard.clerk.com/~/native-applications) page and ensure that the Native API is enabled. This is required to integrate Clerk in your native application.
2. ## Create a new Expo app

   If you don't already have an Expo app, run the following commands to [create a new one](https://docs.expo.dev/tutorial/create-your-first-app/).

   ```npm
   npx create-expo-app@latest clerk-expo
   cd clerk-expo
   npm install
   ```
3. ## Install `@clerk/clerk-expo`

   The [`Clerk Expo SDK`](https://clerk.com/docs/reference/expo/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/clerk-expo
   ```
4. ## Set your Clerk API keys

   Add your Clerk Publishable Key to your `.env` file.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key.
   3. Paste your key into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
   ```
5. ## Add `<ClerkProvider>` to your root layout

   The [`<ClerkProvider>`](https://clerk.com/docs/expo/reference/components/clerk-provider.md) component provides session and user context to Clerk's hooks and components. It's recommended to wrap your entire app at the entry point with `<ClerkProvider>` to make authentication globally accessible. See the [`reference docs`](https://clerk.com/docs/expo/reference/components/clerk-provider.md) for other configuration options.

   Add the component to your root layout, as shown in the following example:

   ```tsx {{ filename: 'app/_layout.tsx' }}
     import { useColorScheme } from '@/hooks/use-color-scheme'
   + import { ClerkProvider } from '@clerk/clerk-expo'
     import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
     import { Stack } from 'expo-router'
     import { StatusBar } from 'expo-status-bar'
     import 'react-native-reanimated'

     export const unstable_settings = {
       anchor: '(tabs)',
     }

     export default function RootLayout() {
       const colorScheme = useColorScheme()

       return (
         <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
   +       <ClerkProvider>
             <Stack>
               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
               <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
             </Stack>
             <StatusBar style="auto" />
   +       </ClerkProvider>
         </ThemeProvider>
       )
     }
   ```
6. ## Configure the token cache

   Clerk stores the active user's session token in memory by default. In Expo apps, the recommended way to store sensitive data, such as tokens, is by using `expo-secure-store` which encrypts the data before storing it.

   To use `expo-secure-store` as your token cache:

   1. Run the following command to install the library:

      ```npm
      npm install expo-secure-store
      ```

   2. Update your root layout to use the secure token cache:
      ```tsx {{ filename: 'app/_layout.tsx' }}
        import { useColorScheme } from '@/hooks/use-color-scheme'
        import { ClerkProvider } from '@clerk/clerk-expo'
      + import { tokenCache } from '@clerk/clerk-expo/token-cache'
        import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
        import { Stack } from 'expo-router'
        import { StatusBar } from 'expo-status-bar'
        import 'react-native-reanimated'

        export const unstable_settings = {
          anchor: '(tabs)',
        }

        export default function RootLayout() {
          const colorScheme = useColorScheme()

          return (
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      +       <ClerkProvider tokenCache={tokenCache}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
                <StatusBar style="auto" />
              </ClerkProvider>
            </ThemeProvider>
          )
        }
      ```

   > When you sign a user out with [`signOut()`](https://clerk.com/docs/expo/reference/hooks/use-auth.md#returns), Clerk will remove the user's session JWT from the token cache.
7. ## Add sign-up and sign-in pages

   Clerk currently only supports [`control components`](https://clerk.com/docs/expo/reference/components/overview.md#control-components) for Expo native. UI components are only available for Expo web. Instead, you must build custom flows using Clerk's API. The following sections demonstrate how to build [custom email/password sign-up and sign-in flows](https://clerk.com/docs/guides/development/custom-flows/authentication/email-password.md). If you want to use different authentication methods, such as passwordless or OAuth, see the dedicated custom flow guides.
8. ### Layout page

   First, protect your sign-up and sign-in pages.

   1. Create an `(auth)` [route group](https://docs.expo.dev/router/advanced/shared-routes/). This will group your sign-up and sign-in pages.
   2. In the `(auth)` group, create a `_layout.tsx` file with the following code. The [`useAuth()`](https://clerk.com/docs/expo/reference/hooks/use-auth.md) hook is used to access the user's authentication state. If the user is already signed in, they will be redirected to the home page.

   ```tsx {{ filename: 'app/(auth)/_layout.tsx' }}
   import { Redirect, Stack } from 'expo-router'
   import { useAuth } from '@clerk/clerk-expo'

   export default function AuthRoutesLayout() {
     const { isSignedIn } = useAuth()

     if (isSignedIn) {
       return <Redirect href={'/'} />
     }

     return <Stack />
   }
   ```
9. ### Sign-up page

   In the `(auth)` group, create a `sign-up.tsx` file with the following code. The [`useSignUp()`](https://clerk.com/docs/expo/reference/hooks/use-sign-up.md) hook is used to create a sign-up flow. The user can sign up using their email and password and will receive an email verification code to confirm their email.

   ```tsx {{ filename: 'app/(auth)/sign-up.tsx', collapsible: true }}
   import { ThemedText } from '@/components/themed-text'
   import { ThemedView } from '@/components/themed-view'
   import { useSignUp } from '@clerk/clerk-expo'
   import { Link, useRouter } from 'expo-router'
   import * as React from 'react'
   import { Pressable, StyleSheet, TextInput, View } from 'react-native'

   export default function Page() {
     const { isLoaded, signUp, setActive } = useSignUp()
     const router = useRouter()

     const [emailAddress, setEmailAddress] = React.useState('')
     const [password, setPassword] = React.useState('')
     const [pendingVerification, setPendingVerification] = React.useState(false)
     const [code, setCode] = React.useState('')

     // Handle submission of sign-up form
     const onSignUpPress = async () => {
       if (!isLoaded) return

       // Start sign-up process using email and password provided
       try {
         await signUp.create({
           emailAddress,
           password,
         })

         // Send user an email with verification code
         await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

         // Set 'pendingVerification' to true to display second form
         // and capture code
         setPendingVerification(true)
       } catch (err) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))
       }
     }

     // Handle submission of verification form
     const onVerifyPress = async () => {
       if (!isLoaded) return

       try {
         // Use the code the user provided to attempt verification
         const signUpAttempt = await signUp.attemptEmailAddressVerification({
           code,
         })

         // If verification was completed, set the session to active
         // and redirect the user
         if (signUpAttempt.status === 'complete') {
           await setActive({
             session: signUpAttempt.createdSessionId,
             navigate: async ({ session }) => {
               if (session?.currentTask) {
                 // Handle pending session tasks
                 // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                 console.log(session?.currentTask)
                 return
               }

               router.replace('/')
             },
           })
         } else {
           // If the status is not complete, check why. User may need to
           // complete further steps.
           console.error(JSON.stringify(signUpAttempt, null, 2))
         }
       } catch (err) {
         // See https://clerk.com/docs/guides/development/custom-flows/error-handling
         // for more info on error handling
         console.error(JSON.stringify(err, null, 2))
       }
     }

     if (pendingVerification) {
       return (
         <ThemedView style={styles.container}>
           <ThemedText type="title" style={styles.title}>
             Verify your email
           </ThemedText>
           <ThemedText style={styles.description}>
             A verification code has been sent to your email.
           </ThemedText>
           <TextInput
             style={styles.input}
             value={code}
             placeholder="Enter your verification code"
             placeholderTextColor="#666666"
             onChangeText={(code) => setCode(code)}
             keyboardType="numeric"
           />
           <Pressable
             style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
             onPress={onVerifyPress}
           >
             <ThemedText style={styles.buttonText}>Verify</ThemedText>
           </Pressable>
         </ThemedView>
       )
     }

     return (
       <ThemedView style={styles.container}>
         <ThemedText type="title" style={styles.title}>
           Sign up
         </ThemedText>
         <ThemedText style={styles.label}>Email address</ThemedText>
         <TextInput
           style={styles.input}
           autoCapitalize="none"
           value={emailAddress}
           placeholder="Enter email"
           placeholderTextColor="#666666"
           onChangeText={(email) => setEmailAddress(email)}
           keyboardType="email-address"
         />
         <ThemedText style={styles.label}>Password</ThemedText>
         <TextInput
           style={styles.input}
           value={password}
           placeholder="Enter password"
           placeholderTextColor="#666666"
           secureTextEntry={true}
           onChangeText={(password) => setPassword(password)}
         />
         <Pressable
           style={({ pressed }) => [
             styles.button,
             (!emailAddress || !password) && styles.buttonDisabled,
             pressed && styles.buttonPressed,
           ]}
           onPress={onSignUpPress}
           disabled={!emailAddress || !password}
         >
           <ThemedText style={styles.buttonText}>Continue</ThemedText>
         </Pressable>
         <View style={styles.linkContainer}>
           <ThemedText>Have an account? </ThemedText>
           <Link href="/sign-in">
             <ThemedText type="link">Sign in</ThemedText>
           </Link>
         </View>
       </ThemedView>
     )
   }

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       padding: 20,
       gap: 12,
     },
     title: {
       marginBottom: 8,
     },
     description: {
       fontSize: 14,
       marginBottom: 16,
       opacity: 0.8,
     },
     label: {
       fontWeight: '600',
       fontSize: 14,
     },
     input: {
       borderWidth: 1,
       borderColor: '#ccc',
       borderRadius: 8,
       padding: 12,
       fontSize: 16,
       backgroundColor: '#fff',
     },
     button: {
       backgroundColor: '#0a7ea4',
       paddingVertical: 12,
       paddingHorizontal: 24,
       borderRadius: 8,
       alignItems: 'center',
       marginTop: 8,
     },
     buttonPressed: {
       opacity: 0.7,
     },
     buttonDisabled: {
       opacity: 0.5,
     },
     buttonText: {
       color: '#fff',
       fontWeight: '600',
     },
     linkContainer: {
       flexDirection: 'row',
       gap: 4,
       marginTop: 12,
       alignItems: 'center',
     },
   })
   ```
10. ### Sign-in page

    In the `(auth)` group, create a `sign-in.tsx` file with the following code. The [`useSignIn()`](https://clerk.com/docs/expo/reference/hooks/use-sign-in.md) hook is used to create a sign-in flow. The user can sign in using email address and password, or navigate to the sign-up page.

    ```tsx {{ filename: 'app/(auth)/sign-in.tsx', collapsible: true }}
    import { ThemedText } from '@/components/themed-text'
    import { ThemedView } from '@/components/themed-view'
    import { useSignIn } from '@clerk/clerk-expo'
    import type { EmailCodeFactor } from '@clerk/types'
    import { Link, useRouter } from 'expo-router'
    import * as React from 'react'
    import { Pressable, StyleSheet, TextInput, View } from 'react-native'

    export default function Page() {
      const { signIn, setActive, isLoaded } = useSignIn()
      const router = useRouter()

      const [emailAddress, setEmailAddress] = React.useState('')
      const [password, setPassword] = React.useState('')
      const [code, setCode] = React.useState('')
      const [showEmailCode, setShowEmailCode] = React.useState(false)

      // Handle the submission of the sign-in form
      const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
          const signInAttempt = await signIn.create({
            identifier: emailAddress,
            password,
          })

          // If sign-in process is complete, set the created session as active
          // and redirect the user
          if (signInAttempt.status === 'complete') {
            await setActive({
              session: signInAttempt.createdSessionId,
              navigate: async ({ session }) => {
                if (session?.currentTask) {
                  // Handle pending session tasks
                  // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                  console.log(session?.currentTask)
                  return
                }

                router.replace('/')
              },
            })
          } else if (signInAttempt.status === 'needs_second_factor') {
            // Check if email_code is a valid second factor
            // This is required when Client Trust is enabled and the user
            // is signing in from a new device.
            // See https://clerk.com/docs/guides/secure/client-trust
            const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
              (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
            )

            if (emailCodeFactor) {
              await signIn.prepareSecondFactor({
                strategy: 'email_code',
                emailAddressId: emailCodeFactor.emailAddressId,
              })
              setShowEmailCode(true)
            }
          } else {
            // If the status is not complete, check why. User may need to
            // complete further steps.
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err) {
          // See https://clerk.com/docs/guides/development/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, signIn, setActive, router, emailAddress, password])

      // Handle the submission of the email verification code
      const onVerifyPress = React.useCallback(async () => {
        if (!isLoaded) return

        try {
          const signInAttempt = await signIn.attemptSecondFactor({
            strategy: 'email_code',
            code,
          })

          if (signInAttempt.status === 'complete') {
            await setActive({
              session: signInAttempt.createdSessionId,
              navigate: async ({ session }) => {
                if (session?.currentTask) {
                  // Handle pending session tasks
                  // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                  console.log(session?.currentTask)
                  return
                }

                router.replace('/')
              },
            })
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, signIn, setActive, router, code])

      // Display email code verification form
      if (showEmailCode) {
        return (
          <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
              Verify your email
            </ThemedText>
            <ThemedText style={styles.description}>
              A verification code has been sent to your email.
            </ThemedText>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor="#666666"
              onChangeText={(code) => setCode(code)}
              keyboardType="numeric"
            />
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={onVerifyPress}
            >
              <ThemedText style={styles.buttonText}>Verify</ThemedText>
            </Pressable>
          </ThemedView>
        )
      }

      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Sign in
          </ThemedText>
          <ThemedText style={styles.label}>Email address</ThemedText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor="#666666"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            keyboardType="email-address"
          />
          <ThemedText style={styles.label}>Password</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              (!emailAddress || !password) && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={onSignInPress}
            disabled={!emailAddress || !password}
          >
            <ThemedText style={styles.buttonText}>Sign in</ThemedText>
          </Pressable>
          <View style={styles.linkContainer}>
            <ThemedText>Don't have an account? </ThemedText>
            <Link href="/sign-up">
              <ThemedText type="link">Sign up</ThemedText>
            </Link>
          </View>
        </ThemedView>
      )
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        gap: 12,
      },
      title: {
        marginBottom: 8,
      },
      description: {
        fontSize: 14,
        marginBottom: 16,
        opacity: 0.8,
      },
      label: {
        fontWeight: '600',
        fontSize: 14,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
      },
      button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
      },
      buttonPressed: {
        opacity: 0.7,
      },
      buttonDisabled: {
        opacity: 0.5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
      },
      linkContainer: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 12,
        alignItems: 'center',
      },
    })
    ```

    For more information about building these custom flows, including guided comments in the code examples, see the [Build a custom email/password authentication flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-password.md) guide.
11. ## Add a sign-out button

    At this point, your users can sign up or in, but they need a way to sign out.

    In the `app/components/` folder, create a `sign-out-button.tsx` file with the following code. The [`useClerk()`](https://clerk.com/docs/expo/reference/hooks/use-clerk.md) hook is used to access the `signOut()` function, which is called when the user clicks the "Sign out" button.

    ```tsx {{ filename: 'app/components/sign-out-button.tsx', collapsible: true }}
    import { ThemedText } from '@/components/themed-text'
    import { useClerk } from '@clerk/clerk-expo'
    import { useRouter } from 'expo-router'
    import { Pressable, StyleSheet } from 'react-native'

    export const SignOutButton = () => {
      // Use `useClerk()` to access the `signOut()` function
      const { signOut } = useClerk()
      const router = useRouter()

      const handleSignOut = async () => {
        try {
          await signOut()
          // Redirect to your desired page
          router.replace('/')
        } catch (err) {
          // See https://clerk.com/docs/guides/development/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }

      return (
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleSignOut}
        >
          <ThemedText style={styles.buttonText}>Sign out</ThemedText>
        </Pressable>
      )
    }

    const styles = StyleSheet.create({
      button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
      },
      buttonPressed: {
        opacity: 0.7,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
      },
    })
    ```
12. ## Add a home screen

    You can control which content signed-in and signed-out users can see with Clerk's [`prebuilt control components`](https://clerk.com/docs/expo/reference/components/overview.md#control-components). For this quickstart, you'll use:

    - [`<SignedIn>`](https://clerk.com/docs/expo/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
    - [`<SignedOut>`](https://clerk.com/docs/expo/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.

    To get started:

    1. Create a `(home)` route group.
    2. In the `(home)` group, create a `_layout.tsx` file with the following code.

    ```tsx {{ filename: 'app/(home)/_layout.tsx' }}
    import { Stack } from 'expo-router/stack'

    export default function Layout() {
      return <Stack />
    }
    ```

    Then, in the same folder, create an `index.tsx` file with the following code. If the user is signed in, it displays their email and the sign-out button you created in the previous step. If they're not signed in, it displays sign-in and sign-up links.

    ```tsx {{ filename: 'app/(home)/index.tsx' }}
    import { SignOutButton } from '@/components/sign-out-button'
    import { ThemedText } from '@/components/themed-text'
    import { ThemedView } from '@/components/themed-view'
    import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
    import { Link } from 'expo-router'
    import { StyleSheet } from 'react-native'

    export default function Page() {
      const { user } = useUser()

      // If your user isn't appearing as signed in,
      // it's possible they have session tasks to complete.
      // Learn more: https://clerk.com/docs/guides/configure/session-tasks
      const { session } = useSession()
      console.log(session?.currentTask)

      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title">Welcome!</ThemedText>
          {/* Show the sign-in and sign-up buttons when the user is signed out */}
          <SignedOut>
            <Link href="/(auth)/sign-in">
              <ThemedText>Sign in</ThemedText>
            </Link>
            <Link href="/(auth)/sign-up">
              <ThemedText>Sign up</ThemedText>
            </Link>
          </SignedOut>
          {/* Show the sign-out button when the user is signed in */}
          <SignedIn>
            <ThemedText>Hello {user?.emailAddresses[0].emailAddress}</ThemedText>
            <SignOutButton />
          </SignedIn>
        </ThemedView>
      )
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        gap: 16,
      },
    })
    ```
13. ## Add the new routes to your stack

    In `app/_layout.tsx`, add the `(auth)` and `(home)` routes to the `<Stack />` so that they're accessible.

    ```tsx {{ filename: 'app/_layout.tsx' }}
      import { useColorScheme } from '@/hooks/use-color-scheme'
      import { ClerkProvider } from '@clerk/clerk-expo'
      import { tokenCache } from '@clerk/clerk-expo/token-cache'
      import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
      import { Stack } from 'expo-router'
      import { StatusBar } from 'expo-status-bar'
      import 'react-native-reanimated'

      export const unstable_settings = {
        anchor: '(tabs)',
      }

      export default function RootLayout() {
        const colorScheme = useColorScheme()

        return (
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ClerkProvider tokenCache={tokenCache}>
              <Stack>
    +           <Stack.Screen name="(home)" options={{ headerShown: false }} />
    +           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
              <StatusBar style="auto" />
            </ClerkProvider>
          </ThemeProvider>
        )
      }
    ```
14. ## Run your project

    Run your project with the following command:

    ```npm
    npm start
    ```
15. ## Create your first user

    1. Visit your app's homepage at [http://localhost:8081](http://localhost:8081).
    2. Select "Sign up" on the page and authenticate to create your first user.

## Enable OTA updates

Though not required, it is recommended to implement over-the-air (OTA) updates in your Expo app. This enables you to easily roll out Clerk's feature updates and security patches as they're released without having to resubmit your app to mobile marketplaces.

See the [`expo-updates`](https://docs.expo.dev/versions/latest/sdk/updates) library to learn how to get started.

## Next steps

Learn how to build custom flows for your native apps using the following guides.

- [Create a custom sign-up and sign-in flow](https://clerk.com/docs/guides/development/custom-flows/authentication/email-password.md): Learn how to build a custom sign-up and sign-in authentication flow.
- [Protect content and read user data](https://clerk.com/docs/expo/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your Expo app.
- [Custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md): Expo native apps require custom flows in place of prebuilt components.
- [Deploy an Expo app to production](https://clerk.com/docs/guides/development/deployment/expo.md): Learn how to deploy your Expo app to production.
- [Clerk Expo SDK Reference](https://clerk.com/docs/reference/expo/overview.md): Learn about the Clerk Expo SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
