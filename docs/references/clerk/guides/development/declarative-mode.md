# Add React Router to your Clerk + React application

**Before you start**

- [Set up a React + Clerk application](https://clerk.com/docs/react/getting-started/quickstart.md)

React Router supports three different routing strategies, or ["modes"](https://reactrouter.com/start/modes):

- **Declarative mode:** Enables basic routing features like matching URLs to components, navigating around the app, and providing active states with APIs like `<Link>`, `useNavigate()`, and `useLocation()`.
- **Data mode:** Adds data loading, actions, pending states and more with APIs like loader, action, and useFetcher. To use React Router in data mode, see the [demo repository](https://github.com/clerk/clerk-react-quickstart/blob/integrate-react-router-dom-using-data-router-method/src/main.tsx). A guide is coming soon.
- **Framework mode:** Use React Router as a framework to build your entire app. To use React Router as a framework instead, see the [`React Router quickstart`](https://clerk.com/docs/react-router/getting-started/quickstart.md).

This guide will cover how to add React Router in **declarative mode**, assuming you have followed the [`React quickstart`](https://clerk.com/docs/react/getting-started/quickstart.md).

1. ## Install `react-router` and `@clerk/react-router`

   Run the following command to install both React Router and the Clerk React Router SDK:

   ```npm
   npm install react-router @clerk/react-router
   ```
2. ## Set your Clerk API keys

   > You will not need the Clerk Secret Key in React Router's declarative mode, as it should never be used on the client-side.

   Add your Clerk Publishable Key to your `.env` file.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, copy your Clerk Publishable Key.
   3. Paste your key into your `.env` file.

   The final result should resemble the following:

   ```env {{ filename: '.env' }}
   VITE_CLERK_PUBLISHABLE_KEY={{pub_key}}
   ```
3. ## Update `<ClerkProvider>`

   Update `<ClerkProvider>` to be imported from `@clerk/react-router` instead of `@clerk/clerk-react`.

   ```tsx {{ filename: 'src/main.tsx', mark: [3, 16, 18] }}
   import { StrictMode } from 'react'
   import { createRoot } from 'react-dom/client'
   import { ClerkProvider } from '@clerk/react-router'
   import './index.css'
   import App from './App.tsx'

   // Import your Publishable Key
   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Add your Clerk Publishable Key to the .env file')
   }

   createRoot(document.getElementById('root')!).render(
     <StrictMode>
       <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
         <App />
       </ClerkProvider>
     </StrictMode>,
   )
   ```
4. ## Set up React Router

   To use declarative mode, wrap your app in a `<BrowserRouter>`. To define your app's routes, add `<Routes>` and `<Route>` components. This example adds the `/` (home) route and renders the `<App />` component when the URL matches. Read more about routing in the [React Router docs](https://reactrouter.com/start/declarative/routing).

   ```tsx {{ filename: 'src/main.tsx', mark: [3, 17, [19, 21], 23] }}
   import { StrictMode } from 'react'
   import { createRoot } from 'react-dom/client'
   import { BrowserRouter, Routes, Route } from 'react-router'
   import { ClerkProvider } from '@clerk/react-router'
   import './index.css'
   import App from './App.tsx'

   // Import your Publishable Key
   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Add your Clerk Publishable Key to the .env file')
   }

   createRoot(document.getElementById('root')!).render(
     <StrictMode>
       <BrowserRouter>
         <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
           <Routes>
             <Route path="/" element={<App />} />
           </Routes>
         </ClerkProvider>
       </BrowserRouter>
     </StrictMode>,
   )
   ```

## Next steps

Learn more about Clerk components, how to use them to create custom pages, and how to use Clerk's client-side helpers using the following guides.

- [Create a custom sign-up page](https://clerk.com/docs/react-router/guides/development/custom-sign-up-page.md): Learn how to add a custom sign-up page to your React Router app with Clerk's components.
- [Protect content and read user data](https://clerk.com/docs/react-router/guides/users/reading.md): Learn how to use Clerk's hooks and helpers to protect content and read user data in your React Router app.
- [Client-side helpers](https://clerk.com/docs/reference/react-router/overview.md#client-side-helpers): Learn more about Clerk's client-side helpers and how to use them.
- [Prebuilt components](https://clerk.com/docs/reference/components/overview.md): Learn how to quickly add authentication to your app using Clerk's suite of components.
- [Clerk React Router SDK Reference](https://clerk.com/docs/reference/react-router/overview.md): Learn about the Clerk React Router SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
