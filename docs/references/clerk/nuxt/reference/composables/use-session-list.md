# useSessionList() | Vue

The `useSessionList()` composable returns an array of [`Session`](https://clerk.com/docs/reference/javascript/session.md) objects that have been registered on the client device.

## Returns

| Name        | Type                                              | Description                                                                                                          |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| isLoaded    | Ref<boolean>                                     | A boolean that indicates whether Clerk has completed initialization. Initially false, becomes true once Clerk loads. |
| setActive() | Ref<(params: SetActiveParams) => Promise<void>> | A function that sets the active session and/or Organization.                                                         |
| sessions    | Ref<Session>                                     | A list of sessions that have been registered on the client device.                                                   |

## How to use the `useSessionList()` composable

### Get a list of sessions

The following example uses `useSessionList()` to get a list of sessions that have been registered on the client device. The `sessions` property is used to show the number of times the user has visited the page.

```vue {{ filename: 'SessionList.vue' }}
<script setup>
import { useSessionList } from '@clerk/vue'

const { isLoaded, sessions } = useSessionList()
</script>

<template>
  <div v-if="!isLoaded">
    <!-- Handle loading state -->
  </div>

  <div v-else>
    <p>Welcome back. You've been here {{ sessions.length }} times before.</p>
  </div>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
