# <SubscriptionDetailsButton /> component

![The <SubscriptionDetailsButton /> component renders a button that opens the Subscription details drawer.](https://clerk.com/docs/images/ui-components/subscription.svg)

The `<SubscriptionDetailsButton />` component renders a button that opens the Subscription details drawer when selected, allowing users to view and manage their Subscription details, whether for their Personal Account or Organization. It must be wrapped inside a [`<SignedIn />`](https://clerk.com/docs/vue/reference/components/control/signed-in.md) component to ensure the user is authenticated.

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

## Usage

`<SubscriptionDetailsButton />` must be wrapped inside a [`<SignedIn />`](https://clerk.com/docs/vue/reference/components/control/signed-in.md) component to ensure the user is authenticated.

```tsx
<>
  // ❌ This will throw an error
  <SubscriptionDetailsButton />
  // ✅ Correct usage
  <SignedIn>
    <SubscriptionDetailsButton />
  </SignedIn>
</>
```

`<SubscriptionDetailsButton />` will throw an error if the `for` prop is set to `'organization'` and no Active Organization is set.

```tsx
<>
  // ❌ This will throw an error if no Organization is active
  <SubscriptionDetailsButton for="organization" />
  // ✅ Correct usage
  {auth.orgId ? <SubscriptionDetailsButton for="organization" /> : null}
</>
```

### Examples

```vue {{ filename: 'billing.vue' }}
<script setup lang="ts">
import { SignedIn } from '@clerk/vue'
import { SubscriptionDetailsButton } from '@clerk/vue/experimental'
</script>

<template>
  <SignedIn>
    <!-- Basic usage -->
    <SubscriptionDetailsButton />

    <!-- Customizes the appearance of the Subscription details drawer -->
    <SubscriptionDetailsButton
      :subscriptionDetailsProps="{
        appearance: {
          /* custom theme */
        },
      }"
    />

    <!-- Custom button -->
    <SubscriptionDetailsButton :onSubscriptionCancel="() => console.log('Subscription canceled')">
      <button class="custom-button">Manage Subscription</button>
    </SubscriptionDetailsButton>
  </SignedIn>
</template>
```

## Properties

All props are optional.

| Name                                                                                                                                                    | Type                     | Description                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| for?                                                                                                                                                    | 'user' | 'organization' | Determines whether to show Subscription details for the current user or Organization. Defaults to 'user'.   |
| children?                                                                                                                                               | React.ReactNode          | Optional custom button element. If not provided, defaults to a button with the text "Subscription details". |
| onSubscriptionCancel?                                                                                                                                   | () => void               | A callback function that is called when a Subscription is cancelled.                                        |
| appearance: an object used to style your components. For example: <SubscriptionDetailsButton subscriptionDetailsProps={{ appearance: { ... } }} />. |                          |                                                                                                             |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
