# UserOrganizationInvitation

The `UserOrganizationInvitation` object is the model around a user's invitation to an Organization.

## Properties

| Name                                             | Type                                                                               | Description                                             |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| id                                               | string                                                                             | The unique identifier for this Organization invitation. |
| emailAddress                                     | string                                                                             | The email address the invitation has been sent to.      |
| hasImage: Whether the Organization has an image. | imageUrl: Holds the Organization logo. Compatible with Clerk's Image Optimization. |                                                         |
| publicMetadata                                   | UserOrganizationInvitationPublicMetadata                                           | The public metadata of the Organization invitation.     |
| role                                             | OrganizationCustomRoleKey                                                          | The Role of the current user in the Organization.       |
| status                                           | 'pending' | 'accepted' | 'revoked'                                               | The status of the invitation.                           |
| createdAt                                        | Date                                                                               | The date when the invitation was created.               |
| updatedAt                                        | Date                                                                               | The date when the invitation was last updated.          |

## Methods

### `accept()`

Accepts the invitation to the Organization.

```typescript
function accept(): Promise<UserOrganizationInvitation>
```

### Example

To see an example of how to use the `accept()` method, see the [custom flow guide for managing invitations](https://clerk.com/docs/guides/development/custom-flows/organizations/manage-user-org-invitations.md).

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
