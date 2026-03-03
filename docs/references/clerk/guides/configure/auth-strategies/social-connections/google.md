# Add Google as a social connection

**Before you start**

- [A Clerk application is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Google Developer account is required.](https://console.developers.google.com/)

Enabling OAuth with [Google](https://developers.google.com/identity/protocols/oauth2) allows your users to sign up and sign in to your Clerk application with their Google account.

> Google OAuth 2.0 **does not** allow apps to use WebViews for authentication. See the dedicated [Google blog post](https://developers.googleblog.com/en/modernizing-oauth-interactions-in-native-apps-for-better-usability-and-security) for more information. If your app requires users to sign in via in-app browsers, follow the setup instructions in the [Google Help guide](https://support.google.com/faqs/answer/12284343).

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Google** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Google Cloud Console](https://console.cloud.google.com/).

1. ### Enable Google as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Google** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Authorized Redirect URI** somewhere secure. Keep this page open.
2. ### Create a Google Developer project

   1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   2. Select a project or [create a new one](https://console.cloud.google.com/projectcreate). You'll be redirected to your project's **Dashboard** page.
   3. In the top-left, select the menu icon (**≡**) and select **APIs & Services**. Then, select **Credentials**.
   4. Next to **Credentials**, select **Create Credentials**. Then, select **OAuth client ID.** You might need to [configure your OAuth consent screen](https://support.google.com/cloud/answer/6158849#userconsent). Otherwise, you'll be redirected to the **Create OAuth client ID** page.
   5. Select the appropriate application type for your project. In most cases, it's **Web application**.
   6. In the **Authorized JavaScript origins** setting, select **Add URI** and add your domain (e.g., `https://your-domain.com` and `https://www.your-domain.com` if you have a `www` version). For local development, add `http://localhost:PORT` (replace `PORT` with the port number of your local development server).
   7. In the **Authorized Redirect URIs** setting, paste the **Authorized Redirect URI** value you saved from the Clerk Dashboard.
   8. Select **Create**. A modal will open with your **Client ID** and **Client Secret**. Save these values somewhere secure.
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

   > Google sign-in [**does not** allow users to sign in via in-app browsers](https://developers.googleblog.com/en/modernizing-oauth-interactions-in-native-apps-for-better-usability-and-security).

### Important note about switching to production

Google OAuth apps have a publishing status that determines who can access the app. The publishing status setting can be found in the Google Cloud Platform console on the **APIs & Services > OAuth consent screen** page. You can only view the publishing status if the **User type** is set to **External**.

By default, Google OAuth apps are set to the **"Testing"** [publishing status](https://support.google.com/cloud/answer/10311615#publishing-status), which is intended for internal testing before opening connections to your [intended audience](https://support.google.com/cloud/answer/10311615#user-type). It's limited to 100 test users and depending on the requested OAuth scopes, they might need to be explicitly added to your trusted user list to be able to connect.

To switch a Google OAuth app to production, **you must set the publishing status to "In production".** This involves a verification process with regard to your app name, logo, and scopes requested before Google accepts the switch to production.

Ensure that your Clerk production app always uses a corresponding Google OAuth app that is set to the **"In production"** publishing status, so your end users don't encounter any issues using Google as a social connection.

### Block email subaddresses

By default, your app will block any Google account with an email address that contains the characters `+`, `=` or `#` from being able to sign up, sign in, or be added to existing accounts.

For a Google organization with the domain `example.com`, blocking email subaddresses prevents someone with access to `user@example.com` from signing up with `user+alias@example.com`. This is a known [Google OAuth vulnerability](https://trufflesecurity.com/blog/google-oauth-is-broken-sort-of/) that could allow unauthorized, as Google organization administrators cannot suspend or delete the email alias account. It's recommended to keep this setting enabled for enhanced security.

To configure this setting:

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select the **Google** connection.
3. Enable or disable **Block email subaddresses**.

> Existing Google accounts with email subaddresses will be blocked by this restriction and won't be able to sign in.

## Google One Tap

[Google One Tap](https://developers.google.com/identity/gsi/web/guides/features) enables users to sign up or sign in to your Clerk app with the press of a button. After adding Google to your Clerk app as a social connection, you can use the prebuilt `<GoogleOneTap />` component to render the One Tap UI in your app. See [`the <GoogleOneTap /> component reference`](https://clerk.com/docs/nextjs/reference/components/authentication/google-one-tap.md) to learn more.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
