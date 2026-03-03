# User impersonation

Clerk's user impersonation feature allows you to sign in to your application as one of your users, enabling you to directly reproduce and remedy any issues they're experiencing. It's a helpful feature for customer support and debugging.

> You can perform up to **5 user impersonations per month for free**. To increase this limit, refer to the [pricing page](https://clerk.com/pricing){{ target: '_blank' }}.

## Impersonate a user

The easiest way to impersonate a user is from the [**Users**](https://dashboard.clerk.com/~/users) page in the Clerk Dashboard.

To impersonate a user, on the right side of a user's row, select on the menu icon (three stacked dots). A dropdown menu will appear. When you select the **Impersonate user** option, your application instance should open in a new tab with the impersonated user signed in.

To add user impersonation functionality to your application, see the [custom flow for user impersonation](https://clerk.com/docs/guides/development/custom-flows/account-updates/user-impersonation.md).

## How user impersonation works

Clerk allows developers or admins of an application to sign in as different users. The feature involves two parts:

1. Get an actor token that can be used to sign in as a different user.
2. Detect an impersonated session as soon as you're signed in.

## Actor tokens

Actor tokens are similar to [sign-in tokens](https://clerk.com/docs/reference/backend-api/tag/sign-in-tokens/post/sign_in_tokens.md){{ target: '_blank' }}. They can be used for one-time sign-ins, but they result in impersonated sessions.

### Create an actor token

To create an actor token, you can use the [Backend API](https://clerk.com/docs/reference/backend-api/tag/actor-tokens/post/actor_tokens.md){{ target: '_blank' }}.

The following example demonstrates how to create an actor token by making a request directly to Clerk's Backend API using cURL. Using the generated token will result in user with ID `user_21Ufcy98STcA11s3QckIwtwHIES` (the actor/impersonator) signing in as user with ID `user_1o4qfak5AdI2qlXSXENGL05iei6` (the subject/impersonated).

```bash
curl -X POST https://api.clerk.com/v1/actor_tokens -d '{ \
  "user_id": "user_1o4qfak5AdI2qlXSXENGL05iei6", \
  "expires_in_seconds": 600 \
  "actor": { \
    "sub": "user_21Ufcy98STcA11s3QckIwtwHIES", \
  } \
}'
```

When creating actor tokens, the object that you pass as the `actor` parameter will end up in the authentication token's `act` claim. You can read more details in the [guide on session tokens](https://clerk.com/docs/guides/sessions/session-tokens.md#default-claims).

### Revoke an actor token

To revoke an actor token, you can use the [Backend API](https://clerk.com/docs/reference/backend-api/tag/actor-tokens/post/actor_tokens/%7Bactor_token_id%7D/revoke.md){{ target: '_blank' }}.

Despite it's expiration date, you can revoke a token at any time. Revoked actor tokens can no longer be used for signing in.

The following example demonstrates how to revoke an actor token by making a request directly to Clerk's Backend API using cURL, even if it's not expired yet.

```bash
curl -X POST https://api.clerk.com/v1/actor_tokens/act_2EL6mQKzeUtoRwGuLZsznyfkIsH/revoke
```

### Sign in with an actor token

Actor tokens are consumed the same way as sign in tokens.

Once you've successfully created an actor token, you can use the `url` attribute of the response to consume the token and impersonate a user.

The `url` attribute is a Clerk Frontend API URL that will use the token to sign out existing users and prepare the [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object for impersonation. You can directly visit the `url` provided in the response to consume the actor token.

The [Frontend API](https://clerk.com/docs/reference/frontend-api/.md){{ target: '_blank' }} will redirect you to the `/sign-in` page of your application, where the flow will continue by consuming the `__clerk_ticket` parameter.

## How to detect impersonated sessions

Once a user is signed in as a different user, Clerk provides APIs and helper methods to distinguish an impersonated session from a regular session.

Clerk also adds an `act` claim on the [Clerk session token](https://clerk.com/docs/guides/sessions/session-tokens.md), which contains information like the impersonated session ID and the actor/impersonator's user ID.

> When using a custom JWT template, the `{{session.actor}}` will need to be added as a claim in order to expose it.

### Detect impersonated sessions in the frontend

To detect impersonated sessions in the frontend, the `actor` object contains the `sub` claim of the impersonator. You can use this information to detect impersonated sessions.

**Hook**

You can use the [`useAuth()`](https://clerk.com/docs/nextjs/reference/hooks/use-auth.md) hook to get access to the authentication context, which includes the `actor` object.

```jsx
const { userId, actor } = useAuth()

return (
  <div>
    Server-side info:
    <p>
      {actor && (
        <span>
          User {actor.sub} has signed in as user {userId}
        </span>
      )}
    </p>
  </div>
)
```

**JavaScript**

You can use the [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) object to get access to the `session` object, which includes the `actor` object.

```js {{ filename: 'main.js' }}
import { Clerk } from '@clerk/clerk-js'

// Initialize Clerk with your Clerk Publishable Key
const pubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(pubKey)
await clerk.load()

const { session } = clerk

if (session.actor) {
  const { actor, user } = session

  console.log(`User ${actor.sub} is signed in as user ${user.id}.`)
}
```

### Detect impersonated sessions in the backend

The [`Auth`](https://clerk.com/docs/reference/backend/types/auth-object.md) object is a server-side object that contains the `actor` object, as well as important information like the current user's session ID and user ID. **Accessing the `Auth` object differs [depending on the SDK you're using](https://clerk.com/docs/reference/backend/types/auth-object.md#how-to-access-the-auth-object).** Here are some examples:

**Next.js**

The Next.js SDK provides the [`auth()`](https://clerk.com/docs/reference/nextjs/app-router/auth.md) helper to App Router apps to access the `Auth` object.

```jsx
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  // Use `auth()` to access the `Auth` object
  const { actor, userId } = await auth()

  return (
    <div>
      {actor && (
        <span>
          user {actor.sub} has signed in as user {userId}
        </span>
      )}
    </div>
  )
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
