# Add TikTok as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A TikTok Developer account is required.](https://developers.tiktok.com)

Enabling OAuth with [TikTok](https://developers.tiktok.com/doc/login-kit-manage-user-access-tokens) allows your users to sign up and sign in to your Clerk app with their TikTok account.

## Configure for your development instance

Due to TikTok's requirement to verify URL ownership for all redirect URLs, **TikTok cannot be used with shared credentials in development environments.** This is because individual users can't verify ownership of the Clerk development URL (`accounts.dev`).

However, TikTok can still be used in development environments if you create a sandbox app and configure custom credentials. In this case, there is no need to verify redirect URLs in the [sandbox environment](https://developers.tiktok.com/blog/introducing-sandbox). Instead, you can invite users who are allowed to sign in.

It is recommended to test this integration in a staging or preview environment, as shared credentials require URL verification to function properly.

## Configure for your production instance

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [TikTok Developer Portal](https://developers.tiktok.com/).

1. ### Enable TikTok as a social connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **TikTok** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on. Keep this page open.
2. ### Create your app in TikTok

   > If you're creating an app as an organization rather than as an individual developer, you must first [create an organization](https://developers.tiktok.com/organizations). For guidance on which option to choose, refer to [TikTok's guide on working with organizations](https://developers.tiktok.com/doc/working-with-organizations/)**.**

   1. On a separate page, go to the [TikTok Developer Portal](https://developers.tiktok.com/) and sign in.
   2. In the top-right, select [**Developer Portal**](https://developers.tiktok.com/apps), then select **Manage apps**. You'll be redirected to the **Manage apps** page.
   3. Select **Connect an app**. Complete the form then select **Confirm**. You'll be redirected to your **App details** page.
   4. In the **Basic information** section, complete the form.
   5. Select **Verify URL properties** under any of the URL fields to verify your app URL. A modal will open.
   6. Select **Verify properties**. For the property type, select either **Domain** to verify ownership of the enter website, including subdomains, or **URL prefix** to verify ownership of a specific part of the website (e.g., `example.com/shop/`). See [the TikTok guide](https://developers.tiktok.com/doc/getting-started-create-an-app#verify_url_ownership) for more information.
   7. Enter your website and select **Verify**.
   8. Follow the instructions in the modal to verify your domain with your host provider. After entering the necessary information in your hosting provider's DNS settings, select **Verified**. Once your property is verified, select **Ok**.
   9. Select **Submit for review**.
   10. On the **App details** page, select the icons next to the **Client key** and **Client secret** to reveal them. Save these values somewhere secure.

   > Your app needs to be reviewed by TikTok before the registration completes. This process may take a few days.
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
