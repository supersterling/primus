# <Protect>

The [`<Protect />`](https://clerk.com/docs/astro/reference/components/control/protect.md) component protects content or even entire routes based on:

- authentication: whether the user is signed-in or not.
- authorization: whether the user has been granted a specific type of access control (Role, Permission, Feature, or Plan)

`<Protect />` **always** performs authentication checks. To perform authorization checks, you can pass different props, like `role`, `permission`, `feature`, or `plan`.

`<Protect />` accepts a `fallback` prop that will be rendered if the user fails the authentication or authorization checks.

`<Protect />` can be used both client-side and server-side (in Server Components).

> This component only **visually hides** its children when the current user is not authorized. The contents of its children remain accessible via the browser's source code even if the user fails the authorization check. Do not use this component to hide sensitive information that should be completely inaccessible to unauthorized users. For truly sensitive data, perform authorization checks on the server before sending the data to the client.

## Usage

### Authentication checks

`<Protect />` always performs authentication checks. It will render its children if the user is signed-in, and its `fallback` prop if the user is signed-out.

```astro {{ filename: 'src/pages/dashboard.astro' }}
---
import { Protect } from '@clerk/astro/components'
---

<Protect>
  <p slot="fallback">Users that are signed-out can see this.</p>
  <p>Users that are signed-in can see this.</p>
</Protect>
```

### Authorization checks

To limit who is able to see the content that `<Protect>` renders, you can pass **one** of the access control props: `permission`, `role`, `feature`, or `plan`. It's recommended to use **Permission-based** authorization over **Role-based** authorization, and **Feature-based** authorization over **Plan-based** authorization, as they are more flexible, easier to manage, and more secure.

If you do not pass any of the access control props, `<Protect>` will render its children if the user is signed in, regardless of their Role or its Permissions.

For more complex authorization logic, [`pass conditional logic to the condition prop`](https://clerk.com/docs/astro/reference/components/control/protect.md#render-content-conditionally).

### Render content by Permissions

The following example demonstrates how to use the `<Protect />` component to protect content by checking if the user has the `org:invoices:create` Permission.

```astro {{ filename: 'src/pages/invoices.astro' }}
---
import { Protect } from '@clerk/astro/components'
---

<Protect permission="org:invoices:create">
  <p slot="fallback">You do not have the Permissions to create an invoice.</p>
  <p>Users with Permission org:invoices:create can see this.</p>
</Protect>
```

### Render content by Role

While authorization by `permission` is **recommended**, for convenience, `<Protect>` allows a `role` prop to be passed.

The following example demonstrates how to use the `<Protect />` component to protect content by checking if the user has the `org:billing` Role.

```astro {{ filename: 'src/pages/billing.astro' }}
---
import { Protect } from '@clerk/astro/components'
---

<Protect role="org:billing">
  <p slot="fallback">Only a member of the Billing department can access this content.</p>
  <p>Users with Role org:billing can see this.</p>
</Protect>
```

### Render content by Plan

The following example demonstrates how to use `<Protect />` to protect content by checking if the user has a Plan.

```astro {{ filename: 'src/pages/bronze.astro' }}
---
import { Protect } from '@clerk/astro/components'
---

<Protect plan="bronze">
  <p slot="fallback">Sorry, only subscribers to the Bronze plan can access this content.</p>
  <p>Welcome, Bronze subscriber!</p>
</Protect>
```

### Render content by Feature

The following example demonstrates how to use `<Protect />` to protect content by checking if the user has a Feature.

```astro {{ filename: 'src/pages/premium-access.astro' }}
---
import { Protect } from '@clerk/astro/components'
---

<Protect feature="premium_access">
  <p slot="fallback">
    Sorry, only subscribers with the Premium Access feature can access this content.
  </p>
  <p>Congratulations! You have access to the Premium Access feature.</p>
</Protect>
```

### Render content conditionally

The following example uses `<Protect>`'s `condition` prop to conditionally render its children if the user has the correct Role.

```astro
---
import { Protect } from '@clerk/astro/components'
---

<Protect condition={(has) => has({ role: 'org:admin' }) || has({ role: 'org:billing_manager' })}>
  <p slot="fallback">Only an Admin or Billing Manager can access this content.</p>
  <p>The settings page.</p>
</Protect>
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
