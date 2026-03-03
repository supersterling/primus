# Add Apple as a social connection

**Before you start**

- [A Clerk application is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [An Apple Developer account is required.](https://developer.apple.com/programs/enroll/)

Enabling OAuth via [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/) allows your users to sign in and sign up to your Clerk app with their Apple ID.

> This guide explains how to configure Sign in with Apple for web-based flows. To configure Sign in with Apple on native applications (such as iOS or Expo apps), see the [`dedicated guide`](https://clerk.com/docs/guides/configure/auth-strategies/sign-in-with-apple.md).

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs.

To configure your development instance, follow these steps:

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Apple** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

You must generate and provide your own **Apple Services ID**, **Apple Private Key**, **Apple Team ID**, and **Apple Key ID** using your Apple Developer account.

To make the setup process easier, it's recommended to keep two browser tabs open: one for your [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Apple Developer dashboard](https://developer.apple.com/account).

1. ### Enable Apple as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Apple** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Email Source for Apple Private Email Relay** and **Return URL** values somewhere secure, as you'll need to provide them to Apple later. Keep this page open.
2. ### Get your Apple Team ID

   To get your **Apple Team ID**, create a new **App ID** in the Apple Developer portal by following these steps:

   1. On a separate page, navigate to the [Apple Developer dashboard](https://developer.apple.com/account).
   2. Under **Certificates, IDs and Profiles**, select [**Identifiers**](https://developer.apple.com/account/resources/identifiers/list).
   3. In the top-right, select the dropdown and select **App IDs**.
   4. Next to **Identifiers** at the top of the page, select the plus icon (+) to register a new identifier. You'll be redirected to the **Register a new identifier** page.
   5. Select **App IDs**, then select **Continue**.
   6. On the next page, you'll be prompted to **Select a type** for your app. Choose **App** and select **Continue**. You will be redirected to the **Register an App ID** page.
   7. Fill in a description for your **App ID** and a **Bundle ID**. Under **Capabilities**, ensure that **Sign In with Apple** is enabled. Then select **Continue**. You'll be redirected to the **Confirm your App ID** page.
   8. At the top of the page, you'll see your **App ID Prefix**. Save this value somewhere secure. This is your **Apple Team ID** in Clerk.
   9. Finally, select **Register**. You'll be redirected to the **Identifiers** page.
3. ### Get your Apple Services ID

   To get your **Apple Services ID**, create a new **Services ID** in the Apple Developer portal.

   1. On the **Identifiers** page, in the dropdown near the top-right of the page, select the **Services IDs** option from the list.
   2. Next to **Identifiers** at the top of the page, select the plus icon (+) to register a new identifier. You'll be redirected to the **Register a new identifier** page.
   3. Select **Services IDs**, then select **Continue**. You'll be redirected to the **Register a Services ID** page.
   4. Add a description for your **Services ID**, and set an **Identifier**. Save the **Identifier** value somewhere secure. This is your **Apple Services ID** in Clerk. Finally, select **Continue**.
   5. In the confirmation view, select **Register**.
   6. After the registration is finished, select the newly-created **Services ID**. Ensure the **Sign In with Apple** box is enabled and select **Configure**.
   7. Under **Primary App ID**, select the **App ID** you created in the previous step.
   8. Under **Domains and Subdomains**, add your Clerk Frontend API URL **without the protocol**. For example, if your domain is `https://myapp.com`, then your Frontend API URL is `https://clerk.myapp.com`, and you would add `clerk.myapp.com` to **Domains and Subdomains**.
   9. Under **Return URLS**, add the **Return URL** value you saved from the Clerk Dashboard.
   10. Select **Next**. You'll be redirected to the **Confirm your web authentication configuration** screen.
   11. Select **Done**. You'll be redirected to the **Edit your Services ID Configuration** page.
   12. Select **Continue**. You'll be redirected to the confirmation page.
   13. Select **Save**. You'll be redirected to the **Identifiers** page.
4. ### Get your Apple Private Key and Key ID

   To get your **Apple Private Key** and **Key ID**, create a new **Key** in the Apple Developer portal.

   1. On the **Identifiers** page, in the sidenav, select **Keys**.
   2. Next to **Keys** at the top of the page, select the plus icon (+) to register a new key. You'll be redirected to the **Register a New Key** page.
   3. Add a **Key Name** and ensure the **Sign In with Apple** box is enabled and select **Configure**. You'll be redirected to the **Configure Key** page.
   4. Under **Primary App ID**, select the **App ID** you created in the first step of this guide. Then select **Save**. You'll be redirected to the previous **Register a New Key** page.
   5. Select **Continue** and you'll be presented with the final confirmation screen. Verify that **Sign in with Apple** is checked. Select **Register**. You'll be redirected to the **Download Your Key** page.
   6. Save the **Key ID** value somewhere secure. This is your **Apple Key ID** in Clerk.
   7. Download the private key file. This is your **Apple Private Key** in Clerk. Ensure you back up the key in a secure location, as it cannot be downloaded again later.
   8. Select **Done**. You'll be redirected to the **Keys** page.
5. ### Configure Email Source for Apple Private Relay

   > In some regions (such as China and India), Apple IDs may not include an email address at all, and instead are tied only to a phone number. If your instance requires all users to have an email, Sign in with Apple may fail for these users. Depending on your user base, you may want to navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page in the Clerk Dashboard and disable the **Sign-up with email** setting.
   >
   > If you'd like to know more about this, see the [Apple documentation](https://support.apple.com/en-au/105034).

   Apple provides a privacy feature called [Hide My Email](https://support.apple.com/en-us/HT210425#hideemail), allowing users to sign in to your app with Apple without disclosing their actual email addresses. Instead, your instance receives an app-specific email address that forwards any emails to the user real's address.

   To be able to send emails properly to users with hidden addresses, you must configure an additional setting in the Apple Developer portal.

   1. In the sidenav of the Apple Developer Portal, select [**Services**](https://developer.apple.com/account/resources/services/list).
   2. Under **Sign in with Apple for Email Communication**, select **Configure**. You'll be redirected to the **Configure Sign in with Apple for Email Communication** page.
   3. Next to **Email Sources** at the top of the page, select the plus icon (+) to add a new **Email Source**.
   4. In the **Register your email sources** modal that opens, under **Email Addresses**, add the **Email Source for Apple Private Email Relay** value that you copied from the [**Apple SSO custom credentials**](https://dashboard.clerk.com/~/user-authentication/sso-connections) in the Clerk Dashboard. It should look something like this: `bounces+00000000@clkmail.myapp.com`.
   5. Select **Next**. The modal will redirect to the **Confirm your email sources** screen.
   6. Select **Register**. The modal will redirect to the **Email Source Registration Complete** screen.
   7. Select **Done**.

   After this step, the email address should appear in the list and display a green check icon, indicating it has been verified. If it's not marked as verified yet, DNS propagation may still be in progress. Wait for the propagation to complete before attempting to select **Reverify SPF**.

   For more info about Apple's Private Relay service, refer to the following documentation:

   - [https://support.apple.com/en-us/HT210425#hideemail](https://support.apple.com/en-us/HT210425#hideemail)
   - [https://developer.apple.com/help/account/configure-app-capabilities/configure-private-email-relay-service](https://developer.apple.com/help/account/configure-app-capabilities/configure-private-email-relay-service)
6. ### Connect your Apple app to your Clerk app

   By now, you should have the following values saved from the Apple Developer portal:

   - **Apple Team ID**
   - **Apple Services ID**
   - **Apple Key ID**
   - **Apple Private Key** file

   Connect your Apple app to your Clerk app by adding these values to the Clerk Dashboard.

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open.
   2. Add all the corresponding fields depending on your desired flow. For the **Apple Private Key** file, open it with a text editor and copy/paste the contents. You must include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines.
   3. Select **Save**.
7. ### Test your connection

   The simplest way to test your connection is to visit your Clerk app's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk apps out-of-the-box.

   1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
   2. Next to **Sign-in**, select the button to visit the sign-in page. The URL should resemble:
      - **For development** - `https://your-domain.accounts.dev/sign-in`
      - **For production** - `https://accounts.your-domain.com/sign-in`
   3. Sign in with your connection's credentials.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
