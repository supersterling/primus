# <Protect>

The [`<Protect />`](https://clerk.com/docs/vue/reference/components/control/protect.md) component protects content or even entire routes based on:

- authentication: whether the user is signed-in or not.
- authorization: whether the user has been granted a specific type of access control (Role, Permission, Feature, or Plan)

`<Protect />` **always** performs authentication checks. To perform authorization checks, you can pass different props, like `role`, `permission`, `feature`, or `plan`.

`<Protect />` accepts a `fallback` prop that will be rendered if the user fails the authentication or authorization checks.

`<Protect />` can be used both client-side and server-side (in Server Components).

> This component only **visually hides** its children when the current user is not authorized. The contents of its children remain accessible via the browser's source code even if the user fails the authorization check. Do not use this component to hide sensitive information that should be completely inaccessible to unauthorized users. For truly sensitive data, perform authorization checks on the server before sending the data to the client.

## Usage

### Authentication checks

`<Protect />` always performs authentication checks. It will render its children if the user is signed-in, and its `fallback` prop if the user is signed-out.

```vue
<script setup lang="ts">
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect>
    <template #fallback>
      <p>Users that are signed-out can see this.</p>
    </template>
    <p>Users that are signed-in can see this.</p>
  </Protect>
</template>
```

### Authorization checks

To limit who is able to see the content that `<Protect>` renders, you can pass **one** of the access control props: `permission`, `role`, `feature`, or `plan`. It's recommended to use **Permission-based** authorization over **Role-based** authorization, and **Feature-based** authorization over **Plan-based** authorization, as they are more flexible, easier to manage, and more secure.

If you do not pass any of the access control props, `<Protect>` will render its children if the user is signed in, regardless of their Role or its Permissions.

For more complex authorization logic, [`pass conditional logic to the condition prop`](https://clerk.com/docs/vue/reference/components/control/protect.md#render-content-conditionally).

### Render content by Permissions

The following example demonstrates how to use the `<Protect />` component to protect content by checking if the user has the `org:invoices:create` Permission.

```vue
<script setup lang="ts">
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect permission="org:invoices:create">
    <template #fallback>
      <p>You do not have the Permissions to create an invoice.</p>
    </template>
    <p>Users with Permission org:invoices:create can see this.</p>
  </Protect>
</template>
```

### Render content by Role

While authorization by `permission` is **recommended**, for convenience, `<Protect>` allows a `role` prop to be passed.

The following example demonstrates how to use the `<Protect />` component to protect content by checking if the user has the `org:billing` Role.

```vue
<script setup lang="ts">
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect role="org:billing">
    <template #fallback>
      <p>Only a member of the Billing department can access this content.</p>
    </template>
    <p>Users with Role org:billing can see this.</p>
  </Protect>
</template>
```

### Render content by Plan

The following example demonstrates how to use `<Protect />` to protect content by checking if the user has a Plan.

```vue
<script setup lang="ts">
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect plan="bronze">
    <template #fallback>
      <p>Sorry, only subscribers to the Bronze plan can access this content.</p>
    </template>
    <p>Welcome, Bronze subscriber!</p>
  </Protect>
</template>
```

### Render content by Feature

The following example demonstrates how to use `<Protect />` to protect content by checking if the user has a Feature.

```vue
<script setup lang="ts">
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect feature="premium_access">
    <template #fallback>
      <p>Sorry, only subscribers with the Premium Access feature can access this content.</p>
    </template>
    <p>Congratulations! You have access to the Premium Access feature.</p>
  </Protect>
</template>
```

### Render content conditionally

The following example uses `<Protect>`'s `condition` prop to conditionally render its children if the user has the correct Role.

```vue
<script setup>
import { Protect } from '@clerk/vue'
</script>

<template>
  <Protect :condition="(has) => has({ role: 'org:admin' }) || has({ role: 'org:billing_manager' })">
    <template #fallback>
      <p>Only an Admin or Billing Manager can access this content.</p>
    </template>
    <p>The settings page.</p>
  </Protect>
</template>
```

## Properties

| Name                     | Type           | Description                                                                                                      |
| ------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| condition?               | has => boolean | Optional conditional logic that renders the children if it returns true.                                         |
| fallback?                | JSX            | Optional UI to show when a user doesn't have the correct type of access control to access the protected content. |
| feature?                 | string         | Optional string corresponding to a Feature.                                                                      |
| plan?                    | string         | Optional string corresponding to a Plan.                                                                         |
| permission?              | string         | Optional string corresponding to a Permission in the format org:<feature>:<permission>                         |
| role?                    | string         | Optional string corresponding to a Role in the format org:<role>                                                |
| treatPendingAsSignedOut? | boolean        | A boolean that indicates whether to treat pending sessions as signed out. Defaults to true.                      |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
