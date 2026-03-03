# <Waitlist /> component

In **Waitlist** mode, users can register their interest in your app by joining a waitlist. This mode is ideal for apps in early development stages or those wanting to generate interest before launch. [Learn more about additional features available in **Waitlist** mode](https://clerk.com/docs/guides/secure/restricting-access.md#waitlist).

The `<Waitlist />` component renders a form that allows users to join for early access to your app.

## Enable Waitlist mode

Before using the `<Waitlist />` component, you must enable **Waitlist** mode in the Clerk Dashboard:

1. In the Clerk Dashboard, navigate to the [**Waitlist**](https://dashboard.clerk.com/~/user-authentication/waitlist) page.
2. Toggle on **Enable waitlist** and select **Save**.

## Example

> Before using the `<Waitlist />` component, you must provide the `waitlistUrl` prop either in the [`<ClerkProvider>`](https://clerk.com/docs/react-router/reference/components/clerk-provider.md#properties) or [`<SignIn />`](https://clerk.com/docs/react-router/reference/components/authentication/sign-in.md#properties) component to ensure proper functionality.

The following example includes a basic implementation of the `<Waitlist />` component. You can use this as a starting point for your own implementation.

```tsx {{ filename: 'app/routes/waitlist.tsx' }}
import { Waitlist } from '@clerk/react-router'

export default function WaitlistPage() {
  return <Waitlist />
}
```

## Properties

All props are optional.

| Name                 | Type                    | Description                                                                                                                                                               |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| afterJoinWaitlistUrl | string                  | The full URL or path to navigate to after joining the waitlist.                                                                                                           |
| appearance           | Appearance | undefined | Optional object to style your components. Will only affect Clerk components and not Account Portal pages.                                                                 |
| fallback?            | ReactNode               | An optional element to be rendered while the component is mounting.                                                                                                       |
| signInUrl            | string                  | The full URL or path to the sign in page. Used for the 'Already have an account? Sign in' link that's rendered. It's recommended to use the environment variable instead. |

## Customization

To learn about how to customize Clerk components, see the [`customization guide`](https://clerk.com/docs/react-router/guides/customizing-clerk/appearance-prop/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
