# Add Spotify as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Spotify account is required.](https://developer.spotify.com)

Enabling OAuth with [Spotify](https://developer.spotify.com/documentation/web-api/concepts/authorization) allows your users to sign up and sign in to your Clerk application with their Spotify account.

> For **development** instances, [Spotify](https://developer.spotify.com/documentation/web-api/concepts/quota-modes) requires users to be added to the app's allowlist in order to use Spotify as a social provider in your Clerk app. If they are not allowlisted, any API requests made with an access token associated with that user and the Spotify app will receive a 403 status code.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Spotify Developer Dashboard](https://developer.spotify.com/).

1. ## Enable Spotify as a social connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Spotify** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Redirect URI** somewhere secure. Keep this page open.
2. ## Create a Spotify app

   1. In the top-right of the [Spotify Developer Dashboard](https://developer.spotify.com/), select **Create app**.
   2. Complete the required fields. For **Redirect URIs**, paste the **Redirect URI** that you saved from Clerk Dashboard.
   3. Select **Save**. You'll be redirected to your app's **All Stats** page.
   4. Select **Settings**.
   5. Save the **Client ID** and **Client secret** somewhere secure. To get the **Client secret**, select **View client secret**.
3. ## Set the Client ID and Client Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **Client ID** and **Client Secret** values that you saved into the respective fields.
   2. Select **Save**.

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection. Under **Use custom credentials**, paste the values into their respective fields.
4. ## Test your connection

   The simplest way to test your connection is to visit your Clerk app's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk apps out-of-the-box.

   1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
   2. Next to **Sign-in**, select the button to visit the sign-in page. The URL should resemble:
      - **For development** - `https://your-domain.accounts.dev/sign-in`
      - **For production** - `https://accounts.your-domain.com/sign-in`
   3. Sign in with your connection's credentials.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
