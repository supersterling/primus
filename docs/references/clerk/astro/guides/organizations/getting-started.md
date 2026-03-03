# Get started with Organizations

Organizations let you group users with Roles and Permissions, enabling you to build multi-tenant B2B apps like Slack (workspaces), Linear (teams), or Vercel (projects) where users can switch between different team contexts. This tutorial will demonstrate how to add Organizations, create and switch Organizations, and protect routes by Organization and Roles.

> This guide assumes that you have already set up Clerk in your application. If you haven't, see the [`quickstart guide`](https://clerk.com/docs/astro/getting-started/quickstart.md).

1. ## Add `<OrganizationSwitcher/>` to your app

   The [`<OrganizationSwitcher />`](https://clerk.com/docs/astro/reference/components/organization/organization-switcher.md) component is the easiest way to let users create, switch between, and manage Organizations. It's recommended to place it in your app's header or navigation so it's always accessible to your users. For example:

   ```astro {{ filename: 'src/layouts/Layout.astro', fold: [[27, 34]] }}
     ---
     import {
       SignedIn,
       SignedOut,
       UserButton,
       SignInButton,
   +   OrganizationSwitcher,
     } from '@clerk/astro/components'
     ---

     <!doctype html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width" />
         <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
         <meta name="generator" content={Astro.generator} />
         <title>Astro Basics</title>
       </head>
       <body>
         <header>
   +       <OrganizationSwitcher />
           <SignedOut>
             <SignInButton mode="modal" />
           </SignedOut>
           <SignedIn>
             <UserButton />
           </SignedIn>
         </header>
         <slot />
       </body>
     </html>

     <style>
       html,
       body {
         margin: 0;
         width: 100%;
         height: 100%;
       }
     </style>
   ```
2. ## Access Organization data

   **Server-side**

   To access information about the currently Active Organization on the server-side, use [`clerkClient()`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#instantiate-a-default-clerk-client-instance) to call the [`getOrganization()`](https://clerk.com/docs/reference/backend/organization/get-organization.md) method, which returns the Backend [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization.md) object. You'll need to pass an `orgId`, which you can access from the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object.

   ```astro {{ filename: 'src/pages/index.astro', collapsible: true }}
   ---
   import Layout from '../layouts/Layout.astro'
   import { SignedIn, SignedOut } from '@clerk/astro/components'
   import { clerkClient } from '@clerk/astro/server'

   // Use the `locals.auth()` local to access the `Auth` object
   // https://clerk.com/docs/reference/backend/types/auth-object
   const { isAuthenticated, orgId, orgRole } = Astro.locals.auth()

   let organization = null
   if (isAuthenticated && orgId) {
     organization = await clerkClient(Astro).organizations.getOrganization({ organizationId: orgId })
   }
   ---

   <Layout title="Clerk + Astro">
     <SignedOut>
       <p>Sign in to try Clerk out!</p>
     </SignedOut>
     <SignedIn>
       {
         organization && (
           <div class="p-8">
             <h1 class="text-2xl font-bold mb-4">
               Welcome to the <strong>{organization.name}</strong> organization
             </h1>
             <p class="mb-6">
               Your role in this organization: <strong>{orgRole}</strong>
             </p>
           </div>
         )
       }
     </SignedIn>
   </Layout>
   ```

   **Client-side**

   To access information about the currently Active Organization on the client-side, use the [`$organizationStore`](https://clerk.com/docs/reference/astro/client-side-helpers/organization-store.md) store, which returns the [`Organization`](https://clerk.com/docs/reference/javascript/organization.md) object. This requires that you've [`set up your Astro app to be integrated with React`](https://clerk.com/docs/reference/astro/react.md).

   ```tsx {{ filename: 'components/Home.tsx' }}
   import { useStore } from '@nanostores/react'
   import { $organizationStore } from '@clerk/astro/client'

   export default function Home() {
     const organization = useStore($organizationStore)

     // Handle loading state
     if (organization === undefined) return <p>Loading...</p>

     // Handle no Active Organization state
     if (organization === null) return <p>Set an Active Organization to access this page.</p>

     return <p>This current Organization is {organization.name}</p>
   }
   ```
3. ## Visit your app

   Run your project with the following command:

   ```npm
   npm run dev
   ```

   Visit your app locally at [localhost:4321](http://localhost:4321).

   When you visit your app, Clerk will prompt you to enable Organizations.
4. ### Enable Organizations

   When prompted, select **Enable Organizations**. Choose to make membership required.
5. ### Create first user and Organization

   You must sign in to use Organizations. When prompted, select **Sign in to continue**. Then, authenticate to create your first user.

   Since you chose to make membership required when you enabled Organizations, every user must be in at least one Organization. Clerk will prompt you to create an Organization for your user.
6. ## Create and switch Organizations

   At this point, Clerk should have redirected you to a page with the [`<OrganizationSwitcher />`](https://clerk.com/docs/astro/reference/components/organization/organization-switcher.md) component. This component allows you to create, switch between, and manage organizations.

   1. Select the `<OrganizationSwitcher />` component, then **Create an organization**.
   2. Enter `Acme Corp` as the Organization name.
   3. Invite users to your Organization and select their Role.
7. ## Protect routes by Organization and Roles

   You can protect content and even entire routes based on Organization membership, Roles, and Permissions by performing authorization checks.

   In the following example, the page is protected from unauthenticated users, users that don't have the `org:admin` Role, and users that are not in the `Acme Corp` Organization. It uses the [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) helper to perform the authorization check for the `org:admin` Role.

   **Server-side**

   ```astro {{ filename: 'src/pages/protected.astro', collapsible: true }}
   ---
   import Layout from '../layouts/Layout.astro'
   import { clerkClient } from '@clerk/astro/server'

   const { isAuthenticated, has, orgId, orgRole } = Astro.locals.auth()

   const requiredOrgName = 'Acme Corp'

   let organization = null
   if (isAuthenticated && orgId) {
     organization = await clerkClient(Astro).organizations.getOrganization({ organizationId: orgId })
   }
   ---

   <Layout title="Protected Page">
     <!-- Check if the user is authenticated -->
     {!isAuthenticated && <p>You must be signed in to access this page.</p>}

     <!-- Check if there is an Active Organization -->
     {!organization && <p>Set an Active Organization to access this page.</p>}

     <!-- Check if the user has the required Role to access this page -->
     {!has({ role: 'org:admin' }) && <p>You must be an admin to access this page.</p>}

     <!-- Check if Organization name matches (e.g. 'Acme Corp') -->
     {
       organization &&
         (organization.name !== requiredOrgName ? (
           <p>
             This page is only accessible in the <strong>{requiredOrgName}</strong> Organization.
             Switch to the <strong>{requiredOrgName}</strong> Organization to access this page.
           </p>
         ) : (
           <p>
             You are currently signed in as an <strong>admin</strong> in the{' '}
             <strong>{organization.name}</strong> Organization.
           </p>
         ))
     }
   </Layout>
   ```

   **Client-side**

   ```tsx {{ filename: 'components/Home.tsx', collapsible: true }}
   import { useStore } from '@nanostores/react'
   import { $organizationStore } from '@clerk/astro/client'
   import { useAuth } from '@clerk/astro/react'

   export default function Home() {
     const organization = useStore($organizationStore)
     const { has, isSignedIn } = useAuth()
     const requiredOrgName = 'Acme Corp'

     if (!isSignedIn) return <p>You must be signed in to access this page.</p>

     // Handle loading state
     if (organization === undefined) return <p>Loading...</p>

     // Handle no Active Organization state
     if (organization === null) return <p>Set an Active Organization to access this page.</p>

     // Check if user has the required Role to access this page
     if (!has({ role: 'org:admin' })) {
       return <p>You must be an admin to access this page.</p>
     }

     // Check if Organization name matches (e.g. 'Acme Corp')
     if (organization.name !== requiredOrgName) {
       return (
         <p>
           This page is only accessible in the <strong>{requiredOrgName}</strong> Organization. Switch
           to the <strong>{requiredOrgName}</strong> Organization to access this page.
         </p>
       )
     }

     return (
       <p>
         You are currently signed in as an <strong>admin</strong> in the{' '}
         <strong>{organization.name}</strong> Organization.
       </p>
     )
   }
   ```

   Navigate to [localhost:4321/protected](http://localhost:4321/protected). You should see a green message confirming you are an admin in `Acme Corp`. Use the `<OrganizationSwitcher/>` to switch Organizations or rename the Organization to show the red message.

   Learn more about protecting routes and checking Organization Roles in the [authorization guide](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md).
8. ## It's time to build your B2B SaaS!

   You've added Clerk Organizations to your app 🎉.

   To make configuration changes to your Clerk development instance, claim the Clerk keys that were generated for you by selecting **Configure your application** in the bottom right of your app. This will associate the application with your Clerk account.

   Here are some next steps you can take to scale your app:

   - **Control access** with [Custom Roles and Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md): define granular Permissions for different user types within Organizations.

   - **Onboard entire companies** with [Verified Domains](https://clerk.com/docs/guides/organizations/add-members/verified-domains.md): automatically invite users with approved email domains (e.g. `@company.com`) to join Organizations without manual invitations.

   - **Enable Enterprise SSO** with [SAML and OIDC](https://clerk.com/docs/guides/organizations/add-members/sso.md): let customers authenticate through their identity provider (e.g. Okta, Entra ID, Google Workspace) with unlimited connections, no per-connection fees.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
