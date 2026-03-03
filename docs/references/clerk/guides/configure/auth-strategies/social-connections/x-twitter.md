# Add X/Twitter v2 as a social connection

**Before you start**

- [A Clerk application is required](https://clerk.com/docs/getting-started/quickstart/setup-clerk)
- [An X/Twitter developer account is required](https://developer.twitter.com/en/docs/apps/overview)

Enabling OAuth with [X/Twitter](https://developer.twitter.com/en/docs/x/overview) allows your users to sign up and sign in to your Clerk app with their X/Twitter account.

Clerk doesn't currently support preconfigured shared OAuth credentials for X/Twitter on development instances. You must provide custom credentials for both development _and_ production instances, which involves generating your own **Client ID** and **Client Secret** using your X/Twitter Developer account.

## Configure for your production instance

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [X/Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).

> X/Twitter v2 doesn't currently provide users' email addresses. Users must manually enter their email address when they return to your application after authenticating with X/Twitter.

1. ## Enable X/Twitter as a social connection

   To enable X/Twitter as a social connection for your Clerk application:

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **X/Twitter** from the provider list.
   4. Save the **Redirect URI** somewhere secure. Keep this page open.
2. ## Configure additional OAuth scopes (optional)

   Scopes are the permissions your app requests from a user's X/Twitter account. Clerk pre-configures the required OAuth scopes for X/Twitter as a social connection, but you can configure additional scopes if needed. The scopes you define should align with your app's functionality and your selected **App Permissions** in the X/Twitter Developer Portal. For example, if you only select **Read** in the X/Twitter Developer Portal, Clerk's request for `tweet.write` will be rejected, even if you include it in Clerk's configuration.

   To configure OAuth scopes for X/Twitter as a social connection in Clerk:

   1. In the Clerk Dashboard, the configuration page should still be open.
   2. Under **Scopes**, add any additional scopes you need. For a complete list of available scopes and their details, see [X/Twitter OAuth 2.0 Scopes documentation](https://docs.x.com/resources/fundamentals/authentication/oauth-2-0/authorization-code#scopes).

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection.
3. ## Create an X/Twitter application

   When signing up for a new X/Twitter Developer account, you'll be required to describe your app's use cases. After completing this step, you'll be redirected to the **Dashboard** page. Under **Projects**, you'll see an automatically generated app with a randomly generated string as its name.

   If you want to create a new X/Twitter application, follow these steps:

   1. In the X/Twitter Developer Portal, under [**Projects**](https://developer.twitter.com/en/portal/projects-and-apps), select **Add App**. You'll be redirected to the **App name** tab. If you have a **Free** account, you can only have one app at a time, so you'll need to delete the existing app before being able to create a new one.
   2. Enter your application name and select **Next**. You'll be redirected to the **Keys & Tokens** tab where your app's credentials are displayed. However, these credentials aren't needed to set up the X/Twitter social connection with Clerk, as the setup uses the OAuth 2.0 flow, which relies on different credentials.
   3. Select **App settings**. You'll be redirected to your app's **Settings** tab.
   4. Under **User authentication settings**, next to **User authentication not set up**, select **Set up**. You'll be redirected to the **User authentication settings** page.
   5. Under **App permissions**, choose the permissions you want to request from your user. At minimum, select the **Read** permission.
   6. Under **Type of App**, select **Web App, Automated App or Bot**.
   7. Under **App info**, in the **Callback URI / Redirect URL** field, paste the **Callback URI / Redirect URL** value you copied from the Clerk Dashboard.
   8. Complete any other required fields, such as the **Website URL**.
   9. Select **Save**. You'll be redirected to a page that shows your app's **Client ID** and **Client Secret**. Save these values somewhere secure.
4. ## Set the Client ID and Client Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **Client ID** and **Client Secret** values that you saved into the respective fields.
   2. Select **Save**.

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection. Under **Use custom credentials**, paste the values into their respective fields.
5. ## Test your connection

   The simplest way to test your connection is to visit your Clerk app's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk apps out-of-the-box.

   1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
   2. Next to **Sign-in**, select the button to visit the sign-in page. The URL should resemble:
      - **For development** - `https://your-domain.accounts.dev/sign-in`
      - **For production** - `https://accounts.your-domain.com/sign-in`
   3. Sign in with your connection's credentials.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
