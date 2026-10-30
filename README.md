# PhotoProject

Photography portfolio of Thomas Marguenot — Vite + React + TypeScript.

## 🚀 Technologies

- **React** 19.2 (document metadata for per-route SEO)
- **TypeScript** 5.9+ (strict mode)
- **Vite** 7.1.9 (requires Node.js 22.12+, see `.nvmrc`)
- **React Router** 7 (lazy-loaded routes)
- **Tailwind CSS** 4.1.14 (via `@apply` only)
- **Framer Motion** 12 for animations
- **react-photo-album** for the gallery grid, **d3-force** for the tech graph
- **ESLint** 9 + **Prettier** 3
- **Husky** + **Commitlint** for conventional commits
- **Semantic Release** for automated versioning
- **Vitest + React Testing Library** for testing
- **pnpm** as package manager
- **Vercel** for hosting and analytics

## 🏃 Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Open **http://localhost:5173** in your browser

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Generate the gallery manifest, type-check and build for production
- `pnpm preview` - Preview the production build
- `pnpm typecheck` - Check TypeScript types without emitting files
- `pnpm lint` - Check for linting errors
- `pnpm lint:fix` - Fix linting errors automatically
- `pnpm format` - Format `src/` with Prettier
- `pnpm format:check` - Check formatting without modifying files
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Open Vitest UI
- `pnpm test:coverage` - Generate test coverage report
- `pnpm gallery:images` - Generate the `-600w`, `-1200w`, `-1800w` variants of `src/assets/pictures/` into `public/images/`
- `pnpm gallery:manifest` - Regenerate `src/assets/gallery-manifest.json` (dimensions + EXIF) from `public/images/`
- `pnpm optimize-images` - Resize, compress and convert images in `src/assets/pictures/` to WebP
- `pnpm rotate-portraits <dir>` - Rotate every image in a directory by 270° (photos stored sideways)
- `pnpm release` - Create a new release with semantic-release

## 📁 Project Structure

```
photoProject/
├── public/              # Static assets (favicons, OG image, robots.txt, sitemap, gallery images)
├── scripts/             # Node scripts for gallery manifest and image processing
├── src/
│   ├── assets/          # Images, logos, fonts, gallery manifest
│   ├── components/
│   │   ├── common/      # Generic components (Seo, LoadingFallback, TextAnimations)
│   │   └── layout/      # Layout, Header, Footer, PageTransition
│   ├── context/         # React contexts (Header)
│   ├── hooks/           # Shared custom hooks
│   ├── pages/           # One folder per route, lazy-loaded via lazyPages.ts
│   ├── test/            # Vitest setup
│   ├── utils/
│   │   ├── animations.ts  # All Framer Motion variants
│   │   └── constants.ts   # Animation constants, routes, page order
│   ├── App.tsx
│   ├── router.tsx       # Route definitions
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles + Tailwind theme
├── .husky/              # Git hooks
├── docs/                # Documentation
└── CLAUDE.md            # Project conventions
```

**See [docs/STRUCTURE.md](./docs/STRUCTURE.md) for detailed conventions.**

## 📐 Conventions

The main rules (full list in [CLAUDE.md](./CLAUDE.md)):

- **Styling**: Tailwind only via `@apply` in CSS files colocated with components. `className` only holds semantic names, never Tailwind utilities.
- **Animations**: every variant lives in `src/utils/animations.ts`, constants in `src/utils/constants.ts`. No inline values, no `custom` props.
- **Types**: in a `ComponentName.types.ts` file next to the component.
- **Pages**: `export default` + `React.lazy`, split once a page exceeds 150 lines.
- **Imports**: packages → `@/` aliases → relative → styles (enforced by ESLint `import/order`).

## 🔗 Path Alias

A single alias, `@/*` → `src/*`, configured in `tsconfig.json`, `vite.config.ts` and `vitest.config.ts`:

```typescript
// ✅ Good
import { ROUTES } from '@/utils/constants';

// ❌ Bad
import { ROUTES } from '../../utils/constants';
```

