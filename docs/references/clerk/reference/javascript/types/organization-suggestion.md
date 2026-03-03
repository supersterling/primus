# OrganizationSuggestion

An interface representing an Organization suggestion.

| Name                                             | Type                                                                               | Description                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| id                                               | string                                                                             | The ID of the Organization suggestion.                               |
| hasImage: Whether the Organization has an image. | imageUrl: Holds the Organization logo. Compatible with Clerk's Image Optimization. |                                                                      |
| status                                           | 'pending' | 'accepted'                                                            | The status of the Organization suggestion.                           |
| createdAt                                        | Date                                                                               | The date and time when the Organization suggestion was created.      |
| updatedAt                                        | Date                                                                               | The date and time when the Organization suggestion was last updated. |

## `accept()`

Accepts the Organization suggestion. Returns the accepted `OrganizationSuggestion`.

```ts
function accept(): Promise<OrganizationSuggestionResource>
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
