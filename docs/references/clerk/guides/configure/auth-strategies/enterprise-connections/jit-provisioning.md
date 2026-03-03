# Just-in-Time (JIT) Provisioning during SAML SSO

Just-in-Time (JIT) Provisioning, or automatic account provisioning, is a process by which accounts for employees are created on-demand during the first time they authenticate via SAML SSO in your application.

Using JIT Provisioning means your IT department won't have to manually create user accounts for each of the services or apps your employees use to get work done.

Clerk supports JIT account provisioning for all [supported SAML providers](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/overview.md).

Check your preferred SAML provider's documentation to enable JIT account provisioning on their side.

## Sync user attributes during sign in

During SAML SSO and after a user has successfully authenticated, the IdP provides Clerk with the corresponding user data. After each successful sign in, Clerk handles keeping the user data up-to-date based on the response of the SAML provider. This means that if a user's data changes on the IdP side, Clerk will automatically update the user's data in the Clerk database.

To disable this behavior:

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select the SAML connection you want to disable the sync for.
3. Select the **Advanced** tab.
4. Toggle off the **Sync user attributes during Sign in** option.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
