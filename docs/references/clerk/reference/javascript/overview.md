# Clerk JavaScript SDK

The Clerk JavaScript SDK, or ClerkJS, is our foundational JavaScript library for building user management and authentication. It enables you to register, sign in, verify, and manage users for your application using highly customizable flows. It powers the other JavaScript SDKs, such as the React and Next.js SDKs. The following sections will introduce you to the main objects that power the JavaScript SDK. As you're building your application, you'll likely interact with these objects, either directly or through helpers provided by the other SDKs, like React hooks or Vue composables.

## Installation

Follow the instructions in the [`JavaScript quickstart`](https://clerk.com/docs/js-frontend/getting-started/quickstart.md) to add the JavaScript SDK to your project.

## Main objects

### `Clerk`

The [`Clerk`](https://clerk.com/docs/reference/javascript/clerk.md) class is the main entry point for the Clerk JavaScript SDK. All other objects are accessible from the `Clerk` object.

### `Client`

A client represents the current device or software accessing an application such as your web browser, native application, or Chrome Extension. It is represented by the [`Client`](https://clerk.com/docs/reference/javascript/client.md) object.

### `Session`

A session is a secure representation of the authentication state of the current user. Each client can hold multiple sessions on the same device. It is represented by the [`Session`](https://clerk.com/docs/reference/javascript/session.md) object.

### `User`

The [`User`](https://clerk.com/docs/reference/javascript/user.md) object represents the current user of the session. It holds all the basic user information such as the user's name, email addresses, and phone numbers, and including their public, private, and unsafe metadata.

### `SignIn`

The [`SignIn`](https://clerk.com/docs/reference/javascript/sign-in.md) object holds the state of the current sign-in and provides helper methods to navigate and complete the sign-in process. It is used to manage the sign-in lifecycle, including the first factor and second factor verification, and the creation of a new session.

### `SignUp`

The [`SignUp`](https://clerk.com/docs/reference/javascript/sign-up.md) object holds the state of the current sign-up and provides helper methods to navigate and complete the sign-up process. Once a sign-up is complete, a new user is created.

### `Organization`

Organizations are a flexible and scalable way to manage users and their access to resources within your Clerk application. With Organizations, you can assign specific Roles and Permissions to users, making them useful for managing projects, coordinating teams, or facilitating partnerships. Users can belong to many Organizations. One of them will be the Active Organization of the session. It is represented by the [`Organization`](https://clerk.com/docs/reference/javascript/organization.md) object. To learn about Organizations, see the [dedicated guide](https://clerk.com/docs/guides/organizations/overview.md).

### `APIKeys`

The [`APIKeys`](https://clerk.com/docs/reference/javascript/api-keys.md) object provides methods for managing API keys that allow your application's users to grant third-party services programmatic access to your application's API endpoints on their behalf. API keys are long-lived, opaque tokens that can be instantly revoked.

### `Billing`

The [`Billing`](https://clerk.com/docs/reference/javascript/billing.md) object provides methods for managing billing for a user or organization. It allows you to retrieve billing plans, payment attempts, and manage Subscriptions.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
