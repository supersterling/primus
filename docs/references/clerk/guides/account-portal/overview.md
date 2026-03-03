# Account Portal overview

The Account Portal in Clerk is a powerful feature that allows you to streamline the sign-in, sign-up, and profile management experience for your users, without having to build your own components or host your own pages. **To integrate the Account Portal with your application, see the [setup guide](https://clerk.com/docs/guides/account-portal/getting-started.md).**

![Account Portal](https://clerk.com/docs/images/account-portal/account_portal_splash.png)

## Why use the Account Portal?

The Account Portal provides the pages necessary for your users to sign-up, sign-in, and manage their accounts, all while maintaining seamless integration with your application. These pages are hosted on Clerk servers for you and they require minimal setup to get started. If you're looking for the fastest way to add authentication and user management to your application, then this is a great choice.

However, if you require more precise customization or prefer having your application self-contained, then you can use Clerk's fully customizable [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md), or you can build your own [custom user interface using the Clerk API](https://clerk.com/docs/guides/development/custom-flows/overview.md).

## How the Account Portal works

The Account Portal uses Clerk's [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md), which are embedded into dedicated pages hosted on Clerk servers.

![Account Portal](https://clerk.com/docs/images/account-portal/account_portal_how_it_works.png)

After a user has finished their flow in an Account Portal page, Clerk automatically redirects them back to your application along with the required authentication context. This way, users are automatically redirected to and from your application for a seamless experience.

For each application environment, Clerk provides pages for sign-up, sign-in, user profile, organization profile, and organization creation flow. To integrate the Account Portal into your application, see the [setup guide](https://clerk.com/docs/guides/account-portal/getting-started.md).

### Customizing your pages

These pages cannot be customized beyond the options provided in the [Clerk Dashboard](https://dashboard.clerk.com). If you need more customization such as [localization](https://clerk.com/docs/guides/customizing-clerk/localization.md), consider using [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) or building your own [custom user interface](https://clerk.com/docs/guides/development/custom-flows/overview.md).

## Available Account Portal pages

### Sign-in

The sign-in page hosts the prebuilt [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component, which renders a UI for signing in users. The functionality of the `<SignIn />` component is controlled by the instance settings you specify in the [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-up and sign-in options](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) and [social connections](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md). The `<SignIn />` component also displays any session tasks that are required for the user to complete after signing in.

![The Account Portal sign-in page hosts the <SignIn /> component](https://clerk.com/docs/images/account-portal/sign-in.png)

Redirect users to the sign-in page using the [`<RedirectToSignIn />`](https://clerk.com/docs/nextjs/reference/components/control/redirect-to-sign-in.md) control component.

### Sign-up

The sign-up page hosts the prebuilt [`<SignUp />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-up.md) component, which renders a UI for signing up users. The functionality of the `<SignUp />` component is controlled by the instance settings you specify in the [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-up and sign-in options](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) and [social connections](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md). The `<SignUp />` component also displays any session tasks that are required for the user to complete after signing up.

![The Account Portal sign-up page hosts the <SignUp /> component](https://clerk.com/docs/images/account-portal/sign-up.png)

Redirect users to the sign-up page using the [`<RedirectToSignUp />`](https://clerk.com/docs/nextjs/reference/components/control/redirect-to-sign-up.md) control component.

### User profile

The user profile page hosts the prebuilt [`<UserProfile />`](https://clerk.com/docs/nextjs/reference/components/user/user-profile.md) component, which renders a beautiful, full-featured account management UI that allows users to manage their profile and security settings.

![The Account Portal user profile page hosts the <UserProfile /> component](https://clerk.com/docs/images/account-portal/user-profile.png)

Redirect your authenticated users to their user profile page using the [`<RedirectToUserProfile />`](https://clerk.com/docs/nextjs/reference/components/control/redirect-to-user-profile.md) control component.

### Unauthorized sign-in

The unauthorized sign-in page doesn't host any prebuilt Clerk component. It displays a UI confirming that a session from an unrecognized device was successfully revoked. For more information, see the [Unauthorized sign-in](https://clerk.com/docs/guides/secure/best-practices/unauthorized-sign-in.md) feature.

The unauthorized sign-in page displays a UI confirming that a session from an unrecognized device was successfully revoked. For more information, refer to [the reference.](https://clerk.com/docs/guides/secure/best-practices/unauthorized-sign-in.md)

![Clerk's Account Portal unauthorized sign-in page](https://clerk.com/docs/images/account-portal/unauthorized-sign-in.png)

### Create Organization

The create Organization page hosts the prebuilt [`<CreateOrganization />`](https://clerk.com/docs/nextjs/reference/components/organization/create-organization.md) component, which provides a streamlined interface for users to create new Organizations within your application.

![The Account Portal create Organization page hosts the <CreateOrganization /> component](https://clerk.com/docs/images/account-portal/create-org.png)

Redirect your authenticated users to the create Organization page using the [`<RedirectToCreateOrganization />`](https://clerk.com/docs/nextjs/reference/components/control/redirect-to-create-organization.md) control component.

### Organization Profile

The Organization profile page hosts the prebuilt [`<OrganizationProfile />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-profile.md) component, which renders a beautiful, full-featured Organization management UI that allows users to manage their Organization profile and security settings.

![The Account Portal Organization Profile page hosts the <OrganizationProfile /> component](https://clerk.com/docs/images/account-portal/org-profile.png)

Redirect your authenticated users to their Organization Profile page using the [`<RedirectToOrganizationProfile />`](https://clerk.com/docs/nextjs/reference/components/control/redirect-to-organization-profile.md) control component.

### Waitlist

The waitlist page hosts the prebuilt [`<Waitlist />`](https://clerk.com/docs/nextjs/reference/components/authentication/waitlist.md) component which renders a form that allows users to join for early access to your app.

![The Account Portal waitliste page hosts the <Waitlist /> component](https://clerk.com/docs/images/account-portal/waitlist.png)

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
