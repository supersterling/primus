# Disabling the Account Portal

> We recommend leaving the Account Portal enabled, even if you do choose to set up your own authentication flow. This helps with testing as well as providing an alternative path for users when needed.

To disable the Account Portal:

1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
2. Select **Disable Account Portal** at the bottom of the page. You will not be able to select this button until you have [set up an authentication flow for your users](#handle-clerk-flows), as applying this setting will immediately result in a 404 for all Account Portal pages.

## Handle Clerk flows

Once you have disabled the Account Portal, you are fully responsible for providing your own flows, such as sign-up and sign-in. Clerk provides a set of [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) that you can use. If prebuilt components don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. See the [custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md) guides for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
