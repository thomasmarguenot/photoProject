# GitHub Copilot Instructions for PhotoProject

## Project Overview

PhotoProject is a modern React application built with:

- **React 19.2.0** with TypeScript (strict mode)
- **Vite 7.1.9** for fast builds and HMR
- **React Router 7+** with lazy loading and Suspense
- **Tailwind CSS 4.1.14** using `@apply` in separate CSS files
- **ESLint 9 + Prettier** with import auto-sorting
- **Path aliases** (`@/`) for clean imports
- **Commitlint + Husky** for conventional commits
- **Semantic Release** for automated versioning and changelog
- **Vitest + React Testing Library** for unit and integration tests
- **Framer Motion 12+** for smooth animations

## Critical Rules

### 1. Path Aliases - ALWAYS Use Absolute Imports

```typescript
// ✅ CORRECT - Use path aliases
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { Home } from '@/pages/Home';

// ❌ WRONG - Never use relative imports
import { Button } from '../../components/common/Button';
import { useAuth } from '../hooks/useAuth';
```

**Available aliases:**

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/pages/*` → `src/pages/*`
- `@/hooks/*` → `src/hooks/*`
- `@/services/*` → `src/services/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/assets/*` → `src/assets/*`

### 2. Tailwind CSS - Use @apply in Separate Files

```css
/* ✅ CORRECT - CSS file with @apply */
@reference "../../../index.css";

.button {
  @apply px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg;
}
```

```tsx
/* ✅ CORRECT - Use CSS classes */
import './Button.css';

export function Button() {
  return <button className="button">Click me</button>;
}
```

**IMPORTANT:**

- `@reference` directive MUST use relative paths (not aliases)
- Always add `@reference` at the top of CSS files using `@apply`

### 3. React Router - Lazy Loading Required

```typescript
// ✅ CORRECT - Lazy loaded routes
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));

// ✅ CORRECT - Default export required
// In src/pages/Home/index.ts
export { Home } from './Home';
export { Home as default } from './Home';
```

```tsx
// ✅ CORRECT - Layout with Outlet and Suspense
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingFallback } from '@/components/common/LoadingFallback';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
```

### 4. Navigation - Use Link, Not <a>

```tsx
// ✅ CORRECT - React Router Link
import { Link } from 'react-router-dom';
<Link to="/about">About</Link>

// ❌ WRONG - <a> causes full page reload
<a href="/about">About</a>
```

### 5. Component Structure

Every component folder should follow this structure:

```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.css        # Styles with @apply
├── ComponentName.types.ts   # Component types (if needed)
└── index.ts                 # Barrel export
```

**index.ts pattern:**

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

**For pages (lazy loading):**

```typescript
export { PageName } from './PageName';
export { PageName as default } from './PageName';
export type { PageNameProps } from './PageName.types';
```

### 6. Import Order (Enforced by ESLint)

```typescript
// 1. External dependencies
import { useState } from 'react';
import { Link } from 'react-router-dom';

// 2. Internal aliases (@/)
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

// 3. Relative imports (same folder only)
import type { Props } from './Component.types';

// 4. Styles
import './Component.css';
```

### 7. TypeScript - Strict Mode

- Always define types/interfaces
- Use `type` for unions, `interface` for objects
- Prefix unused parameters with `_`
- Use `ReactNode` for children prop

```typescript
// ✅ CORRECT
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  // Implementation
}
```

### 8. File Separation and Organization - Keep Files Small and Focused

**CRITICAL: Always separate types/interfaces into dedicated `ComponentName.types.ts` files**

- **NEVER** define types/interfaces directly in component files
- **ALWAYS** create a separate `ComponentName.types.ts` file for component-specific types
- **NEVER** use generic names like `types.ts` or `index.ts` - always use explicit names
- Keep files focused on a single responsibility
- Avoid files longer than 200-300 lines (consider splitting if larger)

```typescript
// ✅ CORRECT - Button.types.ts (explicit name)
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
```

```tsx
// ✅ CORRECT - Button.tsx imports from Button.types.ts
import type { ButtonProps } from './Button.types';
import './Button.css';

