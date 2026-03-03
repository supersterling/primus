# Add React Router to your Clerk-powered Chrome Extension

**Example Repository**

- [Chrome Extension Quickstart Repo](https://github.com/clerk/clerk-chrome-extension-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [Add auth and user management to your Chrome Extension with Clerk](https://clerk.com/docs/chrome-extension/getting-started/quickstart.md)

This tutorial demonstrates how to integrate React Router into your Chrome Extension application. It assumes you're using Plasmo to build your Chrome Extension.

1. ## Install `react-router`

   React Router is a lightweight, fully-featured routing library. To install it in your project, run the following command:

   ```bash {{ filename: 'terminal' }}
   pnpm add react-router
   ```

   > This guide assumes you're using Plasmo to build your Chrome Extension, so you must use `pnpm` as your package manager.
2. ## Create routes

   1. In the `src/` directory, create a `popup/` directory.
   2. In the `popup/` directory, create a `routes/` directory.
   3. In the `routes/` directory, create the `home.tsx`, `sign-in.tsx`, `sign-up.tsx`, and `settings.tsx` files.
   4. Use the following tabs to view the code necessary for each file.

   **Home**

   ```tsx {{ filename: 'src/popup/routes/home.tsx' }}
   export const Home = () => {
     return (
       <>
         <h1>Clerk + Chrome Extension + React Router</h1>
       </>
     )
   }
   ```

   **Sign-in**

   ```tsx {{ filename: 'src/popup/routes/sign-in.tsx' }}
   import { SignIn } from '@clerk/chrome-extension'

   export const SignInPage = () => {
     return (
       <>
         <p>Sign In</p>
         <SignIn routing="virtual" />
       </>
     )
   }
   ```

   **Sign-up**

   ```tsx {{ filename: 'src/popup/routes/sign-up.tsx' }}
   import { SignUp } from '@clerk/chrome-extension'

   export const SignUpPage = () => {
     return (
       <>
         <p>Sign Up</p>
         <SignUp routing="virtual" />
       </>
     )
   }
   ```

   **Settings**

   ```tsx {{ filename: 'src/popup/routes/settings.tsx' }}
   import { UserProfile } from '@clerk/chrome-extension'

   export const Settings = () => {
     return (
       <>
         <h1>Settings</h1>
         <UserProfile routing="virtual" />
       </>
     )
   }
   ```
3. ## Create layouts

   1. Delete your `src/popup.tsx` file.
   2. In your `src/popup/` directory, create a `layouts/` directory.
   3. In the `layouts/` directory, create a `root-layout.tsx` file.
   4. In the `root-layout.tsx` file, paste the following code to create a layout for your app.
      - The layout contains an [`<Outlet />`](https://reactrouter.com/en/main/components/outlet) component from `react-router`. This behaves similar to `{children}` in Next.js or more generic React components.
      - The footer includes Clerk's [`<UserButton />`](https://clerk.com/docs/nextjs/reference/components/user/user-button.md) component and a link to the `/settings` page, which renders Clerk's [`<UserProfile />`](https://clerk.com/docs/nextjs/reference/components/user/user-profile.md) component. Clerk's [`<SignedIn>`](https://clerk.com/docs/nextjs/reference/components/control/signed-in.md) and [`<SignedOut>`](https://clerk.com/docs/nextjs/reference/components/control/signed-out.md) control components determine what's displayed based on the user's authentication state.

   **Root Layout**

   ```tsx {{ filename: 'src/popup/layouts/root-layout.tsx' }}
   import { Link, Outlet, useNavigate } from 'react-router'
   import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/chrome-extension'

   const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
   }

   export const RootLayout = () => {
     const navigate = useNavigate()

     return (
       <ClerkProvider
         routerPush={(to) => navigate(to)}
         routerReplace={(to) => navigate(to, { replace: true })}
         publishableKey={PUBLISHABLE_KEY}
         afterSignOutUrl="/"
       >
         <div className="plasmo-w-[785px] plasmo-h-[600px]">
           <main>
             <Outlet />
           </main>
           <footer>
             <SignedIn>
               <Link to="/settings">Settings</Link>
               <UserButton />
             </SignedIn>
             <SignedOut>
               <Link to="/">Home</Link>
               <Link to="/sign-in">Sign In</Link>
               <Link to="/sign-up">Sign Up</Link>
             </SignedOut>
           </footer>
         </div>
       </ClerkProvider>
     )
   }
   ```
4. ## Configure layouts and routes with `createMemoryRouter`

   [React Router's `createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router) is a router that uses memory to store the state of the router instead of the browser's history. This is useful for creating a router in a non-browser environment like a Chrome Extension.

   1. In the `src/popup/` directory, create an `index.tsx` file.
   2. In the `index.tsx` file, paste the following code to configure your routes with `createMemoryRouter`.

   ```ts {{ filename: 'src/popup/index.tsx' }}
   import React from 'react'

   import '../style.css'

   import { createMemoryRouter, RouterProvider } from 'react-router'

   import { RootLayout } from './layouts/root-layout'
   import { Home } from './routes/home'
   import { Settings } from './routes/settings'
   import { SignInPage } from './routes/sign-in'
   import { SignUpPage } from './routes/sign-up'

   const router = createMemoryRouter([
     {
       // Wraps the entire app in the root layout
       element: <RootLayout />,
       // Mounted where the <Outlet /> component is inside the root layout
       children: [
         { path: '/', element: <Home /> },
         { path: '/sign-in', element: <SignInPage /> },
         { path: '/sign-up', element: <SignUpPage /> },
         { path: '/settings', element: <Settings /> },
       ],
     },
   ])

   export default function PopupIndex() {
     return <RouterProvider router={router} />
   }
   ```
5. ## Test the integration

   1. Run your project with the following command:
      ```bash {{ filename: 'terminal' }}
      pnpm dev
      ```
   2. In your Chrome browser, open the extension popup. Ensure that the home page displays with a footer containing the **Home**, **Sign In**, and **Sign Up** links.
   3. Visit the **Sign Up** link and ensure the `<SignUp />` component is rendered.
   4. Visit the **Sign In** link and ensure the `<SignIn />` component is rendered. Sign in with your account. You'll be redirected to the home page and the footer will display the **Settings** link and the `<UserButton />` component.
   5. Select the `<UserButton />` component to open the user menu.
   6. Visit the **Settings** link and ensure the `<UserProfile />` component is rendered.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
