# Build your own sign-in-or-up page for your TanStack React Start app with Clerk

This guide shows you how to use the [`<SignIn />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-in.md) component to build a custom page **that allows users to sign in or sign up within a single flow**.

To set up separate sign-in and sign-up pages, follow this guide, and then follow the [`custom sign-up page guide`](https://clerk.com/docs/tanstack-react-start/guides/development/custom-sign-up-page.md).

> Just getting started with Clerk and TanStack React Start? See the [`quickstart tutorial`](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart.md)!

1. ## Build a sign-in-or-up page

   The following example demonstrates how to render the [`<SignIn />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-in.md) component on a dedicated page using the [TanStack Router catch-all route](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts#splat--catch-all-routes).

   ```tsx {{ filename: 'src/routes/sign-in.$.tsx' }}
   import { SignIn } from '@clerk/tanstack-react-start'
   import { createFileRoute } from '@tanstack/react-router'

   export const Route = createFileRoute('/sign-in/$')({
     component: Page,
   })

   function Page() {
     return <SignIn />
   }
   ```
2. ## Configure your sign-in-or-up page

   Set the `CLERK_SIGN_IN_URL` environment variable to tell Clerk where the `<SignIn />` component is being hosted.

   There are other environment variables that you can set to customize Clerk's redirect behavior, such as `CLERK_SIGN_IN_FORCE_REDIRECT_URL`. Learn more about these environment variables and how to customize Clerk's redirect behavior in the [dedicated guide](https://clerk.com/docs/guides/development/customize-redirect-urls.md).

   ```env {{ filename: '.env' }}
   CLERK_SIGN_IN_URL=/sign-in
   ```
3. ## Visit your new page

   Run your project with the following command:

   ```npm
   npm run dev
   ```

   Visit your new custom page locally at [localhost:3000/sign-in](http://localhost:3000/sign-in).

## Next steps

Learn more about Clerk components, how to use them to create custom pages, and how to use Clerk's client-side helpers using the following guides.

- [Create a custom sign-up page](https://clerk.com/docs/tanstack-react-start/guides/development/custom-sign-up-page.md): Learn how to add a custom sign-up page to your TanStack React Start app with Clerk's components.
- [Protect content and read user data](https://clerk.com/docs/tanstack-react-start/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your TanStack React Start app.
- [Client-side helpers](https://clerk.com/docs/reference/tanstack-react-start/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Clerk TanStack React Start SDK Reference](https://clerk.com/docs/reference/tanstack-react-start/overview.md): Learn about the Clerk TanStack React Start SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
