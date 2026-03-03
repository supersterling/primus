# Astro Quickstart

**Example Repository**

- [Astro Quickstart Repo](https://github.com/clerk/clerk-astro-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

1. ## Create a new Astro app

   If you don't already have an Astro app, run the following commands to [create a new one](https://docs.astro.build/en/install-and-setup/).

   ```npm
   npm create astro@latest clerk-astro
   cd clerk-astro
   npm install
   ```
2. ## Install `@clerk/astro`

   The [`Clerk Astro SDK`](https://clerk.com/docs/reference/astro/overview.md) gives you access to a set of components, hooks, and stores to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/astro
   ```
3. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```
4. ## Update `astro.config.mjs`

   To configure Clerk in your Astro app, you will need to update your `astro.config.mjs`.

   - Add the `clerk()` integration to the `integrations` list. For a list of available options, see the [`integration reference`](https://clerk.com/docs/reference/astro/integration.md).
   - Install an [SSR adapter](https://docs.astro.build/en/guides/server-side-rendering/#official-adapters). This quickstart uses the [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) adapter.
   - Set `output` to `server`. This is required when deploying to a host supporting SSR.

   ```ts {{ filename: 'astro.config.mjs', mark: [2, 3, [6, 8]] }}
   import { defineConfig } from 'astro/config'
   import node from '@astrojs/node'
   import clerk from '@clerk/astro'

   export default defineConfig({
     integrations: [clerk()],
     adapter: node({ mode: 'standalone' }),
     output: 'server',
   })
   ```
5. ## Add `clerkMiddleware()` to your app

   [`clerkMiddleware()`](https://clerk.com/docs/reference/astro/clerk-middleware.md) grants you access to user authentication state throughout your app. It also allows you to protect specific routes from unauthenticated users. To add `clerkMiddleware()` to your app, follow these steps:

   1. Create a `middleware.ts` file.
      - If you're using the `/src` directory, create `middleware.ts` in the `/src` directory.
      - If you're not using the `/src` directory, create `middleware.ts` in the root directory alongside `.env`.
   2. In your `middleware.ts` file, export an `onRequest` constant and assign the result of the `clerkMiddleware()` function to it.
      ```tsx {{ filename: 'src/middleware.ts' }}
      import { clerkMiddleware } from '@clerk/astro/server'

      export const onRequest = clerkMiddleware()
      ```
   3. By default, `clerkMiddleware()` will not protect any routes. All routes are public and you must opt-in to protection for routes. See the [`clerkMiddleware() reference`](https://clerk.com/docs/reference/astro/clerk-middleware.md) to learn how to require authentication for specific routes.
6. ## Create a header with Clerk components

   You can control which content signed-in and signed-out users can see with Clerk's [`prebuilt control components`](https://clerk.com/docs/astro/reference/components/overview.md#control-components). The following example creates a header using the following components:

   - [`<SignedIn>`](https://clerk.com/docs/astro/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/astro/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/astro/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/astro/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/astro/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```astro {{ filename: 'src/layouts/Layout.astro', mark: [[2, 8], [21, 31]], fold: [[36, 43]] }}
   ---
   import {
     SignedIn,
     SignedOut,
     UserButton,
     SignInButton,
     SignUpButton,
   } from '@clerk/astro/components'
   ---

   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width" />
       <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
       <meta name="generator" content={Astro.generator} />
       <title>Astro Basics</title>
     </head>
     <body>
       <header>
         {/* Show the sign-in and sign-up buttons when the user is signed out */}
         <SignedOut>
           <SignInButton mode="modal" />
           <SignUpButton mode="modal" />
         </SignedOut>
         {/* Show the user button when the user is signed in */}
         <SignedIn>
           <UserButton />
         </SignedIn>
       </header>
       <slot />
     </body>
   </html>

   <style>
     html,
     body {
       margin: 0;
       width: 100%;
       height: 100%;
     }
   </style>
   ```

   Then, use the layout on your homepage:

   ```astro {{ filename: 'src/pages/index.astro', mark: [2, 6, 13] }}
   ---
   import Layout from '../layouts/Layout.astro'
   import { SignedIn, SignedOut } from '@clerk/astro/components'
   ---

   <Layout title="Clerk + Astro">
     <SignedOut>
       <p>Sign in to try Clerk out!</p>
     </SignedOut>
     <SignedIn>
       <p>You are signed in!</p>
     </SignedIn>
   </Layout>
   ```
7. ## Run your project

   Run your project with the following command:

   ```npm
   npm run dev
   ```
8. ## Create your first user

   1. Visit your app's homepage at [http://localhost:4321](http://localhost:4321).
   2. Select "Sign up" on the page and authenticate to create your first user.

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's stores to access user data using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Protect routes using clerkMiddleware()](https://clerk.com/docs/reference/astro/clerk-middleware.md): Learn how to protect specific routes from unauthenticated users.
- [Protect content and read user data](https://clerk.com/docs/astro/guides/users/reading.md): Learn how to use Clerk's stores and helpers to protect content and read user data in your Astro app.
- [Use Clerk with Astro and React](https://clerk.com/docs/reference/astro/react.md): Learn how to set up your Astro app to be integrated with React.
- [Get started with Organizations](https://clerk.com/docs/astro/guides/organizations/getting-started.md): Learn how to create and manage Organizations in your Astro app.
- [Clerk Astro SDK Reference](https://clerk.com/docs/reference/astro/overview.md): Learn about the Clerk Astro SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
