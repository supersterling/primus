# Deploy an Expo app to production

There are a few caveats to deploying production Expo applications with Clerk. This guide will walk you through the steps to deploy your Expo app to production.

## Acquire a domain

Before deploying your Expo app to production, you must acquire a domain. Even though there may not be a web application associated with an Expo app, Clerk still requires a domain for production instances.

## Configure your Expo app

With Clerk, you can [add OAuth flows in your Expo applications](https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections.md).

Clerk ensures that security critical nonces are passed only to allowlisted URLs when the SSO flow is completed in native browsers or webviews. For maximum security in your **production** instances, you need to allowlist your custom redirect URLs via the [Clerk Dashboard](https://dashboard.clerk.com/) or the [`Clerk Backend API`](https://clerk.com/docs/reference/backend/redirect-urls/create-redirect-url.md).

To allowlist a redirect URL via the Clerk Dashboard:

1. In the Clerk Dashboard, navigate to the [**Native applications**](https://dashboard.clerk.com/~/native-applications) page.
2. Scroll down to the **Allowlist for mobile SSO redirect** section and add your redirect URLs.

> By default, Clerk uses `{bundleIdentifier}://callback` as the redirect URL.

## Deploy to production

Now that you have acquired a domain and configured your Expo app, you can follow [the Clerk deployment guide](https://clerk.com/docs/guides/development/deployment/production.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
