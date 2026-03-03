# <UserButton /> component

The `<UserButton />` component renders the familiar user button UI popularized by Google. When selected, it opens a dropdown menu with options to manage account settings and sign out. The "Manage account" option launches the [`<UserProfile />`](https://clerk.com/docs/js-frontend/reference/components/user/user-profile.md) component, providing access to profile and security settings.

For users that have [multi-session](https://clerk.com/docs/guides/secure/session-options.md#multi-session-applications) enabled, the `<UserButton />` also allows users to sign into multiple accounts at once and instantly switch between them without the need for a full page reload. Learn more [here](https://clerk.com/docs/guides/secure/session-options.md#multi-session-applications).

## Usage with JavaScript

The following methods available on an instance of the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class are used to render and control the `<UserButton />` component:

- [`mountUserButton()`](https://clerk.com/docs/js-frontend/reference/components/user/user-button.md#mount-user-button)
- [`unmountUserButton()`](https://clerk.com/docs/js-frontend/reference/components/user/user-button.md#unmount-user-button)

The following examples assume that you have followed the [`quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) in order to add Clerk to your JavaScript application.

### `mountUserButton()`

Render the `<UserButton />` component to an HTML `<div>` element.

```typescript
function mountUserButton(node: HTMLDivElement, props?: UserButtonProps): void
```

#### `mountUserButton()` params

| Name   | Type            | Description                                                        |
| ------ | --------------- | ------------------------------------------------------------------ |
| node   | HTMLDivElement  | The <div> element used to render in the <UserButton /> component |
| props? | UserButtonProps | The properties to pass to the <UserButton /> component            |

#### `mountUserButton()` usage

```js {{ filename: 'main.js', mark: [15] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userbuttonDiv = document.getElementById('user-button')

clerk.mountUserButton(userbuttonDiv)
```

### `unmountUserButton()`

Unmount and run cleanup on an existing `<UserButton />` component instance.

```typescript
function unmountUserButton(node: HTMLDivElement): void
```

#### `unmountUserButton()` params

| Name | Type           | Description                                                                      |
| ---- | -------------- | -------------------------------------------------------------------------------- |
| node | HTMLDivElement | The container <div> element with a rendered <UserButton /> component instance. |

#### `unmountUserButton()` usage

```js {{ filename: 'main.js', mark: [19] }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userButtonDiv = document.getElementById('user-button')

clerk.mountUserButton(userButtonDiv)

// ...

clerk.unmountUserButton(userButtonDiv)
```

## Properties

The `<UserButton />` component accepts the following properties, all of which are **optional**:

| Name                                           | Type                    | Description                                                                                                                                                                                                                                      |
| ---------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| afterMultiSessionSingleSignOutUrl (deprecated) | string                  | Deprecated. Move afterMultiSessionSingleSignOutUrl to <ClerkProvider />. The full URL or path to navigate to after signing out from a currently active account in a multi-session app.                                                          |
| afterSignOutUrl (deprecated)                   | string                  | Deprecated. Move afterSignOutUrl to <ClerkProvider />. The full URL or path to navigate to after a successful sign-out.                                                                                                                         |
| afterSwitchSessionUrl                          | string                  | The full URL or path to navigate to after a successful account change in a multi-session app.                                                                                                                                                    |
| appearance                                     | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                                                                                        |
| defaultOpen                                    | boolean                 | Controls whether the <UserButton /> should open by default during the first render.                                                                                                                                                             |
| showName                                       | boolean                 | Controls if the user name is displayed next to the user image button.                                                                                                                                                                            |
| signInUrl                                      | string                  | The full URL or path to navigate to when the Add another account button is clicked. It's recommended to use the environment variable instead.                                                                                                    |
| userProfileMode                                | 'modal' | 'navigation' | Controls whether selecting the Manage your account button will cause the <UserProfile /> component to open as a modal, or if the browser will navigate to the userProfileUrl where <UserProfile /> is mounted as a page. Defaults to: 'modal'. |
| userProfileProps                               | object                  | Specify options for the underlying <UserProfile /> component. For example: {additionalOAuthScopes: {google: ['foo', 'bar'], github: ['qux']}}.                                                                                              |
| userProfileUrl                                 | string                  | The full URL or path leading to the user management interface.                                                                                                                                                                                   |
| fallback?                                      | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                                                                                              |

## Customization

To learn about how to customize Clerk components, see the [`customization documentation`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/appearance-prop/overview.md).

You can also [`add custom actions and links to the <UserButton /> menu`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-button.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
