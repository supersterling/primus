# <CreateOrganization /> component

The `<CreateOrganization />` component is used to render an Organization creation UI that allows users to create brand new Organizations in your application.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<CreateOrganization />` component:

- [`mountCreateOrganization`](https://clerk.com/docs/js-frontend/reference/components/organization/create-organization.md#mount-create-organization)
- [`unmountCreateOrganization`](https://clerk.com/docs/js-frontend/reference/components/organization/create-organization.md#unmount-create-organization)
- [`openCreateOrganization`](https://clerk.com/docs/js-frontend/reference/components/organization/create-organization.md#open-create-organization)
- [`closeCreateOrganization`](https://clerk.com/docs/js-frontend/reference/components/organization/create-organization.md#close-create-organization)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### <code>mountCreate<wbr />Organization()</code>

Render the `<CreateOrganization />` component to an HTML `<div>` element.

```typescript
function mountCreateOrganization(node: HTMLDivElement, props?: CreateOrganizationProps): void
```

### <code>mountCreate<wbr />Organization()</code> params

| Name   | Type                    | Description                                                                |
| ------ | ----------------------- | -------------------------------------------------------------------------- |
| node   | HTMLDivElement          | The <div> element used to render in the <CreateOrganization /> component |
| props? | CreateOrganizationProps | The properties to pass to the <CreateOrganization /> component            |

#### `mountCreateOrganization()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="create-organization"></div>
`

const createOrgDiv = document.getElementById('create-organization')

clerk.mountCreateOrganization(createOrgDiv)
```

### <code>unmountCreate<wbr />Organization()</code>

Unmount and run cleanup on an existing `<CreateOrganization />` component instance.

```typescript
function unmountCreateOrganization(node: HTMLDivElement): void
```

#### `unmountCreateOrganization()` params

| Name | Type           | Description                                                                             |
| ---- | -------------- | --------------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <CreateOrganization /> component instance |

#### `unmountCreateOrganization()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="create-organization"></div>
`

const createOrgDiv = document.getElementById('create-organization')

clerk.mountCreateOrganization(createOrgDiv)

// ...

clerk.unmountCreateOrganization(createOrgDiv)
```

### `openCreateOrganization()`

Opens the `<CreateOrganization />` component as an overlay at the root of your HTML `body` element.

```typescript
function openCreateOrganization(props?: CreateOrganizationProps): void
```

#### `openCreateOrganization()` params

| Name   | Type                    | Description                                                     |
| ------ | ----------------------- | --------------------------------------------------------------- |
| props? | CreateOrganizationProps | The properties to pass to the <CreateOrganization /> component |

#### `openCreateOrganization()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="create-organization"></div>
`

const createOrgDiv = document.getElementById('create-organization')

clerk.openCreateOrganization(createOrgDiv)
```

### `closeCreateOrganization()`

Closes the organization profile overlay.

```typescript
function closeCreateOrganization(): void
```

#### `closeCreateOrganization()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="create-organization"></div>
`

const createOrgDiv = document.getElementById('create-organization')

clerk.openCreateOrganization(createOrgDiv)

// ...

clerk.closeCreateOrganization(createOrgDiv)
```

## Properties

All props are optional.

| Name                       | Type                    | Description                                                                                                                                                                                 |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance                 | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                   |
| afterCreateOrganizationUrl | string                  | Full URL or path to navigate to after creating a new organization.                                                                                                                          |
| routing                    | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React.                 |
| path                       | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash-based routing. For example: /create-organization.                                             |
| skipInvitationScreen       | boolean                 | Hides the screen for sending invitations after an Organization is created. When left undefined, Clerk will automatically hide the screen if the number of max allowed members is equal to 1 |
| hideSlug                   | boolean                 | Hides the optional slug field in the Organization creation screen.                                                                                                                          |
| fallback?                  | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                                         |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
