# OrganizationDomain

The `OrganizationDomain` object is the model around an Organization domain.

## Properties

| Name                    | Type                                                                       | Description                                                                        |
| ----------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| id                      | string                                                                     | The unique identifier for this Organization domain.                                |
| name                    | string                                                                     | The name for this Organization domain (e.g. example.com).                          |
| organizationId          | string                                                                     | The Organization ID of the Organization this domain is for.                        |
| enrollmentMode          | 'manual\_invitation' | 'automatic\_invitation' | 'automatic\_suggestion' | An enrollment mode will change how new users join an Organization.                 |
| verification            | OrganizationDomainVerification                                             | The object that describes the status of the verification process of the domain.    |
| affiliationEmailAddress | string | null                                                             | The email address that was used to verify this Organization domain.                |
| totalPendingInvitations | number                                                                     | The number of total pending invitations sent to emails that match the domain name. |
| totalPendingSuggestions | number                                                                     | The number of total pending suggestions sent to emails that match the domain name. |
| createdAt               | Date                                                                       | The date when the Organization domain was created.                                 |
| updatedAt               | Date                                                                       | The date when the Organization domain was last updated.                            |

### `OrganizationDomainVerification`

| Name      | Type                       | Description                                                                            |
| --------- | -------------------------- | -------------------------------------------------------------------------------------- |
| status    | 'unverified' | 'verified' | The status of the verification process.                                                |
| strategy  | 'email\_code'              | A string that indicates strategy of the verification.                                  |
| attempts  | number                     | A number that indicates how many attempts have occurred in order to verify the domain. |
| expiresAt | Date                       | The expiration date and time of the verification.                                      |

## Methods

## `delete()`

Deletes the Organization domain and removes it from the Organization.

```ts {{ prettier: false }}
function delete(): Promise<void>
```

## `prepareAffiliationVerification()`

Begins the verification process of a created Organization domain. This is a required step in order to complete the registration of the domain under the Organization.

```typescript
function prepareAffiliationVerification(
  params: PrepareAffiliationVerificationParams,
): Promise<OrganizationDomain>
```

### `PrepareAffiliationVerificationParams`

| Name                    | Type   | Description                                                                        |
| ----------------------- | ------ | ---------------------------------------------------------------------------------- |
| affiliationEmailAddress | string | An email address that is affiliated with the domain name (e.g. user\@example.com). |

## `attemptAffiliationVerification()`

Attempts to complete the domain verification process. This is a required step in order to complete the registration of a domain under an Organization, as the administrator should be verified as a person who is affiliated with that domain.

Make sure that an `OrganizationDomain` object already exists before you call this method, by first calling [`OrganizationDomain.prepareAffiliationVerification`](#prepare-affiliation-verification).

```typescript
function attemptAffiliationVerification(
  params: AttemptAffiliationVerificationParams,
): Promise<OrganizationDomain>
```

### `AttemptAffiliationVerificationParams`

| Name | Type   | Description                                                                                                                                                                                                                                                                    |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code | string | The OTPA one-time password (OTP) is a code that is used to authenticate a user. The OTP is typically sent to a user's email address or phone number and must be entered within a certain time period to be valid. that was sent to the user as part of this verification step. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