export function Button({ children, onClick, variant }: ButtonProps) {
  // Implementation
}
```

```typescript
// ❌ WRONG - Generic filename types.ts
import type { ButtonProps } from './types';  // DON'T DO THIS
```

```typescript
// ❌ WRONG - Types defined in component file
export function Button() {
  interface ButtonProps {  // DON'T DO THIS
    children: ReactNode;
  }
  // ...
}
```

**File size guidelines:**
- **Components:** Max ~150 lines (split into subcomponents if larger)
- **Pages:** Max ~200 lines (extract sections into components)
- **Utilities:** Max ~100 lines per file (group by functionality)
- **Types:** No limit, but organize logically (one file per domain/feature)

**When to split files:**
- Component has multiple interfaces/types → Extract to `ComponentName.types.ts`
- Component is too long → Extract subcomponents to separate files
- Utility file has multiple unrelated functions → Split by domain
- Test file is too long → Split into multiple test suites

### 9. File Naming Conventions

- **Components:** PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Utilities:** camelCase (`formatters.ts`, `apiHelpers.ts`)
- **Hooks:** `use` prefix (`useAuth.ts`, `useWindowSize.ts`)
- **Types:** `ComponentName.types.ts` (component-specific) or `[domain].types.ts` (shared types)
- **CSS:** Match component name (`Button.css`)

### 10. Folder Organization

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   └── layout/          # Layout components (Header, Footer)
├── pages/               # Page components (one per route)
├── hooks/               # Custom React hooks
├── services/            # API calls and services
├── utils/               # Utility functions
├── types/               # Shared TypeScript types
├── assets/              # Images, icons, fonts
└── router.tsx           # Route configuration
```

### 11. Code Quality

- Run `pnpm run lint:fix` before committing
- Husky pre-commit hooks will auto-format code
- Commitlint ensures conventional commits format
- All code must pass: `pnpm run typecheck`, `pnpm run lint`, `pnpm build`

### 12. Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Allowed types:**
- `feat:` - New feature (triggers minor version bump)
- `fix:` - Bug fix (triggers patch version bump)
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, white-space)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvements
- `test:` - Adding or correcting tests
- `build:` - Changes to build system or dependencies
- `ci:` - Changes to CI configuration
- `chore:` - Other changes that don't modify src or test files
- `revert:` - Reverts a previous commit

**Breaking changes:**
- Add `!` after type/scope or `BREAKING CHANGE:` in footer (triggers major version bump)

**Examples:**
```bash
feat: add user authentication
fix: resolve navigation bug on mobile
docs: update README with setup instructions
feat!: change API response structure (breaking change)
```

**Commitlint validation:**
- Runs automatically on commit via husky `commit-msg` hook
- Rejects commits that don't follow the format
- Ensures consistent commit history for semantic-release

### 13. Testing with Vitest

All code should be tested using **Vitest** and **React Testing Library**:

**Test files:**
- Component tests: `ComponentName.test.tsx` (same folder as component)
- Hook tests: `hookName.test.ts` (same folder as hook)
- Place test files alongside the code they test

**Running tests:**
```bash
pnpm test              # Run tests in watch mode
pnpm test --run        # Run tests once
pnpm test:ui           # Open Vitest UI
pnpm test:coverage     # Generate coverage report
```

**Example component test:**
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

**Example hook test:**
```tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

**Testing best practices:**
- Write tests for all components, hooks, and utilities
- Use `screen.getByRole()` for better accessibility testing
- Test user interactions with `@testing-library/user-event`
- Mock external dependencies when needed
- Aim for high coverage but focus on meaningful tests

### 14. Animations with Framer Motion

Use **Framer Motion** for smooth, performant animations:

**Basic animation:**
```tsx
import { motion } from 'framer-motion';

export function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

