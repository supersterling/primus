# usePaymentElement()

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

The `usePaymentElement()` hook is used to control the payment form rendered by the [`<PaymentElement />`](https://clerk.com/docs/nextjs/reference/hooks/use-payment-element.md#payment-element) component. It provides the necessary state and methods to submit payment details to a payment provider like Stripe.

This hook must be used within a component that is a descendant of the `<PaymentElementProvider />` component. It is typically used in a checkout flow that prompts a user to add a new payment method, or for adding a new payment method outside of a checkout.

## Parameters

`usePaymentElement()` doesn't accept any parameters. It derives its state and configuration from the nearest [`<PaymentElementProvider />`](https://clerk.com/docs/nextjs/reference/hooks/use-payment-element.md#payment-element-provider).

## Returns

`usePaymentElement()` returns an object with the following properties:

| Property                                       | Type                                                                                                                                           | Description                                                                                                                                                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="isformready"></a> `isFormReady`         | `boolean`                                                                                                                                      | A boolean that indicates if the payment form UI has been rendered and is ready for user input. This is useful for disabling a submit button until the form is interactive.                                    |
| <a id="isproviderready"></a> `isProviderReady` | `boolean`                                                                                                                                      | A boolean that indicates if the underlying payment provider (e.g. Stripe) has been fully initialized.                                                                                                         |
| <a id="provider"></a> `provider`               | `undefined | { name: "stripe"; }`                                                                                                   | An object containing information about the initialized payment provider. It is `undefined` until `isProviderReady` is `true`.                                                                                 |
| <a id="reset"></a> `reset`                     | <code>() => Promise<void></code>                                                                                                               | A function that resets the payment form to its initial, empty state.                                                                                                                                          |
| <a id="submit"></a> `submit`                   | <code>() => Promise<{ data: { gateway: "stripe"; paymentToken: string; }; error: null; } | { data: null; error: PaymentElementError; }></code> | A function that submits the payment form data to the payment provider. It returns a promise that resolves with either a `data` object containing a payment token on success, or an `error` object on failure. |

## Payment element components

The `usePaymentElement()` hook works in conjunction with the `<PaymentElementProvider />` and `<PaymentElement />` components.

### `<PaymentElementProvider />`

The `<PaymentElementProvider />` component sets up the context for the payment element. It fetches all the necessary data from the payment provider (e.g., Stripe) and makes it available to its children.

#### Properties

| Property                                              | Type                                                                                                                                                                                                                                                                | Description                                                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="checkout"></a> `checkout?`                     | <code><a href="https://clerk.com/docs/reference/javascript/types/billing-checkout-resource.md">`BillingCheckoutResource`</a> | <a href="https://clerk.com/docs/nextjs/reference/hooks/use-checkout.md#returns">`UseCheckoutReturn`</a></code> | An optional checkout resource object. When provided, the payment element is scoped to the specific checkout session.                                   |
| <a id="for"></a> `for?`                               | `"user" | "organization"`                                                                                                                                                                                                                                | Specifies whether to fetch for the current user or Organization. Defaults to `'user'`.                                                                 |
| <a id="paymentdescription"></a> `paymentDescription?` | `string`                                                                                                                                                                                                                                                            | An optional description to display to the user within the payment element UI.                                                                          |
| <a id="stripeappearance"></a> `stripeAppearance?`     | `internalStripeAppearance`                                                                                                                                                                                                                                          | An optional object to customize the appearance of the Stripe Payment Element. This allows you to match the form's styling to your application's theme. |

### `<PaymentElement />`

This component renders the actual payment form from the provider (e.g., the Stripe Payment Element). It should be rendered as a child of `<PaymentElementProvider />`.

#### Properties

| Property                          | Type        | Description                                                                                                    |
| --------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| <a id="fallback"></a> `fallback?` | `ReactNode` | Optional fallback content, such as a loading skeleton, to display while the payment form is being initialized. |

## Example

The following example demonstrates how to create a billing page where a user can add a new payment method. It is split into two components:

- **`<UserBillingPage />`**: Sets up the `<PaymentElementProvider />`, which specifies that the payment actions within its children are `for` the `user`.
- **`<AddPaymentMethodForm />`**: Renders the payment form and handles the submission logic. It uses `usePaymentElement()` to get the `submit` function and `useUser()` to get the `user` object. When the form is submitted, it first creates a payment token and then attaches it to the user.

**<UserBillingPage />**

```tsx {{ filename: 'app/user/billing/page.tsx' }}
import { ClerkLoaded } from '@clerk/nextjs'
import { PaymentElementProvider } from '@clerk/nextjs/experimental'
import { AddPaymentMethodForm } from './AddPaymentMethodForm'

export default function Page() {
  return (
    <div>
      <h1>Billing Settings</h1>

      <ClerkLoaded>
        <PaymentElementProvider for="user">
          <AddPaymentMethodForm />
        </PaymentElementProvider>
      </ClerkLoaded>
    </div>
  )
}
```

**<AddPaymentMethodForm />**

```tsx {{ filename: 'app/user/billing/AddPaymentMethodForm.tsx', collapsible: true }}
'use client'

import { useUser } from '@clerk/nextjs'
import { usePaymentElement, PaymentElement } from '@clerk/nextjs/experimental'
import { useState } from 'react'

export function AddPaymentMethodForm() {
  const { user } = useUser()
  const { submit, isFormReady } = usePaymentElement()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormReady || !user) {
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      // 1. Submit the form to the payment provider to get a payment token
      const { data, error } = await submit()

      // Usually a validation error from stripe that you can ignore.
      if (error) {
        setIsSubmitting(false)
        return
      }

      // 2. Use the token to add the payment source to the user
      await user.addPaymentSource(data)

      // 3. Handle success (e.g., show a confirmation, clear the form)
      alert('Payment method added successfully!')
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleAddPaymentMethod}>
      <h3>Add a new payment method</h3>
      <PaymentElement />
      <button type="submit" disabled={!isFormReady || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Card'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
```

## Next steps

- [Checkout flow with a new payment method](https://clerk.com/docs/guides/development/custom-flows/billing/checkout-new-payment-method.md): Build a custom checkout flow that allows users to add a new payment method during checkout.
- [Add a new payment method outside of a checkout flow](https://clerk.com/docs/guides/development/custom-flows/billing/add-new-payment-method.md): Build a custom user interface that allows users to add a new payment method to their account.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
