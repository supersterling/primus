# Add Box as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Box account is required.](https://account.box.com/login)

Enabling OAuth with Box allows your users to sign up and sign in to your Clerk app with their Box account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Box** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Box Developer Console](https://app.box.com/developers/console).

1. ### Enable Box as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Box** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Redirect URI** somewhere secure. Keep this page open.
2. ### Create a Box app

   1. On the homepage of the [Box Developer Console](https://app.box.com/developers/console), select **Custom App**. A modal will open.
   2. Fill out the necessary information. Use Box's [guide on OAuth 2.0 setup](https://developer.box.com/guides/authentication/oauth2/oauth2-setup/#app-creation-steps) to help you.
   3. Select **Next**.
   4. In the list of authentication methods, select **User Authentication (OAuth 2.0)**.
   5. Select **Create App**. You'll be redirected to the app's **Configuration** page.
   6. In the **OAuth 2.0 Redirect URIs** section, paste the **Redirect URI** value you saved from the Clerk Dashboard.
   7. In the **OAuth 2.0 Credentials** section, save the **Client ID** and **Client Secret** somewhere secure.
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
