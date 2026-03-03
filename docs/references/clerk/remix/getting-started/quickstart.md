# Remix Quickstart

> The Remix SDK is in maintenance mode and will only receive security updates. Please migrate to the [`React Router SDK`](https://clerk.com/docs/react-router/getting-started/quickstart.md) for continued development and new features.

**Example Repository**

- [Remix Quickstart Repo](https://github.com/clerk/clerk-remix-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

Learn how to use Clerk to quickly and easily add secure authentication and user management to your Remix app. This guide assumes that you are using Remix v2 or later.

> If you are using Remix SPA mode, follow the [Remix SPA mode guide](https://clerk.com/docs/guides/development/spa-mode.md).

1. ## Create a new Remix app

   If you don't already have a Remix app, run the following commands to [create a new one](https://v2.remix.run/docs/start/quickstart).

   ```npm
   npx create-remix@latest clerk-remix
   cd clerk-remix
   npm install
   ```
2. ## Install `@clerk/remix`

   The [`Clerk Remix SDK`](https://clerk.com/docs/reference/remix/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/remix
   ```
3. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```
4. ## Configure `rootAuthLoader()`

   The [`rootAuthLoader()`](https://clerk.com/docs/reference/remix/root-auth-loader.md) function is a helper function that provides the authentication state to your Remix application. You must export `rootAuthLoader()` as the root `loader()` function.

   Update your `root.tsx` file with the following code:

   ```tsx {{ filename: 'app/root.tsx', mark: [1, [4, 5], [15, 16]] }}
   import type { MetaFunction, LoaderFunction } from '@remix-run/node'
   import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

   // Import `rootAuthLoader()`
   import { rootAuthLoader } from '@clerk/remix/ssr.server'

   export const meta: MetaFunction = () => [
     {
       charset: 'utf-8',
       title: 'New Remix App',
       viewport: 'width=device-width,initial-scale=1',
     },
   ]

   // Export `rootAuthLoader()` as the root route `loader`
   export const loader: LoaderFunction = (args) => rootAuthLoader(args)

   export function Layout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <Meta />
           <Links />
         </head>
         <body>
           {children}
           <ScrollRestoration />
           <Scripts />
         </body>
       </html>
     )
   }

   export default function App() {
     return <Outlet />
   }
   ```
5. ## Configure `ClerkApp`

   Clerk provides a [`ClerkApp`](https://clerk.com/docs/reference/remix/clerk-app.md) wrapper to provide the authentication state to your React tree. This helper works with Remix SSR out-of-the-box and follows the "higher-order component" paradigm.

   Update your `root.tsx` file with the following code:

   ```tsx {{ filename: 'app/root.tsx', mark: [[6, 7], [39, 40]] }}
   import type { MetaFunction, LoaderFunction } from '@remix-run/node'

   import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

   import { rootAuthLoader } from '@clerk/remix/ssr.server'
   // Import ClerkApp
   import { ClerkApp } from '@clerk/remix'

   export const meta: MetaFunction = () => [
     {
       charset: 'utf-8',
       title: 'New Remix App',
       viewport: 'width=device-width,initial-scale=1',
     },
   ]

   export const loader: LoaderFunction = (args) => rootAuthLoader(args)

   export function Layout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <Meta />
           <Links />
         </head>
         <body>
           {children}
           <ScrollRestoration />
           <Scripts />
         </body>
       </html>
     )
   }

   function App() {
     return <Outlet />
   }

   // Wrap your app with `ClerkApp`
   export default ClerkApp(App)
   ```
6. ## Protect your pages
7. ### Client-side

   To protect your pages on the client-side, you can use Clerk's [`prebuilt control components`](https://clerk.com/docs/remix/reference/components/overview.md#control-components) that control the visibility of content based on the user's authentication state.

   The following example uses the following components:

   - [`<SignedIn>`](https://clerk.com/docs/remix/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/remix/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/remix/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/remix/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/remix/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```tsx {{ filename: 'routes/_index.tsx', mark: [[1, 7], [13, 23]] }}
   import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/remix'

   export default function Index() {
     return (
       <div>
         <h1>Index Route</h1>
         <header>
           {/* Show the sign-in and sign-up buttons when the user is signed out */}
           <SignedOut>
             <SignInButton />
             <SignUpButton />
           </SignedOut>
           {/* Show the user button when the user is signed in */}
           <SignedIn>
             <UserButton />
           </SignedIn>
         </header>
       </div>
     )
   }
   ```
8. ### Server-side

   To protect your routes, use the [`getAuth()`](https://clerk.com/docs/reference/nextjs/pages-router/get-auth.md) function in your loader. This function retrieves the authentication state from the request object, returning an [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object that includes the `isAuthenticated`, allowing you to determine if the user is authenticated.

   ```tsx {{ filename: 'routes/_index.tsx' }}
   import { UserButton } from '@clerk/remix'
   import { getAuth } from '@clerk/remix/ssr.server'
   import { LoaderFunction, redirect } from '@remix-run/node'

   export const loader: LoaderFunction = async (args) => {
     const { isAuthenticated } = await getAuth(args)
     if (!isAuthenticated) {
       return redirect('/sign-in')
     }
     return {}
   }

   export default function Index() {
     return (
       <div>
         <h1>Index route</h1>
         <p>You are signed in!</p>
         <UserButton />
       </div>
     )
   }
   ```
9. ## Run your project

   Run your project with the following command:

   ```npm
   npm run dev
   ```
10. ## Create your first user

    1. Visit your app's homepage at [http://localhost:5173](http://localhost:5173).
    2. Select "Sign up" on the page and authenticate to create your first user.

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Create a custom sign-in-or-up page](https://clerk.com/docs/remix/guides/development/custom-sign-in-or-up-page.md): Learn how to create a custom sign-in-or-up page with Clerk components.
- [Protect content and read user data](https://clerk.com/docs/remix/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your Remix app.
- [Remix SPA Mode](https://clerk.com/docs/guides/development/spa-mode.md): Learn how to use Clerk with Remix in SPA mode.
- [Clerk Remix SDK Reference](https://clerk.com/docs/reference/remix/overview.md): Learn about the Clerk Remix SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
