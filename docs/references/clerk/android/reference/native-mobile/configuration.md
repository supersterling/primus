# Configure the SDK

Initialize [`Clerk`](https://clerk.com/docs/android/reference/native-mobile/clerk.md) once at app launch in your `Application` class before accessing any Clerk features.

## Basic configuration

```kotlin {{ filename: 'app/src/main/java/com/example/myclerkapp/MyClerkApp.kt' }}
  package com.example.myclerkapp

  import android.app.Application
  import com.clerk.api.Clerk

  class MyClerkApp: Application() {
      override fun onCreate() {
        super.onCreate()
        Clerk.initialize(
            this,
            publishableKey = "{{pub_key}}"
        )
      }
  }
```

Register your Application class in `AndroidManifest.xml`:

```xml
<application android:name=".MyClerkApp">
    ...
</application>
```

## Wait for initialization

The Clerk SDK initialization is non-blocking. Listen for the SDK to be ready before using Clerk features:

```kotlin
import com.clerk.api.Clerk
import kotlinx.coroutines.flow.first

// Wait for initialization
Clerk.isInitialized.first { it }

// Now safe to use Clerk
val user = Clerk.userFlow.value
```

## Next steps

- [Clerk](https://clerk.com/docs/android/reference/native-mobile/clerk.md): Learn how to access Clerk in your app.
- [Android Quickstart](https://clerk.com/docs/android/getting-started/quickstart.md): Follow the end-to-end setup guide for a Clerk-powered Android app.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
