# <CheckoutButton /> component

![The <CheckoutButton /> component renders a button that opens the checkout drawer.](https://clerk.com/docs/images/ui-components/checkout-button.svg)

The `<CheckoutButton />` component renders a button that opens the checkout drawer when selected, allowing users to subscribe to a Plan for either their Personal Account or an Organization. It must be wrapped inside a [`<SignedIn />`](https://clerk.com/docs/vue/reference/components/control/signed-in.md) component to ensure the user is authenticated.

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

## Usage

`<CheckoutButton />` must be wrapped inside a [`<SignedIn />`](https://clerk.com/docs/vue/reference/components/control/signed-in.md) component to ensure the user is authenticated.

```tsx
<>
  // ❌ This will throw an error
  <CheckoutButton planId="cplan_xxx" />
  // ✅ Correct usage
  <SignedIn>
    <CheckoutButton planId="cplan_xxx" />
  </SignedIn>
</>
```

`<CheckoutButton />` will throw an error if the `for` prop is set to `'organization'` and no Active Organization is set.

```tsx
<>
  // ❌ This will throw an error if no Organization is active
  <CheckoutButton planId="cplan_xxx" for="organization" />
  // ✅ Correct usage
  {auth.orgId ? <CheckoutButton planId="cplan_xxx" for="organization" /> : null}
</>
```

`<CheckoutButton />` preserves any click handlers attached to custom button elements, while maintaining the checkout drawer functionality.

```tsx
<CheckoutButton planId="cplan_xxx">
  <button onClick={() => console.log('Starting checkout')} className="custom-button">
    Start Subscription
  </button>
</CheckoutButton>
```

### Examples

```vue {{ filename: 'pricing.vue' }}
<script setup lang="ts">
import { SignedIn } from '@clerk/vue'
import { CheckoutButton } from '@clerk/vue/experimental'
</script>

<template>
  <SignedIn>
    <!-- Basic usage -->
    <CheckoutButton planId="cplan_xxx" planPeriod="month" />

    <!-- Customizes the appearance of the checkout drawer -->
    <CheckoutButton
      planId="cplan_xxx"
      planPeriod="annual"
      :checkoutProps="{
        appearance: {
          /* custom theme */
        },
      }"
    />

    <!-- Custom button -->
    <CheckoutButton
      planId="cplan_xxx"
      planPeriod="annual"
      :onSubscriptionComplete="
        () => {
          console.log('Subscription completed!')
        }
      "
      newSubscriptionRedirectUrl="/dashboard"
    >
      <button class="custom-button">Subscribe Now - $9.99/month</button>
    </CheckoutButton>
  </SignedIn>
</template>
```

## Properties

| Name                                                                                                                              | Type                     | Description                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------ |
| planId                                                                                                                            | string                   | The ID of the Plan to subscribe to.                                                              |
| planPeriod?                                                                                                                       | 'month' | 'annual'      | The billing period for the Subscription.                                                         |
| for?                                                                                                                              | 'user' | 'organization' | Determines whether the Subscription is for the current user or Organization. Defaults to 'user'. |
| children?                                                                                                                         | React.ReactNode          | A custom button element. If not provided, defaults to a button with the text "Checkout".         |
| onSubscriptionComplete?                                                                                                           | () => void               | A callback function that is called when a Subscription is successfully completed.                |
| newSubscriptionRedirectUrl?                                                                                                       | string                   | The URL to redirect to after a successful Subscription.                                          |
| appearance: an object used to style your components. For example: <CheckoutButton checkoutProps={{ appearance: { ... } }} />. |                          |                                                                                                  |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
