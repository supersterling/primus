# Build your own sign-in-or-up page for your Expo web app

This guide shows you how to use the [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) prebuilt component in order to build custom page that **allows users to sign in or sign up within a single flow**.

To set up separate sign-in and sign-up pages, follow this guide, and then follow the [custom sign-up page guide](https://clerk.com/docs/guides/development/web-support/custom-sign-up-page.md).

This guide uses [Expo Router](https://docs.expo.dev/router/introduction/) and the [platform-specific extensions](https://docs.expo.dev/router/create-pages/#platform-specific-extensions) to build the sign-in-or-up page specifically for the **web** platform.

1. ## Build a sign-in-or-up page

   The following example demonstrates how to render the [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component to allow users to both sign-in or sign-up from a single flow.

   ```tsx {{ filename: '/app/sign-in.web.tsx' }}
   import { SignIn } from '@clerk/clerk-expo/web'

   export default function Page() {
     return <SignIn />
   }
   ```
2. ## Visit your new page

   To run your project, use the following command:

   ```npm
   npm run web
   ```

   Visit your new custom pages locally at [localhost:8081/sign-in](http://localhost:8081/sign-in).

## Next steps

Learn more about Clerk components, how to build custom flows for your native apps, and how to use Clerk's client-side helpers using the following guides.

- [Create a custom sign-up page](https://clerk.com/docs/guides/development/web-support/custom-sign-up-page.md): Learn how to add a custom sign-up page to your app with Clerk's components.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Customization & localization](https://clerk.com/docs/guides/customizing-clerk/appearance-prop/overview.md): Learn how to customize and localize Clerk components.
- [Custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md): Expo native apps require custom flows in place of prebuilt components.
- [Client-side helpers](https://clerk.com/docs/reference/expo/overview.md#hooks): Learn more about Clerk's client-side helpers and how to use them.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
