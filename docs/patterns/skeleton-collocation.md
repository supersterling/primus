# Collocating Skeletons and Errors

Export the skeleton and error fallback from the same file as the component they represent. This keeps the boundary contract visible and prevents orphaned fallbacks.

---

## Recipe

```tsx
// src/components/post-list.tsx
"use client"

import { use } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type Post = { id: string; title: string }

export function PostList({ posts }: { posts: Promise<Post[]> }) {
    const allPosts = use(posts)
    return (
        <ul>
            {allPosts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}

export function PostListSkeleton() {
    return (
        <ul>
            {Array.from({ length: 5 }, (_, i) => (
                <li key={i}>
                    <Skeleton className="h-4 w-full" />
                </li>
            ))}
        </ul>
    )
}

export function PostListError() {
    return <p className="text-destructive text-sm">Failed to load posts.</p>
}
```

Then in the page:

```tsx
import { PostList, PostListSkeleton, PostListError } from "@/components/post-list"

<ErrorBoundary fallback={<PostListError />}>
    <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} />
    </Suspense>
</ErrorBoundary>
```

## Rules

- **Same file, same export.** Component, skeleton, and error fallback live together.
- **Skeleton matches the component's layout.** If the component renders a list of 5 items, the skeleton shows 5 placeholder rows.
- **Error fallback is minimal.** A single line of text with `text-destructive`. No retry buttons in the fallback itself -- that's the ErrorBoundary's job at a higher level.
