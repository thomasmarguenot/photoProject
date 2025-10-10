# Project Structure

This document describes the folder structure and conventions used in this project.

## � Path Aliases

This project uses TypeScript path aliases to avoid relative imports. Always use absolute imports with the `@` prefix:

| Alias            | Path               | Usage           |
| ---------------- | ------------------ | --------------- |
| `@/*`            | `src/*`            | Any file in src |
| `@/components/*` | `src/components/*` | Components      |
| `@/features/*`   | `src/features/*`   | Features        |
| `@/pages/*`      | `src/pages/*`      | Pages           |
| `@/hooks/*`      | `src/hooks/*`      | Hooks           |
| `@/services/*`   | `src/services/*`   | Services        |
| `@/utils/*`      | `src/utils/*`      | Utils           |
| `@/types/*`      | `src/types/*`      | Types           |
| `@/assets/*`     | `src/assets/*`     | Assets          |
| `@/styles/*`     | `src/styles/*`     | Styles          |

**Examples:**

```typescript
// ✅ Good - Use aliases
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatters';
import type { User } from '@/types/user';

// ❌ Bad - Don't use relative imports
import { Button } from '../../components/common/Button';
import { useAuth } from '../hooks/useAuth';
```

**Note:** Imports within the same folder can still be relative (e.g., `./types`, `./constants`).

## �📁 Folder Structure

```
src/
├── assets/              # Static assets (images, icons, fonts)
│   ├── images/          # Image files
│   ├── icons/           # Icon files
│   └── fonts/           # Font files
├── components/          # Reusable UI components
│   ├── common/          # Generic reusable components (Button, Input, etc.)
│   └── layout/          # Layout components (Header, Footer, Sidebar, etc.)
├── features/            # Feature-based modules
│   └── [feature-name]/  # Each feature has its own folder
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── services/    # Feature-specific services
│       └── types/       # Feature-specific types
├── hooks/               # Shared custom React hooks
├── pages/               # Page components (one per route)
├── services/            # API calls and external services
│   ├── api/             # API client and endpoints
│   └── utils/           # Service utilities
├── styles/              # Global styles and CSS utilities
│   ├── globals.css      # Global CSS
│   └── utilities.css    # Utility classes
├── types/               # Shared TypeScript types and interfaces
├── utils/               # Utility functions and helpers
├── App.tsx              # Main App component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type definitions
```

## 📝 Folder Conventions

### `/assets`

Static files that are imported into your components.

