# PhotoProject — Development Standards

Ces règles s'appliquent à chaque modification du codebase, sans exception.

## Setup

- **Package manager**: `pnpm` only
- **Dev server**: `https://photoproject.local:5173` (HTTPS, mkcert)
- **Start session**: `mulch prime`

## Verification (before any commit)

```
pnpm typecheck   # 0 errors
pnpm lint        # 0 warnings
pnpm format      # formatted
```

## Git Hooks

- **pre-commit**: `pnpm lint:fix`
- **commit-msg**: conventional commits (`feat:`, `fix:`, etc.)

## Styling

- Tailwind via `@apply` in `.css` files co-located with components
- `className` = semantic names only (no Tailwind utilities)
- `@reference` in CSS uses relative path (`../../../index.css`)
- CSS variables in `:root` of `src/index.css`; `@theme` block for Tailwind tokens

## TypeScript

- Strict mode, zero `any`
- Types: `ComponentName.types.ts` next to `ComponentName.tsx`
- No `index.ts` barrel files — import from component file directly
- Path aliases: always `@/` prefix (e.g., `@/components/Button/Button`)

## Framer Motion

- Variants: `src/utils/animations.ts`
- Constants: `src/utils/constants.ts` (`ANIMATION`, `TRANSITION`, `MOTION`)
- Easing cast: `[...ANIMATION.EASING] as [number, number, number, number]`
- Use `staggerContainerVariants` + `variants` (not `custom` props)

## Components

- Named exports only (no `export default` except lazy pages)
- Pages: lazy-loaded via `React.lazy`, must `export default`
- Pages > 150 lines: split into orchestrator + utils + animations + hook
- Routes defined in both `src/router.tsx` and `src/utils/constants.ts` (`ROUTES`, `PAGE_ORDER`)

## Import Order

```typescript
// 1. External packages
import { useState } from 'react';
// 2. Internal @/ aliases
import { useGalleryImages } from '@/hooks/useGalleryImages';
// 3. Relative (same folder only)
import type { Props } from './Component.types';
// 4. Styles last
import './Component.css';
```

## Scripts

```bash
pnpm dev              # Dev server
pnpm build            # Build for production
pnpm optimize-images  # Compress images to WebP
pnpm test             # Vitest watch mode
pnpm test:ui          # Vitest UI
```

## References

- Architecture & path aliases: `docs/STRUCTURE.md`
- Tailwind conventions: `docs/TAILWIND.md`
- Router & lazy loading: `docs/ROUTER.md`
- ESLint, Prettier, Husky: `docs/CODE_QUALITY.md`
- Image optimization: `docs/IMAGE_OPTIMIZATION.md`
- Path aliases: `docs/ALIASES.md`

## Mulch (Expertise)

```bash
mulch prime           # Load project context at session start
mulch learn           # Discover insights worth recording
mulch record <domain> --type <type> --description "..."  # Record insight
mulch sync            # Commit changes
```
