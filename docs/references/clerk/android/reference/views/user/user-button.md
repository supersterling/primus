# UserButton

![The UserButton is a circular button that displays the signed-in user's profile image.](https://clerk.com/docs/images/ui-components/android-user-button.png)

The `UserButton` is a circular button that displays the user's profile image. When tapped, it presents a sheet with the [`UserProfileView`](https://clerk.com/docs/android/reference/views/user/user-profile-view.md).

## Parameters

| Name       | Type       | Description                                                                                                                                           |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| clerkTheme | ClerkTheme | The theme to apply to the UserButton. This will override any theme applied to the UserButton's parent view, or configured in the Clerk global object. |

## Usage

The following examples show how to use the `UserButton` in your app.

### Basic usage

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.clerk.api.Clerk
import com.clerk.ui.userbutton.UserButton

@Composable
fun HomeScreen() {
    val user by Clerk.userFlow.collectAsStateWithLifecycle()
    if (user != null) {
        UserButton()
    }
}
```

### In a navigation toolbar

```kotlin
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.clerk.api.Clerk
import com.clerk.ui.userbutton.UserButton


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserProfileTopBar() {
    val user by Clerk.userFlow.collectAsStateWithLifecycle()
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Home screen") }, actions = { user?.let { UserButton() } })
        }
    ) {
        // Content goes here
    }
}
```

## Customization

To learn how to customize Clerk views, see the [`dedicated guide`](https://clerk.com/docs/android/guides/customizing-clerk/clerk-theme.md).

If Clerk's prebuilt views don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
