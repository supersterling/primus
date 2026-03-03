# Clerk Remix SDK

> The Remix SDK is in maintenance mode and will only receive security updates. Please migrate to the [`React Router SDK`](https://clerk.com/docs/react-router/getting-started/quickstart.md) for continued development and new features.

The Clerk Remix SDK gives you access to prebuilt components, React hooks, and helpers to make user authentication easier. Refer to the [`quickstart guide`](https://clerk.com/docs/remix/getting-started/quickstart.md) to get started.

## `ClerkApp`

The `ClerkApp` component is a wrapper that provides Clerk's authentication state to your React tree. It is required to configure Clerk in your Remix application. Learn more in the [`reference`](https://clerk.com/docs/reference/remix/clerk-app.md).

## `rootAuthLoader()`

The `rootAuthLoader()` function is a helper function that provides the authentication state to your Remix application. It is required to configure Clerk in your Remix application. Learn more in the [`reference`](https://clerk.com/docs/reference/remix/root-auth-loader.md).

## Client-side helpers

Because the Remix SDK is built on top of the Clerk React SDK, you can use the hooks that the React SDK provides. These hooks include access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, [`User object`](https://clerk.com/docs/reference/javascript/user.md), [`Organization object`](https://clerk.com/docs/reference/javascript/organization.md), and a set of useful helper methods for signing in and signing up.

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

### `getAuth()`

The `getAuth()` helper retrieves authentication state from the request object. Returns the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }} object. Accepts the following parameters:

| Name                                                                                                                                                                                                                                                                                                                                                                                                           | Type | Description           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------- |
| args                                                                                                                                                                                                                                                                                                                                                                                                           |      | The arguments object. |
| secretKey?: A string that represents the Secret KeyYour Clerk Secret Key is used to authenticate requests from your backend to Clerk's API. You can find it on the API keys page in the Clerk Dashboard. Do not expose this on the frontend with a public environment variable. used to sign the session token. If not provided, the Secret Key is retrieved from the environment variable CLERK\_SECRET\_KEY. |      |                       |

See the [`dedicated guide`](https://clerk.com/docs/remix/guides/users/reading.md#server-side) for example usage.

## SPA mode

Clerk supports [Remix in SPA mode](https://remix.run/docs/en/main/guides/spa-mode) out-of-the-box. Learn more in the [tutorial](https://clerk.com/docs/guides/development/spa-mode.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
