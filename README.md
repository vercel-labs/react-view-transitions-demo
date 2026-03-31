# React View Transitions Demo

A Next.js photography gallery built to showcase the [React View Transitions agent skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions). The app provides a feature-rich surface area — sortable grids, search filtering, Suspense loading states, toggleable panels, and keyed content swaps — specifically designed so each feature maps to a view transition pattern from the skill.

**[Live Demo (animated)](https://react-view-transitions-demo.labs.vercel.dev/)**

## Branches

| Branch | Description | Deployment |
|--------|-------------|------------|
| [`main`](https://github.com/vercel-labs/react-view-transitions-demo/tree/main) | All view transition patterns applied | [react-view-transitions-demo.labs.vercel.dev](https://react-view-transitions-demo.labs.vercel.dev/) |
| [`plain`](https://github.com/vercel-labs/react-view-transitions-demo/tree/plain) | Base app — no `<ViewTransition>` animations | [view-transitions-demo-5yuw-git-plain.labs.vercel.dev](https://view-transitions-demo-5yuw-git-plain.labs.vercel.dev/) |

The `plain` branch is intentionally animation-free. It serves as the starting point — install the [React View Transitions skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions) and ask your agent to "add view transitions". The skill guides it to apply the right pattern to each feature. The `main` branch shows the result.

## Features → View Transition Patterns

| Feature | Location | View Transition Pattern |
|---------|----------|------------------------|
| Sortable photo grid | Gallery (`/`) | List reorder with `startTransition` |
| Search with deferred filtering | Gallery (`/`) | `useDeferredValue` cross-fade |
| `useOptimistic` sort controls | Gallery (`/`) | Exclude controls from animation snapshot |
| Suspense skeleton → content | Photo detail (`/photo/[id]`) | Skeleton slides out, content slides in |
| Toggleable EXIF panel | Photo detail (`/photo/[id]`) | Enter/exit with `startTransition` toggle |
| Collection tab switching | Collections (`/collection/[slug]`) | Force re-enter with `key` |
| Photo thumbnail → hero | Gallery → Detail | Shared element morph |
| Forward/back navigation | All pages | Directional slides with `transitionTypes` |

## Using the Skill

Install the [React View Transitions skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-view-transitions) into your agent:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions
```

Then prompt it against this branch:

```
Add view transitions to this app using the view transitions skill
```

The skill teaches the agent which pattern to apply where — shared elements for the photo morph, `default="none"` to prevent competing animations, directional slides for navigation, Suspense reveals for streaming content, and list reorder for the sortable grid.
