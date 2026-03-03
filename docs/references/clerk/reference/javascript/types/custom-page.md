# CustomPage

An interface that provides the ability to add custom pages to the [`<UserProfile />`](https://clerk.com/docs/nextjs/reference/components/user/user-profile.md) or [`<OrganizationProfile />`](https://clerk.com/docs/nextjs/reference/components/organization/organization-profile.md) components.

## Attributes

| Name        | Type                                         | Description                                                                                                                                                      |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label       | string                                       | The label of the custom page. It is a required property.                                                                                                         |
| url         | string | undefined                          | The path segment that will be used to navigate to the custom page. It should be relative when providing a custom page and absolute when providing a custom link. |
| mountIcon   | ((el: HTMLDivElement) => void) | undefined  | This function is called to mount the icon of the label. The el argument is the element where the icon should be mounted.                                         |
| unmountIcon | ((el?: HTMLDivElement) => void) | undefined | This function is called to unmount the icon of the label. The el argument is the same element that was passed to the mountIcon function.                         |
| mount       | ((el: HTMLDivElement) => void) | undefined  | This function is called to mount the content of the custom page. The el argument is the element where the content should be mounted.                             |
| unmount     | ((el?: HTMLDivElement) => void) | undefined | This function is called to unmount the content of the custom page. The el argument is the same element that was passed to the mount function.                    |

[userprofile-ref]: /docs/reference/components/user/user-profile

[orgprofile-ref]: /docs/reference/components/organization/organization-profile

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
