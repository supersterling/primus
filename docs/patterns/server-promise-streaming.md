# Server-to-Client Promise Streaming

The default data fetching pattern. Start an async fetch in a server component, pass the **unresolved promise** as a prop, and call `use()` in the client component to unwrap it. The shell renders immediately; data-dependent sections stream in as promises resolve.

This replaces `useEffect` + client-side fetch. Never do that.

---

## The pattern

```
Server Component (RSC)         Client Component ("use client")
---------------------          ------------------------------
1. Call async function          3. Accept Promise<T> as prop
2. Do NOT await it              4. Call use(promise) to unwrap
   Pass promise as prop         5. Component suspends until resolved
   Wrap in <Suspense>              > Suspense fallback shows
                                   > Data renders when ready
```

## Recipe

**Server component (page or layout):**

```tsx
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { PostList, PostListSkeleton, PostListError } from "@/components/post-list"
import { getPosts } from "@/lib/queries"

export default function Page() {
    // 1. Start the fetch -- do NOT await
    const posts = getPosts()

    // 2. Pass the unresolved promise through Suspense
    return (
        <ErrorBoundary fallback={<PostListError />}>
            <Suspense fallback={<PostListSkeleton />}>
                <PostList posts={posts} />
            </Suspense>
        </ErrorBoundary>
    )
}
```

**Client component:**

```tsx
"use client"

import { use } from "react"

type Post = { id: string; title: string }

export function PostList({ posts }: { posts: Promise<Post[]> }) {
    // use() unwraps the promise -- component suspends until resolved
    const allPosts = use(posts)

    return (
        <ul>
            {allPosts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}
```

## When to use this vs async server components

| Scenario | Pattern | Why |
|---|---|---|
| Data displayed in interactive UI (filters, tabs, client state) | Promise streaming via `use()` | Client component needs the data |
| Data displayed in static/read-only UI | `async` server component with `await` | Simpler -- no client component needed |
| Multiple independent data sources on one page | Promise streaming for each | Parallel fetches, independent Suspense boundaries |
| Data needed by both server and client children | Start fetch in server, pass promise down | Single fetch, multiple consumers |

## Rules

- **Never `await` in the server component** when streaming to a client. The whole point is that the promise resolves *after* the shell renders.
- **Always wrap in `<Suspense>`** with a named skeleton component. The Suspense boundary is what enables streaming.
- **Always wrap in `<ErrorBoundary>`** outside the Suspense. Rejected promises surface here.
- **React deduplicates `use()` calls on the same promise reference.** Multiple client components can call `use()` on the same promise -- they all resolve simultaneously.

## Reference

- [`SettingsPage`](app:(dashboard)/app/settings/page.tsx#SettingsPage) -- Suspense + ErrorBoundary wrapping an async server component
