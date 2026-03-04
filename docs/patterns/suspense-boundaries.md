# Suspense Boundary Placement

Push Suspense boundaries **as far down the tree as possible**. Every piece of UI that *can* render without data *should* render without data.

---

## The principle

React serializes promise resolution per Suspense boundary. A single high-level boundary means the entire page waits for the slowest query. Granular boundaries let independent sections stream in as their data arrives.

```
BAD -- one boundary, everything waits for slowest query:

<Suspense fallback={<PageSkeleton />}>
    <Header />        <- waits for posts AND comments
    <PostList />      <- 50ms query
    <CommentList />   <- 500ms query
</Suspense>


GOOD -- granular boundaries, each section streams independently:

<Header />                                          <- renders immediately
<Suspense fallback={<PostListSkeleton />}>
    <PostList posts={posts} />                      <- streams at 50ms
</Suspense>
<Suspense fallback={<CommentListSkeleton />}>
    <CommentList comments={comments} />             <- streams at 500ms
</Suspense>
```

## Decision framework

Split a Suspense boundary when **any** of these are true:

1. **Independent data sources** -- sections fetch from different queries or APIs
2. **Different latency profiles** -- one section is fast, another is slow
3. **Independent error recovery** -- a failed comment load shouldn't block posts
4. **Static siblings** -- headers, labels, or layout chrome that need no data

Do NOT split when:

1. **Data is co-dependent** -- section B can't render without section A's data
2. **Single atomic unit** -- splitting would show a confusing partial state

## Rules

- **Named skeleton components only.** `<Suspense fallback={<PostListSkeleton />}>` not `<Suspense fallback={<div>Loading...</div>}>`. This is lint-enforced.
- **ErrorBoundary wraps Suspense, not the other way around.** ErrorBoundary catches rejected promises; Suspense handles pending promises.
- **Collocate skeletons with their components.** Export `PostListSkeleton` and `PostListError` from the same file as `PostList`. See `docs/patterns/skeleton-collocation.md`.

## Reference

- [`SettingsPage`](app:(dashboard)/app/settings/page.tsx#SettingsPage) -- ErrorBoundary + Suspense + named skeleton pattern
