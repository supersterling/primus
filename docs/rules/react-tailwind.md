# React & Tailwind

## Inline styles

Use Tailwind classes. `style={{}}` bypasses the design system.

```tsx
// wrong
<div style={{ color: "red", padding: "16px" }}>

// right
<div className="text-destructive p-4">
```

**Hint — CSS variables with arbitrary properties:**

When you need a dynamic value that can't be expressed as a class, set a CSS variable using Tailwind's arbitrary property syntax and consume it elsewhere.

```tsx
<div className="[--progress:75%]">
    <div className="w-[--progress] bg-primary h-2" />
</div>
```

## Theme tokens

Use theme tokens. Raw Tailwind colors bypass the design system.

```tsx
// wrong
<div className="bg-blue-500 text-red-400">

// right
<div className="bg-primary text-destructive">
```

Available tokens are defined in `src/app/globals.css`. Any `--color-*` variable maps to a Tailwind utility — `--color-primary` becomes `bg-primary`, `text-primary`, `border-primary`, etc.

## Fragments

Use `<Fragment>`. `<>` is ambiguous and harder to grep.

```tsx
import { Fragment } from "react"

// wrong
<><Child /></>

// right
<Fragment><Child /></Fragment>
```

## Suspense boundaries

Always provide a `fallback` prop on `<Suspense>`. Without one, React silently renders nothing while loading — the user sees a blank area with no indication of activity.

The fallback must be a named skeleton component, not an inline HTML element. Named components are reusable, testable, and signal that the skeleton was deliberately designed to match the content shape.

```tsx
// wrong — no fallback
<Suspense>
    <AccountSection />
</Suspense>

// wrong — inline HTML is a throwaway placeholder, not a real skeleton
<Suspense fallback={<div>Loading...</div>}>
    <AccountSection />
</Suspense>

// right — named skeleton component that mirrors the content layout
<Suspense fallback={<AccountSectionSkeleton />}>
    <AccountSection />
</Suspense>
```

Co-locate the skeleton with the component it covers. If `AccountSection` lives in `settings/page.tsx`, define `AccountSectionSkeleton` in the same file.

**Note:** The fallback component rule catches inline elements with children (`<div>Loading...</div>`) but cannot catch self-closing HTML elements (`<span />`) due to a limitation in Biome's GritQL implementation. The missing-fallback rule is the more important guard.

## Ternaries

Assign the ternary to a variable. Inline ternaries hide branching logic.

```tsx
// wrong
<div>{isLoading ? <Spinner /> : <Content data={data} />}</div>

// right
const body = isLoading ? <Spinner /> : <Content data={data} />
return <div>{body}</div>
```

Conditional rendering with `&&` is fine — this rule is specifically about `? :`.

**Hint — use early returns for loading/error/empty states:**

```tsx
if (isLoading) {
    return <Spinner />
}
if (error) {
    return <ErrorMessage error={error} />
}
return <Content data={data} />
```
