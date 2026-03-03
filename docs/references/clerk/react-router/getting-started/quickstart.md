# React Router Quickstart

**Example Repository**

- [React Router Quickstart Repo](https://github.com/clerk/clerk-react-router-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

React Router can be used in different modes: **declarative**, **data**, or **framework**. This tutorial explains how to use React Router in **framework** mode. To use React Router in **declarative** mode instead, see the [dedicated guide](https://clerk.com/docs/guides/development/declarative-mode.md).

This tutorial assumes that you're using React Router **v7.1.2 or later** in framework mode.

1. ## Create a new React app using React Router

   If you don't already have a React app using React Router, run the following commands to [create a new one](https://reactrouter.com/start/framework/installation).

   ```npm
   npm create react-router@latest clerk-react-router
   cd clerk-react-router
   npm install
   ```
2. ## Install `@clerk/react-router`

   The [`Clerk React Router SDK`](https://clerk.com/docs/reference/react-router/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/react-router
   ```
3. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   VITE_CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```
4. ## Add `clerkMiddleware()` and `rootAuthLoader()` to your app

   [`clerkMiddleware()`](https://clerk.com/docs/reference/react-router/clerk-middleware.md) grants you access to user authentication state throughout your app. It also allows you to protect specific routes from unauthenticated users. To add `clerkMiddleware()` to your app, follow these steps:

   1. Since React Router middleware requires opting in via a future flag, add the following to your `react-router.config.ts` file:

   ```ts {{ filename: 'react-router.config.ts' }}
     import type { Config } from '@react-router/dev/config'

     export default {
       // ...
   +   future: {
   +     v8_middleware: true,
   +   },
     } satisfies Config
   ```

   2. Add the following code to your `root.tsx` file to configure the `clerkMiddleware()` and [`rootAuthLoader()`](https://clerk.com/docs/reference/react-router/root-auth-loader.md) functions.

   ```tsx {{ filename: 'app/root.tsx', mark: [4, [6, 8]], fold: [[1, 3], [10, 71]], collapsible: true }}
   import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
   import type { Route } from './+types/root'
   import stylesheet from './app.css?url'
   import { clerkMiddleware, rootAuthLoader } from '@clerk/react-router/server'

   export const middleware: Route.MiddlewareFunction[] = [clerkMiddleware()]

   export const loader = (args: Route.LoaderArgs) => rootAuthLoader(args)

   export const links: Route.LinksFunction = () => [
     { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
     {
       rel: 'preconnect',
       href: 'https://fonts.gstatic.com',
       crossOrigin: 'anonymous',
     },
     {
       rel: 'stylesheet',
       href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
     },
     { rel: 'stylesheet', href: stylesheet },
   ]

   export function Layout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <meta charSet="utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1" />
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

   export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
     let message = 'Oops!'
     let details = 'An unexpected error occurred.'
     let stack: string | undefined

     if (isRouteErrorResponse(error)) {
       message = error.status === 404 ? '404' : 'Error'
       details =
         error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
     } else if (import.meta.env.DEV && error && error instanceof Error) {
       details = error.message
       stack = error.stack
     }

     return (
       <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
           <pre className="w-full p-4 overflow-x-auto">
             `{stack}`
           </pre>
         )}
       </main>
     )
   }
   ```

   3. By default, `clerkMiddleware()` will not protect any routes. All routes are public and you must opt-in to protection for routes. See the [`clerkMiddleware() reference`](https://clerk.com/docs/reference/react-router/clerk-middleware.md) to learn how to require authentication for specific routes.
5. ## Add `<ClerkProvider>` to your app

   The [`<ClerkProvider>`](https://clerk.com/docs/react-router/reference/components/clerk-provider.md) component provides session and user context to Clerk's hooks and components. It's recommended to wrap your entire app at the entry point with `<ClerkProvider>` to make authentication globally accessible. See the [`reference docs`](https://clerk.com/docs/react-router/reference/components/clerk-provider.md) for other configuration options.

   Pass `loaderData` to the `<ClerkProvider>` component, as shown in the following example. This data is provided by the `rootAuthLoader()` function.

   ```tsx {{ filename: 'app/root.tsx', mark: [1, 44, 48, 50], fold: [[2, 42], [54, 87]] }}
   import { ClerkProvider } from '@clerk/react-router'
   import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
   import { clerkMiddleware, rootAuthLoader } from '@clerk/react-router/server'

   import type { Route } from './+types/root'
   import stylesheet from './app.css?url'

   export const middleware: Route.MiddlewareFunction[] = [clerkMiddleware()]

   export const loader = (args: Route.LoaderArgs) => rootAuthLoader(args)

   export const links: Route.LinksFunction = () => [
     { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
     {
       rel: 'preconnect',
       href: 'https://fonts.gstatic.com',
       crossOrigin: 'anonymous',
     },
     {
       rel: 'stylesheet',
       href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
     },
     { rel: 'stylesheet', href: stylesheet },
   ]

   export function Layout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <meta charSet="utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1" />
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

   // Pull in the `loaderData` from the `rootAuthLoader()` function
   export default function App({ loaderData }: Route.ComponentProps) {
     return (
       // Pass the `loaderData` to the `<ClerkProvider>` component
       <ClerkProvider loaderData={loaderData}>
         <Outlet />
       </ClerkProvider>
     )
   }

   export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
     let message = 'Oops!'
     let details = 'An unexpected error occurred.'
     let stack: string | undefined

     if (isRouteErrorResponse(error)) {
       message = error.status === 404 ? '404' : 'Error'
       details =
         error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
     } else if (import.meta.env.DEV && error && error instanceof Error) {
       details = error.message
       stack = error.stack
     }

     return (
       <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
           <pre className="w-full p-4 overflow-x-auto">
             `{stack}`
           </pre>
         )}
       </main>
     )
   }
   ```
6. ## Create a header with Clerk components

   You can control which content signed-in and signed-out users can see with the [`prebuilt control components`](https://clerk.com/docs/react-router/reference/components/overview.md#control-components). The following example creates a header using the following components:

   - [`<SignedIn>`](https://clerk.com/docs/react-router/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/react-router/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/react-router/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/react-router/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/react-router/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```tsx {{ filename: 'app/root.tsx', mark: [[3, 7], [56, 66]], fold: [[9, 49], [72, 97]] }}
   import {
     ClerkProvider,
     SignedIn,
     SignedOut,
     UserButton,
     SignInButton,
     SignUpButton,
   } from '@clerk/react-router'
   import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
   import { clerkMiddleware, rootAuthLoader } from '@clerk/react-router/server'

   import type { Route } from './+types/root'
   import stylesheet from './app.css?url'

   export const middleware: Route.MiddlewareFunction[] = [clerkMiddleware()]

   export const loader = (args: Route.LoaderArgs) => rootAuthLoader(args)

   export const links: Route.LinksFunction = () => [
     { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
     {
       rel: 'preconnect',
       href: 'https://fonts.gstatic.com',
       crossOrigin: 'anonymous',
     },
     {
       rel: 'stylesheet',
       href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
     },
     { rel: 'stylesheet', href: stylesheet },
   ]

   export function Layout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <meta charSet="utf-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1" />
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

   // Pull in the `loaderData` from the `rootAuthLoader()` function
   export default function App({ loaderData }: Route.ComponentProps) {
     return (
       // Pass the `loaderData` to the `<ClerkProvider>` component
       <ClerkProvider loaderData={loaderData}>
         <header className="flex items-center justify-center py-8 px-4">
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
         <Outlet />
       </ClerkProvider>
     )
   }

   export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
     let message = 'Oops!'
     let details = 'An unexpected error occurred.'
     let stack: string | undefined

     if (isRouteErrorResponse(error)) {
       message = error.status === 404 ? '404' : 'Error'
       details =
         error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
     } else if (import.meta.env.DEV && error && error instanceof Error) {
       details = error.message
       stack = error.stack
     }

     return (
       <main className="pt-16 p-4 container mx-auto">
         <h1>{message}</h1>
         <p>{details}</p>
         {stack && (
           <pre className="w-full p-4 overflow-x-auto">
             `{stack}`
           </pre>
         )}
       </main>
     )
   }
   ```
7. ## Run your project

   Run your project with the following command:

   ```npm
   npm run dev
   ```
8. ## Create your first user

   1. Visit your app's homepage at [http://localhost:5173](http://localhost:5173).
   2. Select "Sign up" on the page and authenticate to create your first user.

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Create a custom sign-in-or-up page](https://clerk.com/docs/react-router/guides/development/custom-sign-in-or-up-page.md): Learn how to create a custom sign-in-or-up page with Clerk components.
- [Protect content and read user data](https://clerk.com/docs/react-router/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your React Router app.
- [Declarative mode](https://clerk.com/docs/guides/development/declarative-mode.md): Learn how to use Clerk with React Router in declarative mode to add authentication to your app.
- [Get started with Organizations](https://clerk.com/docs/react-router/guides/organizations/getting-started.md): Learn how to create and manage Organizations in your React Router app.
- [Clerk React Router SDK Reference](https://clerk.com/docs/reference/react-router/overview.md): Learn about the Clerk React Router SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
