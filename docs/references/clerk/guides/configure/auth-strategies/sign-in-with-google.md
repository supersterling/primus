# Sign in with Google

**Before you start**

- [A Clerk application is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Google Developer account is required.](https://console.developers.google.com/)

[Sign in with Google](https://support.google.com/accounts/answer/12849458?hl=en) helps you easily and securely sign in to third-party apps or services with your Google Account, without having to enter a username and password repeatedly across different services.

This guide will teach you how to add native Sign in with Google to your Clerk apps on Android platforms. This is different from Google OAuth - if you want to use Google OAuth, see the [dedicated guide](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google.md).

To make the setup process easier, it's recommended to keep two browser tabs open - one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Google Cloud Console](https://console.cloud.google.com/).

1. ## Enable Google as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Google** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Authorized Redirect URI** somewhere secure. Keep this page open.
2. ## Create the Google Developer Android client

   1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   2. Select an existing project or [create a new one](https://console.cloud.google.com/projectcreate). You'll be redirected to your project's **Dashboard** page.
   3. In the top-left, select the menu icon (**≡**) and select **APIs & Services**. Then, select **Credentials**.
   4. Next to **Credentials**, select **Create Credentials**. Then, select **OAuth client ID.** You might need to [configure your OAuth consent screen](https://support.google.com/cloud/answer/6158849#userconsent). Otherwise, you'll be redirected to the **Create OAuth client ID** page.
   5. For the **Application type**, select **Android**.
   6. Complete the required fields.
      - **Package name**: Your package name is in your `build.gradle` file, formatted as `com.example.myclerkapp`.
      - **SHA-1 certificate fingerprint**: To get your SHA-1, run the following command in your terminal:

        > Replace `path-to-debug-or-production-keystore` with the path to your debug or production keystore. By default, the debug keystore is located in `~/.android/debug.keystore`. It may ask for a keystore password, which is `android`. **You may need to install [OpenJDK](https://openjdk.org/) to run the `keytool` command.**

        ```sh {{ filename: 'terminal' }}
        keytool -keystore path-to-debug-or-production-keystore -list -v
        ```
   7. Select **Create**.
3. ## Create the Google Developer Web client

   1. In the same project, create another client. Next to **Credentials**, select **Create Credentials**. Then, select **OAuth client ID.**
   2. For the **Application type**, select **Web Application**.
   3. Complete the required fields. In the **Authorized Redirect URIs** setting, paste the **Authorized Redirect URI** value you saved from the Clerk Dashboard.
   4. Select **Create**. A modal will open with your **Client ID** and **Client Secret**. Save these values somewhere secure.
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

   > Google sign-in [**does not** allow users to sign in via in-app browsers](https://developers.googleblog.com/en/modernizing-oauth-interactions-in-native-apps-for-better-usability-and-security).

## Usage

To learn how to build a sign-up and sign-in flow that supports OAuth connections in your Android application, see the [custom flow guide](https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
