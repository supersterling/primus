# <OrganizationProfile /> component

The `<OrganizationProfile />` component allows users to manage their Organization membership, security, and billing settings.

This component's **General** tab displays the Organization's information and the **Leave organization** button. Admins will be able to see the **Update profile** button, **Verified domains** section, and **Delete organization** button.

The **Members** tab shows the Organization's members along with their join dates and Roles. Admins will have the ability to invite a member, change a member's Role, or remove them from the Organization. Admins will have tabs within the **Members** tab to view the Organization's [invitations](https://clerk.com/docs/guides/organizations/add-members/invitations.md) and [requests](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md#membership-requests).

The **Billing** tab displays the Plans and Features that are available to the Organization, as well as the user's billing information, such as their invoices and payment methods.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<OrganizationProfile />` component:

- [`mountOrganizationProfile()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile.md#mount-organization-profile)
- [`unmountOrganizationProfile()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile.md#unmount-organization-profile)
- [`openOrganizationProfile()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile.md#open-organization-profile)
- [`closeOrganizationProfile()`](https://clerk.com/docs/js-frontend/reference/components/organization/organization-profile.md#close-organization-profile)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### <code>mountOrganization<wbr />Profile()</code>

Render the `<OrganizationProfile />` component to an HTML `<div>` element.

```typescript
function mountOrganizationProfile(node: HTMLDivElement, props?: OrganizationProfileProps): void
```

#### `mountOrganizationProfile()` params

| Name   | Type                     | Description                                                                 |
| ------ | ------------------------ | --------------------------------------------------------------------------- |
| node   | HTMLDivElement           | The <div> element used to render in the <OrganizationProfile /> component |
| props? | OrganizationProfileProps | The properties to pass to the <OrganizationProfile /> component            |

#### `mountOrganizationProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-profile"></div>
`

const orgProfileDiv = document.getElementById('organization-profile')

clerk.mountOrganizationProfile(orgProfileDiv)
```

### <code>unmountOrganization<wbr />Profile()</code>

Unmount and run cleanup on an existing `<OrganizationProfile />` component instance.

```typescript
function unmountOrganizationProfile(node: HTMLDivElement): void
```

#### `unmountOrganizationProfile()` params

| Name | Type           | Description                                                                               |
| ---- | -------------- | ----------------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <OrganizationProfile /> component instance. |

#### `unmountOrganizationProfile()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-profile"></div>
`

const orgProfileDiv = document.getElementById('organization-profile')

clerk.mountOrganizationProfile(orgProfileDiv)

// ...

clerk.unmountOrganizationProfile(orgProfileDiv)
```

### `openOrganizationProfile()`

Opens the `<OrganizationProfile />` component as an overlay at the root of your HTML `body` element.

```typescript
function openOrganizationProfile(props?: OrganizationProfileProps): void
```

#### `openOrganizationProfile()` params

| Name   | Type                     | Description                                                      |
| ------ | ------------------------ | ---------------------------------------------------------------- |
| props? | OrganizationProfileProps | The properties to pass to the <OrganizationProfile /> component |

#### `openOrganizationProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-profile"></div>
`

const orgProfileDiv = document.getElementById('organization-profile')

clerk.openOrganizationProfile(orgProfileDiv)
```

### `closeOrganizationProfile()`

Closes the organization profile overlay.

```typescript
function closeOrganizationProfile(): void
```

#### `closeOrganizationProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="organization-profile"></div>
`

const orgProfileDiv = document.getElementById('organization-profile')

clerk.closeOrganizationProfile(orgProfileDiv)
```

## Properties

The `<OrganizationProfile />` component accepts the following properties, all of which are **optional**:

| Name                      | Type                    | Description                                                                                                                                                                 |
| ------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                   |
| afterLeaveOrganizationUrl | string                  | The full URL or path to navigate to after leaving an Organization.                                                                                                          |
| customPages               | CustomPages[]          | An array of custom pages to add to the Organization profile. Only available for the JavaScript SDK. To add custom pages with React-based SDK's, see the dedicated guide.    |
| fallback?                 | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                         |
| path                      | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash- and virtual-based routing.For example: /organization-profile.                |
| routing                   | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React. |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

In addition, you also can add custom pages and links to the `<OrganizationProfile />` navigation sidenav. For more information, refer to the [`Custom Pages`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/organization-profile.md) documentation.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
