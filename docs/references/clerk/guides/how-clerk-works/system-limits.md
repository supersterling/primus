# Rate limits

Clerk rate limits certain endpoints to help protect users against brute-force attacks or to stop abuse of Clerk's platform.

## Errors

If you receive a `429` error code, you have been rate limited. All subsequent requests to that specific endpoint will be blocked for a given amount of time.

Requests that have been rate limited will receive the `Retry-After` response header, which contains the number of seconds after which the block expires.

## Frontend API requests

Frontend API requests are rate-limited per user and identified by their IP address.

| Name           | Type                                           | Description               |
| -------------- | ---------------------------------------------- | ------------------------- |
| Create SignIn  | /v1/sign\_ins                                  | 5 requests per 10 seconds |
| Create SignUp  | /v1/sign\_ups                                  | 5 requests per 10 seconds |
| Attempt SignIn | /v1/sign\_ins/attempt\_(first|second)\_factor | 3 requests per 10 seconds |
| Attempt SignUp | /v1/sign\_ups/attempt\_verification            | 3 requests per 10 seconds |

## Backend API requests

Backend API requests are rate-limited per application instance which is identified by the Secret Key that is provided when making Backend API requests.
These limits differ based on whether you're using a development or production instance.

| Name                                                                                            | Type                                                        | Description                  |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| Production instances                                                                            |                                                             | 1000 requests per 10 seconds |
| Development instances                                                                           |                                                             | 100 requests per 10 seconds  |
| Get the JWKS of the instance                                                                    | GET /v1/jwks                                                | No rate limit                |
| Create a new invitation for the given email address and sends the invitation email              | POST /v1/invitations                                        | 100 requests per hour        |
| Create multiple invitations for the provided email addresses                                    | POST /v1/invitations/bulk                                   | 25 requests per hour         |
| Create a new organization invitation and sends an email to the provided email address           | POST /v1/organizations/{organization\_id}/invitations      | 250 requests per hour        |
| Create new organization invitations in bulk and send out emails to the provided email addresses | POST /v1/organizations/{organization\_id}/invitations/bulk | 50 requests per hour         |

> The `currentUser()` helper uses the `GET /v1/users/me` endpoint, so it is subject to the respective rate limits.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
