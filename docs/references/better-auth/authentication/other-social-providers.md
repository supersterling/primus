# Other Social Providers

Other social providers setup and usage.

Better Auth provides support for any social provider that implements the OAuth2 protocol or OpenID Connect (OIDC) flows through the [Generic OAuth Plugin](/docs/plugins/generic-oauth). You can use pre-configured helper functions for popular providers like Auth0, Keycloak, Okta, Microsoft Entra ID, and Slack, or manually configure any OAuth provider.

## Installation

    ### Add the plugin to your auth config

    To use the Generic OAuth plugin, add it to your auth config.

```ts
    import { betterAuth } from "better-auth"
    import { genericOAuth } from "better-auth/plugins"

    export const auth = betterAuth({
        // ... other config options
        plugins: [
            genericOAuth({
                config: [
                    {
                        providerId: "provider-id",
                        clientId: "test-client-id",
                        clientSecret: "test-client-secret",
                        discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
                        // ... other config options
                    },
                    // Add more providers as needed
                ]
            })
        ]
    })
```

    ### Add the client plugin

    Include the Generic OAuth client plugin in your authentication client instance.

```ts
    import { createAuthClient } from "better-auth/client"
    import { genericOAuthClient } from "better-auth/client/plugins"

    const authClient = createAuthClient({
        plugins: [
            genericOAuthClient()
        ]
    })
```

  Read more about installation and usage of the Generic Oauth plugin
  [here](/docs/plugins/generic-oauth#usage).

## Example Usage

Here's a basic example of configuring a generic OAuth provider:

```ts
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "provider-id",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          discoveryUrl: "https://auth.example.com/.well-known/openid-configuration",
        },
      ],
    }),
  ],
})
```

## Using Pre-configured Providers

Better Auth provides pre-configured helper functions for popular OAuth providers. Here's an example using Slack:

```ts
import { betterAuth } from "better-auth"
import { genericOAuth, slack } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    genericOAuth({
      config: [
        slack({
          clientId: process.env.SLACK_CLIENT_ID,
          clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
      ],
    }),
  ],
})
```

```ts
const response = await authClient.signIn.oauth2({
  providerId: "slack",
  callbackURL: "/dashboard",
})
```

For more pre-configured providers (Auth0, Keycloak, Okta, Microsoft Entra ID) and their configuration options, see the [Generic OAuth Plugin documentation](/docs/plugins/generic-oauth#pre-configured-provider-helpers).

## Manual Configuration Examples

If you need to configure a provider that doesn't have a pre-configured helper, you can manually configure it:

### Instagram Example

```ts
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config options
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "instagram",
          clientId: process.env.INSTAGRAM_CLIENT_ID as string,
          clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
          authorizationUrl: "https://api.instagram.com/oauth/authorize",
          tokenUrl: "https://api.instagram.com/oauth/access_token",
          scopes: ["user_profile", "user_media"],
        },
      ],
    }),
  ],
});
```

```ts
const response = await authClient.signIn.oauth2({
  providerId: "instagram",
  callbackURL: "/dashboard", // the path to redirect to after the user is authenticated
});
```

### Coinbase Example

```ts
import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  // ... other config options
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "coinbase",
          clientId: process.env.COINBASE_CLIENT_ID as string,
          clientSecret: process.env.COINBASE_CLIENT_SECRET as string,
          authorizationUrl: "https://www.coinbase.com/oauth/authorize",
          tokenUrl: "https://api.coinbase.com/oauth/token",
          scopes: ["wallet:user:read"], // and more...
        },
      ],
    }),
  ],
});
```

```ts
const response = await authClient.signIn.oauth2({
  providerId: "coinbase",
  callbackURL: "/dashboard", // the path to redirect to after the user is authenticated
});
```
