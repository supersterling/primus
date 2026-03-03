# createTestingToken()

Creates a [Testing Token](https://clerk.com/docs/guides/development/testing/overview.md#testing-tokens) for the instance.

```ts
function createTestingToken(): Promise<TestingToken>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

```tsx
const response = await clerk.testingTokens.createTestingToken()
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `POST/testing_tokens`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/testing-tokens/post/testing_tokens.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
