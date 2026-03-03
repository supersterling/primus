# Integrate Convex with Clerk

**Example Repository**

- [Clerk Convex Swift](https://github.com/clerk/clerk-convex-swift)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [Integrate Clerk into your app](https://clerk.com/docs/ios/getting-started/quickstart.md)
- [Integrate Convex into your app](https://docs.convex.dev/quickstarts)

With [Convex](https://www.convex.dev/), you can build a backend with a provided realtime database, file storage, text search, scheduling, and more. Paired with Clerk's authentication and user management features, you can build native mobile apps with a secure auth flow and realtime data access.

This guide shows how to integrate Convex with Clerk in your native mobile app. It assumes you have already integrated both Convex and Clerk in your app.

1. ## Set up Clerk as a Convex auth provider

   For your Clerk session token to work with Convex, you need to set up the Convex integration in Clerk.

   1. In the Clerk Dashboard, navigate to the [Convex integration setup](https://dashboard.clerk.com/apps/setup/convex).
   2. Choose your configuration options, and then select **Activate Convex integration**. This will reveal the Frontend API URL for your Clerk instance.
   3. Save the URL. In development, its format is `https://verb-noun-00.clerk.accounts.dev`. In production, its format is `https://clerk.<your-domain>.com`.
2. ## Map additional claims (optional)

   If you need to map additional claims, navigate to the [**Sessions**](https://dashboard.clerk.com/~/sessions) page in the Clerk Dashboard.

   In the **Claims** section, the default audience (`aud`) claim required by Convex is pre-mapped. You can include additional claims as necessary. [Shortcodes](https://clerk.com/docs/guides/sessions/jwt-templates.md#shortcodes) are available to make adding dynamic user values easy.
3. ## Configure Convex with Clerk's Frontend API URL

   In your app's `convex` folder, create a `auth.config.ts` file with the following configuration, using the saved Frontend API URL from earlier:

   ```ts {{ filename: 'convex/auth.config.ts' }}
   export default {
     providers: [
       {
         domain: '{{fapi_url}}',
         applicationID: 'convex',
       },
     ],
   }
   ```
4. ## Deploy your changes to Convex

   Run `npx convex dev` to automatically sync your configuration to your backend.
5. ## Add the Clerk Convex SDK to your app

   Add `clerk-convex-swift` via Swift Package Manager to your app:

   ```swift {{ filename: 'Package.swift' }}
   dependencies: [
     .package(url: "https://github.com/clerk/clerk-convex-swift", from: "0.1.0")
   ]

   targets: [
     .target(
       name: "YourApp",
       dependencies: [
         .product(name: "ClerkConvex", package: "clerk-convex-swift")
       ]
     )
   ]
   ```

   Configure Clerk first with your Clerk Publishable Key, then initialize `ConvexClientWithAuth` with `ClerkConvexAuthProvider` using your Convex deployment URL. Refer to the [Convex deployment docs](https://docs.convex.dev/dashboard/deployments/deployment-settings) for more info.

   ```swift {{ filename: 'MyApp.swift' }}
   import ClerkConvex
   import ClerkKit
   import ConvexMobile
   import SwiftUI

   @MainActor
   let client = ConvexClientWithAuth(
     deploymentUrl: "YOUR_CONVEX_DEPLOYMENT_URL",
     authProvider: ClerkConvexAuthProvider()
   )

   @main
   struct MyApp: App {
     init() {
       Clerk.configure(publishableKey: "{{pub_key}}")
     }

     var body: some Scene {
       WindowGroup {
         ContentView()
           .environment(Clerk.shared)
       }
     }
   }
   ```

   After users authenticate with Clerk, auth state is automatically synced to Convex. Use `client` for subscriptions, mutations, actions, and auth state.
6. ## Show UI based on auth state

   Convex exposes auth state from the authenticated client. Use that state to render loading, signed-out, and signed-in UI.

   ```swift {{ filename: 'ContentView.swift' }}
   import ConvexMobile
   import SwiftUI

   struct ContentView: View {
     @State private var authState: AuthState<String> = .loading

     var body: some View {
       Group {
         switch authState {
         case .loading:
           ProgressView()
         case .unauthenticated:
           Text("Unauthenticated")
         case .authenticated:
           AuthenticatedView()
         }
       }
       .task {
         for await state in client.authState.values {
           authState = state
         }
       }
     }
   }
   ```
7. ## Make requests and present data in the UI

   With Clerk and Convex configured, authenticated requests stay in sync so you can subscribe and render data with minimal setup.

   ```swift {{ filename: 'AuthenticatedView.swift' }}
   import ConvexMobile
   import SwiftUI

   struct AuthenticatedView: View {
     @State private var messages: [Message] = []

     var body: some View {
       List(messages) { message in
         VStack(alignment: .leading) {
           Text(message.author)
           Text(message.body)
         }
       }
       .task {
         let publisher = client
           .subscribe(to: "messages:list")
           .replaceError(with: [Message]())

         for await latest in publisher.values {
           messages = latest
         }
       }
     }
   }

   struct Message: Identifiable, Codable {
     let id: String
     let author: String
     let body: String
   }
   ```

## Next steps

For more information on how to use Convex with Clerk, see the [Convex docs](https://docs.convex.dev/auth/clerk).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
