# Build your own sign-in-or-up page for your Remix app with Clerk

> The Remix SDK is in maintenance mode and will only receive security updates. Please migrate to the [`React Router SDK`](https://clerk.com/docs/react-router/getting-started/quickstart.md) for continued development and new features.

This guide shows you how to use the [`<SignIn />`](https://clerk.com/docs/remix/reference/components/authentication/sign-in.md) component to build a custom page **that allows users to sign in or sign up within a single flow**.

To set up separate sign-in and sign-up pages, follow this guide, and then follow the [`custom sign-up page guide`](https://clerk.com/docs/remix/guides/development/custom-sign-up-page.md).

> Just getting started with Clerk and Remix? See the [`quickstart tutorial`](https://clerk.com/docs/remix/getting-started/quickstart.md)!

1. ## Build a sign-in-or-up page

   The following example demonstrates how to render the [`<SignIn />`](https://clerk.com/docs/remix/reference/components/authentication/sign-in.md) component on a dedicated page using the [Remix optional route](https://reactrouter.com/en/main/route/route#optional-segments).

   ```tsx {{ filename: 'app/routes/sign-in.$.tsx' }}
   import { SignIn } from '@clerk/remix'

   export default function Page() {
     return <SignIn />
   }
   ```
2. ## Configure your sign-in-or-up page

   **SSR Mode**

   - Set the `CLERK_SIGN_IN_URL` environment variable to tell Clerk where the `<SignIn />` component is being hosted.
   - Set `CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` as a fallback URL incase users visit the `/sign-in` route directly.
   - Set `CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` as a fallback URL incase users select the 'Don't have an account? Sign up' link at the bottom of the component.

   Learn more about these environment variables and how to customize Clerk's redirect behavior in the [dedicated guide](https://clerk.com/docs/guides/development/customize-redirect-urls.md).

   ```env {{ filename: '.env' }}
   CLERK_SIGN_IN_URL=/sign-in
   CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   ```

   **SPA Mode**

   - Set the `signInUrl` property to your `ClerkApp` options to tell Clerk where the `<SignIn />` component is being hosted.
   - Set the `signInFallbackRedirectUrl` property to a fallback URL incase users visit the `/sign-in` route directly.
   - Set the `signUpFallbackRedirectUrl` property to a fallback URL incase users select the 'Don't have an account? Sign up' link at the bottom of the component.

   Learn more about these environment variables and how to customize Clerk's redirect behavior in the [dedicated guide](https://clerk.com/docs/guides/development/customize-redirect-urls.md).

   ```ts {{ filename: 'app/root.tsx', mark: [[3, 4]] }}
   export default ClerkApp(App, {
     publishableKey: PUBLISHABLE_KEY,
     signInUrl: '/sign-in',
     signInFallbackRedirectUrl: '/',
     signUpFallbackRedirectUrl: '/',
   })
   ```
3. ## Visit your new page

   Run your project with the following terminal command from the root directory of your project:

   ```npm
   npm run dev
   ```

   Visit your new custom page locally at [localhost:3000/sign-in](http://localhost:3000/sign-in).

## Next steps

Learn more about Clerk components, how to use them to create custom pages, and how to use Clerk's client-side helpers using the following guides.

- [Create a custom sign-up page](https://clerk.com/docs/remix/guides/development/custom-sign-up-page.md): Learn how to add a custom sign-up page to your Remix app with Clerk's components.
- [Protect content and read user data](https://clerk.com/docs/remix/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your Remix app.
- [Client-side helpers](https://clerk.com/docs/reference/remix/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Clerk Remix SDK Reference](https://clerk.com/docs/reference/remix/overview.md): Learn about the Clerk Remix SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
