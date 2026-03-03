# Token formats

When configuring machine tokens in Clerk (such as OAuth access tokens), you can choose between two token formats: **JWT** and **opaque**. Each format has trade-offs that make it better suited for different use cases.

## JWT tokens

[JSON Web Tokens (JWTs)](https://clerk.com/docs/guides/how-clerk-works/tokens-and-signatures.md#json-web-tokens-jwts) are self-contained tokens that encode claims (such as user ID, scopes, and expiration) directly within the token. JWTs are signed using your instance's private key and can be verified using the corresponding public key.

### Benefits

- **Networkless verification**: JWTs can be verified locally using your instance's [public key](https://clerk.com/docs/guides/sessions/manual-jwt-verification.md#get-your-instances-public-key), without making a network request to Clerk's servers.
- **Self-contained**: All necessary information is embedded in the token itself.
- **Performance**: Reduces latency by eliminating round-trip network requests for verification.

### Limitations

- **Cannot be instantly revoked**: Once issued, a JWT remains valid until it expires. Revocation requires waiting for the token to expire or implementing additional revocation logic.

## Opaque tokens

Opaque tokens are randomly generated strings that contain no embedded information. They must be verified by making a request to Clerk's servers, which looks up the token in a database, and is then able to retrieve associated information about the token.

### Benefits

- **Instant revocation**: Opaque tokens can be revoked immediately, making them ideal for security-sensitive applications where you need to invalidate access quickly.

### Limitations

- **Network dependency**: Every verification requires a network request to Clerk's servers.
- **Latency**: Verification is slower due to the network round-trip.
- **Compatibility**: There are certain third-party tools and libraries that only support JWT tokens.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
