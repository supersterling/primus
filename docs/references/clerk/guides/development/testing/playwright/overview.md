# Testing with Playwright

[Playwright](https://playwright.dev) is an open-source, end-to-end testing framework that automates web application testing across multiple browsers. This guide will help you set up your environment for creating authenticated tests with Clerk, assuming you have some familiarity with both Clerk and Playwright.

> See the [demo repo](https://github.com/clerk/clerk-playwright-nextjs) that demonstrates testing a Clerk-powered application using [Testing Tokens](https://clerk.com/docs/guides/development/testing/overview.md#testing-tokens). To run the tests, you'll need dev instance Clerk API keys, a test user with username and password, and have username and password authentication enabled in the Clerk Dashboard.

1. ## Install `@clerk/testing`

   Clerk's testing package provides integration helpers for popular testing frameworks. Run the following command to install it:

   **npm**

   ```sh {{ filename: 'terminal' }}
   npm i @clerk/testing --save-dev
   ```

   **yarn**

   ```sh {{ filename: 'terminal' }}
   yarn add -D @clerk/testing
   ```

   **pnpm**

   ```sh {{ filename: 'terminal' }}
   pnpm add @clerk/testing -D
   ```
2. ## Set your API keys

   In your test runner, set your Publishable Key and Secret Key as the `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variables, respectively.

   > Ensure that the Secret Key is provided securely to prevent exposure to third parties. For example, if you are using GitHub Actions, refer to [_Using secrets in GitHub Actions_](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
3. ## Configure Playwright with Clerk

   The `clerkSetup()` function obtains a Testing Token when your test suite starts, making it available for all subsequent tests to use. This ensures that you don't have to manually generate a Testing Token for each test.

   To configure Playwright with Clerk, call the `clerkSetup()` function in your [global setup file](https://playwright.dev/docs/test-global-setup-teardown), as shown in the following example:

   ```tsx {{ filename: 'global.setup.ts' }}
   import { clerkSetup } from '@clerk/testing/playwright'
   import { test as setup } from '@playwright/test'

   // Setup must be run serially, this is necessary if Playwright is configured to run fully parallel: https://playwright.dev/docs/test-parallel
   setup.describe.configure({ mode: 'serial' })

   setup('global setup', async ({}) => {
     await clerkSetup()
   })
   ```

   > Instead of calling `clerkSetup()`, you can manually set the Testing Token by setting the `CLERK_TESTING_TOKEN` environment variable to the [Testing Token](https://clerk.com/docs/guides/development/testing/overview.md#testing-tokens) that you create through the Backend API.
4. ## Use `setupClerkTestingToken()`

   Now that Playwright is configured with Clerk, you can use the `setupClerkTestingToken()` function to include the Testing Token in individual test cases. This function injects the Testing Token for the specific test, ensuring the test can bypass Clerk's bot detection mechanisms. See the following example:

   ```tsx {{ filename: 'my-test.spec.ts' }}
   import { setupClerkTestingToken } from '@clerk/testing/playwright'
   import { test } from '@playwright/test'

   test('sign up', async ({ page }) => {
     await setupClerkTestingToken({ page })

     await page.goto('/sign-up')
     // Add additional test logic here
   })
   ```

---

## Sitemap

[Overview of all docs pages](https://clerk.com/docs/llms.txt)
