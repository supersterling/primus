# Add Google as an EASIE connection

**Before you start**

- [Upgrade to a paid plan](https://clerk.com/pricing)
- [Enable email for your application.](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md)
- [A Google Developer account is required.](https://console.developers.google.com/)

Enabling [EASIE SSO](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/overview.md#easie) with Google allows your users to sign up and sign in to your Clerk application with their Google account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For specific domains or organizations**.
3. Under **EASIE**, select **Google**.
4. Enter the **Domain**. This is the email domain of the users you want to allow to sign in to your application. Optionally, select an **Organization**.
5. Select **Add connection**.

## Configure for your production instance

> If you already [configured Google as a social provider](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google.md), you can skip this step. EASIE SSO will automatically use the credentials you configured for your social connection.

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Google Cloud Console](https://console.cloud.google.com/).

1. ### Enable Google as an EASIE connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For specific domains or organizations**.
   3. Under **EASIE**, select **Google**.
   4. Enter the **Domain**. This is the email domain of the users you want to allow to sign in to your application. Optionally, select an **Organization**.
   5. Save the **Redirect URI** somewhere secure. Keep this modal open to enter the OAuth credentials in the following steps.
2. ### Create a Google Developer project

   1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   2. Select a project or [create a new one](https://console.cloud.google.com/projectcreate).
   3. If the **APIs & Services** page isn't already open, open the menu on the left and select **APIs & Services**.
   4. In the left sidenav, select **Credentials**.
   5. Select **Create Credentials**. Then, select **OAuth client ID.** You may need to [configure your OAuth consent screen](https://support.google.com/cloud/answer/6158849?hl=en#userconsent\&zippy=%2Cuser-consent).
   6. Select the appropriate application type for your project. Most likely, you will choose **Web application**.
   7. In the **Authorized redirect URIs** section, select **Add URI** and paste the **Redirect URI** value you saved from the Clerk Dashboard.
   8. Select **Create**.
3. ### Set the Client ID and Client Secret in the Clerk Dashboard

   Once the OAuth client is created in the Google Cloud Console, a modal will open with your **Client ID** and **Client Secret**. Save these values somewhere secure.

   Go back to the Clerk Dashboard, where the modal should still be open, and paste these values into the respective fields. Note that if you have any other Google EASIE connections or a [Google social connection](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google.md), this will update the credentials for all of them. Select **Add connection**.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
