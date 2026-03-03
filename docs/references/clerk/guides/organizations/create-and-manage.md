# Create and manage Organizations

Organizations can be created and managed either **in the Clerk Dashboard** or **in your application**. This guide covers working with individual Organizations. For global settings that affect all Organizations in your application (like enabling Organizations, setting default Roles, or configuring memberships), refer to the [dedicated guide](https://clerk.com/docs/guides/organizations/configure.md).

## Create an Organization

Organizations can be created in the Clerk Dashboard or in your application. The number of Organizations you can create depends on your [Monthly Retained Organization (MRO) limits](https://clerk.com/docs/guides/organizations/overview.md#how-do-organizations-work).

### Create an Organization in the Clerk Dashboard

To create an Organization in the Clerk Dashboard, navigate to the [**Organizations**](https://dashboard.clerk.com/~/organizations) page and select the **Create Organization** button.

### Create an Organization in your application

By default, [users have permission to create Organizations within your application](https://clerk.com/docs/guides/organizations/configure.md#allow-user-created-organizations). When a user creates an Organization, they become the Organization's [admin](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md#default-roles) with full control over settings, members, and Permissions.

**Default limits**: Each user can create up to 100 Organizations. To change creation permissions or limits, see the [dedicated guide](https://clerk.com/docs/guides/organizations/configure.md#allow-user-created-organizations).

The easiest way to allow users to create Organizations is to use the [`<CreateOrganization />`](https://clerk.com/docs/nextjs/reference/components/organization/create-organization.md) and/or [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md) components. The `<OrganizationSwitcher />` component is more comprehensive, as it handles all Organization flows including creating, switching, and managing an Organization.

If the prebuilt components don't meet your needs, you can build [custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md) using the Clerk API.

## Manage Organizations

As an application owner, you can manage all Organizations in your application, both those created by you and those created by your users. You can view, update, and delete any Organization, as well as manage its members and settings.

### Manage Organizations in the Clerk Dashboard

To manage an Organization in the Clerk Dashboard, navigate to the [**Organizations**](https://dashboard.clerk.com/~/organizations) page. Select a specific Organization to view its details, members, invitations, Subscriptions, payments, and settings.

### Manage Organizations in your application

For managing Organizations in your application, Clerk provides prebuilt components that handle Organization management flows:

- [`<OrganizationProfile />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-profile.md) - A profile page for the user's currently active Organization where they can update settings and manage members.
- [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md) - A dropdown menu that handles all Organization flows, including switching between Organizations and managing the active Organization's profile.
- [`<OrganizationList />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-list.md) - A list of Organizations that a user is a member of, with options to switch between them.

If the prebuilt components don't meet your needs, you can build [custom flows](https://clerk.com/docs/guides/development/custom-flows/overview.md) using the Clerk API.

## Switch between Organizations

Users who belong to multiple Organizations can switch between them at any time. The currently selected Organization is called the active Organization.

The [`<OrganizationSwitcher />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher.md) component provides the easiest way for users to switch between Organizations. If you need more control over the switching logic, you can use the `setActive()` method from the [`useOrganizationList()`](https://clerk.com/docs/nextjs/reference/hooks/use-organization-list.md) hook, or access it directly from the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md#set-active) object.

If Personal Accounts are enabled, users can switch to their Personal Account using the `<OrganizationSwitcher />` component.

## Next steps

Now that you've created and managed Organizations, you can:

- [Add custom data with Organization metadata](https://clerk.com/docs/guides/organizations/metadata.md): Learn how to store custom information about an Organization that is not part of the standard fields.
- [Use Organization slugs in URLs](https://clerk.com/docs/guides/organizations/org-slugs-in-urls.md): Learn how to use Organization slugs in URLs for tenant-specific routing.
- [Invite members to Organizations](https://clerk.com/docs/guides/organizations/add-members/invitations.md): Learn how to invite members to Organizations.
- [Set up Roles and Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md): Learn how to set up Roles and Permissions to control what invited users can access.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
