# Use Clerk with Astro and React

Astro provides an [integration](https://docs.astro.build/en/guides/integrations-guide/react/) that enables server-side rendering and client-side hydration for your React components. This guide demonstrates how to use Clerk with Astro and React.

If you have not set up your Astro application to work with Clerk, see the [`quickstart guide`](https://clerk.com/docs/astro/getting-started/quickstart.md).

1. ## Install `@astrojs/react`

   Add the [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/) to your project:

   ```npm
   npx astro add react
   ```
2. ## Update `astro.config.mjs`

   Add Clerk and React integrations to your Astro configuration:

   ```ts {{ filename: 'astro.config.mjs' }}
   import { defineConfig } from 'astro/config'
   import node from '@astrojs/node'
   import react from '@astrojs/react'
   import clerk from '@clerk/astro'

   export default defineConfig({
     integrations: [clerk(), react()],
     output: 'server',
     adapter: node({ mode: 'standalone' }),
   })
   ```
3. ## Use Clerk components

   You can use the [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md) in your Astro pages or regular React components.
4. ### Astro pages

   The following example demonstrates how to use Clerk components in Astro pages.

   ```astro {{ filename: 'src/layouts/SiteLayout.astro' }}
   ---
   import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/astro/react'
   ---

   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
       <meta name="generator" content={Astro.generator} />
     </head>
     <body>
       <header>
         <nav>
           <SignedOut client:load>
             <SignInButton client:load mode="modal" />
           </SignedOut>
           <SignedIn client:load>
             <UserButton client:load />
           </SignedIn>
         </nav>
       </header>
       <article>
         <slot />
       </article>
     </body>
   </html>
   ```
5. ### React components

   The following example demonstrates how to use Clerk components in React components.

   ```tsx {{ filename: 'src/components/Header.tsx' }}
   import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/astro/react'

   export default function Header() {
     return (
       <>
         <p>My App</p>
         <SignedOut>
           <SignInButton />
         </SignedOut>
         <SignedIn>
           <UserButton />
         </SignedIn>
       </>
     )
   }
   ```
6. ## Use stores in your React components

   Clerk Astro provides a set of useful [`stores`](https://clerk.com/docs/reference/astro/overview.md#client-side-helpers) that give you access to the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md){{ target: '_blank' }} object, and helper methods for signing in and signing up.

   The following example demonstrates how to use a Clerk Astro store.

   ```tsx {{ filename: 'src/components/Header.tsx' }}
   import { $userStore } from '@clerk/astro/client'

   export default function Username() {
     const user = useSyncExternalStore($userStore.listen, $userStore.get, $userStore.get)
     return <>{user?.firstName}</>
   }
   ```

## Next steps

Learn more about Clerk's client-side helpers and how to use them in your Astro app.

- [Protect content and read user data](https://clerk.com/docs/astro/guides/users/reading.md): Learn how to use Clerk's stores and helpers to protect content and read user data in your Astro app.
- [Client-side helpers](https://clerk.com/docs/reference/astro/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
