# Authentication across different domains

**Example Repository**

- [Satellite Domain demo using Turborepo with Clerk, Next.js, and React](https://github.com/clerk/clerk-multidomain-demo)

> This feature or workflow is considered **advanced** - it may not be part of an official Clerk SDK or fall within typical usage patterns. The Clerk support team will do their best to assist you, but cannot guarantee a resolution for this type of advanced usage.

> This guide addresses authentication across different domains with shared sessions. For example, `example-site.com` and `example-site-admin.com`.
>
> It is not recommended to use **passkeys** as a form of authentication. [Learn more about domain restrictions for passkeys](https://clerk.com/docs/guides/development/custom-flows/authentication/passkeys.md#domain-restrictions-for-passkeys).
>
> [Authentication across subdomains](https://clerk.com/docs/guides/development/deployment/production.md#authentication-across-subdomains) with shared sessions works by default with Clerk.

Clerk supports sharing sessions across different domains by adding one or many satellite domains to an application.

Your "primary" domain is where the authentication state lives, and satellite domains are able to securely read that state from the primary domain, enabling a seamless authentication flow across domains.

Users must complete both the sign-in and sign-up flows on the primary domain by using the [`<SignIn />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-in.md) component or [`useSignIn()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-in.md) hook for sign-in and [`<SignUp />`](https://clerk.com/docs/nextjs/reference/components/authentication/sign-up.md) component or [`useSignUp()`](https://clerk.com/docs/nextjs/reference/hooks/use-sign-up.md) hook for sign-up.

To access authentication state from a satellite domain, users will be transparently redirected to the primary domain. If users need to sign in, they must be redirected to a sign in flow hosted on the primary domain, then redirected back to the originating satellite domain. The same redirection process applies to sign-up flows.

## How to add satellite domains

> This feature requires a [paid plan](https://clerk.com/pricing){{ target: '_blank' }} for production use, but all features are free to use in development mode so that you can try out what works for you. See the [pricing](https://clerk.com/pricing){{ target: '_blank' }} page for more information.

1. ### Create your application and install Clerk

   > Currently, multi-domain can be added to any Next.js or Remix application. For other React frameworks, multi-domain is still supported as long as you do not use server rendering or hydration.

   To get started, you need to create an application from the [Clerk Dashboard](https://dashboard.clerk.com/). Once you create an instance via the Clerk Dashboard, you will be prompted to choose a domain. This is your primary domain. For the purposes of this guide:

   - In production, the primary domain will be `primary.dev`
   - In development, the primary domain will be `localhost:3000`.

   When building your sign-in flow, you must configure it to run within your primary application, e.g. on `/sign-in`.

   > For more information about creating your application, see the [setup guide](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md).
2. ### Add your first satellite domain

   To add a satellite domain:

   1. In the Clerk Dashboard, navigate to the [**Domains**](https://dashboard.clerk.com/~/domains) page.
   2. Select the **Satellites** tab.
   3. Select the **Add satellite domain** button and follow the instructions provided.

   For the purposes of this guide:

   - In production, the satellite domain will be `satellite.dev`.
   - In development, the satellite domain will be `localhost:3001`.
3. ### Complete DNS setup for your satellite domain

   To use a satellite domain **in production**, you will need to add a CNAME record for the `clerk` subdomain. For development instances, you can skip this step.

   1. In the Clerk Dashboard, navigate to the [**Domains**](https://dashboard.clerk.com/~/domains) page.
   2. Select the **Satellites** tab.
   3. Select the satellite domain you just added.
   4. Under **DNS Configuration**, follow the instructions to add a CNAME record in your DNS provider's settings.

   Once your CNAME record is set up correctly, you should see a **Verified** label next to your satellite domain.

   > It can take up to 48hrs for DNS records to fully propagate.
4. ### Configure your satellite app

   There are two ways that you can configure your Clerk satellite application to work with the primary domain:

   - Using environment variables
   - Using properties

   Use the following tabs to select your preferred method. Clerk recommends using environment variables.

   **Environment variables**

   You can configure your satellite application by setting the following environment variables:

   > In development, your Publishable Key and Secret Key will start with `pk_test_` and `sk_test` respectively. In production, they will start with `pk_live_` and `sk_live` respectively.

   - In the `.env` file associated with your primary domain:

     **Next.js**

     ```env {{ filename: '.env' }}
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
     CLERK_SECRET_KEY={{secret}}
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     ```
   - In the `.env` file associated with your other (satellite) domain:

     **Next.js**

     ```env {{ filename: '.env' }}
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
     CLERK_SECRET_KEY={{secret}}
     NEXT_PUBLIC_CLERK_IS_SATELLITE=true
     # Production example:
     NEXT_PUBLIC_CLERK_DOMAIN=satellite.dev
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=https://primary.dev/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=https://primary.dev/sign-up

     # Development example:
     # NEXT_PUBLIC_CLERK_DOMAIN=localhost:3001
     # NEXT_PUBLIC_CLERK_SIGN_IN_URL=http://localhost:3000/sign-in
     # NEXT_PUBLIC_CLERK_SIGN_UP_URL=http://localhost:3000/sign-up
     ```
   - You will also need to add the `allowedRedirectOrigins` property to `<ClerkProvider>` on your _primary domain app_ to ensure that the redirect back from primary to satellite domain works correctly. For example:

     **Development**

     ```tsx {{ filename: 'app/layout.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en">
           <body>
             <ClerkProvider allowedRedirectOrigins={['http://localhost:3001']}>{children}</ClerkProvider>
           </body>
         </html>
       )
     }
     ```

     **Production**

     ```tsx {{ filename: 'app/layout.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       return (
         <html lang="en">
           <body>
             <ClerkProvider allowedRedirectOrigins={['https://satellite.dev']}>{children}</ClerkProvider>
           </body>
         </html>
       )
     }
     ```

   **Properties**

   You can configure your satellite application by setting the following properties:

   - `isSatellite` - Defines the app as a satellite app when `true`.
   - `domain` - Sets the domain of the satellite application. This is required since we cannot figure this out by your Publishable Key, since it is the same for all of your multi-domain apps.
   - `signInUrl` - This url will be used when signing in on your satellite application and needs to point to your primary application. This option is optional for production instances and required for development instances.
   - `signUpUrl` - This url will be used for signing up on your satellite application and needs to point to your primary application. This option is optional for production instances and required for development instances.
   - `allowedRedirectOrigins` - This is a list of origins that are allowed to redirect back to from the primary domain.

   > The `URL` parameter that can be passed to `isSatellite` and `domain` is the request url for server-side usage or the current location for client usage.

   **Next.js**

   In a Next.js application, you must set the properties in the [`<ClerkProvider>`](https://clerk.com/docs/nextjs/reference/components/clerk-provider.md) component _and_ in your [`clerkMiddleware()`](https://clerk.com/docs/reference/nextjs/clerk-middleware.md).

   - In the Next project associated with your primary domain, only the `signInUrl` prop needs to be configured as shown in the following example:

     > You should set your `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in your environment variables even if you're using props to configure satellite domains.

     **App Router**

     ```tsx {{ filename: 'app/layout.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       const primarySignInUrl = '/sign-in'
       const primarySignUpUrl = '/sign-up'
       const satelliteUrl = 'https://satellite.dev'

       return (
         <html lang="en">
           <body>
             <ClerkProvider
               signInUrl={primarySignInUrl}
               signUpUrl={primarySignUpUrl}
               allowedRedirectOrigins={[satelliteUrl]}
             >
               <p>Satellite Next.js app</p>
               {children}
             </ClerkProvider>
           </body>
         </html>
       )
     }
     ```

     **Pages Router**

     ```jsx {{ filename: '_app.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'
     import Head from 'next/head'

     export default function App({ Component, pageProps }) {
       const primarySignInUrl = '/sign-in'
       const primarySignUpUrl = '/sign-up'
       const satelliteUrl = 'https://satellite.dev'

       return (
         <ClerkProvider
           signInUrl={primarySignInUrl}
           signUpUrl={primarySignUpUrl}
           allowedRedirectOrigins={[satelliteUrl]}
           {...pageProps}
         >
           <Head>
             <title>Satellite Next.js app</title>
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           </Head>
           <Component {...pageProps} />
         </ClerkProvider>
       )
     }
     ```

   - In the Next project associated with your satellite domain, configure your `<ClerkProvider>` as shown in the following example:

     **App Router**

     ```tsx {{ filename: 'app/layout.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'

     export default function RootLayout({ children }: { children: React.ReactNode }) {
       const primarySignInUrl = 'https://primary.dev/sign-in'
       const primarySignUpUrl = 'https://primary.dev/sign-up'
       // Or, in development:
       // const primarySignInUrl = 'http://localhost:3000/sign-in';
       // const primarySignUpUrl = 'http://localhost:3000/sign-up';

       return (
         <html lang="en">
           <body>
             <ClerkProvider
               isSatellite
               domain={(url) => url.host}
               signInUrl={primarySignInUrl}
               signUpUrl={primarySignUpUrl}
             >
               <title>Satellite Next.js app</title>
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               {children}
             </ClerkProvider>
           </body>
         </html>
       )
     }
     ```

     **Pages Router**

     ```jsx {{ filename: '_app.tsx' }}
     import { ClerkProvider } from '@clerk/nextjs'
     import Head from 'next/head'

     export default function App({ Component, pageProps }) {
       const primarySignInUrl = 'https://primary.dev/sign-in'
       const primarySignUpUrl = 'https://primary.dev/sign-up'
       // Or, in development:
       // const primarySignInUrl = 'http://localhost:3000/sign-in';
       // const primarySignUpUrl = 'http://localhost:3000/sign-up';

       return (
         <ClerkProvider
           isSatellite
           domain={(url) => url.host}
           signInUrl={primarySignInUrl}
           signUpUrl={primarySignUpUrl}
           {...pageProps}
         >
           <Head>
             <title>Satellite Next.js app</title>
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           </Head>
           <Component {...pageProps} />
         </ClerkProvider>
       )
     }
     ```

   And the middleware associated with your satellite domain should look like this:

   > If you're using Next.js ≤15, name your file `middleware.ts` instead of `proxy.ts`. The code itself remains the same; only the filename changes.

   ```ts {{ filename: 'proxy.ts' }}
   import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

   // Set the homepage as a public route
   const isPublicRoute = createRouteMatcher(['/'])

   // Set the necessary options for a satellite application
   const options = {
     isSatellite: true,
     signInUrl: 'https://primary.dev/sign-in',
     signUpUrl: 'https://primary.dev/sign-up',
     // Or, in development:
     // signInUrl: 'http://localhost:3000/sign-in',
     // signUpUrl: 'http://localhost:3000/sign-up',
     domain: 'satellite.dev',
     // Or, in development:
     // domain: 'localhost:3001',
   }

   export default clerkMiddleware(async (auth, req) => {
     if (isPublicRoute(req)) return // if it's a public route, do nothing
     await auth.protect() // for any other route, require auth
   }, options)

   export const config = {
     matcher: [
       // Skip Next.js internals and all static files, unless found in search params
       '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
       // Always run for API routes
       '/(api|trpc)(.*)',
     ],
   }
   ```
5. ### Ready to go 🎉

   Your satellite application should now be able to access the authentication state from your satellite domain!

   You can see it in action by:

   1. Visiting the primary domain and signing in.
   2. Visiting the satellite domain.
   3. You now have an active session in the satellite domain, so you can see the [`<UserProfile />`](https://clerk.com/docs/nextjs/reference/components/user/user-profile.md) component and update your information.

   You can repeat this process and create as many satellite applications as you need.

If you have any questions about satellite domains, or you're having any trouble setting this up, contact [support@clerk.com](mailto:support@clerk.com)

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
