# requireAuth()

> The `requireAuth()` helper redirects unauthenticated users to the sign-in page so it should only be used for full-stack Express apps. If your client and server run on different origins, see the [cross-origin requests](https://clerk.com/docs/guides/development/making-requests.md#cross-origin-requests) guide.
>
> Do not use `requireAuth()` for API routes. For backend API calls, use [`clerkMiddleware()`](https://clerk.com/docs/reference/express/overview.md#clerk-middleware) along with [`getAuth()`](https://clerk.com/docs/reference/express/get-auth.md) to verify sessions and return standard HTTP status codes.

The `requireAuth()` middleware functions similarly to `clerkMiddleware()`, in that it checks the request's cookies and headers for a session JWT and if found, attaches the [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object to the `request` object under the `auth` key. However, its difference is that it also protects your routes by redirecting unauthenticated users to the homepage. It accepts the same [options](https://clerk.com/docs/reference/express/clerk-middleware.md#clerk-middleware-options) as `clerkMiddleware()`.

> It's recommended to use both `clerkMiddleware()` and `requireAuth()` together, as `clerkMiddleware()` will provide authentication state to routes that don't use `requireAuth()`. See the [example](https://clerk.com/docs/reference/express/clerk-middleware.md#example-use-clerk-middleware-require-auth-and-get-auth-together).

You can also specify a custom sign-in URL to redirect unauthenticated users to by setting the `CLERK_SIGN_IN_URL` environment variable or by passing a `signInUrl` option to the middleware. It's recommended to set the environment variable.

```js
import { clerkMiddleware, requireAuth } from '@clerk/express'
import express from 'express'

const app = express()
const PORT = 3000

// Apply middleware to all routes
app.use(clerkMiddleware())
app.use(requireAuth())

// Apply middleware to a specific route
// Redirects to the homepage if the user is not authenticated
app.get('/protected', requireAuth(), (req, res) => {
  res.send('This is a protected route.')
})

// Redirects to a custom URL if the user is not authenticated
// Requires `CLERK_SIGN_IN_URL` to be set in env vars
app.get('/protected', requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), (req, res) => {
  res.send('This is a protected route.')
})

// Redirects to a custom URL if the user is not authenticated
// Uses the `signInUrl` option instead of the environment variable
app.get('/protected', requireAuth({ signInUrl: '/sign-in' }), (req, res) => {
  res.send('This is a protected route.')
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
```

## `requireAuth()` options

`requireAuth()` accepts the same [options](https://clerk.com/docs/reference/express/clerk-middleware.md#clerk-middleware-options) as `clerkMiddleware()`.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
