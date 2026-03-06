import { baseUrl } from "@/lib/utils"

/**
 * Serves /llms.txt — a plain-text file that helps LLMs understand your product.
 * Spec: https://llmstxt.org
 *
 * Keep this focused on what your product IS and what it DOES for users.
 * No internal implementation details, commands, or file paths.
 *
 * To expand: add ## sections for docs, changelog, pricing, API reference, etc.
 * Each section is a markdown list of [title](url): description links.
 * The ## Optional section is skipped by LLMs that need a shorter context.
 */
export function GET(): Response {
    const url = baseUrl()

    const content = `# Primus

> An opinionated Next.js starter with auth, payments, background jobs, and modern tooling.

## Overview

- [Home](${url}/): Product overview, features, pricing, and FAQ
- [Get started](${url}/#how-it-works): Step-by-step setup guide
- [FAQ](${url}/#faq): Common questions answered

## Optional

- [Sign in](${url}/sign-in): Existing account login
- [Sign up](${url}/sign-up): Create a new account
`

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
    })
}
