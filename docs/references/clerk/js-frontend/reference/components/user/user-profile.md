# <UserProfile /> component

The `<UserProfile />` component is used to render a beautiful, full-featured account management UI that allows users to manage their profile, security, and billing settings.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<UserProfile />` component:

- [`mountUserProfile()`](https://clerk.com/docs/js-frontend/reference/components/user/user-profile.md#mount-user-profile)
- [`unmountUserProfile()`](https://clerk.com/docs/js-frontend/reference/components/user/user-profile.md#unmount-user-profile)
- [`openUserProfile()`](https://clerk.com/docs/js-frontend/reference/components/user/user-profile.md#open-user-profile)
- [`closeUserProfile()`](https://clerk.com/docs/js-frontend/reference/components/user/user-profile.md#close-user-profile)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountUserProfile()`

Render the `<UserProfile />` component to an HTML `<div>` element.

```typescript
function mountUserProfile(node: HTMLDivElement, props?: UserProfileProps): void
```

#### `mountUserProfile()` params

| Name   | Type             | Description                                                         |
| ------ | ---------------- | ------------------------------------------------------------------- |
| node   | HTMLDivElement   | The <div> element used to render in the <UserProfile /> component |
| props? | UserProfileProps | The properties to pass to the <UserProfile /> component            |

#### `mountUserProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-profile"></div>
`

const userProfileDiv = document.getElementById('user-profile')

clerk.mountUserProfile(userProfileDiv)
```

### `unmountUserProfile()`

Unmount and run cleanup on an existing `<UserProfile />` component instance.

```typescript
function unmountUserProfile(node: HTMLDivElement): void
```

#### `unmountUserProfile()` params

| Name | Type           | Description                                                                       |
| ---- | -------------- | --------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <UserProfile /> component instance. |

#### `unmountUserProfile()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-profile"></div>
`

const userProfileDiv = document.getElementById('user-profile')

clerk.mountUserProfile(userProfileDiv)

// ...

clerk.unmountUserProfile(userProfileDiv)
```

### `openUserProfile()`

Opens the `<UserProfile />` component as an overlay at the root of your HTML `body` element.

```typescript
function openUserProfile(props?: UserProfileProps): void
```

#### `openUserProfile()` params

| Name   | Type             | Description                                              |
| ------ | ---------------- | -------------------------------------------------------- |
| props? | UserProfileProps | The properties to pass to the <UserProfile /> component |

#### `openUserProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-profile"></div>
`

const userProfileDiv = document.getElementById('user-profile')

clerk.openUserProfile(userProfileDiv)
```

### `closeUserProfile()`

Closes the user profile overlay.

```typescript
function closeUserProfile(): void
```

#### `closeUserProfile()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-profile"></div>
`

const userProfileDiv = document.getElementById('user-profile')

clerk.closeUserProfile(userProfileDiv)
```

## Properties

All props are optional.

| Name                  | Type                    | Description                                                                                                                                                                 |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appearance            | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                   |
| routing               | 'hash' | 'path'        | The routing strategy for your pages. Defaults to 'path' for frameworks that handle routing, such as Next.js and Remix. Defaults to hash for all other SDK's, such as React. |
| path                  | string                  | The path where the component is mounted on when routing is set to path. It is ignored in hash-based routing. For example: /user-profile.                                    |
| additionalOAuthScopes | object                  | Specify additional scopes per OAuth provider that your users would like to provide if not already approved. For example: {google: ['foo', 'bar'], github: ['qux']}.      |
| customPages           | CustomPage[]           | An array of custom pages to add to the user profile. Only available for the JavaScript SDK. To add custom pages with React-based SDK's, see the dedicated guide.            |
| fallback?             | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                         |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

In addition, you also can add custom pages and links to the `<UserProfile />` navigation sidenav. For more information, refer to the [`Custom Pages documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-profile.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
