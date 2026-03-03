# Using production keys in local development

> This approach is strongly discouraged and not officially supported. Only use it when you need to debug production-specific issues that can't be reproduced in a development environment.

In rare cases, you may need to debug issues that only occur in your production environment. This guide explains how to configure your local development environment to use production Clerk keys.

## Prerequisites

- Access to your production Clerk [API keys](https://dashboard.clerk.com/~/api-keys)
- A [production domain already configured](https://clerk.com/docs/guides/development/deployment/production.md) in your [Clerk Dashboard](https://dashboard.clerk.com/~/domains)
- The ability to run your local server with HTTPS on port 443

## Why this works

Clerk enforces origin validation in production to protect your users. Production keys (`pk_live_` and `sk_live_`) only work with your configured production domain. This means `localhost` won't work with production keys. You'll see an error like:

```
Clerk: Production Keys are only allowed for domain "your-domain.com".
```

However, [authentication across subdomains works by default](https://clerk.com/docs/guides/development/deployment/production.md#authentication-across-subdomains) in Clerk production instances. By mapping a subdomain of your production domain to your local machine, you can use production keys locally.

> This works for troubleshooting many situations, but there are some limitations:
>
> - **OAuth won't work** - Social sign-in providers (Google, GitHub, etc.) have their own redirect URL restrictions. Your local subdomain won't be in their allowed list unless you add it to each provider's configuration.
> - **Webhooks won't reach localhost** - Clerk webhooks can't reach your local machine. Use a tool like [Pinggy](https://pinggy.io) or [ngrok](https://ngrok.com/) if you need to test webhooks.
> - **Session behavior differs** - Production and development instances have [different session architectures](https://clerk.com/docs/guides/development/managing-environments.md#session-architecture-differences). Some issues may still not reproduce locally.

1. ## Map a subdomain to localhost

   Configure your machine to resolve a subdomain of your production domain to `127.0.0.1` by editing your hosts file.

   Replace `your-domain.com` with your actual production domain. Changes take effect immediately, no restart required.

   **macOS**

   Run the following command in Terminal:

   ```sh {{ filename: 'terminal' }}
   echo "127.0.0.1 local.your-domain.com" | sudo tee -a /etc/hosts
   ```

   Enter your password if prompted. The line will be added to your hosts file.

   **Windows**

   1. Search for **Notepad** in the Start menu.
   2. Right-click and select **Run as administrator**.
   3. In Notepad, select **File > Open** and navigate to `C:\Windows\System32\drivers\etc\hosts`. You may need to change the file filter from "Text Documents" to "All Files" to see it.
   4. Add the following line at the end of the file:
      ```txt {{ filename: 'hosts' }}
      127.0.0.1 local.your-domain.com
      ```
   5. Save the file.

   **Linux**

   1. Open the hosts file in your preferred text editor with elevated privileges:
      ```sh {{ filename: 'terminal' }}
      sudo nano /etc/hosts
      ```
   2. Add the following line at the end of the file:
      ```txt {{ filename: '/etc/hosts' }}
      127.0.0.1 local.your-domain.com
      ```
   3. Save and exit (in nano, press `Ctrl+O` to save, then `Ctrl+X` to exit).
2. ## Configure environment variables

   Update your `.env` file to use your production Clerk keys. Production keys start with `pk_live_` and `sk_live_` instead of `pk_test_` and `sk_test_`.

   ```env {{ filename: '.env' }}
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
   CLERK_SECRET_KEY=sk_live_xxxxx
   ```

   Replace `pk_live_xxxxx` and `sk_live_xxxxx` with your actual production keys from the **[API keys](https://dashboard.clerk.com/~/api-keys)** page in the Clerk Dashboard.
3. ## Run your server with HTTPS on port 443

   > You must run your server on port 443 (the standard HTTPS port). When browsers send requests from non-standard ports like `3000`, they include the port in the `Origin` header (e.g., `https://local.your-domain.com:3000`). Clerk's origin validation fails when the port is included.

   Production Clerk requires HTTPS on port 443. Running on port 443 requires elevated privileges on most systems.

   **Next.js**

   Next.js 13.5+ can automatically generate a locally-trusted certificate. You'll also need to configure Next.js to allow requests from your subdomain.

   Add the following to your Next.js configuration:

   ```js {{ filename: 'next.config.js' }}
   const nextConfig = {
     allowedDevOrigins: ['local.your-domain.com'],
     // Other options...
   }

   export default nextConfig
   ```

   Then start your server on port 443:

   ```sh {{ filename: 'terminal' }}
   sudo npx next dev --experimental-https -p 443
   ```

   > The `--experimental-https` flag generates a certificate for `localhost`, not your subdomain. Your browser will show a certificate warning when accessing the subdomain. You can safely proceed past this warning for local debugging, or use mkcert to generate a proper certificate.
4. ## Test the configuration

   1. Open your browser and navigate to your local subdomain: `https://local.your-domain.com`
   2. If you see a certificate warning, select **Advanced** and proceed to the site.
   3. Verify that Clerk loads and you can sign in.

   If you navigate to `https://localhost` instead, you should see the origin validation error, which confirms that production keys are correctly restricted.
5. ## Clean up

   After debugging:

   1. Revert your `.env` file to use development keys (`pk_test_xxxxx` and `sk_test_xxxxx`).
   2. Remove the `allowedDevOrigins` configuration from `next.config.js` (if applicable).
   3. Remove the entry from your hosts file:

   **macOS**

   Run the following command in Terminal, replacing `your-domain.com` with your actual production domain:

   ```sh {{ filename: 'terminal' }}
   sudo sed -i '' '/local\.your-domain\.com/d' /etc/hosts
   ```

   Enter your password if prompted. The line will be removed from your hosts file.

   **Windows**

   1. Search for **Notepad** in the Start menu. 1. Right-click and select **Run as administrator**.
   2. In Notepad, select **File > Open** and navigate to `C:\Windows\System32\drivers\etc\hosts`.
   3. Delete the line containing `local.your-domain.com`. 1. Save the file.

   **Linux**

   Run the following command, replacing `your-domain.com` with your actual production domain:

   ```sh {{ filename: 'terminal' }}
   sudo sed -i '/local\.your-domain\.com/d' /etc/hosts
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