## 🧭 Routing

Routes are declared in `src/router.tsx` and lazy-loaded from `src/pages/lazyPages.ts`. Page chunks are preloaded before the page transition runs, to avoid a flash on first navigation.

- `/` - Home
- `/gallery` - Photo gallery with location filters and lightbox
- `/about` - About
- `/charte` - Design system showcase (noindex)
- `/contact` - Contact
- `*` - 404 Not Found

The direction of the page transition is inferred from `PAGE_ORDER` in `src/utils/constants.ts`.

**See [docs/ROUTER.md](./docs/ROUTER.md) for more details.**

## 🖼️ Images

- Source photos live in `src/assets/pictures/`. `pnpm optimize-images` resizes and converts them to WebP, keeping the source files with an `.original` extension.
- `pnpm gallery:images` copies them to `public/images/` and generates the `-600w`, `-1200w`, `-1800w` variants served by the gallery. These widths must match the `sizes` attribute in `GalleryGrid.tsx`.
- `pnpm build` regenerates `gallery-manifest.json` from `public/images/` (dimensions, EXIF data used by the lightbox, and the srcset variants actually present on disk).

Adding a photo: drop it in `src/assets/pictures/`, then run `pnpm optimize-images && pnpm gallery:images && pnpm gallery:manifest`.

**See [docs/IMAGE_OPTIMIZATION.md](./docs/IMAGE_OPTIMIZATION.md) for the complete guide.**

## 🧪 Testing

This project uses **Vitest** (jsdom) and **React Testing Library**. Tests are colocated with the code they test (`Header.test.tsx`, `Gallery.test.tsx`, ...), setup lives in `src/test/setup.ts`.

```bash
pnpm test              # Run tests in watch mode
pnpm vitest run        # Run tests once
pnpm test:ui           # Open Vitest UI in browser
pnpm test:coverage     # Generate coverage report
```

## 🔒 Git Workflow

This project uses **Husky** and **Commitlint** to enforce conventional commits.

### Pre-commit Hook

- Runs `pnpm run lint:fix` before each commit
- Run `pnpm typecheck && pnpm lint` yourself before committing: the hook does not type-check

### Commit-msg Hook

- Validates commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Format: `<type>[optional scope]: <description>`

**Allowed types:**

- `feat:` - New feature (minor version bump)
- `fix:` - Bug fix (patch version bump)
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test changes
- `build:` - Build system changes
- `ci:` - CI configuration changes
- `chore:` - Other changes
- `revert:` - Revert a previous commit

**Examples:**

```bash
git commit -m "feat(gallery): add location filter"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "feat!: change route structure" # Breaking change
```

### Semantic Release

The project uses **semantic-release** for automated versioning and changelog generation:

1. Commit your changes following conventional commits format
2. Push to the `main` branch
3. Run `pnpm release` to:
   - Analyze commits and determine version bump
   - Generate/update `CHANGELOG.md`
   - Create a new git tag
   - Update `package.json` version

**Version bumping:**

- `feat:` commits → minor version (0.X.0)
- `fix:` commits → patch version (0.0.X)
- `feat!:` or `BREAKING CHANGE:` → major version (X.0.0)

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Project conventions (styling, animations, types, pages)
- **[docs/STRUCTURE.md](./docs/STRUCTURE.md)** - Project structure and folder conventions
- **[docs/ALIASES.md](./docs/ALIASES.md)** - Path alias configuration
- **[docs/ROUTER.md](./docs/ROUTER.md)** - React Router setup and lazy loading
- **[docs/TAILWIND.md](./docs/TAILWIND.md)** - Tailwind CSS with the `@apply` pattern
- **[docs/CODE_QUALITY.md](./docs/CODE_QUALITY.md)** - ESLint, Prettier, Husky, Commitlint
- **[docs/IMAGE_OPTIMIZATION.md](./docs/IMAGE_OPTIMIZATION.md)** - Image pipeline
