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
| Sortable photo grid | List reorder with `startTransition` |
| Search filtering | Cross-fade with `useDeferredValue` |
| Optimistic sort controls | `useOptimistic` + excluded from snapshot via `viewTransitionName` |
| Skeleton → content reveal | Suspense fallback slides out, content slides in |
| Photographer tab switching | Keyed content swap |
| Photo thumbnail → hero image | Shared element morph |
| Forward/back navigation | Directional slides with `transitionTypes` |

## Try It

Install the skill and prompt your agent against the [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) branch:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions
```

```
Add view transitions to this app using the view transitions skill
```

The [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) branch shows the result. See the [full code diff](https://github.com/vercel-labs/react-view-transitions-demo/pull/1).
