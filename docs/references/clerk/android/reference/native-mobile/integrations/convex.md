# Integrate Convex with Clerk

**Example Repository**

- [Clerk Convex Kotlin](https://github.com/clerk/clerk-convex-kotlin)

**Before you start**

- [Set up a Clerk application](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)
- [Integrate Clerk into your app](https://clerk.com/docs/android/getting-started/quickstart.md)
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

   Add the `clerk-convex-kotlin` dependency to your app:

   ```kotlin {{ filename: 'app/build.gradle.kts' }}
   dependencies {
       implementation("com.clerk:clerk-convex-kotlin:<latest-version>")
   }
   ```

   Initialize Clerk first with your Clerk Publishable Key, then create `ClerkConvexClient` using your Convex deployment URL. Refer to the [Convex deployment docs](https://docs.convex.dev/dashboard/deployments/deployment-settings) for more info.

   ```kotlin {{ filename: 'MyApplication.kt' }}
   import android.app.Application
   import com.clerk.api.Clerk
   import com.clerk.convex.ClerkConvexClient

   class MyApplication : Application() {
     lateinit var clerkConvex: ClerkConvexClient
       private set

     override fun onCreate() {
       super.onCreate()
       Clerk.initialize(
         context = this,
         publishableKey = "{{pub_key}}",
       )

       clerkConvex = ClerkConvexClient(
         deploymentUrl = "YOUR_CONVEX_DEPLOYMENT_URL",
         context = applicationContext,
       )
     }
   }
   ```

   After users authenticate with Clerk, auth state is automatically synced to Convex. Use `clerkConvex.convex` for queries, mutations, actions, and auth state.
6. ## Show UI based on auth state

   Convex exposes auth state from the authenticated client. Use that state to render loading, signed-out, and signed-in UI.

   ```kotlin {{ filename: 'AuthViewModel.kt' }}
   import androidx.lifecycle.ViewModel
   import androidx.lifecycle.viewModelScope
   import com.clerk.convex.ClerkConvexClient
   import dev.convex.android.AuthState
   import kotlinx.coroutines.launch

   class AuthViewModel(
     private val clerk: ClerkConvexClient,
     ) : ViewModel() {
       init {
         viewModelScope.launch {
         clerk.convex.authState.collect { authState ->
         when (authState) {
             is AuthState.AuthLoading -> showLoading()
             is AuthState.Unauthenticated -> showSignIn()
             is AuthState.Authenticated -> showAuthenticatedContent()
           }
         }
       }
     }
   }
   ```

   Collect `clerk.convex.authState` in your `ViewModel` and map each state to the appropriate screen.
7. ## Make requests and present data in the UI

   With Clerk and Convex configured, authenticated requests stay in sync so you can subscribe and render data with minimal setup.

   ```kotlin {{ filename: 'MessagesViewModel.kt' }}
   import androidx.lifecycle.ViewModel
   import androidx.lifecycle.viewModelScope
   import com.clerk.convex.ClerkConvexClient
   import kotlinx.coroutines.flow.SharingStarted
   import kotlinx.coroutines.flow.StateFlow
   import kotlinx.coroutines.flow.catch
   import kotlinx.coroutines.flow.stateIn

   class MessagesViewModel(
     clerk: ClerkConvexClient,
   ) : ViewModel() {

     val messages: StateFlow<List<Message>> =
       clerk.convex
         .subscribe<List<Message>>("messages:list")
         .catch { emit(emptyList()) } // keep old behavior: fail -> show nothing
         .stateIn(
           scope = viewModelScope,
           started = SharingStarted.WhileSubscribed(stopTimeoutMillis = 5_000),
           initialValue = emptyList()
         )
   }
   ```

   ```kotlin {{ filename: 'MessagesScreen.kt', collapsible: true }}
   import androidx.compose.foundation.layout.Column
   import androidx.compose.foundation.layout.PaddingValues
   import androidx.compose.foundation.layout.fillMaxWidth
   import androidx.compose.foundation.layout.padding
   import androidx.compose.foundation.lazy.LazyColumn
   import androidx.compose.foundation.lazy.items
   import androidx.compose.material3.Text
   import androidx.compose.runtime.Composable
   import androidx.compose.ui.Modifier
   import androidx.compose.ui.unit.dp
   import androidx.lifecycle.compose.collectAsStateWithLifecycle

   @Composable
   fun MessagesScreen(
     viewModel: MessagesViewModel,
     modifier: Modifier = Modifier,
   ) {
     val messages = viewModel.messages.collectAsStateWithLifecycle().value

     LazyColumn(
       modifier = modifier,
       contentPadding = PaddingValues(12.dp),
     ) {
       items(items = messages, key = { it.id }) { message ->
         Column(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
           Text(message.author)
           Text(message.body)
         }
       }
     }
   }

   data class Message(
     val id: String,
     val author: String,
     val body: String,
   )
   ```

## Next steps

For more information on how to use Convex with Clerk, see the [Convex docs](https://docs.convex.dev/auth/clerk).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
