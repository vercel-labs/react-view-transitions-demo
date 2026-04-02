# React View Transitions Demo

A Next.js photography gallery demonstrating React View Transitions — shared element morphs, directional navigation, Suspense reveals, and more. Also serves as a testing ground for the [React View Transitions agent skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions).

The [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) branch has all view transition patterns applied; the [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) branch is the base app without animations.

**[Live Demo](https://react-view-transitions-demo.labs.vercel.dev/)**

## App Features

- **Gallery page** — Searchable, sortable photo grid with URL-based state (`?q=...&sort=...`)
- **Photo detail page** — Responsive layout with hero image and metadata
- **Photographers page** — Tab-based navigation between photographer collections
- **Suspense boundaries** — Skeleton loading states throughout

## View Transition Patterns

| Where | What happens | How |
|-------|-------------|-----|
| Grid → detail photo | Thumbnail morphs into the hero image and back | Named `<ViewTransition>` with `share="morph"` on both sides |
| Page navigation | Pages slide left/right based on navigation direction | `transitionTypes` on `next/link` + type-mapped `enter`/`exit` on page `<ViewTransition>` |
| Skeleton → content | Skeleton slides down and fades out, content slides up | Separate `<ViewTransition>` on Suspense fallback (`exit`) and content (`enter`) |
| Photographer tabs | Grid crossfades when switching between photographers | `<ViewTransition key={slug} name="collection-content" share="auto">` forces remount with shared morph |
| Search / filter | Grid animates as photos are added or removed | `startTransition` + `router.replace` triggers list-item `<ViewTransition>` reorder |
| Sort buttons | Active button highlights instantly without waiting for the transition to finish | `useOptimistic` ensures interactive state isn't blocked by the view transition |
| Header & search bar | Stay fixed in place while everything else slides | `viewTransitionName` on the element + CSS `animation: none` on its `::view-transition-group` |
| Reduced motion | All animations are disabled | `prefers-reduced-motion: reduce` sets `animation-duration: 0s` on all VT pseudo-elements |

## Try It

Install the skill and prompt your agent against the `plain` branch:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions
```

```
Add view transitions to this app using the view transition skill
```

Output is not deterministic — the agent may not cover every page or pattern in one pass. Review what it did, then ask for what's missing:

```
Add Suspense reveal animations to the skeleton fallbacks.
Also add element isolation to the header so it doesn't slide with the page.
```