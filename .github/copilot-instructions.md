# GitHub Copilot Instructions for PhotoProject

## Project Overview

PhotoProject is a React 19 + TypeScript (strict) photography portfolio built with Vite 7, React Router 7, Tailwind CSS 4, Framer Motion 12, and Vitest.

**Package manager:** `pnpm` only — never use npm or yarn.
**Dev server:** `https://photoproject.local:5173` (mkcert self-signed SSL, fixed port).

## Build & Test Commands

```bash
pnpm dev           # Start dev server (HTTPS)
pnpm build         # tsc -b && vite build
pnpm typecheck     # TypeScript strict check
pnpm lint          # ESLint (0 warnings allowed)
pnpm lint:fix      # Auto-fix + Prettier format
pnpm test          # Vitest watch mode
pnpm test:coverage # Coverage report
pnpm release       # semantic-release (conventional commits required)
pnpm optimize-images  # Compress + convert to WebP
pnpm rotate-portraits # Rotate portrait images 270° (use if images are sideways)
```

## Non-Negotiable Rules

> Detailed rationale and more examples live in `docs/`. These are the gotchas that cause bugs when missed.

### Comments — English only, minimal

The owner speaks French. **All comments must be in English.** Only comment non-obvious logic (algorithms, workarounds, perf quirks). Never describe what the code literally does.

```typescript
// ✅ Prevent scroll during lightbox animation
document.body.style.overflow = 'hidden';

// ❌ Set state to true
setShouldExpand(true);

// ❌ Désactiver le scroll  ← French is forbidden
```

### Path Aliases — always `@/`, never relative

```typescript
// ✅ import { Button } from '@/components/common/Button/Button';
// ❌ import { Button } from '../../components/common/Button';
```

**No `index.ts` files.** Import directly from the component file — `@/components/Button/Button`, not `@/components/Button`. See [docs/ALIASES.md](../docs/ALIASES.md).

### Tailwind — `@apply` in separate CSS files, no plain CSS

Every component has a `ComponentName.css` file. Styles go there using `@apply`, never inline.

```css
/* ✅ Component.css */
@reference "../../../index.css";   /* relative path — @/ doesn't work here (Tailwind v4 limitation) */

.header-link {
  @apply text-[var(--header-link-size)] font-[var(--header-link-weight)];
}

/* ❌ Never plain CSS properties */
.header-link { font-size: var(--header-link-size); }
```

Design tokens live in `:root` in `src/index.css`. Tailwind theme values use `@theme`. Both are needed. See [docs/TAILWIND.md](../docs/TAILWIND.md).

### Types — always `ComponentName.types.ts`, never inline

```typescript
// ✅ Button.types.ts
export interface ButtonProps { children: ReactNode; }

// ✅ Button.tsx
import type { ButtonProps } from './Button.types';

// ❌ never define interfaces inside component files
// ❌ never use a generic name like types.ts
```

### Routing — lazy load every page, use `Link` not `<a>`

```typescript
// router.tsx
const Home = lazy(() => import('@/pages/Home/Home'));  // direct file, not folder
```

Every page must `export default PageName` for lazy loading. Use `<Link to="…">` for navigation — `<a href>` causes full reloads. See [docs/ROUTER.md](../docs/ROUTER.md).

### Constants — `src/utils/constants.ts` is the single source of truth

Animation timings, easing curves, route paths, and any value used across multiple files belong in `constants.ts`. Sync animation values with CSS variables in `index.css`. The `PAGE_ORDER` constant drives page-transition direction inference — keep it in sync with `router.tsx`.

### Import order (ESLint-enforced)

```typescript
// 1. External packages
import { useState } from 'react';
// 2. Internal @/ aliases
import { useGalleryImages } from '@/hooks/useGalleryImages';
// 3. Relative (same folder only)
import type { GalleryProps } from './Gallery.types';
// 4. Styles last
import './Gallery.css';
```

### Complex pages — modular architecture

Pages > ~150 lines must split into:
- `PageName.tsx` — orchestrator only (~50 lines)
- `pageNameUtils.ts` — pure functions (testable)
- `pageNameAnimations.ts` — Framer Motion `Variants`
- `usePageName.ts` — data/state hook
- Subcomponent folders (each with its own `.types.ts`)

The `src/pages/Gallery/` directory is the canonical example. See [docs/STRUCTURE.md](../docs/STRUCTURE.md).

## Key Reminders

| Topic | Rule |
|---|---|
| Images | WebP only in `src/assets/pictures/**`; auto-loaded by `useGalleryImages` |
| Gallery layout | Full-width exception — no `max-width`, use `px-20` padding |
| Standard pages | `max-width: var(--page-max-width)` (1600px), centered |
| Header/Footer | `80%` width, max 1600px, centered |
| Analytics | Vercel Analytics already in `Layout.tsx` — do not add again |
| Commits | Conventional Commits enforced by commitlint; `pnpm release` auto-versions |
| Testing | Test files co-located (`Component.test.tsx`); use `screen.getByRole()` |

## Further Reading

- [docs/ALIASES.md](../docs/ALIASES.md) — path alias setup and ESLint config
- [docs/TAILWIND.md](../docs/TAILWIND.md) — `@apply`, `@reference`, CSS variables, `@theme`
- [docs/ROUTER.md](../docs/ROUTER.md) — lazy loading, Suspense, adding routes
- [docs/STRUCTURE.md](../docs/STRUCTURE.md) — folder conventions and modular page pattern
- [docs/CODE_QUALITY.md](../docs/CODE_QUALITY.md) — ESLint, Prettier, Husky, lint-staged
- [docs/IMAGE_OPTIMIZATION.md](../docs/IMAGE_OPTIMIZATION.md) — WebP workflow, optimization scripts

