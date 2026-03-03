# <OrganizationList /> component

The `<OrganizationList />` component displays Organization-related memberships and automatic [invitations](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md#automatic-invitations) and [suggestions](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md#automatic-suggestions) for the user.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<OrganizationList />` component:

- [`mountOrganizationList()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-list.md#mount-organization-list)
- [`unmountOrganizationList()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-list.md#unmount-organization-list)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

## `mountOrganizationList()`

Render the `<OrganizationList />` component to an HTML `<div>` element.

```typescript
function mountOrganizationList(node: HTMLDivElement, props?: OrganizationListProps): void
```

### `mountOrganizationList()` params

| Name   | Type                  | Description                                                              |
| ------ | --------------------- | ------------------------------------------------------------------------ |
| node   | HTMLDivElement        | The <div> element used to render in the <OrganizationList /> component |
| props? | OrganizationListProps | The properties to pass to the <OrganizationList /> component            |

### `mountOrganizationList()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-list"></div>
`

const orgListDiv = document.getElementById('organization-list')

clerk.mountOrganizationList(orgListDiv)
```

## `unmountOrganizationList()`

Unmount and run cleanup on an existing `<OrganizationList />` component instance.

```typescript
function unmountOrganizationList(node: HTMLDivElement): void
```

### `unmountOrganizationList()` params

| Name | Type           | Description                                                                           |
| ---- | -------------- | ------------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <OrganizationList /> component instance |

### `unmountOrganizationList()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-list"></div>
`

const orgListDiv = document.getElementById('organization-list')

clerk.mountOrganizationList(orgListDiv)

// ...

clerk.unmountOrganizationList(orgListDiv)
```

## Properties

The `<OrganizationList />` component accepts the following properties, all of which are **optional**:

| Name                       | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| afterCreateOrganizationUrl | ((org: Organization) => string) | string | The full URL or path to navigate to after creating a new Organization.                                                                                                                                                                                                                                                                                                                                                              |
| afterSelectOrganizationUrl | ((org: Organization) => string) | string | The full URL or path to navigate to after selecting an Organization. Defaults to undefined.                                                                                                                                                                                                                                                                                                                                         |
| afterSelectPersonalUrl     | ((org: Organization) => string) | string | The full URL or path to navigate to after selecting the Personal AccountPersonal Accounts are individual workspaces that allow users to operate independently without belonging to an Organization. Learn more about Personal Accounts.. Defaults to undefined.                                                                                                                                                                     |
| appearance                 | Appearance | undefined                   | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                                                                                                                                                                                                                                                           |
| fallback?                  | ReactNode                                 | An optional element to be rendered while the component is mounting.                                                                                                                                                                                                                                                                                                                                                                 |
| hidePersonal               | boolean                                   | A boolean that controls whether <OrganizationList /> will include the user's Personal AccountPersonal Accounts are individual workspaces that allow users to operate independently without belonging to an Organization. Learn more about Personal Accounts. in the Organization list. Setting this to true will hide the Personal Account option, and users will only be able to switch between Organizations. Defaults to false. |
| hideSlug                   | boolean                                   | A boolean that controls whether the optional slug field in the Organization creation screen is hidden. Defaults to false.                                                                                                                                                                                                                                                                                                           |
| skipInvitationScreen       | boolean | undefined                      | A boolean that controls whether the screen for sending invitations after an Organization is created is hidden. When undefined, Clerk will automatically hide the screen if the number of max allowed members is equal to 1. Defaults to false.                                                                                                                                                                                      |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

[org-ref]: /docs/reference/javascript/organization

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
