# Add a custom Identity Provider (IdP) as a SAML connection

**Before you start**

- [Upgrade to a paid plan](https://clerk.com/pricing)
- [Enable email for your application.](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md)

Clerk supports Enterprise SSO via the SAML protocol, enabling you to create authentication strategies for an Identity Provider (IdP). Currently, Clerk offers direct integrations with the following IdPs: [Microsoft Azure AD](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/saml/azure.md), [Google Workspace](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/saml/google.md), and [Okta Workforce](https://clerk.com/docs/guides/configure/auth-strategies/enterprise-connections/saml/okta.md). However, you can also integrate with any other IdPs that supports the SAML protocol.

This guide shows you how to set up a SAML connection with a custom IdP in Clerk.

1. ## Set up an enterprise connection in Clerk

   To create a SAML connection in Clerk:

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For specific domains or organizations**.
   3. Under **SAML**, select **Custom SAML Provider**.
   4. Add the **Domain** for which you want to enable this connection. This is the domain of the users you wish to allow to sign in to your application. Optionally, select an **Organization**.
   5. Enter the **Name**. This will be displayed on the sign-in form.
   6. Select **Add connection**. You'll be redirected to the connection's configuration page.
2. ## Create a new enterprise application in your IdP

   Create a new application in your IdP. In the next steps, you'll configure your IdP with the settings provided by your Service Provider (Clerk), and configure Clerk with the settings provided by your IdP. Keep both the IdP and Clerk Dashboard open.
3. ## Configure your Identity Provider

   There are two options for configuring your IdP:

   - [**Metadata configuration**](#metadata-configuration) - This is where you can download your IdP's metadata file or input the metadata URL that you got from your IdP. This is the recommended way to configure your IdP, but not all IdPs support this method.
   - [**Custom configuration**](#custom-configuration) - This is where you can manually input the configuration settings for your IdP.
4. ### Metadata configuration

   1. In your IdP dashboard, find where you can download the metadata file or copy the metadata URL.
   2. In the Clerk Dashboard on the connection's configuration page, under **Identity Provider Configuration**,select **Add via metadata**. Input the metadata URL or upload the metadata file that you got from your IdP.
5. ### Custom configuration

   If you choose to manually input the configuration settings for your IdP, you will need to fill these three fields in the Clerk Dashboard:

   - **SSO URL** - This is your IdP's URL that Clerk will redirect your users to so that they authenticate.
   - **Entity ID** - This is the unique identifier of your IdP application.
   - **Certificate** - This is the certificate needed for Clerk to securely connect to your IdP.

   1. In your IdP dashboard, find these values and copy them.
   2. In the Clerk Dashboard, paste the values you copied from your IdP into the appropriate fields, and upload the certificate you got from your IdP.
6. ### Configure your Service Provider

   To configure your Service Provider (Clerk), your IdP will either ask for the **Assertion Consumer Service (ACS) URL** and **Entity ID** or it will ask for the **Metadata URL**. If your IdP gives you the option to choose between the two, it is recommended to choose the **Metadata URL** as it is the quickest and most reliable way to configure your Service Provider.

   Here are what these settings mean:

   - **Assertion Consumer Service (ACS) URL** - This is your application's URL that your IdP will redirect your users back to after they have authenticated in your IdP.
   - **Entity ID** - This is a unique identifier for your SAML connection that your IdP application needs.
   - **Metadata URL** - This is the URL to your SAML connection's metadata file. This is the recommended way to configure your Service Provider.

   To find the values for these settings:

   1. In the Clerk Dashboard, on the connection's configuration page, find the **Service Provider configuration** section.
   2. Copy the values you need for your IdP.
   3. In your IdP dashboard, paste the values in the appropriate fields.

   > If you closed the connection's configuration page in the Clerk Dashboard, you can find it by navigating to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page and selecting the settings icon next to the connection you want to configure.
7. ### Map your IdP's claims to Clerk fields

   Mapping the claims in your IdP to the attributes in Clerk ensures that the data from your IdP is correctly mapped to the data in Clerk.

   In the Clerk Dashboard, find the **Attribute mapping** section. Here, you are shown what properties on the [`User`](https://clerk.com/docs/reference/javascript/user.md) object in Clerk are being mapped to the claims in your IdP.

   In your IdP dashboard, there should be a section where you can map the IdP's claims to the attributes in Clerk. For example, Google has a `Primary email` claim that needs to be mapped to Clerk's `mail` property. During SAML configuration in the Google dashboard, Google provides a section where these claims can be mapped.

   If you have additional claims that you would like to map to Clerk that are not listed in the **Attribute mapping** section, you can do so by following the steps in the [Map other claims](#map-other-claims-optional) section.
8. ### Map other claims (optional)

   In Clerk, the [`User`](https://clerk.com/docs/reference/javascript/user.md) object has a `publicMetadata` property that you can use to store additional information about your users.

   To map other claims from your IdP that do not have a direct mapping to Clerk attributes, you can map them to the `publicMetadata` property. To do this, prepend the Clerk claims with `public_metadata_` during the mapping process.

   For example, say you were using Google as your IdP. Google users have the "Phone number" attribute. Clerk does not have a direct mapping for this attribute, as you can see in the Clerk Dashboard in the **Attribute mapping** section. Instead, in the Google dashboard, you would map Google's "Phone number" claim to `public_metadata_phone_number`. Then, in Clerk, the value for the user's phone number would be saved in the user's `User.publicMetadata` under the key `phone_number`. Some IdP providers like Microsoft Entra map additional claims as URLs. To ensure the claims work with Clerk, you must add the claims as strings only.

   Learn more about [how to access the metadata from our APIs](https://clerk.com/docs/guides/users/extending.md).
9. ### Enable the connection for Clerk

   To make the connection available for your users to authenticate with:

   1. In the Clerk Dashboard, you should still have the connection's configuration page open. If not, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page and select the connection.
   2. Toggle on **Enable connection** and select **Save**.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
