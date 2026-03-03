# Set up a waitlist in your Next.js app

In [**Waitlist** mode](https://clerk.com/docs/guides/secure/restricting-access.md#waitlist), users can register their interest in your app by joining a waitlist. This mode is ideal for apps in early development stages or those wanting to generate interest before launch. This guide shows you how to get Clerk integrated and how to add a waitlist to your Next.js application.

1. ## Install `@clerk/nextjs`

   The [`Clerk Next.js SDK`](https://clerk.com/docs/reference/nextjs/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```npm
   npm install @clerk/nextjs
   ```
2. ## Set your Clerk API keys

   Add the following keys to your `.env` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys){{ track: 'exp_create_account_nextjs_quickstart' }} page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key and Secret Key.
   3. Paste your keys into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_SECRET_KEY={{secret}}
   ```
3. ## Enable Waitlist mode

   To enable **Waitlist** mode, follow these steps:

   1. In the Clerk Dashboard, navigate to the [**Waitlist**](https://dashboard.clerk.com/~/user-authentication/waitlist) page.
   2. Toggle on **Enable waitlist** and select **Save**.

   To manage users on your waitlist:

   1. In the Clerk Dashboard, navigate to the [**Waitlist**](https://dashboard.clerk.com/~/waitlist) page.
   2. On the right-side of a user's row, select the menu icon (...).
   3. Select **Invite** to invite the user to your application. Select **Deny** to deny the user access to your application.
4. ## Add the `<Waitlist />` component

   The [`<Waitlist />`](https://clerk.com/docs/nextjs/reference/components/authentication/waitlist.md) component renders a form that allows users to join for early access to your app.

   The following example includes a basic implementation of the `<Waitlist />` component hosted on the `/` route (the home page). You can use this as a starting point for your own implementation.

   ```jsx {{ filename: 'app/page.tsx' }}
   import { Waitlist } from '@clerk/nextjs'

   export default function Page() {
     return <Waitlist />
   }
   ```
5. ## Add `<ClerkProvider>` to your app

   The [`<ClerkProvider>`](https://clerk.com/docs/nextjs/reference/components/clerk-provider.md) component provides session and user context to Clerk's hooks and components. It's recommended to wrap your entire app at the entry point with `<ClerkProvider>` to make authentication globally accessible. See the [`reference docs`](https://clerk.com/docs/nextjs/reference/components/clerk-provider.md) for other configuration options.

   To use the `<Waitlist />` component in your app, you must provide the `waitlistUrl` prop, which points to the URL of your waitlist page.

   ```tsx {{ filename: 'app/layout.tsx', mark: [6] }}
   import { ClerkProvider } from '@clerk/nextjs'
   import './globals.css'

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <ClerkProvider waitlistUrl="/">
         <html lang="en">
           <body>{children}</body>
         </html>
       </ClerkProvider>
     )
   }
   ```
6. ## Add sign-in functionality

   To allow users to sign in once they've been approved from the waitlist, you must:

   - [Add `clerkMiddleware()` to your app.](#add-clerk-middleware-to-your-app)
   - [Add a sign-in page.](#add-a-sign-in-page)
7. ### Add `clerkMiddleware()` to your app

   > If you're using Next.js ≤15, name your file `middleware.ts` instead of `proxy.ts`. The code itself remains the same; only the filename changes.

   [`clerkMiddleware()`](https://clerk.com/docs/reference/nextjs/clerk-middleware.md) grants you access to user authentication state throughout your app. It also allows you to protect specific routes from unauthenticated users. To add `clerkMiddleware()` to your app, follow these steps:

   1. Create a `proxy.ts` file.

      - If you're using the `/src` directory, create `proxy.ts` in the `/src` directory.
      - If you're not using the `/src` directory, create `proxy.ts` in the root directory alongside `.env`.

   2. In your `proxy.ts` file, export the `clerkMiddleware()` helper:

      ```tsx {{ filename: 'proxy.ts' }}
      import { clerkMiddleware } from '@clerk/nextjs/server'

      export default clerkMiddleware()

      export const config = {
        matcher: [
          // Skip Next.js internals and all static files, unless found in search params
          '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
          // Always run for API routes
          '/(api|trpc)(.*)',
        ],
      }
      ```

   3. By default, `clerkMiddleware()` will not protect any routes. All routes are public and you must opt-in to protection for routes. See the [`clerkMiddleware() reference`](https://clerk.com/docs/reference/nextjs/clerk-middleware.md) to learn how to require authentication for specific routes.
8. ### Add a sign-in page

   The following example demonstrates how to render the `<SignIn />` component.

   ```tsx {{ filename: 'app/sign-in/[[...sign-in]]/page.tsx' }}
   import { SignIn } from '@clerk/nextjs'

   export default function Page() {
     return <SignIn />
   }
   ```

   Update your environment variables to point to your custom sign-in page. For more information on building a custom sign-in-or-up page, see the [`dedicated guide`](https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page.md).

   ```env {{ filename: '.env' }}
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
