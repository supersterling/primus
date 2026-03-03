# Build a custom multi-session flow

> This guide is for users who want to build a custom flow. To use a _prebuilt_ UI, use the [Account Portal pages](https://clerk.com/docs/guides/account-portal/overview.md) or [`prebuilt components`](https://clerk.com/docs/nextjs/reference/components/overview.md).

A multi-session application is an application that allows multiple accounts to be signed in from the same browser at the same time. The user can switch from one account to another seamlessly. Each account is independent from the rest and has access to different resources.

This guide provides you with the necessary information to build a custom multi-session flow using the Clerk API.

To implement the multi-session feature to your application, you need to handle the following scenarios:

- [Switching between different accounts](#switch-between-sessions)
- [Adding new accounts](#add-a-new-session)
- [Signing out from one account, while remaining signed in to the rest](#sign-out-active-session)
- [Signing out from all accounts](#sign-out-all-sessions)

## Enable multi-session in your application

To enable multi-session in your application, you need to configure it in the Clerk Dashboard.

1. In the Clerk Dashboard, navigate to the [**Sessions**](https://dashboard.clerk.com/~/sessions) page.
2. Toggle on **Multi-session handling**.
3. Select **Save changes**.

## Get the session and user

```jsx
// Get the session and user
const { session, user } = useClerk()
```

## Switch between sessions

```jsx
const { client, setActive } = useClerk()

// You can get all the available sessions through the client
const availableSessions = client.sessions
const currentSession = availableSessions[0].id

// Use setActive() to set the session as active
await setActive({
  session: currentSession.id,
  navigate: async ({ session }) => {
    if (session?.currentTask) {
      // Handle pending session tasks
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
      console.log(session?.currentTask)
      return
    }

    router.push('/')
  },
})
```

## Add a new session

To add a new session, simply link to your existing sign-in flow. New sign-ins will automatically add to the list of available sessions on the client. To create a sign-in flow, see one of the following popular guides:

- [Email and password](https://clerk.com/docs/guides/development/custom-flows/authentication/email-password.md)
- [Passwordless authentication](https://clerk.com/docs/guides/development/custom-flows/authentication/email-sms-otp.md)
- [Social sign-in (OAuth)](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/overview.md)

## Sign out all sessions

Use [`signOut()`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out) to deactivate all sessions on the current client.

```jsx
const { signOut, session } = useClerk()

// Use signOut to sign-out all active sessions
await signOut()
```

## Sign out active session

Use [`signOut()`](https://clerk.com/docs/reference/javascript/clerk.md#sign-out) to deactivate a specific session by passing the session ID.

```jsx
// Get the signOut method and the active session
const { signOut, session } = useClerk()

// Use signOut to sign-out the active session
await signOut(session.id)
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
