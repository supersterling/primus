# OrganizationMembership

The `OrganizationMembership` object is the model around an Organization membership entity and describes the relationship between users and Organizations.

## Properties

| Name           | Type                                 | Description                                                                                               |
| -------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| id             | string                               | The unique identifier for this Organization membership.                                                   |
| publicMetadata | OrganizationMembershipPublicMetadata | Metadata that can be read from the Frontend API and Backend API and can be set only from the Backend API. |
| role           | string                               | The Role of the current user in the Organization.                                                         |
| publicUserData | PublicUserData                       | Public information about the user that this membership belongs to.                                        |
| organization   | Organization                         | The Organization object the membership belongs to.                                                        |
| createdAt      | Date                                 | The date when the membership was created.                                                                 |
| updatedAt      | Date                                 | The date when the membership was last updated.                                                            |

## Methods

### `destroy()`

Deletes the membership from the Organization the membership belongs to.

```typescript
function destroy(): Promise<OrganizationMembership>
```

### `update()`

Updates the member's Role.

```typescript
function update(updateParams: UpdateOrganizationMembershipParams): Promise<OrganizationMembership>
```

#### `UpdateOrganizationMembershipParams`

| Name | Type   | Description                 |
| ---- | ------ | --------------------------- |
| role | string | The Role of the new member. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
