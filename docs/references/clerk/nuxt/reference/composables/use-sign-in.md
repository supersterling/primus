# useSignIn() | Vue

The `useSignIn()` composable provides access to the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object, which allows you to check the current state of a sign-in attempt and manage the sign-in flow. You can use this to create a custom sign-in flow.

## Returns

| Name        | Type                                              | Description                                                                                                          |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| isLoaded    | Ref<boolean>                                     | A boolean that indicates whether Clerk has completed initialization. Initially false, becomes true once Clerk loads. |
| setActive() | Ref<(params: SetActiveParams) => Promise<void>> | A function that sets the active session.                                                                             |
| signIn      | Ref<SignIn>                                      | An object that contains the current sign-in attempt status and methods to create a new sign-in attempt.              |

## How to use the `useSignIn()` composable

The following example uses `useSignIn()` to access the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object, which contains the current sign-in attempt status and methods to create a new sign-in attempt. The `isLoaded` property is used to handle the loading state.

```vue {{ filename: 'SignInPage.vue' }}
<script setup>
import { useSignIn } from '@clerk/vue'

const { isLoaded, signIn } = useSignIn()
</script>

<template>
  <div v-if="!isLoaded">
    <!-- Add logic to handle loading state -->
  </div>

  <div v-else>The current sign in attempt status is {{ signIn?.status }}.</div>
</template>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
