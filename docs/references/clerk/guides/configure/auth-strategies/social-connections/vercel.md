# Add Vercel as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Vercel account is required.](https://vercel.com/signup)

Enabling OAuth with [Vercel](https://vercel.com/docs/sign-in-with-vercel) allows your users to sign up and sign in to your Clerk app with their Vercel account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Vercel** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Vercel team settings](https://vercel.com/account).

1. ### Enable Vercel as a social connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Vercel** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Authorization Callback URL** somewhere secure. Keep this page open.
2. ### Create a Vercel app

   1. In your [Vercel dashboard](https://vercel.com), navigate to your team's **Settings** tab.
   2. Scroll down and select **Apps**, then select **Create**.
   3. Enter a **Name** and **Slug** for your app. Optionally, upload a logo.
   4. Select **Save**.
   5. Save the **Client ID** somewhere secure.
   6. Scroll to **Authorization Callback URLs** and add the Authorization Callback URL you saved from the Clerk Dashboard.
   7. Navigate to the **Authentication** tab and under **Client Authentication Methods**, select the appropriate method for your app. For server-side applications, `client_secret_basic` or `client_secret_post` are recommended.
   8. Navigate to the **Permissions** tab and enable the required scopes: `openid`, `email`, `profile`, and `offline_access`.
   9. Select **Generate** to create a client secret. Save the **Client Secret** somewhere secure.
   10. Select **Save**.
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
