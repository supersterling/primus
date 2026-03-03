# Remix SPA Mode

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

> The Remix SDK is in maintenance mode and will only receive security updates. Please migrate to the [`React Router SDK`](https://clerk.com/docs/react-router/getting-started/quickstart.md) for continued development and new features.

This guide explains how to use Clerk with [Remix in SPA mode](https://remix.run/docs/en/main/guides/spa-mode). To use Clerk with Remix in SSR mode, follow the [`Remix quickstart`](https://clerk.com/docs/remix/getting-started/quickstart.md).

1. ## Install `@clerk/remix`

   The [`Clerk Remix SDK`](https://clerk.com/docs/reference/remix/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/remix
   ```
2. ## Set your environment variables

   Add your Clerk Publishable Key to your `.env` file.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key.
   3. Paste your key into your `.env` file.

   The final result should resemble the following:

   > You will not need the Clerk Secret Key in Remix SPA mode, as it should never be used on the client-side.

   ```env {{ filename: '.env' }}
   VITE_CLERK_PUBLISHABLE_KEY={{pub_key}}
   ```
3. ## Configure `ClerkApp`

   Clerk provides a `ClerkApp` wrapper to provide the authentication state to your React tree. You must pass your Publishable Key to `ClerkApp`.

   ```tsx {{ filename: 'app/root.tsx', mark: [1, [22, 23], [25, 28]] }}
   import { ClerkApp } from '@clerk/remix'
   import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

   function App() {
     return (
       <html lang="en">
         <head>
           <meta charSet="utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1" />
           <Meta />
           <Links />
         </head>
         <body>
           <Outlet />
           <ScrollRestoration />
           <Scripts />
         </body>
       </html>
     )
   }

   // Import your Publishable Key
   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   // Wrap your app with `ClerkApp`
   export default ClerkApp(App, {
     publishableKey: PUBLISHABLE_KEY,
   })
   ```
4. ## Update your paths through `ClerkApp` options

   Next, add paths to your `ClerkApp` [`options`](https://clerk.com/docs/reference/remix/clerk-app.md#clerk-app-options) to control the behavior of the components when you sign in or sign up.

   ```ts {{ filename: 'app/root.tsx', mark: [[3, 4]] }}
   export default ClerkApp(App, {
     publishableKey: PUBLISHABLE_KEY,
     signInFallbackRedirectUrl: '/',
     signUpFallbackRedirectUrl: '/',
   })
   ```
5. ## Protect your pages

   To protect your pages on the client-side, Clerk's [`prebuilt control components`](https://clerk.com/docs/nextjs/reference/components/overview.md#control-components) control the visibility of content based on the user's authentication state.

   The following example uses the following components:

   - [`<SignedIn>`](https://clerk.com/docs/nextjs/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/nextjs/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/nextjs/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/nextjs/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).

   ```tsx {{ filename: 'routes/_index.tsx' }}
   import {
     SignInButton,
     SignOutButton,
     SignUpButton,
     SignedIn,
     SignedOut,
     UserButton,
   } from '@clerk/remix'

   export default function Index() {
     return (
       <div>
         <h1>Index Route</h1>
         <SignedIn>
           <p>You are signed in!</p>

           <UserButton />
         </SignedIn>
         <SignedOut>
           <p>You are signed out</p>

           <SignInButton />
         </SignedOut>
       </div>
     )
   }
   ```

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Client-side helpers](https://clerk.com/docs/remix/guides/users/reading.md#client-side): Learn more about Clerk's client-side helpers and how to use them.
- [Clerk Remix SDK Reference](https://clerk.com/docs/reference/remix/overview.md): Learn about the Clerk Remix SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
