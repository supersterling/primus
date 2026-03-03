# Clerk Expo SDK

The Clerk Expo SDK gives you access to prebuilt components, React hooks, and helpers to make user authentication easier. Refer to the [`quickstart guide`](https://clerk.com/docs/expo/getting-started/quickstart.md) to get started.

## Available resources

The Expo SDK gives you access to the following resources:

### Hooks

The Expo SDK provides the following hooks:

- [`useSignInWithApple()`](https://clerk.com/docs/reference/expo/use-sign-in-with-apple.md)
- [`useSSO()`](https://clerk.com/docs/reference/expo/use-sso.md)
- [`useLocalCredentials()`](https://clerk.com/docs/reference/expo/use-local-credentials.md)

Because the Expo SDK is built on top of the Clerk React SDK, you can use the hooks that the React SDK provides. These hooks include access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, [`User object`](https://clerk.com/docs/reference/javascript/user.md), [`Organization object`](https://clerk.com/docs/reference/javascript/organization.md), and a set of useful helper methods for signing in and signing up.

- [`useUser()`](https://clerk.com/docs/nextjs/reference/hooks/use-user.md)
- [`useClerk()`](https://clerk.com/docs/nextjs/reference/hooks/use-clerk.md)
- [`useAuth()`](https://clerk.com/docs/nextjs/reference/hooks/use-auth.md)
- [`useSignIn()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-in.md)
- [`useSignUp()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-up.md)
- [`useSession()`](https://clerk.com/docs/nextjs/reference/hooks/use-session.md)
- [`useSessionList()`](https://clerk.com/docs/nextjs/reference/hooks/use-session-list.md)
- [`useOrganization()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization.md)
- [`useOrganizationList()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-list.md)
- [`useOrganizationCreationDefaults()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-creation-defaults.md)
- [`useReverification()`](https://clerk.com/docs/nextjs/reference/hooks/use-reverification.md)
- [`useCheckout()`](https://clerk.com/docs/nextjs/reference/hooks/use-checkout.md)
- [`usePaymentElement()`](https://clerk.com/docs/nextjs/reference/hooks/use-payment-element.md)
- [`usePaymentMethods()`](https://clerk.com/docs/nextjs/reference/hooks/use-payment-methods.md)
- [`usePlans()`](https://clerk.com/docs/nextjs/reference/hooks/use-plans.md)
- [`useSubscription()`](https://clerk.com/docs/nextjs/reference/hooks/use-subscription.md)
- [`useStatements()`](https://clerk.com/docs/nextjs/reference/hooks/use-statements.md)
- [`usePaymentAttempts()`](https://clerk.com/docs/nextjs/reference/hooks/use-payment-attempts.md)

### Components

- **Native** apps:
  - [`<ClerkLoaded>`](https://clerk.com/docs/nextjs/reference/components/control/clerk-loaded.md)
  - [`<ClerkLoading>`](https://clerk.com/docs/nextjs/reference/components/control/clerk-loading.md)
  - [`<SignedIn>`](https://clerk.com/docs/nextjs/reference/components/control/signed-in.md)
  - [`<SignedOut>`](https://clerk.com/docs/nextjs/reference/components/control/signed-out.md)
  - [`<Protect>`](https://clerk.com/docs/nextjs/reference/components/control/protect.md)
  - For other components, see the [`custom flows`](https://clerk.com/docs/reference/expo/overview.md#custom-flows) section for more information.
- **Web** apps:
  - All Clerk components are available. See [`the component docs`](https://clerk.com/docs/nextjs/reference/components/overview.md) for more information.

## Custom flows

For **native** applications, Clerk's prebuilt components are not supported. You must use the Clerk API to build custom UI's for flows such as signing in and signing up. See the [custom flow](https://clerk.com/docs/guides/development/custom-flows/overview.md) guides for more information.

For **web** applications, if Clerk's [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. See the [custom flow](https://clerk.com/docs/guides/development/custom-flows/overview.md) guides for more information.

## Deploy your app

To learn how to deploy your Expo application, see the [`dedicated guide`](https://clerk.com/docs/guides/development/deployment/expo.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
