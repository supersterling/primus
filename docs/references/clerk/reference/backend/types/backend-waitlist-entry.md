# The Backend WaitlistEntry object

The Backend `WaitlistEntry` object holds information about a waitlist entry for a given email address.

## Properties

| Property                                 | Type                                                                                                              | Description                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| <a id="createdat"></a> `createdAt`       | `number`                                                                                                          | The date when the waitlist entry was first created. |
| <a id="emailaddress"></a> `emailAddress` | `string`                                                                                                          | The email address to add to the waitlist.           |
| <a id="id"></a> `id`                     | `string`                                                                                                          | The unique identifier for this waitlist entry.      |
| <a id="invitation"></a> `invitation`     | <code>null | <a href="https://clerk.com/docs/reference/backend/types/backend-invitation.md">Invitation</a></code> | The invitation associated with this waitlist entry. |
| <a id="islocked"></a> `isLocked?`        | `boolean`                                                                                                         | Whether the waitlist entry is locked or not.        |
| <a id="status"></a> `status`             | `"pending" | "invited" | "completed" | "rejected"`                                                     | The status of the waitlist entry.                   |
| <a id="updatedat"></a> `updatedAt`       | `number`                                                                                                          | The date when the waitlist entry was last updated.  |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
