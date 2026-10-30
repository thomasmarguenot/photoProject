# Routing

The project uses **React Router 7** (`createBrowserRouter`) with lazy-loaded pages, chunk preloading and an overlay transition between pages.

## 🚀 Routes

| Path       | Page     | In nav | Notes                                   |
| ---------- | -------- | ------ | --------------------------------------- |
| `/`        | Home     | ✅     |                                         |
| `/gallery` | Gallery  | ✅     | Location filters + lightbox             |
| `/about`   | About    | ✅     | Switches to a dark theme while scrolling |
| `/charte`  | Charte   | ❌     | Design system showcase, `noindex`       |
| `/contact` | Contact  | ✅     |                                         |
| `*`        | NotFound | ❌     | `noindex`                               |

Paths are centralized in `ROUTES` (`src/utils/constants.ts`).

## ⚙️ How it fits together

### `src/router.tsx`

All routes are children of `Layout`:

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'charte', element: <Charte /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
```

### `src/pages/lazyPages.ts`

This is the single source of truth for page imports. The same `import()` function is used by `React.lazy` and by `preloadRoute`, so Vite produces a single chunk per page:

```ts
const importers = {
  home: () => import('@/pages/Home/Home'),
  gallery: () => import('@/pages/Gallery/Gallery'),
  // ...
};

export const Home = lazy(importers.home);

export const preloadRoute = (to: string) => pagePreloaders[to]?.();
```

### `Layout`

```
HeaderProvider
└── Suspense (LoadingFallback)
    └── PageTransitionProvider
        ├── Header
        ├── <main><Outlet /></main>
        ├── Footer
        └── Analytics (Vercel)
```

## 🎬 Page transitions

Navigation from the header goes through `usePageTransition()` instead of a plain `<Link>`:

1. **Preload on intent**: hovering or focusing a link calls `preloadRoute(to)`.
2. **Click**: the header calls `runTransition(direction, navigate, preload)`. A blue overlay slides in.
3. **Covered screen**: once the overlay covers the screen, the provider waits for the page chunk, then navigates inside `flushSync`. The new page mounts synchronously under the overlay, so there is no Suspense flash.
4. **Reveal**: the overlay is removed after 60 ms.

The slide direction comes from `getPageDirection(from, to)`, which compares positions in `PAGE_ORDER`: moving backward slides right to left.

Outside a `PageTransitionProvider`, the context default navigates immediately, so components that use it still work in tests.

Cmd/Ctrl/Shift-click and middle-click keep the browser's default behaviour (new tab or window).

## 🔍 SEO

Each page renders `<Seo title description path noindex />` (`src/components/common/Seo/Seo.tsx`). React 19 hoists `<title>`, `<meta>` and `<link rel="canonical">` into `<head>` and removes them on unmount. The canonical URL is built from `SITE_URL`.

Indexed pages are also listed in `public/sitemap.xml`.

## 📄 Adding a route

1. **Page**: create `src/pages/MyPage/MyPage.tsx` with a named export and `export default MyPage`, and render `<Seo />`.
2. **Constants**: add the path to `ROUTES`, and to `PAGE_ORDER` if it takes part in directional transitions (`src/utils/constants.ts`).
3. **`lazyPages.ts`**: add an entry to `importers`, export the lazy component, and add the path to `pagePreloaders`.
4. **`router.tsx`**: add the route under `Layout`.
5. **Navigation**: add it to `NAV_ITEMS` in `Header.tsx` if it should appear in the menu.
6. **Sitemap**: add it to `public/sitemap.xml` if it should be indexed.
