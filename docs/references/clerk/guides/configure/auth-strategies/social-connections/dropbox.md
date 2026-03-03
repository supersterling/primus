# Add Dropbox as a social connection

**Before you start**

- [A Clerk application is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Dropbox Developer account is required.](https://www.dropbox.com/developers)

Enabling OAuth with Dropbox allows your users to sign up and sign in to your Clerk application with their Dropbox account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Dropbox** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Dropbox App Console](https://www.dropbox.com/developers/apps).

1. ### Enable Dropbox as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Dropbox** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Redirect URI** somewhere secure. Keep this page open.
2. ### Configure your Dropbox app

   1. In the [Dropbox App Console](https://www.dropbox.com/developers/apps), select a project or [create a new one](https://www.dropbox.com/developers/apps/create).
   2. On your app's **Settings** page, save the **App key** and **App secret** somewhere secure.
   3. In the **Redirect URIs** input, paste the **Redirect URI** value you saved from the Clerk Dashboard and select **Add**.
3. ### Set the App Key and App Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **App key** and **App secret** values that you saved into the respective fields.
   2. Select **Save**.

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection. Under **Use custom credentials**, you can paste the values into their respective fields.
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
