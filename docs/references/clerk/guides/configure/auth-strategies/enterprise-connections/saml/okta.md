# Add Okta Workforce as a SAML connection

**Before you start**

- [Upgrade to a paid plan](https://clerk.com/pricing)
- [Enable email for your application.](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md)

Enabling SAML with Okta Workforce allows your users to sign up and sign in to your Clerk application with their Okta account. It requires that a SAML connection is configured in both the Clerk Dashboard and Okta. This guide assumes that you have access to the Clerk app's settings in the Clerk Dashboard. The "customer" in this case is whoever has access to the Okta Workforce's app settings.

1. ## Create an Okta SAML connection in Clerk

   1. In the Clerk Dashboard, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page.
   2. Select **Add connection** and select **For specific domains or organizations**.
   3. Under **SAML**, select **Okta Workforce**.
   4. Enter the **Domain**. This is the email domain of the users you want to allow to sign in to your app. Optionally, select an **Organization**.
   5. Enter the **Name**. This will be displayed on the sign-in form.
   6. Select **Add connection**. You'll be redirected to the connection's configuration page. Note that the connection is disabled by default.
   7. In the **Service Provider Configuration** section, save the **Single sign-on URL** and **Audience URI (SP Entity ID)** values somewhere secure. You'll need to give these to the customer so they can configure their Okta app.
2. ## Configure SAML app

   Now that the enterprise connection is configured in Clerk and the **Single sign-on URL** and **Audience URI (SP Entity ID)** are known, the customer's Okta app needs to be configured. At a high level, the process is:

   - Create a new enterprise app in Okta.
   - Add the **Single sign-on URL** and **Audience URI (SP Entity ID)** from Clerk to the Okta app's SAML configuration.
   - Verify that the attribute mappings are correct.
   - Assign selected users or groups to the app.
   - Obtain and share the app's **Metadata URL**.

   To get you started, you can use the following email template with detailed instructions:

   Here are the instructions for setting up SAML SSO with Okta Workforce:

   **Step 1: Create a new enterprise app in Okta**

   1. Navigate to [Okta](https://www.okta.com/) and sign in.
   2. In the Okta dashboard, select **Admin** in the top right corner.
   3. In the navigation sidenav, select the **Applications** dropdown and select **Applications**.
   4. Select **Create App Integration**.
   5. In the **Create a new app integration** modal, select the **SAML 2.0** option and select the **Next** button.
   6. Once redirected to the **Create SAML Integration** page, complete the **General Settings** fields. An **App name** is required.
   7. Select **Next**. You'll be redirected to the **Configure SAML** page.
   8. Paste the **Single sign-on URL** and the **Audience URI (SP Entity ID)** values that you saved from the Clerk Dashboard into their respective fields.

   **Step 2: Verify correct configuration of attributes and claims**

   We expect your SAML responses to have the following specific attributes:

   - Email address (required). This is the email address that your users will use to authenticate into your app:
     - Claim name: `user.email`
   - First name (optional):
     - Claim name: `user.firstName`
   - Last name (optional):
     - Claim name: `user.lastName`

   These are the defaults, and probably won't need you to change them. However, many SAML configuration errors are due to incorrect attribute mappings, so it's worth double-checking. Here's how:

   1. In the Okta dashboard, find the **Attribute Statements (optional)** section.
   2. For the **Name** field, enter `mail`.
   3. For the **Value** field, choose `user.email` from the dropdown.
   4. Select the **Add Another** button to add another attribute.
   5. For the **Name** field, enter `firstName`.
   6. For the **Value** field, choose `user.firstName` from the dropdown.
   7. Select the **Add Another** button to add another attribute.
   8. For the **Name** field, enter `lastName`.
   9. For the **Value** field, choose `user.lastName` from the dropdown.
   10. Scroll to the bottom of the page and select the **Next** button to continue.
   11. You will be redirected to the **Feedback** page. Fill out the feedback however you would like and select the **Finish** button to complete the setup.

   **Step 3: Assign selected user or group in Okta**

   You need to assign users or groups to your enterprise app before they can use it to sign in.

   1. In the Okta dashboard, select the **Assignments** tab.
   2. Select the **Assign** dropdown. You can either select **Assign to people** or **Assign to groups**.
   3. In the search field, enter the user or group of users that you want to assign to the enterprise app.
   4. Select the **Assign** button next to the user or group that you want to assign.
   5. Select the **Done** button to complete the assignment.

   **Step 4: Share the app's metadata URL**

   Once you have completed the setup in Okta, you will be redirected to the application's instances page with the **Sign On** tab selected. Under **Sign on methods**, copy the **Metadata URL**.
3. ## Add the Metadata URL in the Clerk Dashboard

   After following the instructions in the email, your customer should have sent you the Okta app's **Metadata URL**. Now, you're going to add it to the Clerk connection, completing the SAML connection configuration.

   1. Navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page in the Clerk Dashboard.
   2. Select the SAML connection.
   3. In the **Identity Provider Configuration** section, under **Metadata configuration**, paste the **Metadata URL** that you received from the customer.
   4. Select **Fetch & save**. Keep the page open for the next step.
4. ## Enable the connection in Clerk

   The SAML connection is ready to enable! Once enabled, all users with email addresses ending in the domain will be redirected to Okta at sign-up and sign-in.

   > If there are existing users with email domains that match the SAML connection, and there is an error in the SAML configuration in Clerk or Okta, those users will be **unable to sign in** when the connection is enabled. If this is a concern, we recommend coordinating with your counterpart to test the connection at an off-peak time.

   To make the connection available for your users to authenticate with:

   1. Navigate back to the Clerk Dashboard where you should still have the connection's configuration page open. If not, navigate to the [**SSO connections**](https://dashboard.clerk.com/~/user-authentication/sso-connections) page and select the connection.
   2. At the top of the page, toggle on **Enable connection** and select **Save**.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
