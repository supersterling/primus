# Clerk Vue SDK

The Clerk Vue SDK gives you access to prebuilt components, composables, and helpers to make user authentication easier. Refer to the [`quickstart guide`](https://clerk.com/docs/vue/getting-started/quickstart.md) to get started.

## `clerkPlugin`

To configure Clerk with Vue, you must initialize `clerkPlugin`. See the [`quickstart`](https://clerk.com/docs/vue/getting-started/quickstart.md#add-clerk-plugin-to-your-app) for more information.

## `updateClerkOptions()`

The `updateClerkOptions()` function is used to update Clerk's options at runtime. It can be called at any time after [`Clerk has been initialized`](https://clerk.com/docs/reference/vue/clerk-plugin.md). See the [`reference documentation`](https://clerk.com/docs/reference/vue/update-clerk-options.md) for more information.

## Custom composables

The Vue SDK provides access to custom composables that include access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object, [`User object`](https://clerk.com/docs/reference/javascript/user.md), [`Organization object`](https://clerk.com/docs/reference/javascript/organization.md), and a set of useful helper methods for signing in and signing up.

- [`useUser()`](https://clerk.com/docs/reference/composables/use-user.md)
- [`useClerk()`](https://clerk.com/docs/reference/composables/use-clerk.md)
- [`useAuth()`](https://clerk.com/docs/reference/composables/use-auth.md)
- [`useSignIn()`](https://clerk.com/docs/reference/composables/use-sign-in.md)
- [`useSignUp()`](https://clerk.com/docs/reference/composables/use-sign-up.md)
- [`useSession()`](https://clerk.com/docs/reference/composables/use-session.md)
- [`useSessionList()`](https://clerk.com/docs/reference/composables/use-session-list.md)
- [`useOrganization()`](https://clerk.com/docs/reference/composables/use-organization.md)

## Framework-specific SDKs

> If you're building a standard Vue application (client-side only), use `@clerk/vue`. If you're using Nuxt, use the dedicated `@clerk/nuxt` package which includes backend integration.

Clerk offers framework-specific SDKs that are customized to provide the better developer experience and integration with each framework's features. Choose the appropriate SDK based on your framework:

| Framework | Package       | Docs                                                            |
| --------- | ------------- | --------------------------------------------------------------- |
| Nuxt      | `@clerk/nuxt` | [`Nuxt SDK`](https://clerk.com/docs/reference/nuxt/overview.md) |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
