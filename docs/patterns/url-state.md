# URL State over React State

Default to URL search params for any state that **affects what data is displayed**. Use `useState` only for ephemeral UI state that wouldn't make sense in a URL.

URL state gives you shareability, bookmarkability, SSR compatibility, and back-button navigation for free. We use **nuqs** for type-safe URL state on both client and server.

---

## Install

```bash
bun add nuqs
```

## Setup

Add `NuqsAdapter` to the [root layout](app:layout.tsx#RootLayout):

```tsx
// src/app/layout.tsx
import { NuqsAdapter } from "nuqs/adapters/next/app"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <NuqsAdapter>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            {children}
                            <Toaster richColors position="top-center" />
                        </ThemeProvider>
                    </NuqsAdapter>
                </body>
            </html>
        </ClerkProvider>
    )
}
```

## Client-side: `useQueryState`

Works like `useState` but backs to the URL:

```tsx
"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"

export function SearchFilter() {
    const [query, setQuery] = useQueryState(
        "q",
        parseAsString.withDefault("").withOptions({
            shallow: false,     // notify server -- re-runs RSC
            history: "push",    // enable back button
            clearOnDefault: true,
        }),
    )

    const [page, setPage] = useQueryState(
        "page",
        parseAsInteger.withDefault(1).withOptions({
            shallow: false,
        }),
    )

    return (
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
        />
    )
}
```

## Server-side: `createSearchParamsCache`

Type-safe access to search params in server components without prop drilling:

```tsx
// src/lib/search-params.ts (define parsers once, reuse everywhere)
import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server"

export const searchParamsCache = createSearchParamsCache({
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(20),
})
```

```tsx
// src/app/(dashboard)/app/posts/page.tsx
import { type SearchParams } from "nuqs/server"
import { searchParamsCache } from "@/lib/search-params"

type PageProps = { searchParams: Promise<SearchParams> }

export default async function PostsPage({ searchParams }: PageProps) {
    // Parse once at the page level -- cached for all children
    const { q, page, limit } = await searchParamsCache.parse(searchParams)

    const posts = getPosts({ query: q, page, limit })

    return (
        <Fragment>
            <SearchFilter />
            <Suspense fallback={<PostListSkeleton />}>
                <PostList posts={posts} />
            </Suspense>
            <Pagination />
        </Fragment>
    )
}

// Nested server component -- reads from cache, no props needed
function Pagination() {
    const page = searchParamsCache.get("page")
    const limit = searchParamsCache.get("limit")
    return <span>Page {page}</span>
}
```

## Full pattern: URL state + promise streaming

The combination of all patterns -- URL params drive server queries, promises stream to client components. See also `docs/patterns/server-promise-streaming.md`.

```tsx
// page.tsx (server component)
export default async function PostsPage({ searchParams }: PageProps) {
    const { q, page, limit } = await searchParamsCache.parse(searchParams)

    // Start fetch with URL params -- do NOT await
    const posts = getPosts({ query: q, page, limit })

    return (
        <Fragment>
            <SearchFilter />
            <ErrorBoundary fallback={<PostListError />}>
                <Suspense fallback={<PostListSkeleton />}>
                    <PostList posts={posts} />
                </Suspense>
            </ErrorBoundary>
        </Fragment>
    )
}
```

```tsx
// post-list.tsx (client component)
"use client"

import { use } from "react"

export function PostList({ posts }: { posts: Promise<Post[]> }) {
    const allPosts = use(posts)
    // render...
}
```

## Decision framework: URL params vs `useState`

| State type | URL params | `useState` | Reason |
|---|---|---|---|
| Search/filter/sort | Yes | No | Shareable, SSR-friendly, drives server queries |
| Pagination | Yes | No | Back button, deep linking |
| Tab/accordion selection | Yes | Maybe | URL if deep-linkable, state if ephemeral |
| Modal open/close | Maybe | Yes | URL only if modal has "page" semantics |
| Form field values | No | Yes | Transient input; `?email=half-typed@` is nonsensical |
| Animation/transition | No | Yes | Ephemeral visual state |
| Hover/focus | No | Yes | Pure UI micro-state |
| Optimistic UI | No | Yes | Temporary until server confirms |

**Rule of thumb:** if sharing the URL should reproduce the same view, it belongs in the URL.

## Key options

| Option | Default | Use when |
|---|---|---|
| `shallow: false` | `true` | You want the server to re-render with new params (most of the time) |
| `history: "push"` | `"replace"` | Each param change should be a back-button stop |
| `clearOnDefault: true` | `false` | Keep URLs clean -- remove `?page=1` when it's the default |
