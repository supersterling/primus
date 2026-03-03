# Chrome Extension Quickstart

**Example Repository**

- [Chrome Extension Quickstart Repo](https://github.com/clerk/clerk-chrome-extension-quickstart)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

1. ## Enable Native API

   In the Clerk Dashboard, navigate to the [**Native applications**](https://dashboard.clerk.com/~/native-applications) page and ensure that the Native API is enabled. This is required to integrate Clerk in your native application.
2. ## Configure your authentication options

   When creating your Clerk application in the Clerk Dashboard, your authentication options will depend on how you configure your Chrome Extension. Chrome Extensions can be used as a popup, a side panel, or in conjunction with a web app. Popups and side panels have limited authentication options. [`Learn more about what options are available.`](https://clerk.com/docs/reference/chrome-extension/overview.md#authentication-options)

   This guide will use a popup.
3. ## Create a new Chrome Extension app

   [Plasmo](https://docs.plasmo.com/framework) is a browser extension framework that includes hot reloading and creating development and production extension builds easily from the same code.

   Plasmo strongly recommends using `pnpm`, so this guide will only use `pnpm`-based examples.

   If you don't already have a Chrome Extension app, run the following commands to create a new one using Plasmo. This sets up a new extension with Tailwind CSS preconfigured and a `src/` directory by default. You can remove either option if you don't need them.

   ```bash {{ filename: 'terminal' }}
   pnpm create plasmo --with-tailwindcss --with-src clerk-chrome-extension
   cd clerk-chrome-extension
   ```
4. ## Install `@clerk/chrome-extension`

   The [`Clerk Chrome Extension SDK`](https://clerk.com/docs/reference/chrome-extension/overview.md) gives you access to prebuilt components, hooks, and helpers to make user authentication easier.

   Run the following command to install the SDK:

   ```bash {{ filename: 'terminal' }}
   pnpm add @clerk/chrome-extension
   ```
5. ## Set your Clerk API keys

   Plasmo offers [several options](https://docs.plasmo.com/framework/env) for environment variable files, as the same codebase can be used for development and production builds, as well as for targeting different browsers. This guide uses `.env.development` and `.env.chrome` files.

   Add the following keys to your `.env.development` file. These keys can always be retrieved from the [**API keys**](https://dashboard.clerk.com/~/api-keys) page in the Clerk Dashboard.

   1. In the Clerk Dashboard, navigate to the [**API keys**](https://dashboard.clerk.com/~/api-keys) page.
   2. In the **Quick Copy** section, select **Chrome Extension** and copy your Clerk Publishable Key and Frontend API URL.
   3. Paste your keys into your `.env.development` file.

   The final result should resemble the following:

   ```env {{ filename: '.env.development' }}
   PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY={{pub_key}}
   CLERK_FRONTEND_API=https://{{fapi_url}}
   ```
6. ## Add `<ClerkProvider>` to your app

   The [`<ClerkProvider>`](https://clerk.com/docs/chrome-extension/reference/components/clerk-provider.md) component provides session and user context to Clerk's hooks and components. It's recommended to wrap your entire app at the entry point with `<ClerkProvider>` to make authentication globally accessible. See the [`reference docs`](https://clerk.com/docs/chrome-extension/reference/components/clerk-provider.md) for other configuration options.

   ```tsx {{ filename: 'src/popup.tsx', mark: [1, [7, 11], 15, 19] }}
   import { ClerkProvider } from '@clerk/chrome-extension'

   import { CountButton } from '~features/count-button'

   import '~style.css'

   const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
   }

   function IndexPopup() {
     return (
       <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
         <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
           <CountButton />
         </div>
       </ClerkProvider>
     )
   }

   export default IndexPopup
   ```
7. ## Create a header with Clerk components

   You can control what content signed in and signed out users can see with Clerk's [`prebuilt components`](https://clerk.com/docs/chrome-extension/reference/components/overview.md). Create a header with the following Clerk components. (With Chrome Extensions, you can also add this logic to a footer).

   - [`<SignedIn>`](https://clerk.com/docs/chrome-extension/reference/components/control/signed-in.md): Children of this component can only be seen while **signed in**.
   - [`<SignedOut>`](https://clerk.com/docs/chrome-extension/reference/components/control/signed-out.md): Children of this component can only be seen while **signed out**.
   - [`<UserButton />`](https://clerk.com/docs/chrome-extension/reference/components/user/user-button.md): Shows the signed-in user's avatar. Selecting it opens a dropdown menu with account management options.
   - [`<SignInButton />`](https://clerk.com/docs/chrome-extension/reference/components/unstyled/sign-in-button.md): An unstyled component that links to the sign-in page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-in URL, this component links to the [Account Portal sign-in page](https://clerk.com/docs/guides/account-portal/overview.md#sign-in).
   - [`<SignUpButton />`](https://clerk.com/docs/chrome-extension/reference/components/unstyled/sign-up-button.md): An unstyled component that links to the sign-up page. In this example, since no props or [environment variables](https://clerk.com/docs/guides/development/clerk-environment-variables.md) are set for the sign-up URL, this component links to the [Account Portal sign-up page](https://clerk.com/docs/guides/account-portal/overview.md#sign-up).

   ```tsx {{ filename: 'src/popup.tsx', mark: [[3, 7], [23, 33]] }}
   import {
     ClerkProvider,
     SignInButton,
     SignUpButton,
     SignedIn,
     SignedOut,
     UserButton,
   } from '@clerk/chrome-extension'
   import { CountButton } from '~features/count-button'

   import '~style.css'

   const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

   if (!PUBLISHABLE_KEY) {
     throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
   }

   function IndexPopup() {
     return (
       <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
         <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-[600px] plasmo-w-[800px] plasmo-flex-col">
           <header className="plasmo-w-full">
             {/* Show the sign-in and sign-up buttons when the user is signed out */}
             <SignedOut>
               <SignInButton mode="modal" />
               <SignUpButton mode="modal" />
             </SignedOut>
             {/* Show the user button when the user is signed in */}
             <SignedIn>
               <UserButton />
             </SignedIn>
           </header>
           <main className="plasmo-grow">
             <CountButton />
           </main>
         </div>
       </ClerkProvider>
     )
   }

   export default IndexPopup
   ```
8. ## Update `<ClerkProvider>` props for Chrome Extension navigation

   To avoid navigation errors, set the `afterSignOutUrl`, `signInFallbackRedirectUrl` and `signUpFallbackRedirectUrl` props for `<ClerkProvider>`. Chrome Extensions don't use an `http` URL, such as `http://localhost:3000`. Instead, they use a `chrome-extension://` URL appended with an unique extension ID called a CRX ID. This URL is what you will pass to these props.

   ```tsx {{ filename: 'src/popup.tsx', mark: [15, [25, 27]] }}
   import {
     ClerkProvider,
     SignInButton,
     SignUpButton,
     SignedIn,
     SignedOut,
     UserButton,
   } from '@clerk/chrome-extension'

   import { CountButton } from '~features/count-button'

   import '~style.css'

   const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
   const EXTENSION_URL = chrome.runtime.getURL('.')

   if (!PUBLISHABLE_KEY) {
     throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
   }

   function IndexPopup() {
     return (
       <ClerkProvider
         publishableKey={PUBLISHABLE_KEY}
         afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
         signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
         signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
       >
         <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-[600px] plasmo-w-[800px] plasmo-flex-col">
           <header className="plasmo-w-full">
             <SignedOut>
               <SignInButton mode="modal" />
               <SignUpButton mode="modal" />
             </SignedOut>
             <SignedIn>
               <UserButton />
             </SignedIn>
           </header>
           <main className="plasmo-grow">
             <CountButton />
           </main>
         </div>
       </ClerkProvider>
     )
   }

   export default IndexPopup
   ```
9. ## Create a consistent CRX ID for your extension

   Chrome Extensions have a unique CRX ID that rotates by default, which can cause errors with the Clerk integration. To avoid these problems, ensure that you have a **consistent** CRX ID in both development and production for your extension by following these steps:

   1. Visit Plasmo Itero's [Generate Keypairs](https://itero.plasmo.com/tools/generate-keypairs) tool.
   2. Select **Generate KeyPairs**.
   3. Save the **Private Key** somewhere secure in case you need it in the future. Save the **Public Key** and the **CRX ID** for the next steps.
10. ## Create an `.env.chrome` file to store your public key

    Create an `.env.chrome` file and add your public key to it, as shown in the following example:

    ```env {{ filename: '.env.chrome' }}
    CRX_PUBLIC_KEY=<YOUR_PUBLIC_KEY>
    ```
11. ## Edit your `package.json` to use the new public key

    Plasmo [uses the `package.json` to generate a `manifest.json` on build](https://docs.plasmo.com/framework#where-is-the-manifestjson-file), and allows for the use of environment variables in `package.json`.

    In your `package.json`, in the `manifest` object:

    - Set the `key` value to `"$CRX_PUBLIC_KEY"`. This helps configure the consistent CRX ID for your extension.
    - Set the `permissions` array to include `"cookies"` and `"storage"`. `permissions` specifies which permissions your extension requires.
    - Set or update the `host_permissions` array to include `"http://localhost/*"` and `"$CLERK_FRONTEND_API/*"`. `host_permissions` specifies which hosts, or websites, have permission to sync auth state with your app.

    ```json {{ filename: 'package.json' }}
    {
      // The rest of your package.json file
      "manifest": {
        "key": "$CRX_PUBLIC_KEY",
        "permissions": ["cookies", "storage"],
        "host_permissions": ["http://localhost/*", "$CLERK_FRONTEND_API/*"]
      }
    }
    ```
12. ## Use `pnpm dev` to start your development server and create a build

    Plasmo facilitates Chrome Extension development by automatically "hot loading" the app whenever you save a changed file in the project. This ensures the `build/chrome-mv3-dev` folder remains up to date. Without the plugin, you would need to manually execute the build command and reload your Chrome Extension after each change. Plasmo automates this process, streamlining development.

    Run the following command to start your development environment. This also creates the build in `build/chrome-mv3-dev`, and rebuilds when you make changes to the extension.

    ```bash {{ filename: 'terminal' }}
    pnpm dev
    ```
13. ## Load your Chrome Extension into your Chromium-based browser

    To load your Chrome Extension, follow these steps:

    1. Open Chrome or a Chromium-based browser and navigate to `chrome://extensions`.
    2. In the top-right, enable **Developer mode**.
    3. In the top-left, select **Load unpacked**.
    4. Navigate to where your project is located and select the `build/chrome-mv3-dev` folder. Then select **Select**. Your extension will now be loaded and shown in the list of extensions.
    5. Confirm that the ID shown in your extension matches the CRX ID you saved [`earlier`](https://clerk.com/docs/chrome-extension/getting-started/quickstart.md#create-a-consistent-crx-id-for-your-extension).
14. ## Test your Chrome Extension

    In your Chrome browser, open the extension popup. Ensure that the `<SignInButton>` appears, and that selecting it opens the `<SignIn />` modal. Sign in and ensure that the `<UserButton />` appears in the header.

    > After signing up or signing in, your popup may appear to crash. Closing and reopening the popup should restart the extension and you should be signed in.
    >
    > Your extension does not yet have anything to handle routing, and by default, the Clerk components attempt to redirect the user. See [the guide on adding React Router to your Chrome Extension](https://clerk.com/docs/guides/development/add-react-router.md) to add routing to your extension.

## Next steps

Learn how to add routing to your Chrome Extension, keep user sessions in sync, and how to use Clerk's client-side helpers using the following guides.

- [Add React Router](https://clerk.com/docs/guides/development/add-react-router.md): Learn how to add React Router to your Chrome Extension.
- [Sync your Chrome Extension with your web app](https://clerk.com/docs/guides/sessions/sync-host.md): Learn how to configure your Chrome Extension to sync user authentication with your web app.
- [createClerkClient()](https://clerk.com/docs/reference/chrome-extension/create-clerk-client.md): Learn how to use Clerk's&#x20;
- [Deploy a Chrome Extension to production](https://clerk.com/docs/guides/development/deployment/chrome-extension.md): Learn how to deploy your Clerk Chrome Extension to production.
- [Configure a consistent CRX ID](https://clerk.com/docs/guides/development/configure-consistent-crx-id.md): Learn how to configure a consistent CRX ID to ensure your extension has a stable, unchanging key.
- [Clerk Chrome Extension SDK Reference](https://clerk.com/docs/reference/chrome-extension/overview.md): Learn about the Clerk Chrome Extension SDK and how to integrate it into your app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
