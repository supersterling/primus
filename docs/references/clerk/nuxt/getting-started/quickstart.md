# Nuxt Quickstart

**Example Repository**

- [Nuxt Quickstart Repo](https://github.com/clerk/clerk-nuxt-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

1. ## Create a new Nuxt app

   If you don't already have a Nuxt app, run the following commands to [create a new one](https://nuxt.com/docs/4.x/getting-started/installation).

   ```npm
   npm create nuxt@latest clerk-nuxt
   cd clerk-nuxt
   npm install
   ```
2. ## Install `@clerk/nuxt`

   The [`Clerk Nuxt SDK`](https://clerk.com/docs/reference/nuxt/overview.md) gives you access to prebuilt components, Vue composables, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/nuxt
   ```
3. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
   NUXT_CLERK_SECRET_KEY={{secret}}
   ```
4. ## Configure `nuxt.config.ts`

   To enable Clerk in your Nuxt app, add `@clerk/nuxt` to your modules array in `nuxt.config.ts`. This automatically configures Clerk's middleware and plugins and imports Clerk's components.

   ```ts {{ filename: 'nuxt.config.ts', mark: [2] }}
   export default defineNuxtConfig({
     modules: ['@clerk/nuxt'],
   })
   ```
5. ## Create a header with Clerk components

   Nuxt 3 automatically imports and makes all components in the `components/` directory globally available without requiring explicit imports. See the [Nuxt docs](https://nuxt.com/docs/guide/concepts/auto-imports) for details.

   You can control which content signed-in and signed-out users can see with Clerk's [`prebuilt control components`](https://clerk.com/docs/nuxt/reference/components/overview.md#control-components).

   The following example creates a header using the following components:

   - [`<SignedIn>`](https://clerk.com/docs/nuxt/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/nuxt/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/nuxt/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/nuxt/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/nuxt/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```vue {{ filename: 'app/app.vue', mark: [2, [6, 16]] }}
   <script setup lang="ts">
   // Components are automatically imported
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

     <main>
       <NuxtPage />
     </main>
   </template>
   ```
6. ## Run your project

   Run your project with the following command:

   ```npm
   npm run dev
   ```
7. ## Create your first user

   1. Visit your app's homepage at [http://localhost:3000](http://localhost:3000).
   2. Select "Sign up" on the page and authenticate to create your first user.

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Protect routes using clerkMiddleware()](https://clerk.com/docs/reference/nuxt/clerk-middleware.md): Learn how to protect specific routes from unauthenticated users.
- [Protect content and read user data](https://clerk.com/docs/nuxt/guides/users/reading.md): Learn how to use Clerk's composables and helpers to protect content and read user data in your Nuxt app.
- [Client-side helpers (composables)](https://clerk.com/docs/reference/nuxt/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.
- [Get started with Organizations](https://clerk.com/docs/nuxt/guides/organizations/getting-started.md): Learn how to create and manage Organizations in your Nuxt app.
- [Clerk Nuxt SDK Reference](https://clerk.com/docs/reference/nuxt/overview.md): Learn about the Clerk Nuxt SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
