# Add custom items and links to the <UserButton /> component

The [`<UserButton />`](https://clerk.com/docs/js-frontend/reference/components/user/user-button.md) component supports _custom_ menu items, allowing the incorporation of app-specific settings or additional functionality.

There are two types of custom menu items available:

- [`<UserButton.Action>`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-button.md#user-button-action) - A menu item that triggers an action when clicked.
- [`<UserButton.Link>`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-button.md#user-button-link) - A menu item that navigates to a page when clicked.

You can also [`reorder default items`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-button.md#reorder-default-items) and [`conditionally render menu items`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-button.md#conditionally-render-menu-items).

## `<UserButton.Action>`

`<UserButton.Action />` allows you to add actions to the `<UserButton />` component, like opening a chat or triggering a modal.

### Props

`<UserButton.Action />` accepts the following props:

| Name      | Type               | Description                                                                           |
| --------- | ------------------ | ------------------------------------------------------------------------------------- |
| label     | string             | The name that will be displayed in the menu of the user button.                       |
| labelIcon | React.ReactElement | An icon displayed next to the label in the menu.                                      |
| open?     | string             | The path segment that will be used to open the user profile modal to a specific page. |
| onClick?  | void               | A function to be called when the menu item is clicked.                                |

### Examples

#### Add an action

The following example adds an "Open chat" action to the `<UserButton />` component. When a user selects the `<UserButton />`, there will be an "Open chat" menu item.

To add custom menu items to the `<UserButton />` component using the [JavaScript SDK](https://clerk.com/docs/reference/javascript/overview.md), pass the `customMenuItems` property to the `mountUserButton()` method, as shown in the following example:

```js {{ filename: 'main.js', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userButtonDiv = document.getElementById('user-button')

clerk.mountUserButton(userButtonDiv, {
  customMenuItems: [
    {
      label: 'Open chat',
      onClick: () => {
        alert('init chat') // your custom event
      },
      mountIcon: (el) => {
        el.innerHTML = '👤'
      },
      unmountIcon: (el) => {},
    },
  ],
})
```

#### Add an action and a custom page

The following example adds an "Open help" action to the `<UserButton />` component, as well as a [`custom page`](https://clerk.com/docs/js-frontend/guides/customizing-clerk/adding-items/user-profile.md) titled "Help". When a user selects the `<UserButton />`, there will be "Open help" and "Help" menu items.

To add custom pages to the `<UserProfile />` component using the [JavaScript SDK](https://clerk.com/docs/reference/javascript/overview.md), pass the `customPages` property to the `mountUserProfile()` method, as shown in the following example:

```js {{ filename: 'main.js', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
  <div id="user-profile"></div>
`

const userButtonDiv = document.getElementById('user-button')
const userProfileDiv = document.getElementById('user-profile')

clerk.mountUserButton(userButtonDiv, {
  customMenuItems: [
    {
      label: 'Open help',
      onClick: () => {
        window.location.href = '/#/help'
      },
      mountIcon: (el) => {
        el.innerHTML = '👤'
      },
      unmountIcon: (el) => {},
    },
  ],
})

clerk.mountUserProfile(userProfileDiv, {
  customPages: [
    {
      url: '/help',
      label: 'Help',
      mountIcon: (el) => {
        el.innerHTML = '👤'
      },
      unmountIcon: (el) => {
        el.innerHTML = ''
      },
      mount: (el) => {
        el.innerHTML = `
          <h1>Help Page</h1>
          <p>This is the custom help page</p>
          `
      },
      unmount: (el) => {
        el.innerHTML = ''
      },
    },
  ],
})
```

## `<UserButton.Link>`

`<UserButton.Link />` allows you to add links to the `<UserButton />` component, like custom pages or external URLs.

### Props

`<UserButton.Link />` accept the following props, all of which are **required**:

| Name      | Type               | Description                                                        |
| --------- | ------------------ | ------------------------------------------------------------------ |
| label     | string             | The name that will be displayed in the menu of the user button.    |
| labelIcon | React.ReactElement | An icon displayed next to the label in the menu.                   |
| href      | string             | The path segment that will be used to navigate to the custom page. |

### Example

The following example adds a "Create organization" link to the `<UserButton />` component. When a user selects the `<UserButton />`, there will be a "Create organization" menu item.

To add custom menu items to the `<UserButton />` component using the [JavaScript SDK](https://clerk.com/docs/reference/javascript/overview.md), pass the `customMenuItems` property to the `mountUserButton()` method, as shown in the following example:

```js {{ filename: 'main.js', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userButtonDiv = document.getElementById('user-button')

clerk.mountUserButton(userButtonDiv, {
  customMenuItems: [
    {
      label: 'Create organization',
      href: '/create-organization',
      mountIcon: (el) => {
        el.innerHTML = '👤'
      },
      unmountIcon: (el) => {},
    },
  ],
})
```

## Reorder default items

The `<UserButton />` component includes two default menu items: `Manage account` and `Sign out`, in that order. You can reorder these default items by setting the `label` prop to `'manageAccount'` or `'signOut'`. This will target the existing default item and allow you to rearrange it.

In the following example, the "Sign out" menu item is moved to the top of the menu, a custom "Create organization" link is added as the second menu item, and the "Manage account" menu item is moved to the bottom of the menu.

```js {{ filename: 'main.js', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userButtonDiv = document.getElementById('user-button')

clerk.mountUserButton(userButtonDiv, {
  customMenuItems: [
    {
      label: 'signOut',
    },
    {
      label: 'Create organization',
      href: '/create-organization',
      mountIcon: (el) => {
        el.innerHTML = '👤'
      },
      unmountIcon: (el) => {},
    },
    {
      label: 'manageAccount',
    },
  ],
})
```

## Conditionally render menu items

To conditionally render menu items based on a user's Role or Custom Permissions, you can use the [`checkAuthorization()`](https://clerk.com/docs/reference/javascript/session.md#check-authorization) method to check if a user is authorized.

In the following example, the "Create organization" menu item will only render if the current user has the `org:app:admin` permission.

```js {{ filename: 'main.js', collapsible: true }}
import { Clerk } from '@clerk/clerk-js'

const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

document.getElementById('app').innerHTML = `
  <div id="user-button"></div>
`

const userButtonDiv = document.getElementById('user-button')
// Check if the user is authenticated
if (clerk.isSignedIn) {
  const hasAdminPermission = clerk.session.checkAuthorization({
    permission: 'org:app:admin',
  })

  if (hasAdminPermission) {
    clerk.mountUserButton(userButtonDiv, {
      customMenuItems: [
        {
          label: 'signOut',
        },
        {
          label: 'Create organization',
          href: '/create-organization',
          mountIcon: (el) => {
            el.innerHTML = '👤'
          },
          unmountIcon: (el) => {},
        },
        {
          label: 'manageAccount',
        },
      ],
    })
  } else {
    clerk.mountUserButton(userButtonDiv)
  }
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
