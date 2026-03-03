# Clerk TanStack React Start SDK

The Clerk TanStack React Start SDK gives you access to prebuilt components, React hooks, and helpers to make user authentication easier. Refer to the [`quickstart guide`](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart.md) to get started.

## Client-side helpers

Because the TanStack React Start SDK is built on top of the React SDK, you can use the hooks that the React SDK provides. These hooks include access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, [`User object`](https://clerk.com/docs/reference/javascript/user.md), [`Organization object`](https://clerk.com/docs/reference/javascript/organization.md), and a set of useful helper methods for signing in and signing up. Learn more in the [`Clerk React SDK reference`](https://clerk.com/docs/reference/react/overview.md).

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

## Server-side helpers

The following references show how to integrate Clerk features into applications using TanStack React Start server functions and API routes.

- [`auth()`](https://clerk.com/docs/reference/tanstack-react-start/auth.md)
- [`clerkMiddleware()`](https://clerk.com/docs/reference/tanstack-react-start/clerk-middleware.md)

### `Auth` object

The `auth()` returns an `Auth` object. This JavaScript object contains important information like session data, your user's ID, as well as their Organization ID. Learn more about the `Auth` object [`here`](https://clerk.com/docs/reference/backend/types/auth-object.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
