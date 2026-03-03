# Clerk Billing for B2B SaaS

> Billing is currently in Beta and its APIs are experimental and may undergo breaking changes. To mitigate potential disruptions, we recommend [pinning](https://clerk.com/docs/pinning.md) your SDK and `clerk-js` package versions.

Clerk Billing for B2B SaaS allows you to create Plans and manage Subscriptions **for companies or organizations** in your application. If you'd like to charge individual users, see [`Billing for B2C SaaS`](https://clerk.com/docs/fastify/guides/billing/for-b2c.md). You can also combine both B2C and B2B Billing in the same application.

## Enable Billing

To enable Billing for your application, navigate to the [**Billing Settings**](https://dashboard.clerk.com/~/billing/settings) page in the Clerk Dashboard. This page will guide you through enabling Billing for your application.

Clerk Billing costs the same as using Stripe Billing directly, just 0.7% per transaction, plus transaction fees which are paid directly to Stripe. Clerk Billing is **not** the same as Stripe Billing. Plans and pricing are managed directly through the Clerk Dashboard and won't sync with your existing Stripe products or plans. Clerk uses Stripe **only** for payment processing, so you don't need to set up Stripe Billing.

### Payment gateway

Once you have enabled Billing, you will see the following **Payment gateway** options for collecting payments via Stripe:

- **Clerk development gateway**: A shared **test** Stripe account used for development instances. This allows developers to test and build Billing flows **in development** without needing to create and configure a Stripe account.
- **Stripe account**: Use your own Stripe account for production. **A Stripe account created for a development instance cannot be used for production**. You will need to create a separate Stripe account for your production environment.

## Create a Plan

Subscription Plans are what your customers subscribe to. There is no limit to the number of Plans you can create. If your Clerk instance has existing [Custom Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md), the corresponding Features from those Permissions will automatically be added to the Free Plan for Organizations. This ensures that Organization members get the same set of Custom Permissions when Billing is enabled, because all Organizations start on the Free Plan.

To create a Plan, navigate to the [**Subscription plans**](https://dashboard.clerk.com/~/billing/plans) page in the Clerk Dashboard. Here, you can create, edit, and delete Plans. To setup B2B Billing, select the **Plans for Organizations** tab and select **Add Plan**. When creating a Plan, you can also create [Features](https://clerk.com/docs/guides/secure/features.md) for the Plan; see the next section for more information.

> What is the **Publicly available** option?
>
> ***
>
> Plans appear in some Clerk components depending on what kind of Plan it is. All Plans can appear in the `<PricingTable />` component. If it's an Organization Plan, it can appear in the `<OrganizationProfile />` component. When creating or editing a Plan, if you'd like to hide it from appearing in Clerk components, you can toggle the **Publicly available** option off.

## Add Features to a Plan

[Features](https://clerk.com/docs/guides/secure/features.md) make it easy to give entitlements to your Plans. You can add any number of Features to a Plan.

You can add a Feature to a Plan when you are creating a Plan. To add it after a Plan is created:

1. Navigate to the [**Subscription plans**](https://dashboard.clerk.com/~/billing/plans) page in the Clerk Dashboard.
2. Select the Plan you'd like to add a Feature to.
3. In the **Features** section, select **Add Feature**.

> What is the **Publicly available** option?
>
> ***
>
> Plans appear in some Clerk components depending on what kind of Plan it is. All Plans can appear in the `<PricingTable />` component. If it's an Organization Plan, it can appear in the `<OrganizationProfile />` component. When adding a Feature to a Plan, it will also automatically appear in the corresponding Plan. When creating or editing a Feature, if you'd like to hide it from appearing in Clerk components, you can toggle the **Publicly available** option off.

## Create a pricing page

You can create a pricing page by using the [`<PricingTable />`](https://clerk.com/docs/reference/components/billing/pricing-table.md) component. This component displays a table of Plans and Features that customers can subscribe to. **It's recommended to create a dedicated page**, as shown in the following example.

> To see an example of how to create a pricing table page, please select one of the frontend SDKs on the sidebar.

## Control access with Features, Plans, and Permissions

You can use Clerk's Features, Plans, and Permissions to gate access to content using authorization checks. There are a few ways to do this, but the recommended approach is to either use the [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) method or the [`<Protect>`](https://clerk.com/docs/reference/components/control/protect.md) component.

The `has()` method is available for any JavaScript-based framework, while `<Protect>` is a component, and therefore, is only available for React-based frameworks.

> Permission-based authorization checks link with Feature-based authorization checks. This means that if you are checking a Custom Permission, it will only work if the Feature part of the Permission key (`org:<feature>:<permission>`) **is a Feature included in the Organization's active Plan**. For example, say you want to check if an Organization member has the Custom Permission `org:teams:manage`, where `teams` is the Feature. Before performing the authorization check, you need to ensure that the user's Organization is subscribed to a Plan that has the `teams` Feature. If the user's Organization is not subscribed to a Plan that has the `teams` Feature, the authorization check will always return `false`, _even if the user has the Custom Permission_.

### Example: Using `has()`

Use the `has()` method to test if the Organization has access to a **Plan**:

```jsx
const hasPremiumAccess = has({ plan: 'gold' })
```

Or a **Feature**:

```jsx
const hasPremiumAccess = has({ feature: 'widgets' })
```

The [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) method is a server-side helper that checks if the Organization has been granted a specific type of access control (Role, Permission, Feature, or Plan) and returns a boolean value. `has()` is available on the [`auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md), which you will access differently [`depending on the framework you are using`](https://clerk.com/docs/reference/backend/types/auth-object.md#how-to-access-the-auth-object).

> Why aren't Custom Permissions appearing in the session token (JWT) or in API responses (including the result of the `has()` check)?
>
> ***
>
> Custom Permissions will only appear in the session token (JWT) and in API responses (including the result of the `has()` check) if the Feature part of the Permission key (`org:<feature>:<permission>`) **is a Feature included in the Organization's active Plan**. If the Feature is not part of the Plan, the `has()` check for Permissions using that Feature will return `false`, and those Permissions will not be represented in the session token.
>
> For example, say you want to check if an Organization member has the Custom Permission `org:teams:manage`, where `teams` is the Feature. The user's Organization must be subscribed to a Plan that has the `teams` Feature for authorization checks to work. If the user's Organization is not subscribed to a Plan that has the `teams` Feature, the authorization check will always return `false`, _even if the user has the Custom Permission_.

**Plan**

The following example demonstrates how to use `has()` to check if an Organization has a Plan.

```tsx {{ filename: 'src/routes/bronze-content.ts' }}
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAuth } from '@clerk/fastify'

export const bronzeContentRoutes = (fastify: FastifyInstance) => {
  fastify.get('/bronze-content', async (request: FastifyRequest, reply: FastifyReply) => {
    const { has } = getAuth(request)

    const hasBronzePlan = has({ plan: 'bronze' })

    if (hasBronzePlan) {
      reply.send('For Bronze subscribers only')
    } else {
      reply.send('Only subscribers to the Bronze plan can access this content.')
    }
  })
}
```

**Feature**

The following example demonstrates how to use `has()` to check if an Organization has a Feature.

```ts {{ filename: 'src/routes/premium-content.ts' }}
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAuth } from '@clerk/fastify'

export const premiumContentRoutes = (fastify: FastifyInstance) => {
  fastify.get('/premium-content', async (request: FastifyRequest, reply: FastifyReply) => {
    const { has } = getAuth(request)
    const hasPremiumAccess = has({ feature: 'premium_access' })

    if (!hasPremiumAccess) {
      reply.send('Only subscribers with the Premium Access feature can access this content.')
    } else {
      reply.send('Our Exclusive Content')
    }
  })
}
```

**Permission**

The following example demonstrates how to use `has()` to check if an Organization has a Permission.

```tsx {{ filename: 'src/routes/manage-premium-content.ts' }}
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getAuth } from '@clerk/fastify'

export const managePremiumContentRoutes = (fastify: FastifyInstance) => {
  fastify.get('/manage-premium-content', async (request: FastifyRequest, reply: FastifyReply) => {
    const { has } = getAuth(request)

    const hasPremiumAccessManage = has({ permission: 'org:premium_access:manage' })

    if (hasPremiumAccessManage) {
      reply.send('Our Exclusive Content')
    } else {
      reply.send(
        'Only subscribers with the Premium Access Manage permission can access this content.',
      )
    }
  })
}
```

### Example: Using `<Protect>`

The [`<Protect>`](https://clerk.com/docs/reference/components/control/protect.md) component protects content or even entire routes by checking if the Organization has been granted a specific type of access control (Role, Permission, Feature, or Plan). You can pass a `fallback` prop to `<Protect>` that will be rendered if the Organization does not have the access control.

**Plan**

The following example demonstrates how to use `<Protect>` to protect a page by checking if the Organization has a Plan.

> To see an example of how to use the `Protect` component, please select one of the frontend SDKs on the sidebar.

**Feature**

The following example demonstrates how to use `<Protect>` to protect a page by checking if the Organization has a Feature.

> To see an example of how to use the `Protect` component, please select one of the frontend SDKs on the sidebar.

**Permission**

The following example demonstrates how to use `<Protect>` to protect a page by checking if the Organization has a Permission.

> To see an example of how to use the `Protect` component, please select one of the frontend SDKs on the sidebar.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
