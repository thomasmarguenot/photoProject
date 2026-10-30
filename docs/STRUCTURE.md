# Project Structure

This document describes the folder structure and conventions of the project. The rules themselves live in [`CLAUDE.md`](../CLAUDE.md).

## 📁 Folder Structure

```
src/
├── assets/                  # Photos, logos, project images, gallery-manifest.json
├── components/
│   ├── common/              # Generic components
│   │   ├── LoadingFallback/ # Suspense fallback
│   │   ├── Seo/             # Per-route <title>, description, canonical, noindex
│   │   └── TextAnimations/  # AnimatedHeading, AnimatedText
│   └── layout/
│       ├── Layout/          # Root route element (providers, Header, Outlet, Footer)
│       ├── Header/          # Desktop nav + indicator, mobile menu
│       ├── Footer/
│       └── PageTransition/  # Overlay transition between pages
├── context/                 # Header.context.tsx (header visibility)
├── fonts/                   # local-fonts.css (loaded by index.html)
├── hooks/                   # Shared hooks (useBodyOverflow)
├── pages/                   # One folder per route
│   ├── Home/                # Sections in sub-folders (HeroSection, ProjectsSection, ...)
│   ├── Gallery/             # Grid, filter, lightbox, useGalleryImages, useLightbox
│   ├── About/               # About.data.ts, AboutSection, TechGraph, useAboutTheme
│   ├── Charte/              # Charte.data.ts, CharteSection, CharteSections
│   ├── Contact/
│   ├── NotFound/
│   └── lazyPages.ts         # React.lazy pages + route preloaders
├── test/setup.ts            # Vitest setup (jest-dom)
├── utils/
│   ├── animations.ts        # All Framer Motion variants and transitions
│   └── constants.ts         # ANIMATION, DELAY, STAGGER, ROUTES, PAGE_ORDER, SITE_URL
├── App.tsx                  # RouterProvider
├── router.tsx               # Route definitions
├── main.tsx                 # Entry point
└── index.css                # Tailwind import, @theme tokens, CSS variables
```

## 🎯 Component Folder

```
ComponentName/
├── ComponentName.tsx         # Named export
├── ComponentName.css         # Styles via @apply, starts with @reference
├── ComponentName.types.ts    # Props and local types (when needed)
├── ComponentName.test.tsx    # Tests (when needed)
└── useSomething.ts           # Hook extracted from the component (when needed)
```

- No `index.ts` barrel: import the file directly (`@/components/layout/Header/Header`).
- Types go in `ComponentName.types.ts`, not inline in the component.
- A page's sub-components live in the page folder, either flat (`Gallery/GalleryFilter.tsx`) or in their own sub-folder when they have several files (`Gallery/Lightbox/`).

## 📄 Pages

- **Exports**: named export + `export default` (the default is used by `React.lazy` in `lazyPages.ts`).
- **Metadata**: each page renders `<Seo />` (React 19 hoists it into `<head>`).
- **Size limit**: split a page once it exceeds 150 lines. The usual seams:
  - static content → `Page.data.ts`
  - repeated markup → `PageSection.tsx`
  - effects and state → `usePageSomething.ts`

## 🎬 Animations

- Every variant lives in `src/utils/animations.ts`; durations, delays and staggers come from `src/utils/constants.ts`.
- Components import variants and switch between labels (`initial="hidden" animate="visible"`). No inline transition values, no `custom` props.
- Chained sequences use `staggerContainerVariants` on the parent and `variants` on the children.

## 🎨 Styling

- Tailwind only through `@apply` in the component's colocated `.css` file.
- `className` holds semantic names only (`gallery-lightbox-counter`), never Tailwind utilities.
- Design tokens live in `src/index.css` (`@theme` + `:root` variables).

See [TAILWIND.md](./TAILWIND.md).

## 📦 Imports

Packages → `@/` aliases → relative → styles, enforced by ESLint. See [ALIASES.md](./ALIASES.md).

## 🧩 Naming

- **Components**: PascalCase (`GalleryGrid.tsx`)
- **Hooks**: `use[Name].ts` (`useLightbox.ts`)
- **Types**: `ComponentName.types.ts`
- **Static data**: `PageName.data.ts`
- **Module constants**: UPPER_SNAKE_CASE (`NAV_ITEMS`, `PAGE_ORDER`)
- **CSS classes**: kebab-case prefixed by the component (`header-mobile-link`, `charte-section`)
