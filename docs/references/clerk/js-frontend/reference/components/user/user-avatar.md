# <UserAvatar /> component

The `<UserAvatar />` component renders the authenticated user's avatar on its own, a common UI element found across many websites and applications.

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<UserAvatar />` component:

- [`mountUserAvatar()`](https://clerk.com/docs/js-frontend/reference/components/user/user-avatar.md#mount-user-avatar)
- [`unmountUserAvatar()`](https://clerk.com/docs/js-frontend/reference/components/user/user-avatar.md#unmount-user-avatar)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountUserAvatar()`

Render the `<UserAvatar />` component to an HTML `<div>` element.

```typescript
function mountUserAvatar(node: HTMLDivElement, props?: UserAvatarProps): void
```

#### `mountUserAvatar()` params

| Name   | Type            | Description                                                        |
| ------ | --------------- | ------------------------------------------------------------------ |
| node   | HTMLDivElement  | The <div> element used to render in the <UserAvatar /> component |
| props? | UserAvatarProps | The properties to pass to the <UserAvatar /> component            |

#### `mountUserAvatar()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-avatar"></div>
`

const userAvatarDiv = document.getElementById('user-avatar')

clerk.mountUserAvatar(userAvatarDiv)
```

### `unmountUserAvatar()`

Unmount and run cleanup on an existing `<UserAvatar />` component instance.

```typescript
function unmountUserAvatar(node: HTMLDivElement): void
```

#### `unmountUserAvatar()` params

| Name | Type           | Description                                                                      |
| ---- | -------------- | -------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <UserAvatar /> component instance. |

#### `unmountUserAvatar()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-avatar"></div>
`

const userAvatarDiv = document.getElementById('user-avatar')

clerk.mountUserAvatar(userAvatarDiv)

// ...

clerk.unmountUserAvatar(userAvatarDiv)
```

## Properties

The `<UserAvatar />` component accepts the following properties, all of which are **optional**:

| Name        | Type                    | Description                                                                                               |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| rounded?    | boolean                 | Determines whether the user avatar is displayed with rounded corners.                                     |
| appearance? | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages. |
| fallback?   | ReactNode               | Optional element to be rendered while the component is mounting.                                          |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
