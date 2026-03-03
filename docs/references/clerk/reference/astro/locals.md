# Locals

Through Astro [`locals`](https://docs.astro.build/en/guides/middleware/#storing-data-in-contextlocals), Clerk's [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) and current [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md){{ target: '_blank' }} objects can be accessed between middlewares and pages. These locals are injected when you configure the provided [`middleware`](https://clerk.com/docs/reference/astro/clerk-middleware.md).

## `locals.auth()`

`Astro.locals.auth()` returns an `Auth` object. This JavaScript object contains important information like session data, your user's ID, as well as the ID of the Active Organization. Learn more about the `Auth` object [`here`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }}.

### `locals.auth()` options

| Name                                                                            | Type                                                                                                                        | Description |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| acceptsToken?: The type of authentication token(s) to accept. Valid values are: | treatPendingAsSignedOut?: A boolean that indicates whether to treat pending session status as signed out. Defaults to true. |             |

### Example: Protect a page or form

You can use the `isAuthenticated` property from the `auth()` local to protect your pages and forms.

**Protect a page**

```astro {{ filename: 'src/pages/protected.astro' }}
---
const { isAuthenticated, userId, redirectToSignIn } = Astro.locals.auth()

if (!isAuthenticated) {
  return redirectToSignIn()
}
---

<div>Protected page</div>
```

**Protect a form**

```astro {{ filename: 'src/pages/form.astro' }}
---
if (Astro.request.method === 'POST') {
  if (!Astro.locals.auth().isAuthenticated) {
    throw new Error('You must be signed in to add an item to your cart')
  }

  const data = await Astro.request.formData()
  console.log('add item action', data)
}
---

<form method="POST">
  <input value="test" type="text" name="name" />
  <button type="submit">Add to Cart</button>
</form>
```

### Example: Protect a route based on token type

The following example uses `locals.auth()` to protect the route based on token type:

- It accepts any token type `(acceptsToken: 'any')` from the request.
- If the token is a `session_token`, it logs that the request is from a user session.
- Otherwise, it logs that the request uses a machine token and specifies its type.

```ts
export const GET: APIRoute = ({ locals }) => {
  // Use `locals.auth()` to protect a route based on token type
  const authObject = locals.auth({ acceptsToken: 'any' })

  if (authObject.tokenType === 'session_token') {
    console.log('This is a session token from a user')
  } else {
    console.log(`This is a ${authObject.tokenType} token`)
  }

  return new Response(JSON.stringify({}))
}
```

## `locals.currentUser()`

The `currentUser()` local returns the [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object of the currently active user.

Under the hood, this local:

- calls `fetch()`, so it is automatically deduped per request.
- uses the [`GET /v1/users/{user_id}`](https://clerk.com/docs/reference/backend-api/tag/users/get/users/%7Buser_id%7D.md){{ target: '_blank' }} endpoint.
- counts towards the [Backend API request rate limit](https://clerk.com/docs/guides/how-clerk-works/system-limits.md).

> The [`Backend User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object includes a `privateMetadata` field that should not be exposed to the frontend. Avoid passing the full user object returned by `currentUser()` to the frontend. Instead, pass only the specified fields you need.

```astro {{ filename: 'src/pages/form.astro' }}
---
if (Astro.request.method === 'POST') {
  const user = await Astro.locals.currentUser()

  if (!user) {
    throw new Error('You must be signed in to use this feature')
  }

  const data = await Astro.request.formData()
  const serverData = {
    usersHobby: data.get('hobby'),
    userId: user.id,
    profileImage: user.imageUrl,
  }

  console.log('add item action completed with user details ', serverData)
}
---

<form method="POST">
  <input value="soccer" type="text" name="hobby" />
  <button type="submit">Submit your hobby</button>
</form>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
