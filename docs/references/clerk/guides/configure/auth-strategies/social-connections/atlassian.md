# Add Atlassian as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [An Atlassian account is required.](https://developer.atlassian.com/)

Enabling OAuth with Atlassian allows your users to sign up and sign in to your Clerk app with their Atlassian account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs—no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Atlassian** from the provider list.

## Configure for your production instance

For _production instances_, you must provide custom credentials.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Atlassian Developer console](https://developer.atlassian.com/console/myapps/).

1. ### Enable Atlassian as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Atlassian** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Callback URL** somewhere secure. Keep this page open.
2. ### Create an Atlassian workspace

   > If you already have an Atlassian workspace you'd like to connect to Clerk, select your workspace from the [Atlassian Developer console](https://developer.atlassian.com/console/myapps/) and skip to [the next step in this tutorial](#configure-your-atlassian-app).

   1. In the [Atlassian Developer console](https://developer.atlassian.com/console/myapps/), next to **My apps**, select **Create**. Then, select **OAuth 2.0 integration**. You'll be redirected to the **Create a new OAuth 2.0 (3LO) integration** page.
   2. Fill out the necessary information. Then, select **Create**. Once the integration is created, you'll be redirected to the app's **Overview** page.
3. ### Configure your Atlassian app

   1. In the left sidenav of your app's **Overview** page, select **Permissions**. Configure the OAuth 2.0 scopes to request from your users when they connect with Atlassian. At a minimum, next to **User identity API**, select **Add**.
   2. In the left sidenav, select **Authorization**.
   3. Next to **OAuth 2.0 (3LO)**, select **Add**.
   4. In the **Callback URL** field, paste the **Callback URL** you saved from the Clerk Dashboard.
   5. Select **Save changes**.
   6. In the left sidenav, select **Settings**.
   7. Under **Authentication details**, save the **Client ID** and **Secret** somewhere secure.
   8. In the left sidenav, select **Distribution**.
   9. Select **Edit**.
   10. Set the **Distribution Status** to **Sharing**.
   11. Complete the required fields. For **Does your app store personal data?**, select **Yes**, as Clerk uses the user's personal data to authenticate them.
   12. Select **Save changes**.
4. ### Set the Client ID and Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **Client ID** and **Client Secret** values that you saved into the respective fields.
   2. Select **Save**.

   > If the page is no longer open, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard. Select the connection. Under **Use custom credentials**, paste the values into their respective fields.
5. ### Test your connection

   > To be able to connect, the user must have access to at least one Atlassian site (e.g. JIRA, Confluence). Currently, the user can authorize access only to a single Atlassian site.

   The simplest way to test your connection is to visit your Clerk app's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk apps out-of-the-box.

   1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
   2. Next to **Sign-in**, select the button to visit the sign-in page. The URL should resemble:
      - **For development** - `https://your-domain.accounts.dev/sign-in`
      - **For production** - `https://accounts.your-domain.com/sign-in`
   3. Sign in with your connection's credentials.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
