# Add GitHub as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A GitHub account is required.](https://github.com/signup)

Enabling OAuth with [GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) allows your users to sign up and sign in to your Clerk app with their GitHub account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **GitHub** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for [GitHub's Developer Settings](https://github.com/settings/apps).

1. ### Enable GitHub as a social connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **GitHub** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Authorization Callback URL** somewhere secure. Keep this page open.
2. ### Create a GitHub app

   1. In your GitHub's Developer Settings, navigate to the [**Register a new OAuth app**](https://github.com/settings/applications/new) page.
   2. Complete the required fields. In **Authorization Callback URL**, paste the **Authorization Callback URL** you saved from the Clerk Dashboard.
   3. Select **Register application**. You'll be redirected to your app's **General** page.
   4. Select **Generate a new client secret**. Save the **Client ID** and **Client Secret** somewhere secure.
3. ### Set the Client ID and Client Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **Client ID** and **Client Secret** values that you saved into the respective fields.
   2. Select **Save**.

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection. Under **Use custom credentials**, paste the values into their respective fields.
4. ### Test your connection

   The simplest way to test your connection is to visit your Clerk app's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk apps out-of-the-box.

   1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
   2. Next to **Sign-in**, select the button to visit the sign-in page. The URL should resemble:
      - **For development** - `https://your-domain.accounts.dev/sign-in`
      - **For production** - `https://accounts.your-domain.com/sign-in`
   3. Sign in with your connection's credentials.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
