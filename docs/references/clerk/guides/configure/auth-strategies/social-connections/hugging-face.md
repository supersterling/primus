# Add Hugging Face as a social connection

**Before you start**

- [A Clerk app is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [A Hugging Face account is required.](https://huggingface.co/join)

Enabling OAuth with [Hugging Face](https://huggingface.co/) allows your users to sign up and sign in to your Clerk application with their Hugging Face account.

## Configure for your development instance

For _development instances_, Clerk uses preconfigured shared OAuth credentials and redirect URIs — no other configuration is needed.

1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
2. Select **Add connection** and select **For all users**.
3. Select **Hugging Face** from the provider list.

## Configure for your production instance

In _production instances_, you must provide custom credentials.

1. ### Enable Hugging Face as a social connection

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For all users**.
   3. Select **Hugging Face** from the provider list.
   4. Ensure that both **Enable for sign-up and sign-in** and **Use custom credentials** are toggled on.
   5. Save the **Redirect URL** somewhere secure. Keep this page open.
2. ### Create a Hugging Face Connected App

   1. In the top-right of [Hugging Face](https://huggingface.co/), select your avatar and select **Settings**.
   2. In the left sidenav, select **Connected Apps**.
   3. Under **Developer Applications**, select **Create App**.
   4. Complete the form. Under **Scopes**, select the scopes that your app requires. At minimum, select **openid**, **profile**, and **email**. Under **Redirect URLs**, paste the **Redirect URL** value you saved from the Clerk Dashboard.
   5. Select **Create**. The page should refresh and display the **Client ID** and **App Secret**. Save these values somewhere secure.
3. ### Set the Client ID and App Secret in the Clerk Dashboard

   1. Navigate back to the Clerk Dashboard where the configuration page should still be open. Paste the **Client ID** and **App Secret** values that you saved into the respective fields.
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
