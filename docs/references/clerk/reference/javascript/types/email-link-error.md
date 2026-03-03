# EmailLinkError

Custom error for email links. Raised when the email link verification doesn't succeed, either because the link has expired or a general failure. The error's `code` property will indicate the outcome, its values being:

- `EmailLinkErrorCode.Expired`
- `EmailLinkErrorCode.Failed`

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
