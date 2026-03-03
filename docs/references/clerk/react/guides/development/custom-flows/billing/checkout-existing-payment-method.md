# Build a custom checkout flow with an existing payment method

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/react/reference/components/overview.md).

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

This guide will walk you through how to build a custom user interface for a checkout flow that allows users to checkout **with an existing payment method**. For the custom flow that allows users to **add a new payment method** during checkout, see the [`dedicated guide`](https://clerk.com/docs/react/guides/development/custom-flows/billing/checkout-new-payment-method.md).

1. ## Enable Billing Features

   To use Billing Features, you first need to ensure they are enabled for your application. Follow the [Billing documentation](https://clerk.com/docs/guides/billing/overview.md) to enable them and setup your Plans.
2. ## Checkout flow

   To create a checkout session with an existing payment method, you must:

   1. Set up the checkout provider with Plan details.
   2. Initialize the checkout session when the user is ready.
   3. Fetch and display the user's existing payment methods.
   4. Confirm the payment with the selected payment method.
   5. Complete the checkout process and redirect the user.

   The following example:

   1. Uses the [`useCheckout()`](https://clerk.com/docs/react/reference/hooks/use-checkout.md) hook to initiate and manage the checkout session.
   2. Uses the [`usePaymentMethods()`](https://clerk.com/docs/react/reference/hooks/use-payment-methods.md) hook to fetch the user's existing payment methods.
   3. Assumes that you have already have a valid `planId`, which you can acquire in many ways:
      - [Copy from the Clerk Dashboard](https://dashboard.clerk.com/~/billing/plans?tab=user).
      - Use the [Clerk Backend API](https://clerk.com/docs/reference/backend-api/tag/commerce/get/commerce/plans.md#tag/commerce/get/commerce/plans){{ target: '_blank' }}.
      - Use the new [`usePlans()`](https://clerk.com/docs/react/reference/hooks/use-plans.md) hook to get the Plan details.

   **This example is written for Next.js App Router but can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

   ```tsx {{ filename: 'app/checkout/page.tsx', collapsible: true }}
   'use client'

   import * as React from 'react'
   import { SignedIn, ClerkLoaded } from '@clerk/nextjs'
   import { useRouter } from 'next/navigation'
   import { CheckoutProvider, useCheckout, usePaymentMethods } from '@clerk/nextjs/experimental'
   import { useMemo, useState } from 'react'

   export default function CheckoutPage() {
     return (
       <CheckoutProvider planId="cplan_xxx" planPeriod="month">
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
         <PaymentSection />
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
     const { data, isLoading } = usePaymentMethods({
       for: 'user',
       pageSize: 20,
     })

     const { isConfirming, confirm, finalize, error } = checkout

     const [isProcessing, setIsProcessing] = useState(false)
     const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null)

     const router = useRouter()

     const defaultMethod = useMemo(() => data?.find((method) => method.isDefault), [data])

     const submitSelectedMethod = async () => {
       const paymentSourceId = paymentMethodId || defaultMethod?.id
       if (isProcessing || !paymentSourceId) return
       setIsProcessing(true)

       try {
         // Confirm checkout with payment method
         await confirm({ paymentSourceId })
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

     if (isLoading) {
       return <div>Loading...</div>
     }

     return (
       <>
         <select
           defaultValue={defaultMethod?.id}
           onChange={(e) => {
             const methodId = e.target.value
             const method = data?.find((method) => method.id === methodId)
             if (method) {
               setPaymentMethodId(method.id)
             }
           }}
         >
           {data?.map((method) => (
             <option key={method.id}>
               **** **** **** {method.last4} {method.cardType}
             </option>
           ))}
         </select>

         {error && <div>{error.message}</div>}

         <button type="button" disabled={isProcessing || isConfirming} onClick={submitSelectedMethod}>
           {isProcessing || isConfirming ? 'Processing...' : 'Complete Purchase'}
         </button>
       </>
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
