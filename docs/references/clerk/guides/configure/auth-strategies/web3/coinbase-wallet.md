# Coinbase Wallet

**Before you start**

- [A Clerk application is required.](https://clerk.com/docs/getting-started/quickstart/setup-clerk.md)

Enabling [Coinbase Wallet](https://www.coinbase.com/wallet) as a Web3 provider allows your users to sign in and up to your Clerk application with their Coinbase Wallet. Both [Smart Wallet](https://www.coinbase.com/wallet/smart-wallet) and the [Coinbase Wallet browser extension](https://www.coinbase.com/wallet/downloads) are supported.

> This guide is for using Coinbase Wallet for authentication. If you're looking to connect users using [Coinbase.com](https://www.coinbase.com/) as a social provider, see the [dedicated guide](https://clerk.com/docs/guides/configure/auth-strategies/social-connections/coinbase.md).

## Enable Coinbase Wallet as a Web3 provider

1. In the Clerk Dashboard, navigate to the [**Web3**](https://dashboard.clerk.com/~/user-authentication/web3) page.
2. From the list of web3 providers, enable **Coinbase Wallet**.

## Test authentication

The simplest way to test authentication is to visit your Clerk application's [Account Portal](https://clerk.com/docs/guides/account-portal/overview.md), which is available for all Clerk applications out-of-the-box.

1. In the Clerk Dashboard, navigate to the [**Account Portal**](https://dashboard.clerk.com/~/account-portal) page.
2. Next to the **Sign-in** URL, select **Visit**. The URL should resemble:
   - **For development** – `https://your-domain.accounts.dev/sign-in`
   - **For production** – `https://accounts.your-domain.com/sign-in`
3. On the sign-in page, you should see **Coinbase Wallet** as an option. Use it to sign in.

## Collect additional user information during sign-up (optional)

Web3 applications typically use a hexadecimal wallet address to identify users, which offers a high level of privacy. However, when bridging the gap between Web3 and Web2, it's often necessary to gather human-readable information about the user, such as their email address, phone number, or a username.

To collect additional information about your user during sign-up:

1. In the Clerk Dashboard, navigate to the [**User & authentication**](https://dashboard.clerk.com/~/user-authentication/user-and-authentication) page.
2. On this page, enable the attributes you want to collect from your user during sign-up.

## Connect Coinbase Wallet to existing account

Users can connect their Coinbase Wallet to their account at any time through their user profile page. You can configure your application to use the [Account Portal user profile page](https://clerk.com/docs/guides/account-portal/overview.md#user-profile) or the prebuilt [`<UserProfile />`](https://clerk.com/docs/nextjs/reference/components/user/user-profile.md) component.

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
