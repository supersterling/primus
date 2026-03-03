# Add custom items and links to the <UserButton /> component

The [`<UserButton />`](https://clerk.com/docs/astro/reference/components/user/user-button.md) component supports _custom_ menu items, allowing the incorporation of app-specific settings or additional functionality.

There are two types of custom menu items available:

- [`<UserButton.Action>`](https://clerk.com/docs/astro/guides/customizing-clerk/adding-items/user-button.md#user-button-action) - A menu item that triggers an action when clicked.
- [`<UserButton.Link>`](https://clerk.com/docs/astro/guides/customizing-clerk/adding-items/user-button.md#user-button-link) - A menu item that navigates to a page when clicked.

You can also [`reorder default items`](https://clerk.com/docs/astro/guides/customizing-clerk/adding-items/user-button.md#reorder-default-items) and [`conditionally render menu items`](https://clerk.com/docs/astro/guides/customizing-clerk/adding-items/user-button.md#conditionally-render-menu-items).

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

In Astro components, props are converted to strings, so you can't use an `onClick` handler to handle click events. Instead, you can set an arbitrary prop, set up a custom event listener that will check for the value passed to that prop, and then execute a desired action based on that value.

For example, `clickIdentifier` is the arbitrary prop being used to identify the click event. Two `<UserButton.Action />` components are added to the menu, each with a different `clickIdentifier` prop. When the menu item is clicked, the custom event listener will check for the value passed to the `clickIdentifier` prop, either `"open_chat"` or `"open_cart"`, and then execute an action based on that value.

```astro {{ filename: 'pages/index.astro', collapsible: true }}
---
import { UserButton } from '@clerk/astro/components'
---

<header>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action label="Open chat" clickIdentifier="open_chat">
        <svg
          slot="label-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </UserButton.Action>
      <UserButton.Action label="Open cart" clickIdentifier="open_cart">
        <svg
          slot="label-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </UserButton.Action>
    </UserButton.MenuItems>
  </UserButton>
</header>

<script>
  document.addEventListener('clerk:menu-item-click', (e) => {
    if (e.detail === 'open_chat') {
      console.log('init chat')
    }
    if (e.detail === 'open_cart') {
      console.log('init cart')
    }
  })
</script>
```

#### Add an action and a custom page

The following example adds an "Open help" action to the `<UserButton />` component, as well as a [`custom page`](https://clerk.com/docs/astro/guides/customizing-clerk/adding-items/user-profile.md) titled "Help". When a user selects the `<UserButton />`, there will be "Open help" and "Help" menu items.

```astro {{ filename: 'pages/index.astro', collapsible: true }}
---
import { UserButton } from '@clerk/astro/components'
---

<header>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action label="Open help" open="help">
        <svg
          slot="label-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </UserButton.Action>
    </UserButton.MenuItems>

    <UserButton.UserProfilePage label="Help" url="help">
      <svg
        slot="label-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
      </svg>
      <div>
        <h1>Help Page</h1>
        <p>This is the custom help page</p>
      </div>
    </UserButton.UserProfilePage>
  </UserButton>
</header>
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

```astro {{ filename: 'pages/index.astro', collapsible: true }}
---
import { UserButton } from '@clerk/astro/components'
---

<header>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Link label="Create organization" href="/create-organization">
        <svg
          slot="label-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </UserButton.Link>
    </UserButton.MenuItems>
  </UserButton>
</header>
```

## Reorder default items

The `<UserButton />` component includes two default menu items: `Manage account` and `Sign out`, in that order. You can reorder these default items by setting the `label` prop to `'manageAccount'` or `'signOut'`. This will target the existing default item and allow you to rearrange it.

In the following example, the "Sign out" menu item is moved to the top of the menu, a custom "Create organization" link is added as the second menu item, and the "Manage account" menu item is moved to the bottom of the menu.

```astro {{ filename: 'pages/index.astro', collapsible: true }}
---
import { UserButton } from '@clerk/astro/components'
---

<header>
  <UserButton>
    <UserButton.MenuItems>
      <UserButton.Action label="signOut" />
      <UserButton.Link label="Create organization" open="/create-organization">
        <svg
          slot="label-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
        </svg>
      </UserButton.Link>
      <UserButton.Action label="manageAccount" />
    </UserButton.MenuItems>
  </UserButton>
</header>
```

## Conditionally render menu items

To conditionally render menu items based on a user's Role or Custom Permissions, you can use the [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) helper function.

In the following example, the "Create organization" menu item will only render if the current user has the `org:app:admin` permission.

```astro {{ filename: 'pages/index.astro', collapsible: true }}
---
import { UserButton } from '@clerk/astro/components'

const { has } = Astro.locals.auth()

const isAdmin = has({ permission: 'org:app:admin' })
---

<header>
  <UserButton>
    {
      isAdmin && (
        <UserButton.MenuItems>
          <UserButton.Link label="Create organization" open="/create-organization">
            <svg
              slot="label-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </svg>
          </UserButton.Link>
        </UserButton.MenuItems>
      )
    }
  </UserButton>
</header>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