- **images/**: `.png`, `.jpg`, `.svg` images
- **icons/**: Icon assets
- **fonts/**: Custom font files

**Example:**

```typescript
import logo from '@/assets/images/logo.png';
import { ReactComponent as Icon } from '@/assets/icons/star.svg';
```

### `/components`

Reusable UI components organized by type.

#### `/components/common`

Generic, highly reusable components that can be used anywhere.

- Should be framework-agnostic (no business logic)
- Should accept props for customization
- Examples: Button, Input, Card, Modal, Dropdown

**Example:**

```
components/common/
├── Button/
│   ├── Button.tsx
│   ├── Button.css
│   └── index.ts
└── Input/
    ├── Input.tsx
    ├── Input.css
    └── index.ts
```

#### `/components/layout`

Components that define the application layout structure.

- Header, Footer, Sidebar, Navigation
- Page wrappers and containers

**Example:**

```
components/layout/
├── Header/
│   ├── Header.tsx
│   ├── Header.css
│   └── index.ts
└── Footer/
    ├── Footer.tsx
    ├── Footer.css
    └── index.ts
```

### `/features`

Feature-based organization for complex functionalities.
Each feature is self-contained with its own components, hooks, services, and types.

**Example:**

```
features/
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   └── authService.ts
│   └── types/
│       └── auth.types.ts
└── products/
    ├── components/
    │   ├── ProductCard.tsx
    │   └── ProductList.tsx
    ├── hooks/
    │   └── useProducts.ts
    └── types/
        └── product.types.ts
```

### `/hooks`

Shared custom React hooks that can be used across the application.

**Naming convention:** `use[HookName].ts`

**Examples:**

- `useLocalStorage.ts` - Hook for localStorage interaction
- `useFetch.ts` - Hook for data fetching
- `useDebounce.ts` - Hook for debouncing values
- `useWindowSize.ts` - Hook for window dimensions

**Example:**

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation
}
```

### `/pages`

Page-level components, typically one per route.

- Should be kept simple and compose other components
- Handle routing-specific logic
- Name should reflect the route

**Example:**

```
pages/
├── Home/
│   ├── Home.tsx
│   ├── Home.css
│   └── index.ts
├── About/
│   ├── About.tsx
│   └── index.ts
└── NotFound/
    ├── NotFound.tsx
    └── index.ts
```

### `/services`

Business logic, API calls, and external service integrations.

**Example:**

```
services/
├── api/
│   ├── client.ts         # API client setup (axios, fetch)
│   ├── endpoints.ts      # API endpoint constants
│   └── users.ts          # User-related API calls
└── utils/
    └── apiHelpers.ts     # API utility functions
```

**Service example:**

```typescript
// services/api/users.ts
export const userService = {
  getUsers: () => apiClient.get('/users'),
  getUserById: (id: string) => apiClient.get(`/users/${id}`),
  createUser: (data: UserData) => apiClient.post('/users', data),
};
```

### `/styles`

Global styles and CSS utilities.

**Files:**

- `globals.css` - Global styles (resets, base styles)
- `utilities.css` - Utility classes (if not using Tailwind exclusively)

### `/types`

Shared TypeScript type definitions and interfaces.

**Naming convention:** `[name].types.ts`

**Example:**

```typescript
// types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

### `/utils`

Utility functions and helper modules.

**Examples:**

- `formatters.ts` - Data formatting functions
- `validators.ts` - Validation functions
- `constants.ts` - Application constants
- `helpers.ts` - General helper functions

**Example:**

```typescript
// utils/formatters.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
```

## 🎯 Component Organization

Each component folder should follow this structure:

```
ComponentName/
├── ComponentName.tsx      # Component implementation
├── ComponentName.css      # Component styles (with @reference)
├── ComponentName.test.tsx # Component tests (optional)
├── index.ts              # Barrel export
└── types.ts              # Component-specific types (optional)
```

**index.ts example:**

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './types';
```

## 📦 Import Conventions

### Absolute Imports (recommended)

Use path aliases for cleaner imports:

```typescript
// Instead of:
import { Button } from '../../../components/common/Button';

// Use:
import { Button } from '@/components/common/Button';
```

Configure in `tsconfig.json`:

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

### Import Order

1. External dependencies
2. Internal absolute imports
3. Relative imports
4. Styles

```typescript
// External
import { useState, useEffect } from 'react';
import axios from 'axios';

// Internal
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user.types';

// Relative
import { formatDate } from './utils';

// Styles
import './Component.css';
```

## 🧩 Naming Conventions

### Files and Folders

- **Components**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (`formatters.ts`, `apiHelpers.ts`)
- **Types**: `[name].types.ts` (`user.types.ts`)
- **Hooks**: `use[Name].ts` (`useAuth.ts`)
- **Styles**: Match component name (`Button.css`)

### Code

- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Private functions**: Prefix with `_` (optional)

## 🎨 CSS Conventions

With Tailwind CSS and `@apply`:

```css
/* Component.css */
@reference "../index.css";

.component-wrapper {
  @apply flex items-center justify-between p-4;
}

.component-title {
  @apply text-2xl font-bold text-gray-800;
}
```

## 📋 Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Colocate related files** - Keep tests, styles, and types near components
3. **Use barrel exports** - Simplify imports with `index.ts` files
4. **Avoid deep nesting** - Max 3-4 levels deep
5. **Feature-based organization** - Group by feature when it makes sense
6. **Consistent naming** - Follow conventions throughout the project
7. **Document complex logic** - Add comments for non-obvious code
8. **Type everything** - Use TypeScript types for better developer experience

## 🔄 Moving Between Structures

### When to move a component to `/features`

- Component is used only within a specific feature
- Component has complex business logic
- Component needs feature-specific types/hooks

### When to keep in `/components/common`

- Component is reusable across features
- Component is purely presentational
- Component is framework-agnostic

## 📚 Example Usage

### Creating a new feature

```bash
mkdir -p src/features/products/{components,hooks,services,types}
touch src/features/products/index.ts
```

### Creating a new component

```bash
mkdir -p src/components/common/Button
touch src/components/common/Button/{Button.tsx,Button.css,index.ts}
```

### Creating a new page

```bash
mkdir -p src/pages/Products
touch src/pages/Products/{Products.tsx,Products.css,index.ts}
```

---

This structure provides a solid foundation for scalable React applications while maintaining clarity and maintainability.
