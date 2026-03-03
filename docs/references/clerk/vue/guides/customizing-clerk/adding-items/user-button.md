# Add custom items and links to the <UserButton /> component

The [`<UserButton />`](https://clerk.com/docs/vue/reference/components/user/user-button.md) component supports _custom_ menu items, allowing the incorporation of app-specific settings or additional functionality.

There are two types of custom menu items available:

- [`<UserButton.Action>`](https://clerk.com/docs/vue/guides/customizing-clerk/adding-items/user-button.md#user-button-action) - A menu item that triggers an action when clicked.
- [`<UserButton.Link>`](https://clerk.com/docs/vue/guides/customizing-clerk/adding-items/user-button.md#user-button-link) - A menu item that navigates to a page when clicked.

You can also [`reorder default items`](https://clerk.com/docs/vue/guides/customizing-clerk/adding-items/user-button.md#reorder-default-items) and [`conditionally render menu items`](https://clerk.com/docs/vue/guides/customizing-clerk/adding-items/user-button.md#conditionally-render-menu-items).

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

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { UserButton } from '@clerk/vue'

function openChat() {
  alert('init chat')
}
</script>

<template>
  <header>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="Open chat" @click="openChat">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
            </svg>
          </template>
        </UserButton.Action>
      </UserButton.MenuItems>
    </UserButton>
  </header>
</template>
```

#### Add an action and a custom page

The following example adds an "Open help" action to the `<UserButton />` component, as well as a [`custom page`](https://clerk.com/docs/vue/guides/customizing-clerk/adding-items/user-profile.md) titled "Help". When a user selects the `<UserButton />`, there will be "Open help" and "Help" menu items.

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { UserButton } from '@clerk/vue'
</script>

<template>
  <header>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="Open help" open="help">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
            </svg>
          </template>
        </UserButton.Action>
      </UserButton.MenuItems>

      <UserButton.UserProfilePage label="Help" url="help">
        <template #labelIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
          </svg>
        </template>
        <div>
          <h1>Help Page</h1>
          <p>This is the custom help page</p>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  </header>
</template>
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

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { UserButton } from '@clerk/vue'
</script>

<template>
  <header>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label="Create organization" href="/create-organization">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
            </svg>
          </template>
        </UserButton.Link>
      </UserButton.MenuItems>
    </UserButton>
  </header>
</template>
```

## Reorder default items

The `<UserButton />` component includes two default menu items: `Manage account` and `Sign out`, in that order. You can reorder these default items by setting the `label` prop to `'manageAccount'` or `'signOut'`. This will target the existing default item and allow you to rearrange it.

In the following example, the "Sign out" menu item is moved to the top of the menu, a custom "Create organization" link is added as the second menu item, and the "Manage account" menu item is moved to the bottom of the menu.

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { UserButton } from '@clerk/vue'
</script>

<template>
  <header>
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action label="signOut" />
        <UserButton.Link label="Create organization" href="/create-organization">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
            </svg>
          </template>
        </UserButton.Link>
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  </header>
</template>
```

## Conditionally render menu items

To conditionally render menu items based on a user's Role or Custom Permissions, you can use the [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) helper function.

In the following example, the "Create organization" menu item will only render if the current user has the `org:app:admin` permission.

```vue {{ filename: 'App.vue' }}
<script setup lang="ts">
import { UserButton, useAuth } from '@clerk/vue'
import { computed } from 'vue'

const { has, isLoaded } = useAuth()

const isAdmin = computed(() => has.value?.({ permission: 'org:app:admin' }))
</script>

<template>
  <header v-if="isLoaded && isAdmin">
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link label="Create organization" href="/create-organization">
          <template #labelIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
            </svg>
          </template>
        </UserButton.Link>
      </UserButton.MenuItems>
    </UserButton>
  </header>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
