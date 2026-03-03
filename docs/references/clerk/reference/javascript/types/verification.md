# Verification

An interface that represents the state of the verification process of a sign-in or sign-up attempt.

| Name                                                    | Type                                          | Description                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| attempts                                                | number | null                                | The number of attempts related to the verification.                                                                                                                                                                                                                                                            |
| error                                                   | ClerkAPIError | null                         | The last error the verification attempt ran into.                                                                                                                                                                                                                                                              |
| expireAt                                                | Date | null                                  | The time the verification will expire at.                                                                                                                                                                                                                                                                      |
| externalVerificationRedirectURL                         | URL | null                                   | The redirect URL for an external verification.                                                                                                                                                                                                                                                                 |
| nonce                                                   | string | null                                | The nonce pertaining to the verification.                                                                                                                                                                                                                                                                      |
| message                                                 | string | null                                | The message that will be presented to the user's Web3 wallet for signing during authentication. This follows the Sign-In with Ethereum (SIWE) protocol format, which typically includes details like the requesting service, wallet address, terms acceptance, nonce, timestamp, and any additional resources. |
| unverified: The verification has not been verified yet. | verified: The verification has been verified. |                                                                                                                                                                                                                                                                                                                |
| strategy                                                | string | null                                | The strategy pertaining to the parent sign-up or sign-in attempt.                                                                                                                                                                                                                                              |
| verifiedAtClient                                        | string | null                                | The client ID where the verification was completed.                                                                                                                                                                                                                                                            |

## Methods

### `verifiedFromTheSameClient()`

A check to see if the verification was verified from the same client as the parent sign-in or sign-up attempt. For example, checking if the verification was verified from the same browser as the parent sign-in or sign-up attempt.

```typescript
function verifiedFromTheSameClient(): boolean
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
