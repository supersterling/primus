# Build a custom flow for handling user impersonation

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

> You can perform up to **5 user impersonations per month for free**. To increase this limit, refer to the [pricing page](https://clerk.com/pricing){{ target: '_blank' }}.

[Clerk's user impersonation feature](https://clerk.com/docs/guides/users/impersonation.md) allows you to sign in to your application as one of your users, enabling you to directly reproduce and remedy any issues they're experiencing. It's a helpful feature for customer support and debugging.

This guide will walk you through how to build a custom flow that handles user impersonation. You will build a dashboard that is only accessible to users with the `org:admin:impersonate` permission. The user visiting the dashboard will see a list of the application's users. When they choose to impersonate a user, they will be signed in as that user and redirected to the homepage.

## Before you start

This example builds a dashboard that is only accessible to users with the `org:admin:impersonate` permission. To use this example, you must first [create the custom `org:admin:impersonate` permission](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions.md#custom-permissions). Or you can modify the authorization checks to fit your use case.

## Build the custom flow

**This example is written for Next.js App Router but it can be adapted for any React-based framework, such as React Router or Tanstack React Start.**

Use the following tabs to view the code for:

- The main page that gets the list of the application's users using the [JS Backend SDK](https://clerk.com/docs/reference/backend/user/get-user-list.md)
- The Client Component that has the UI for displaying the users and the ability to impersonate them
- The Server Action that generates the actor token using the [Backend API](https://clerk.com/docs/reference/backend-api/tag/actor-tokens/post/actor_tokens.md){{ target: '_blank' }}

**Main page**

```tsx {{ filename: 'app/dashboard/page.tsx' }}
import { auth, clerkClient } from '@clerk/nextjs/server'
import ImpersonateUsers from './_components'

export default async function AccountPage() {
  const { has } = await auth()

  // Protect the page
  if (!has({ permission: 'org:admin:impersonate' })) {
    return <p>You do not have permission to access this page.</p>
  }

  const client = await clerkClient()

  // Fetch list of application's users using Clerk's JS Backend SDK
  const users = await client.users.getUserList()

  // This page needs to be a server component to use clerkClient.users.getUserList()
  // You must pass the list of users to the client for the rest of the logic
  // But you cannot pass the entire User object to the client,
  // because its too complex. So grab the data you need, like so:
  const parsedUsers = []
  for (const user of users.data) {
    parsedUsers.push({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
    })
  }

  // Pass the parsed users to the Client Component
  return <ImpersonateUsers users={parsedUsers} />
}
```

**Client Component**

```tsx {{ filename: 'app/dashboard/_components.tsx' }}
'use client'

import React from 'react'
import { useUser, useSignIn } from '@clerk/nextjs'
import { generateActorToken } from './_actions'
import { useRouter } from 'next/navigation'

type ParsedUser = {
  id: string
  email: string | undefined
}

export type Actor = {
  object: string
  id: string
  status: 'pending' | 'accepted' | 'revoked'
  user_id: string
  actor: object
  token: string | null
  url: string | null
  created_at: Number
  updated_at: Number
}

// Create an actor token for the impersonation
async function createActorToken(actorId: string, userId: string) {
  const res = await generateActorToken(actorId, userId) // The Server Action to generate the actor token

  if (!res.ok) console.log('Error', res.message)

  return res.token
}

export default function ImpersonateUsers({ users }: { users: ParsedUser[] }) {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  if (!isSignedIn) {
    // Handle signed out state
    return null
  }

  // Handle "Impersonate" button click
  async function impersonateUser(actorId: string, userId: string) {
    if (!isLoaded) return

    const actorToken = await createActorToken(actorId, userId)

    // Sign in as the impersonated user
    if (actorToken) {
      try {
        const { createdSessionId } = await signIn.create({
          strategy: 'ticket',
          ticket: actorToken,
        })

        await setActive({ session: createdSessionId })

        router.push('/')
      } catch (err) {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }
  }

  return (
    <>
      <p>Hello {user?.primaryEmailAddress?.emailAddress}</p>

      <h1>Users</h1>
      <ul>
        {users?.map((userFromUserList) => {
          return (
            <li key={userFromUserList.id} style={{ display: 'flex', gap: '4px' }}>
              <p>{userFromUserList?.email ? userFromUserList.email : userFromUserList.id}</p>
              <button onClick={async () => await impersonateUser(user.id, userFromUserList.id)}>
                Impersonate
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
```

**Server Action**

```tsx {{ filename: 'app/dashboard/_actions.ts' }}
'use server'

import { auth } from '@clerk/nextjs/server'

export async function generateActorToken(actorId: string, userId: string) {
  // Check if the user has the Permission to impersonate
  if (!auth().has({ permission: 'org:admin:impersonate' })) {
    return {
      ok: false,
      message: 'You do not have permission to access this page.',
    }
  }

  const params = JSON.stringify({
    user_id: userId,
    actor: {
      sub: actorId,
    },
  })

  // Create an actor token using Clerk's Backend API
  const res = await fetch('https://api.clerk.com/v1/actor_tokens', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      'Content-type': 'application/json',
    },
    body: params,
  })

  if (!res.ok) {
    return { ok: false, message: 'Failed to generate actor token' }
  }
  const data = await res.json()

  return { ok: true, token: data.token }
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
