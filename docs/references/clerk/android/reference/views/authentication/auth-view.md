# AuthView

![The AuthView renders a comprehensive authentication interface that handles both user sign-in and sign-up flows.](https://clerk.com/docs/images/ui-components/android-auth-view.png){{ style: { maxWidth: '460px' } }}

The `AuthView` renders a comprehensive authentication interface with support for multiple sign-up flows and sign-in methods, multi-factor authentication, password reset, and account recovery. The functionality of the `AuthView` is controlled by the instance settings you specify in the [Clerk Dashboard](https://dashboard.clerk.com), such as [sign-in and sign-up options](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options.md) and [social connections](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md).

By default, the `AuthView` will automatically determine whether to sign users in or sign them up based on whether they already have an account. This is the default mode that provides seamless authentication without requiring users to choose between sign-in and sign-up.

## Parameters

| Name     | Type     | Description                                                                                                                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| modifier | Modifier | A modifier that gets applied to the AuthView composable. This is by default applied to the top level NavDisplay and shouldn't be used to change the appearance of the AuthView itself. |

## Usage

The following example shows how to use the `AuthView` in your Android app.

### Basic usage

```kotlin
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.clerk.api.Clerk
import com.clerk.ui.auth.AuthView
import com.clerk.ui.userbutton.UserButton

@Composable
fun HomeScreen() {
    val user by Clerk.userFlow.collectAsStateWithLifecycle()
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        if (user != null) {
            UserButton()
        } else {
            AuthView()
        }
    }
}
```

## Customization

To learn how to customize Clerk views, see the [`dedicated guide`](https://clerk.com/docs/android/guides/customizing-clerk/clerk-theme.md).

If Clerk's prebuilt views don't meet your specific needs or if you require more control over the logic, you can rebuild the existing Clerk flows using the Clerk API. For more information, see the [custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
