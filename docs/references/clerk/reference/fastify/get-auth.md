# getAuth()

The `getAuth()` helper retrieves the current user's authentication state from the `request` object. It returns the [`Auth object`](https://clerk.com/docs/reference/backend/types/auth-object.md){{ target: '_blank' }}. See the [`Next.js reference documentation`](https://clerk.com/docs/reference/nextjs/pages-router/get-auth.md){{ target: '_blank' }} for more examples on how to use the returned `Auth` object.

### `getAuth()` options

| Name                                                                            | Type                                                                                                                        | Description         |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| request                                                                         |                                                                                                                             | The request object. |
| acceptsToken?: The type of authentication token(s) to accept. Valid values are: | treatPendingAsSignedOut?: A boolean that indicates whether to treat pending session status as signed out. Defaults to true. |                     |

### Example: Use `getAuth()` to retrieve the `userId`

The following example uses `getAuth()` to protect a route and load the user's data. If the user is authenticated, their `userId` is passed to [`clerkClient.users.getUser()`](https://clerk.com/docs/reference/backend/user/get-user.md){{ target: '_blank' }} to get the current user's [`User`](https://clerk.com/docs/reference/javascript/user.md){{ target: '_blank' }} object. If not authenticated, the request is rejected with a `401` status code.

```ts {{ collapsible: true }}
// dotenv must be imported before @clerk/fastify
import 'dotenv/config'
import Fastify from 'fastify'
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'

const fastify = Fastify({ logger: true })

fastify.register(clerkPlugin)

// Use `getAuth()` to protect this route
fastify.get('/protected', async (request, reply) => {
  try {
    // Use `getAuth()` to access `isAuthenticated` and the user's ID
    const { isAuthenticated, userId } = getAuth(request)

    // If user isn't authenticated, return a 401 error
    if (!isAuthenticated) {
      return reply.code(401).send({ error: 'User not authenticated' })
    }

    // Use `clerkClient` to access Clerk's JS Backend SDK methods
    // and get the user's User object
    const user = await clerkClient.users.getUser(userId)

    return reply.send({
      message: 'User retrieved successfully',
      user,
    })
  } catch (error) {
    fastify.log.error(error)
    return reply.code(500).send({ error: 'Failed to retrieve user' })
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()
```

For examples on how to use `getAuth()` to perform authorization checks, see the [dedicated guide](https://clerk.com/docs/guides/secure/authorization-checks.md).

### Example: Protect a route based on token type

The following example uses `getAuth()` to protect the route based on token type:

- It accepts any token type `(acceptsToken: 'any')` from the request.
- If the token is a `session_token`, it logs that the request is from a user session.
- Otherwise, it logs that the request uses a machine token and specifies its type.

```ts
import Fastify from 'fastify'
import { getAuth } from '@clerk/fastify'

const fastify = Fastify()

fastify.get('/path', (request, reply) => {
  // Use `getAuth()` to protect a route based on token type
  const authObject = getAuth(req, { acceptsToken: 'any' })

  if (authObject.tokenType === 'session_token') {
    console.log('This is a session token from a user')
  } else {
    console.log(`This is a ${authObject.tokenType} token`)
  }
})
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
