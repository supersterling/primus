# Build your own sign-up page for your TanStack React Start app with Clerk

By default, the [`<SignIn />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-in.md) component handles signing in and signing up, but if you'd like to have a dedicated sign-up page, this guide shows you how to use the [`<SignUp />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-up.md) component to build a custom sign-up page.

To set up a single sign-in-or-up page, follow the [`custom sign-in-or-up page guide`](https://clerk.com/docs/tanstack-react-start/guides/development/custom-sign-in-or-up-page.md).

> Just getting started with Clerk and TanStack React Start? See the [`quickstart tutorial`](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart.md)!

1. ## Build a sign-up page

   The following example demonstrates how to render the [`<SignUp />`](https://clerk.com/docs/tanstack-react-start/reference/components/authentication/sign-up.md) component on a dedicated sign-up page using the [TanStack Router catch-all route](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts#splat--catch-all-routes).

   ```tsx {{ filename: 'src/routes/sign-up.$.tsx' }}
   import { SignUp } from '@clerk/tanstack-react-start'
   import { createFileRoute } from '@tanstack/react-router'

   export const Route = createFileRoute('/sign-up/$')({
     component: Page,
   })

   function Page() {
     return <SignUp />
   }
   ```
2. ## Configure your sign-up page

   - Set the `CLERK_SIGN_UP_URL` environment variable to tell Clerk where the `<SignUp />` component is being hosted.

   There are other environment variables that you can set to customize Clerk's redirect behavior, such as `CLERK_SIGN_UP_FORCE_REDIRECT_URL`. Learn more about these environment variables and how to customize Clerk's redirect behavior in the [dedicated guide](https://clerk.com/docs/guides/development/customize-redirect-urls.md).

   ```env {{ filename: '.env' }}
   CLERK_SIGN_UP_URL=/sign-up
   ```
3. ## Visit your new pages

   Run your project with the following command:

   ```npm
   npm run dev
   ```

   Visit your new custom page locally at [localhost:3000/sign-up](http://localhost:3000/sign-up).

## Next steps

Learn more about Clerk components, how to customize them, and how to use Clerk's client-side helpers using the following guides.

- [Protect content and read user data](https://clerk.com/docs/tanstack-react-start/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your TanStack React Start app.
- [Client-side helpers](https://clerk.com/docs/reference/tanstack-react-start/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Clerk TanStack React Start SDK Reference](https://clerk.com/docs/reference/tanstack-react-start/overview.md): Learn about the Clerk TanStack React Start SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
