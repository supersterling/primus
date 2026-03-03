# deleteUserProfileImage()

Deletes a user's profile image. Returns a [`User`](https://clerk.com/docs/reference/backend/types/backend-user.md) object.

```ts
function deleteUserProfileImage(userId: string): Promise<User>
```

## Example

> Using `clerkClient` varies based on your framework. Refer to the [`JS Backend SDK overview`](https://clerk.com/docs/js-backend/getting-started/quickstart.md) for usage details, including guidance on [`how to access the userId and other properties`](https://clerk.com/docs/js-backend/getting-started/quickstart.md#get-the-user-id-and-other-properties).

> Using JS Backend SDK methods can contribute towards rate limiting. To remove a user's profile image, it's recommended to use the frontend [`user.setProfileImage({ file: null })`](https://clerk.com/docs/reference/javascript/user.md#set-profile-image-params) method instead.

```tsx
const userId = 'user_123'

const response = await clerkClient.users.deleteUserProfileImage(userId)
```

## Backend API (BAPI) endpoint

This method in the SDK is a wrapper around the BAPI endpoint `DELETE/users/{user_id}/profile_image`. See the [BAPI reference](https://clerk.com/docs/reference/backend-api/tag/users/delete/users/%7Buser_id%7D/profile_image.md){{ target: '_blank' }} for more information.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
