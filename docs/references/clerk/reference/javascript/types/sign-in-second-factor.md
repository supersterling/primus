# SignInSecondFactor

The `SignInSecondFactor` type represents the second factor verification strategy that can be used in the sign-in process.

```ts
type SignInSecondFactor = PhoneCodeFactor | TOTPFactor | BackupCodeFactor
```

| Name          | Type                                      | Description                                                                                           |
| ------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| strategy      | 'phone\_code' | 'totp' | 'backup\_code' | The strategy of the factor.                                                                           |
| phoneNumberId | string                                    | The ID of the phone number that a code will be sent to. Populated when the strategy is 'phone\_code'. |
| 'phoneNumber' |                                           | Populated when the strategy is 'phone\_code'.                                                         |
| primary       | boolean                                   | Whether the factor is the primary factor. Populated when the strategy is 'phone\_code'.               |

## `TOTPFactor`

```ts
type TOTPFactor = {
  strategy: TOTPStrategy
}
```

## `BackupCodeFactor`

```ts
type BackupCodeFactor = {
  strategy: BackupCodeStrategy
}
```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
