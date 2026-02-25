# Clerk Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Clerk authentication to Primus with keyless mode (zero-config dev experience).

**Architecture:** Install `@clerk/nextjs`, wrap app with `<ClerkProvider>`, add `clerkMiddleware()` proxy, add Clerk MCP for AI tooling. No env vars required — keyless mode auto-generates temporary keys.

**Tech Stack:** Clerk (`@clerk/nextjs`), Next.js 16 App Router

---

### Task 1: Install @clerk/nextjs

**Files:**
- Modify: `package.json`

**Step 1: Install the package**

Run: `bun add @clerk/nextjs`

**Step 2: Verify installation**

Run: `bun pm ls | grep clerk`
Expected: `@clerk/nextjs` appears in output

**Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "feat: add @clerk/nextjs dependency"
```

---

### Task 2: Create proxy.ts

**Files:**
- Create: `src/proxy.ts`

**Step 1: Create the proxy file**

```typescript
import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware()

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
```

**Step 2: Run type check**

Run: `bun run ts:check`
Expected: PASS (no type errors)

**Step 3: Commit**

```bash
git add src/proxy.ts
git commit -m "feat: add Clerk middleware proxy"
```

---

### Task 3: Wrap layout with ClerkProvider

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout.tsx**

Replace the full file content with:

```tsx
import { type Metadata } from "next"
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "primus",
    description:
        "An opinionated Next.js template with the best of Vercel, Inngest, and modern tooling.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <header>
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
```

**Step 2: Run type check**

Run: `bun run ts:check`
Expected: PASS

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wrap app with ClerkProvider and add auth components"
```

---

### Task 4: Add Clerk MCP server config

**Files:**
- Create: `.mcp.json`

**Step 1: Create MCP config**

```json
{
    "mcpServers": {
        "clerk": {
            "url": "https://mcp.clerk.com/mcp"
        }
    }
}
```

**Step 2: Commit**

```bash
git add .mcp.json
git commit -m "feat: add Clerk MCP server for AI tooling"
```

---

### Task 5: Verify end-to-end

**Step 1: Run checks**

Run: `bun run checks`
Expected: PASS (tsc, biome, docref all green)

**Step 2: Start dev server**

Run: `bun dev`
Expected: App starts. Sign In / Sign Up buttons appear in header. Clerk keyless mode activates — small "Configure your application" prompt appears in bottom-right corner.

**Step 3: Test sign-up flow**

Click Sign Up in the header. Complete sign-up with a test email. Profile icon (UserButton) should appear after sign-up.

**Step 4: Stop dev server and commit if any fixes were needed**
