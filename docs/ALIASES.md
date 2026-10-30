# Path Alias

The project uses a single path alias: **`@/*` → `src/*`**.

## 🔧 Configuration

The alias is declared in three places, which must stay in sync:

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Vite (`vite.config.ts`)

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Vitest (`vitest.config.ts`)

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
});
```

### ESLint (`eslint.config.js`)

`eslint-import-resolver-typescript` reads `tsconfig.json`, so `import/no-unresolved` understands `@/` without extra configuration. `import/order` puts `@/**` imports in their own group, between external packages and relative imports.

## 📖 When to use it

- **Across folders**: always use `@/`.
- **Inside a component or page folder**: use relative imports for siblings and sub-folders (`./GalleryFilter`, `./Lightbox/Lightbox`, `./Gallery.types`).
- **No barrel files**: import the file itself, e.g. `@/components/common/Seo/Seo`. `TextAnimations/index.ts` is the only barrel in the project.

```typescript
// src/pages/Home/Home.tsx
import { MotionConfig } from 'framer-motion';

import { Seo } from '@/components/common/Seo/Seo';
import { baseTransition } from '@/utils/animations';

import { AgencySection } from './AgencySection/AgencySection';
import { HeroSection } from './HeroSection/HeroSection';
import './Home.css';
```

## 🔍 Import Order

Enforced by `import/order` (blank line between groups, alphabetized):

1. Packages (`react`, `framer-motion`, ...)
2. `@/` aliases
3. Relative imports
4. Styles (`./Component.css`)

`pnpm lint:fix` reorders imports automatically.

## ⚠️ CSS: no alias in `@reference`

Tailwind v4 resolves `@reference` before Vite applies its aliases, so CSS files must use a **relative path** to `src/index.css`:

```css
/* src/components/layout/Header/Header.css */
@reference "../../../index.css";
```

```css
/* ❌ Does not work */
@reference "@/index.css";
```

The depth depends on where the CSS file lives:

| CSS file location                          | `@reference` path      |
| ------------------------------------------ | ---------------------- |
| `src/App.css`                              | `./index.css`          |
| `src/pages/Page/Page.css`                  | `../../index.css`      |
| `src/components/group/Component/*.css`     | `../../../index.css`   |
| `src/pages/Page/Section/Section.css`       | `../../../index.css`   |
