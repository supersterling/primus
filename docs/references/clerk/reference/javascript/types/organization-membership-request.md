# OrganizationMembershipRequest

The `OrganizationMembershipRequest` object is the model that describes the request of a user to join an Organization.

## Properties

| Name           | Type                                 | Description                                                     |
| -------------- | ------------------------------------ | --------------------------------------------------------------- |
| id             | string                               | The unique identifier for this membership request.              |
| organizationId | string                               | The Organization ID of the Organization this request is for.    |
| status         | 'pending' | 'accepted' | 'revoked' | The status of the request.                                      |
| publicUserData | PublicUserData                       | Public information about the user that this request belongs to. |
| createdAt      | Date                                 | The date when the membership request was created.               |
| updatedAt      | Date                                 | The date when the membership request was last updated.          |

## Methods

## `accept()`

Accepts the request of a user to join the Organization the request refers to.

```typescript
function accept(): Promise<OrganizationMembershipRequest>
```

## `reject()`

Rejects the request of a user to join the Organization the request refers to.

```typescript
function reject(): Promise<OrganizationMembershipRequest>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
