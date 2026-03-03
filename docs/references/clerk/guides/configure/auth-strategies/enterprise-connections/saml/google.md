# Add Google Workspace as a SAML connection

**Before you start**

- [Upgrade to a paid plan](https://clerk.com/pricing)
- [Enable email for your application.](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md)

Enabling SAML with Google allows your users to sign up and sign in to your Clerk application with their Google account.

To make the setup process easier, it's recommended to keep two browser tabs open: one for the [Clerk Dashboard](https://dashboard.clerk.com/~/user-authentication/sso-connections) and one for your [Google Admin Console](https://admin.google.com/).

1. ## Enable Google as a SAML connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For specific domains or organizations**.
   3. Under **SAML**, select **Google Workspace**.
   4. Enter the **Domain**. This is the email domain of the users you want to allow to sign in to your application. Optionally, select an **Organization**.
   5. Enter the **Name**. This will be displayed on the sign-in form.
   6. Select **Add connection**. You'll be redirected to the connection's configuration page.
   7. In the **Service Provider Configuration** section, save the **ACS URL** and **Entity ID** values somewhere secure. Keep this page open.
2. ## Create a new enterprise application in Google

   1. Navigate to the [Google Admin Console](https://admin.google.com/) and sign in.
   2. In the navigation sidenav, under **Apps**, select **Web and mobile apps**.
   3. Select the **Add app** button.
   4. From the dropdown, select **Add custom SAML app**.
   5. In the **App details** section, an **App name** is required.
   6. Select the **Continue** button.
3. ## Configure Google as your Identity Provider

   There are two options for configuring your identity provider:

   - **[Metadata configuration](#metadata-configuration) (recommended)** - A URL or file to your IdP's metadata. This is quicker than manually inputting the configuration settings.
   - [**Custom configuration**](#custom-configuration) - Manually input the configuration settings for your IdP.
4. ### Metadata configuration

   1. In the Google Admin Console, under **Option 1: Download IdP Metadata**, select the **Download Metadata** button.
   2. Navigate back to the Clerk Dashboard and in the **Identity Provider Configuration** section, select the **Upload file** button.
   3. Upload the metadata file you downloaded from Google.
5. ### Custom configuration

   If you choose to manually input the configuration settings for your IdP, you must add these three fields to your Clerk settings:

   - **SSO URL** - The unique identifier of your IdP application.
   - **Entity ID** - Your IdP's URL that Clerk will redirect your users to so that they can authenticate.
   - **Certificate** - The certificate needed for Clerk to securely connect to your IdP.

   1. In the Google Admin Console, under **Option 2**, copy the **SSO URL**, **Entity ID**, and download the **Certificate**.
   2. Navigate back to the Clerk Dashboard and in the **Identity Provider Configuration** section, select **Use manual configuration**.
   3. Fill in the **SSO URL**, **Entity ID**, and upload the **Certificate**. Don't forget to select **Save**.
   4. In the Google Admin Console, select the **Continue** button.
6. ## Configure Clerk as your Service Provider

   1. In the Google Admin Console, paste the **ACS URL** and **Entity ID** values you saved from the Clerk Dashboard into their respective fields.
   2. Under the **Name ID** section, select the **Name ID format** dropdown and select **Email**.
   3. Select **Continue**.
7. ## Map Google claims to Clerk attributes

   Mapping the claims in your IdP to the attributes in Clerk ensures that the data from your IdP is correctly mapped to the data in Clerk.

   | Clerk attribute | Google claim                      |
   | --------------- | --------------------------------- |
   | `mail`          | Basic Information > Primary email |
   | `firstName`     | Basic Information > First name    |
   | `lastName`      | Basic Information > Last name     |

   The only Google claim that is necessary to map is the **Primary email**. This is the email address that your users will use to authenticate into your application.

   1. In the Google Admin Console, under the **Attributes** section, select **Add mapping**.
   2. Select the dropdown under **Google Directory attributes**.
   3. Select **Primary email**.
   4. In the **App attributes** field, enter `mail`.
   5. If you have additional claims that you would like to map to Clerk, you can do so by following the steps in the [Map other claims](#map-other-claims-optional) section. Otherwise, select the **Finish** button.
8. ### Map other claims (optional)

   In Clerk, the [`User`](https://clerk.com/docs/reference/javascript/user.md) object has a `publicMetadata` property that you can use to store additional information about your users.

   To map other claims from Google that don't have a direct mapping to Clerk attributes, you can map them to Clerk's `publicMetadata` property. To do this, prepend the Clerk claims with `public_metadata_` during the mapping process.

   For example, say your users have the "Phone number" attribute in Google. You can map this to your users' public metadata in Clerk by mapping the Google field to `public_metadata_phone_number`.

   1. In the Google Admin Console, under the **Attributes** section, select the dropdown under **Google Directory attributes**.
   2. Select **Phone number**.
   3. In the **App attributes** field, enter `public_metadata_phone_number`.
   4. Select the **Finish** button.

   The value for the user's phone number will be saved in the user's `User.publicMetadata` under the key `phone_number`.

   Learn more about [how to access the metadata from our APIs](https://clerk.com/docs/guides/users/extending.md).
9. ## Enable the connection in Google

   Once the configuration is complete in Google, you'll be redirected to the app's overview page.

   1. In the **User access** section, select **OFF for everyone**. You'll be redirected to the **Service status** page.
   2. Select **ON for everyone**.
   3. Select **Save**.
10. ## Enable the connection in Clerk

    The SAML connection is ready to enable! Once enabled, all users with email addresses ending in the domain will be redirected to Okta at sign-up and sign-in.

    > If there are existing users with email domains that match the SAML connection, and there is an error in the SAML configuration in Clerk or Okta, those users will be **unable to sign in** when the connection is enabled. If this is a concern, we recommend coordinating with your counterpart to test the connection at an off-peak time.

    To make the connection available for your users to authenticate with:

    1. Navigate back to the Clerk Dashboard where you should still have the connection's configuration page open. If not, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page and select the connection.
    2. At the top of the page, toggle on **Enable connection** and select **Save**.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
