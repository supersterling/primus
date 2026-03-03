# Verify OAuth tokens with Clerk

If you are building an application that uses Clerk and would like to incorporate OAuth, you'll want to ensure that after the client gets an OAuth access token, they can use it to make authenticated requests into your app (the resource service) using the token.

> OAuth tokens are machine tokens. Machine token usage is free during our public beta period but will be subject to pricing once generally available. Pricing is expected to be competitive and below market averages.

Clerk's SDKs support this through the `acceptsToken` parameter that can be used in Clerk's route protection functions, such as [`auth()`](https://clerk.com/docs/reference/nextjs/app-router/auth.md), [`auth.protect()`](https://clerk.com/docs/reference/nextjs/app-router/auth.md#auth-protect), and [`authenticateRequest()`](https://clerk.com/docs/reference/backend/authenticate-request.md). The SDKs automatically handle verification for both [JWT and opaque token formats](https://clerk.com/docs/guides/development/machine-auth/token-formats.md) - no code changes are required regardless of which format you've configured.

If you need to verify JWT-formatted OAuth tokens outside of Clerk's SDKs, you can use the same approach as [manual JWT verification](https://clerk.com/docs/guides/sessions/manual-jwt-verification.md) using your instance's public key.

For examples and best practices on verifying OAuth tokens with Clerk SDKs, see our framework-specific guides for:

- [`Next.js`](https://clerk.com/docs/nextjs/guides/development/verifying-oauth-access-tokens.md)
- [`React Router`](https://clerk.com/docs/nextjs/guides/development/verifying-oauth-access-tokens.md)
- [`TanStack React Start`](https://clerk.com/docs/nextjs/guides/development/verifying-oauth-access-tokens.md)

You can also verify tokens manually via the [Clerk REST API](https://clerk.com/docs/reference/backend-api/tag/oauth-access-tokens/post/oauth_applications/access_tokens/verify.md){{ target: '_blank' }}. Ensure you have your Clerk Secret Key on hand as you'll need to include it in the `Authorization` header.

```sh {{ filename: 'terminal' }}
curl https://api.clerk.com/oauth_applications/access_tokens/verify \
  -X POST \
  -H 'Authorization: Bearer your-clerk-secret-key-here' \
  -H 'Content-Type: application/json' \
  -d '{ "access_token": "your-oauth-token-here" }'
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
