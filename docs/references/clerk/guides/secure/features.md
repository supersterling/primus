# Features

Features are specific capabilities or functionalities in your application that you want to control access to. They are used in authorization checks.

Features can be used in two ways:

- With Clerk's [Organizations](https://clerk.com/docs/guides/organizations/overview.md) feature to create Custom Permissions. Custom Permissions are always tied to a Feature, and are formatted as `org:<feature>:<permission>`. For example, you could create a Feature called **invoices** and then create a new Permission called **create invoices**. The Custom Permission's key would be `org:invoices:create`. Learn more about [Custom Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md).
- With Clerk's Billing feature to create Features specific to a Subscription Plan. See the [Billing docs](https://clerk.com/docs/guides/billing/overview.md) for more information.

To manage your Features, navigate to the [**Features**](https://dashboard.clerk.com/~/features) page in the Clerk Dashboard.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