**Using variants:**
```tsx
import { motion, type Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export function Card() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      Content
    </motion.div>
  );
}
```

**Staggered children:**
```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

**Animation best practices:**
- Always type variants with `Variants` type from framer-motion
- Use `initial`, `animate`, and `exit` props for declarative animations
- Leverage `variants` for coordinated animations
- Use `staggerChildren` for sequential animations
- Keep animations subtle and purposeful
- Test performance on lower-end devices

## Common Patterns

### Creating a New Page

1. Create folder and files:

```bash
mkdir -p src/pages/NewPage
touch src/pages/NewPage/{NewPage.tsx,NewPage.css,index.ts}
```

2. Component with CSS:

```tsx
// NewPage.tsx
import './NewPage.css';

export function NewPage() {
  return (
    <div className="new-page">
      <h1 className="new-page-title">New Page</h1>
    </div>
  );
}
```

3. CSS with @apply:

```css
/* NewPage.css */
@reference "../../index.css";

.new-page {
  @apply py-12;
}

.new-page-title {
  @apply text-4xl font-bold;
}
```

4. Export (with default for lazy loading):

```typescript
// index.ts
export { NewPage } from './NewPage';
export { NewPage as default } from './NewPage';
```

5. Add to router:

```typescript
// router.tsx
const NewPage = lazy(() => import('@/pages/NewPage'));

// Add route
{
  path: 'new-page',
  element: <NewPage />,
}
```

### Creating a New Component

```tsx
// src/components/common/Card/Card.tsx
import type { CardProps } from './Card.types';
import './Card.css';

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
}
```

```css
/* Card.css */
@reference "../../../index.css";

.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.card-title {
  @apply text-xl font-bold mb-4;
}
```

```typescript
// Card.types.ts
import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  children: ReactNode;
}
```

```typescript
// index.ts
export { Card } from './Card';
export type { CardProps } from './Card.types';
```

### Creating a Custom Hook

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Performance Best Practices

1. **Lazy load all routes** - Use `React.lazy()` for code splitting
2. **Use Suspense** - Always wrap lazy components in Suspense
3. **Memoize expensive computations** - Use `useMemo` when needed
4. **Memoize callbacks** - Use `useCallback` for event handlers passed as props
5. **Split CSS** - Keep CSS files separate for better caching
6. **Optimize animations** - Use Framer Motion's performance features

## Environment

- **Dev server:** `https://photoproject.local:5173` (requires `/etc/hosts` entry)
- **HTTPS:** Enabled with mkcert (self-signed certificates)
- **Port:** Fixed at 5173 (`strictPort: true`)
- **Package manager:** pnpm only

## Quick Commands

```bash
pnpm dev              # Start dev server with HTTPS
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm typecheck        # TypeScript check
pnpm lint             # Check linting
pnpm lint:fix         # Fix linting and format
pnpm format           # Format with Prettier
pnpm test             # Run tests in watch mode
pnpm test:ui          # Open Vitest UI
pnpm test:coverage    # Generate coverage report
pnpm release          # Run semantic-release to create new version and changelog
```

## Documentation

- **Full docs:** See `docs/` folder
- **Aliases:** `docs/ALIASES.md`
- **Router:** `docs/ROUTER.md`
- **Structure:** `docs/STRUCTURE.md`
- **Tailwind:** `docs/TAILWIND.md`
- **Code Quality:** `docs/CODE_QUALITY.md`

## Key Takeaways for Copilot

1. **Always use path aliases** (`@/`) - never relative imports
2. **CSS with @apply** - separate files, not inline Tailwind classes
3. **Lazy load routes** - with default exports and Suspense
4. **Use Link** - not `<a>` tags for navigation
5. **Follow folder structure** - components, pages, hooks pattern
6. **TypeScript strict mode** - always type everything
7. **Import order matters** - ESLint will enforce it
8. **Conventional commits required** - commitlint validates all commits

When generating code, prioritize clean architecture, type safety, and performance optimization.
