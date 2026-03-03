# SessionWithActivities

The `SessionWithActivities` object is a modified [`Session`](https://clerk.com/docs/reference/javascript/session.md) object. It includes most of the information stored in the `Session` object, with additional details about the latest activity in the current session. `SessionWithActivities` is returned by the [`User.getSessions()`](https://clerk.com/docs/reference/javascript/user.md#get-sessions) method.

The additional data included in the latest activity is useful for analytics purposes. A [`SessionActivity`](#session-activity) object provides information about the user's location, device and browser.

While the `SessionWithActivities` object wraps the most important information around a `Session` object, the two objects have entirely different methods.

## Properties

| Name           | Type            | Description                                                                                           |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| id             | string          | The unique identifier for the session.                                                                |
| status         | SessionStatus   | The current state of the session.                                                                     |
| lastActiveAt   | Date            | The time the session was last active on the Client.                                                   |
| abandonAt      | Date            | The time when the session was abandoned by the user.                                                  |
| expireAt       | Date            | The time the session expires and will seize to be active.                                             |
| latestActivity | SessionActivity | An object that provides additional information about this session, focused around user activity data. |

## Methods

### `revoke()`

Marks this session as revoked. If this is the active session, the attempt to revoke it will fail.

Users can revoke only their own sessions.

```typescript
function revoke(): Promise<SessionWithActivities>
```

## Types

### `SessionActivity`

| Name           | Type                 | Description                                                                                    |
| -------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| id             | string               | The unique identifier for the session activity record.                                         |
| browserName    | string | undefined  | The name of the browser from which this session activity occurred.                             |
| browserVersion | string | undefined  | The version of the browser from which this session activity occurred.                          |
| deviceType     | string | undefined  | The type of the device which was used in this session activity.                                |
| ipAddress      | string | undefined  | The IP address from which this session activity originated.                                    |
| city           | string | undefined  | The city from which this session activity occurred. Resolved by IP address geo-location.       |
| country        | string | undefined  | The country from which this session activity occurred. Resolved by IP address geo-location.    |
| isMobile       | boolean | undefined | Will be set to true if the session activity came from a mobile device. Set to false otherwise. |

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
