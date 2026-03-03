# Get started with Organizations

Organizations let you group users with Roles and Permissions, enabling you to build multi-tenant B2B apps like Slack (workspaces), Linear (teams), or Vercel (projects) where users can switch between different team contexts. This tutorial will demonstrate how to add Organizations, create and switch Organizations, and protect routes by Organization and Roles.

> This guide assumes that you have already set up Clerk in your application. If you haven't, see the [`quickstart guide`](https://clerk.com/docs/react/getting-started/quickstart.md).

1. ## Add `<OrganizationSwitcher/>` to your app

   The [`<OrganizationSwitcher />`](https://clerk.com/docs/react/reference/components/organization/organization-switcher.md) component is the easiest way to let users create, switch between, and manage Organizations. It's recommended to place it in your app's header or navigation so it's always accessible to your users. For example:

   ```tsx {{ filename: 'src/App.tsx' }}
     import './App.css'
     import {
       SignedIn,
       SignedOut,
       SignInButton,
       UserButton,
   +   OrganizationSwitcher,
     } from '@clerk/clerk-react'

     function App() {
       return (
         <>
           <header>
   +         <OrganizationSwitcher />
             <SignedOut>
               <SignInButton />
             </SignedOut>
             <SignedIn>
               <UserButton />
             </SignedIn>
           </header>
         </>
       )
     }

     export default App
   ```
2. ## Access Organization data

   Use the [`useOrganization()`](https://clerk.com/docs/react/reference/hooks/use-organization.md) hook to access information about the currently Active Organization. Use the [`useOrganizationList()`](https://clerk.com/docs/react/reference/hooks/use-organization-list.md) hook to access information about the current user's Organization memberships.

   ```tsx {{ filename: 'src/App.tsx', collapsible: true }}
   import './App.css'
   import {
     SignedIn,
     SignedOut,
     SignInButton,
     UserButton,
     OrganizationSwitcher,
     useOrganization,
     useOrganizationList,
   } from '@clerk/clerk-react'

   function App() {
     const { organization } = useOrganization()
     const { userMemberships } = useOrganizationList({
       userMemberships: true,
     })

     return (
       <>
         <header>
           <OrganizationSwitcher />
           <SignedOut>
             <SignInButton />
           </SignedOut>
           <SignedIn>
             <UserButton />
           </SignedIn>
         </header>
         <main className="p-8">
           <SignedIn>
             <div>
               <h1 className="text-2xl font-bold mb-4">
                 Welcome to the <strong>{organization?.name}</strong> organization
               </h1>
               <p className="mb-6">
                 Your role in this organization:{' '}
                 <strong>
                   {
                     userMemberships?.data?.find(
                       (membership) => membership.organization.id === organization?.id,
                     )?.role
                   }
                 </strong>
               </p>
             </div>
           </SignedIn>
         </main>
       </>
     )
   }

   export default App
   ```
3. ## Visit your app

   Run your project with the following command:

   ```npm
   npm run dev
   ```

   Visit your app locally at [localhost:5173](http://localhost:5173).

   When you visit your app, Clerk will prompt you to enable Organizations.
4. ### Enable Organizations

   When prompted, select **Enable Organizations**. Choose to make membership required.
5. ### Create first user and Organization

   You must sign in to use Organizations. When prompted, select **Sign in to continue**. Then, authenticate to create your first user.

   Since you chose to make membership required when you enabled Organizations, every user must be in at least one Organization. Clerk will prompt you to create an Organization for your user.
6. ## Create and switch Organizations

   At this point, Clerk should have redirected you to a page with the [`<OrganizationSwitcher />`](https://clerk.com/docs/react/reference/components/organization/organization-switcher.md) component. This component allows you to create, switch between, and manage organizations.

   1. Select the `<OrganizationSwitcher />` component, then **Create an organization**.
   2. Enter `Acme Corp` as the Organization name.
   3. Invite users to your Organization and select their Role.
7. ## Protect routes by Organization and Roles

   You can protect content and even entire routes based on Organization membership, Roles, and Permissions by performing authorization checks.

   In the following example, the page is protected from unauthenticated users, users that don't have the `org:admin` Role, and users that are not in the `Acme Corp` Organization. It uses the [`has()`](https://clerk.com/docs/reference/backend/types/auth-object.md#has) helper to perform the authorization check for the `org:admin` Role.

   ```tsx {{ filename: 'src/Protected.tsx', collapsible: true }}
   import { useAuth, useOrganization } from '@clerk/clerk-react'

   export default function Protected() {
     const { isSignedIn, has } = useAuth()
     const { organization } = useOrganization()

     // Check if the user is authenticated
     if (!isSignedIn) return <p>You must be signed in to access this page.</p>

     // Check if there is an Active Organization
     if (!organization) <p>Set an Active Organization to access this page.</p>

     // Check if the user has the `org:admin` Role
     if (!has({ role: 'org:admin' })) return <p>You must be an admin to access this page.</p>

     // Check if Organization name matches (e.g. 'Acme Corp')
     const requiredOrgName = 'Acme Corp'
     if (organization.name !== requiredOrgName) {
       return (
         <>
           <p>
             This page is only accessible in the <strong>{requiredOrgName}</strong> Organization.
             Switch to the <strong>{requiredOrgName}</strong> Organization to access this page.
           </p>
         </>
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

   Update your main `<App />` component to show the `<Protected />` component when you navigate to `/protected`.

   ```tsx {{ filename: 'src/App.tsx', mark: [[31, 33]], collapsible: true }}
   import './App.css'
   import {
     SignedIn,
     SignedOut,
     SignInButton,
     UserButton,
     OrganizationSwitcher,
     useOrganization,
     useOrganizationList,
   } from '@clerk/clerk-react'
   import Protected from './Protected'

   function App() {
     const { organization } = useOrganization()
     const { userMemberships } = useOrganizationList({
       userMemberships: true,
     })

     return (
       <>
         <header>
           <OrganizationSwitcher />
           <SignedOut>
             <SignInButton />
           </SignedOut>
           <SignedIn>
             <UserButton />
           </SignedIn>
         </header>
         <main className="p-8">
           {window.location.pathname === '/protected' ? (
             <Protected />
           ) : (
             <SignedIn>
               <div>
                 <h1 className="text-2xl font-bold mb-4">
                   Welcome to the <strong>{organization?.name}</strong> Organization
                 </h1>
                 <p className="mb-6">
                   Your role in this Organization:{' '}
                   <strong>
                     {
                       userMemberships?.data?.find(
                         (membership) => membership.organization.id === organization?.id,
                       )?.role
                     }
                   </strong>
                 </p>
               </div>
             </SignedIn>
           )}
         </main>
       </>
     )
   }

   export default App
   ```

   Navigate to [localhost:5173/protected](http://localhost:5173/protected). You should see a green message confirming you are an admin in `Acme Corp`. Use the `<OrganizationSwitcher/>` to switch Organizations or rename the Organization to show the red message.

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
