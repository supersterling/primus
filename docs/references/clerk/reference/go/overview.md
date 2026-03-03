# Clerk Go SDK

The Clerk Go SDK provides a powerful set of tools and utilities to seamlessly integrate authentication, user management, and Organization management into your Go application. Refer to the [`quickstart guide`](https://clerk.com/docs/reference/go/overview.md) to get started.

The Clerk Go SDK is built on top of the [Clerk Backend API](https://clerk.com/docs/reference/backend-api.md){{ target: '_blank' }}, which provides a comprehensive set of endpoints for managing users, Organizations, and other resources. The SDK abstracts away the complexities of making direct API calls and is organized in a resource-based structure similar to the Backend API.

Each resource supports specific operations, like `Create` or `List`. For example, the [`actortoken`](https://github.com/clerk/clerk-sdk-go/blob/v2/actortoken/api.go) resource supports the `Create`, `Revoke`, and `GetClient` operations. For the list of supported resources, see [`https://github.com/clerk/clerk-sdk-go/tree/v2`](https://github.com/clerk/clerk-sdk-go/tree/v2) where almost each directory represents a resource.

For additional details on how to use this module, see the [Go Documentation](https://pkg.go.dev/github.com/clerk/clerk-sdk-go/v2).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
