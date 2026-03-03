# Build a custom checkout flow with a new payment method

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/react/reference/components/overview.md).

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

This guide will walk you through how to build a custom user interface for a checkout flow that allows users to **add a new payment method during checkout**.

See the dedicated guides for other custom payment flows:

- [`Checkout with an existing payment method`](https://clerk.com/docs/react/guides/development/custom-flows/billing/checkout-existing-payment-method.md)
- [`Add a new payment method outside of a checkout flow`](https://clerk.com/docs/react/guides/development/custom-flows/billing/add-new-payment-method.md)

1. ## Enable Billing Features

   To use Billing Features, you first need to ensure they are enabled for your application. Follow the [Billing documentation](https://clerk.com/docs/guides/billing/overview.md) to enable them and setup your Plans.
2. ## Checkout flow

   To create a checkout session with a new payment card, you must:

   1. Set up the checkout provider with Plan details.
   2. Initialize the checkout session when the user is ready.
   3. Render the payment form for card collection.
   4. Confirm the payment with the collected payment method.
   5. Complete the checkout process and redirect the user.

   The following example:

   1. Uses the [`useCheckout()`](https://clerk.com/docs/react/reference/hooks/use-checkout.md) hook to get to initiate and manage the checkout session.
   2. Uses the [`usePaymentElement()`](https://clerk.com/docs/react/reference/hooks/use-payment-element.md) hook to control the payment element, which is rendered by `<PaymentElement />`.
   3. Assumes that you have already have a valid `planId`, which you can acquire in many ways.
      - [Copy from the Clerk Dashboard](https://dashboard.clerk.com/~/billing/plans?tab=user).
      - Use the [Clerk Backend API](https://clerk.com/docs/reference/backend-api/tag/commerce/get/commerce/plans.md#tag/commerce/get/commerce/plans){{ target: '_blank' }}.
      - Use the new [`usePlans()`](https://clerk.com/docs/react/reference/hooks/use-plans.md) hook to get the Plan details.

   **This example is written for Next.js App Router but can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   ```tsx {{ filename: 'app/checkout/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { SignedIn, ClerkLoaded } from '@clerk/nextjs'
   import {
     CheckoutProvider,
     useCheckout,
     PaymentElementProvider,
     PaymentElement,
     usePaymentElement,
   } from '@clerk/nextjs/experimental'
   import { useRouter } from 'next/navigation'

   export default function CheckoutPage() {
     return (
       <CheckoutProvider for="user" planId="cplan_xxx" planPeriod="month">
         <ClerkLoaded>
           <SignedIn>
             <CustomCheckout />
           </SignedIn>
         </ClerkLoaded>
       </CheckoutProvider>
     )
   }

   function CustomCheckout() {
     const { checkout } = useCheckout()
     const { status } = checkout

     if (status === 'needs_initialization') {
       return <CheckoutInitialization />
     }

     return (
       <div className="checkout-container">
         <CheckoutSummary />

         <PaymentElementProvider checkout={checkout}>
           <PaymentSection />
         </PaymentElementProvider>
       </div>
     )
   }

   function CheckoutInitialization() {
     const { checkout } = useCheckout()
     const { start, status, fetchStatus } = checkout

     if (status !== 'needs_initialization') {
       return null
     }

     return (
       <button onClick={start} disabled={fetchStatus === 'fetching'} className="start-checkout-button">
         {fetchStatus === 'fetching' ? 'Initializing...' : 'Start Checkout'}
       </button>
     )
   }

   function PaymentSection() {
     const { checkout } = useCheckout()
     const { isConfirming, confirm, finalize, error } = checkout

     const { isFormReady, submit } = usePaymentElement()
     const [isProcessing, setIsProcessing] = React.useState(false)

     const router = useRouter()

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       if (!isFormReady || isProcessing) return
       setIsProcessing(true)

       try {
         // Submit payment form to get payment method
         const { data, error } = await submit()
         // Usually a validation error from stripe that you can ignore
         if (error) {
           return
         }
         // Confirm checkout with payment method
         await confirm(data)
         // Complete checkout and redirect
         await finalize({
           navigate: () => router.push('/dashboard'),
         })
       } catch (error) {
         console.error('Payment failed:', error)
       } finally {
         setIsProcessing(false)
       }
     }

     return (
       <form onSubmit={handleSubmit}>
         <PaymentElement fallback={<div>Loading payment element...</div>} />

         {error && <div>{error.message}</div>}

         <button type="submit" disabled={!isFormReady || isProcessing || isConfirming}>
           {isProcessing || isConfirming ? 'Processing...' : 'Complete Purchase'}
         </button>
       </form>
     )
   }

   function CheckoutSummary() {
     const { checkout } = useCheckout()
     const { plan, totals } = checkout

     if (!plan) {
       return null
     }

     return (
       <div>
         <h2>Order Summary</h2>
         <span>{plan.name}</span>
         <span>
           {totals.totalDueNow.currencySymbol} {totals.totalDueNow.amountFormatted}
         </span>
       </div>
     )
   }
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
