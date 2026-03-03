# Vue Quickstart

**Example Repository**

- [Vue Quickstart Repo](https://github.com/clerk/clerk-vue-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

This tutorial assumes that you're using [Vue 3](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/).

1. ## Create a new Vue app

   If you don't already have a Vue app, run the following commands to [create a new one using Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project):

   ```npm
   npm create vite@latest clerk-vue -- --template vue-ts
   cd clerk-vue
   npm install
   ```
2. ## Install `@clerk/vue`

   The [`Clerk Vue SDK`](https://clerk.com/docs/reference/vue/overview.md) gives you access to prebuilt components, composables, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/vue
   ```
3. ## Set your Clerk API keys

   Add your Clerk Publishable Key to your `.env` file.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key.
   3. Paste your key into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   VITE_CLERK_PUBLISHABLE_KEY={{pub_key}}
   ```
4. ## Add `clerkPlugin` to your app

   [`clerkPlugin`](https://clerk.com/docs/reference/vue/clerk-plugin.md) provides session and user context to Clerk's components and composables. It's required to pass your Clerk Publishable Key as an option. You can add an `if` statement to check that the key is imported properly. This prevents the app from running without the Publishable Key and catches TypeScript errors.

   The `clerkPlugin` accepts optional options, such as `{ signInForceRedirectUrl: '/dashboard' }`.

   ```ts {{ filename: 'src/main.ts', mark: [4, [12, 14]] }}
   import { createApp } from 'vue'
   import './style.css'
   import App from './App.vue'
   import { clerkPlugin } from '@clerk/vue'

   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Add your Clerk Publishable Key to the .env file')
   }

   const app = createApp(App)
   app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
   app.mount('#app')
   ```
5. ## Create a header with Clerk components

   You can control which content signed-in and signed-out users can see with Clerk's [`prebuilt control components`](https://clerk.com/docs/vue/reference/components/overview.md#control-components). The following example creates a header using the following components:

   - [`<SignedIn>`](https://clerk.com/docs/vue/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/vue/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/vue/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/vue/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/vue/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```vue {{ filename: 'src/App.vue', mark: [2, [6, 16]] }}
   <script setup lang="ts">
   import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/vue'
   </script>

   <template>
     <header>
       <!-- Show the sign-in and sign-up buttons when the user is signed out -->
       <SignedOut>
         <SignInButton />
         <SignUpButton />
       </SignedOut>
       <!-- Show the user button when the user is signed in -->
       <SignedIn>
         <UserButton />
       </SignedIn>
     </header>
   </template>
   ```
6. ## Run your project

   Run your project with the following command:

   ```npm
   npm run dev
   ```
7. ## Create your first user

   1. Visit your app's homepage at [http://localhost:5173](http://localhost:5173).
   2. Select "Sign up" on the page and authenticate to create your first user.

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Client-side helpers (composables)](https://clerk.com/docs/reference/vue/overview.md#custom-composables): Learn more about Clerk's client-side helpers and how to use them.
- [Update Clerk options at runtime](https://clerk.com/docs/reference/vue/update-clerk-options.md): Learn how to update Clerk's options at runtime in your Vue app.
- [Clerk Vue SDK Reference](https://clerk.com/docs/reference/vue/overview.md): Learn about the Clerk Vue SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
