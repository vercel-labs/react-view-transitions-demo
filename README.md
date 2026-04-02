# React View Transitions Demo

A Next.js photography gallery showcasing the [React View Transitions agent skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions). The [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) branch has all view transition patterns applied; the [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) branch is the base app without animations.

**[Live Demo](https://react-view-transitions-demo.labs.vercel.dev/)**

## App Features

- **Gallery page** — Searchable, sortable photo grid with URL-based state (`?q=...&sort=...`)
- **Photo detail page** — Responsive layout with hero image and metadata
- **Photographers page** — Tab-based navigation between photographer collections
- **Suspense boundaries** — Skeleton loading states throughout

## View Transition Patterns

| Feature | Pattern |
|---------|---------|
| Photo thumbnail → hero image | Shared element morph with named `ViewTransition` |
| Forward/back navigation | Directional slides via `transitionTypes` on `next/link` |
| Skeleton → content reveal | Suspense fallback slides out, content slides in |
| Photographer tab switching | `key` + `name` + `share` for same-route crossfade |
| Search filtering | Server-side filtering via URL search params with `startTransition` |
| Instant sort feedback | `useOptimistic` for immediate button highlight |
| Element isolation | Header and search bar excluded from page slides via `viewTransitionName` |
| Reduced motion | All animations disabled with `prefers-reduced-motion: reduce` |

## Try It

Install the skill and prompt your agent against the `plain` branch:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions
```

```
Add view transitions to this app
```

Output is not deterministic — the agent may not cover every page or pattern in one pass. Review what it did, then ask for what's missing:

```
Add Suspense reveal animations to the skeleton fallbacks.
Also add element isolation to the header so it doesn't slide with the page.
```