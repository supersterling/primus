# useUser() | Vue

The `useUser()` composable provides access to the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains all the data for a single user in your application and provides methods to manage their account. This composable also allows you to check if the user is signed in and if Clerk has loaded and initialized.

## Returns

| Name       | Type          | Description                                                                                                          |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| isLoaded   | Ref<boolean> | A boolean that indicates whether Clerk has completed initialization. Initially false, becomes true once Clerk loads. |
| user       | Ref<User>    | The User object for the current active user. If the user isn't signed in, user will be null.                         |
| isSignedIn | Ref<boolean> | Indicates whether a user is currently signed in.                                                                     |

## How to use the `useUser()` composable

### Get the current user

The following example uses the `useUser()` composable to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which contains the current user's data such as their full name. The `isLoaded` and `isSignedIn` properties are used to handle the loading state and to check if the user is signed in, respectively.

```vue {{ filename: 'GetCurrentUser.vue' }}
<script setup>
import { useUser } from '@clerk/vue'

const { isSignedIn, user, isLoaded } = useUser()
</script>

<template>
  <div v-if="!isLoaded">
    <!-- Handle loading state -->
  </div>

  <div v-else-if="isSignedIn">Hello {{ user?.fullName }}!</div>

  <div v-else>Not signed in</div>
</template>
```

### Update user data

The following example uses the `useUser()` composable to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`update()`](https://clerk.com/docs/reference/javascript/user.md#update) method to update the current user's information.

```vue {{ filename: 'UpdateUser.vue' }}
<script setup>
import { useUser } from '@clerk/vue'

const { isLoaded, user } = useUser()

const updateUser = async () => {
  await user.value?.update({
    firstName: 'John',
    lastName: 'Doe',
  })
}
</script>

<template>
  <div v-if="!isLoaded">
    <!-- Handle loading state -->
  </div>

  <div v-else-if="user">
    <button @click="updateUser">Update your name</button>
    <p>user.firstName: {{ user?.firstName }}</p>
    <p>user.lastName: {{ user?.lastName }}</p>
  </div>
</template>
```

### Reload user data

The following example uses the `useUser()` composable to access the [`User`](https://clerk.com/docs/reference/javascript/user.md) object, which calls the [`reload()`](https://clerk.com/docs/reference/javascript/user.md#reload) method to get the latest user's information.

You only need to call `user.reload()` if you've updated the `User` object outside of the `user.update()` method or Clerk hooks; for example, if you made changes through an API endpoint.

```vue {{ filename: 'ReloadUser.vue' }}
<script setup>
import { useUser } from '@clerk/vue'

const { isLoaded, user } = useUser()

const updateUser = async () => {
  // Update user data via an API endpoint
  const updateMetadata = await fetch('/api/updateMetadata')

  // Check if the update was successful
  if (updateMetadata.message !== 'success') {
    throw new Error('Error updating')
  }

  // If the update was successful, reload the user data
  await user.value?.reload()
}
</script>

<template>
  <div v-if="!isLoaded">
    <!-- Handle loading state -->
  </div>

  <div v-else-if="user">
    <button @click="updateUser">Update your metadata</button>
    <p>user role: {{ user.publicMetadata?.role }}</p>
  </div>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
