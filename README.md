# React View Transitions Demo

A Next.js photography gallery showcasing the [React View Transitions agent skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions). Each feature in the app maps to a view transition pattern the skill can apply.

**[Live Demo](https://react-view-transitions-demo.labs.vercel.dev/)**

## Branches

| Branch | Description |
|--------|-------------|
| [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) | All view transition patterns applied |
| [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) | Base app — no `<ViewTransition>` animations |

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

## App Features

- **Gallery page** — Searchable, sortable photo grid with URL-based state (`?q=...&sort=...`)
- **Photo detail page** — Responsive layout with hero image and metadata
- **Photographers page** — Tab-based navigation between photographer collections
- **Suspense boundaries** — Skeleton loading states throughout

## Try It

Install the skill and prompt your agent against the [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) branch:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions
```

```
Add view transitions to this app using the view transitions skill
```

The [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) branch shows the result. See the [full code diff](https://github.com/vercel-labs/react-view-transitions-demo/pull/1).
