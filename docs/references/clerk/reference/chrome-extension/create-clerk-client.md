# createClerkClient()

The `createClerkClient()` helper initializes a new Clerk instance on demand and refreshes the session token if there is a valid, signed-in user. It can be used in a [background service worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics) to access a user's information or session token.

When a side panel or a popup is closed, the Clerk process that normally refreshes the user's session token every 60 seconds is no longer running, and the stored session will become stale. If a request were made 60 seconds after the side panel or popup was closed, it would fail because the session token is no longer valid. By configuring `createClerkClient()` to run in a background service worker, you can ensure that the user's session is always fresh.

## Usage

The following example:

- Creates a background service worker that sets up an event listener to handle requests from a [content script](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts). If the request wants to interact with Clerk, the listener calls `createClerkClient()` to create a Clerk instance and refresh the session token, and then calls [`getToken()`](https://clerk.com/docs/reference/javascript/session.md#get-token) to get the token.
- Adds a link to the home page of the extension that when visited, opens the page as a new tab.
- The new tab has a button on it that, when clicked, triggers the background service worker.

> The following example assumes that you have followed the [`Chrome Extension Quickstart`](https://clerk.com/docs/chrome-extension/getting-started/quickstart.md) and then the [Add React Router](https://clerk.com/docs/guides/development/add-react-router.md) guide, but you can apply these concepts to your own application.

1. ### Create your background service worker

   1. In the `src/` directory, create the `background/` directory.
   2. In the `background/` directory, create the `index.ts` file.
   3. In the `index.ts` file, paste the following code to create an event listener that listens for messages from content scripts and calls a function that uses `createClerkClient()` to get a new token for the user.

   ```typescript {{ filename: 'src/background/index.ts' }}
   import { createClerkClient } from '@clerk/chrome-extension/background'

   const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

   if (!publishableKey) {
     throw new Error('Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file')
   }

   // Use `createClerkClient()` to create a new Clerk instance
   // and use `getToken()` to get a fresh token for the user
   async function getToken() {
     const clerk = await createClerkClient({
       publishableKey,
     })

     // If there is no valid session, then return null. Otherwise proceed.
     if (!clerk.session) {
       return null
     }

     // Return the user's session
     return await clerk.session?.getToken()
   }

   // Create a listener to listen for messages from content scripts
   // It must return true, in order to keep the connection open and send a response later.
   // NOTE: A runtime listener cannot be async.
   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     // This example sends the token back to the content script
     // but you could also use the token to perform actions on behalf of the user
     getToken()
       .then((token) => sendResponse({ token }))
       .catch((error) => {
         console.error('[Background service worker] Error:', JSON.stringify(error))
         // If there is no token then send a null response
         sendResponse({ token: null })
       })
     return true // REQUIRED: Indicates that the listener responds asynchronously.
   })
   ```
2. ### Create the tab with the content script

   1. In the `src/` directory, create the `tabs/` directory.
   2. In the `tabs/` directory, create the `background-worker-demo.html` file.
   3. In the `background-worker-demo.html` file, paste the following code to create a basic HTML file that will house the React component for the content script.
      ```html {{ filename: 'src/tabs/background-worker-demo.html' }}
      <!doctype html>
      <html>
        <head>
          <title>Clerk Background Worker Demo</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>

        <body></body>
      </html>
      ```
   4. In the `tabs/` directory, create the `background-worker-demo.tsx` file.
   5. In the `background-worker-demo.tsx` file, paste the following code to create a React component with a button that will trigger the background service worker to get the token. If the token is returned, it will be displayed on the page.
      ```tsx {{ filename: 'src/tabs/background-worker-demo.tsx' }}
      import * as React from 'react'

      export default function NewTab() {
        const [token, setToken] = React.useState<string | null>(null)

        const getToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()

          // Trigger the background service worker to get the token
          // and set the token in the state
          chrome.runtime.sendMessage({ greeting: 'get-token' }, (response) => {
            setToken(response.token)
          })
        }

        return (
          <div>
            <p>Clerk Background Worker Demo</p>
            <div className="App">
              <p>
                This new tab simulates a content page where you might want to access user information, or
                make a request to your backend server and include a user token in the request.
              </p>
              <p>Make sure that you are signed into the extension. You can have the popup closed.</p>
              <button type="button" onClick={getToken} className="button invert">
                Get token from service worker
              </button>
              {token && <p>Token: {token}</p>}
            </div>
          </div>
        )
      }
      ```
3. ### Add a button to the extension to open the new tab

   Add a button to your Chrome Extension to open the page you created in the previous step as a new tab. This can be added anywhere in your extension. The following example places the button on the home page of the extension.

   ```tsx {{ filename: 'src/popup/routes/home.tsx' }}
   export const Home = () => {
     return (
       <>
         <h1>Clerk + Chrome Extension</h1>
         <button
           onClick={() => {
             chrome.tabs.create({
               url: './tabs/background-worker-demo.html',
             })
           }}
         >
           Open background worker demo in a new tab
         </button>
       </>
     )
   }
   ```
4. ### Test the background service worker

   1. Run your project with the following command:
      ```bash {{ filename: 'terminal' }}
      pnpm dev
      ```
   2. In your Chrome browser, open the extension popup and sign in.
   3. Once you've signed in, select the button that you added and a new tab will open.
   4. In the new tab, select the **Get token from service worker** button. The token will be displayed on the page.

## `createClerkClient()` options

The `createClerkClient()` function accepts an optional object. The following options are available:

| Name           | Type   | Description                                                                                                                                                                                                                             |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publishableKey | string | Your Clerk Publishable KeyYour Clerk Publishable Key tells your app what your FAPI URL is, enabling your app to locate and communicate with your dedicated FAPI instance. You can find it on the API keys page in the Clerk Dashboard.. |
| syncHost?      | string | The host to sync the session with. For more information, see the dedicated guide.                                                                                                                                                       |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
