# Path Aliases Configuration

This document explains the path aliases system configured in this project.

## 🎯 Why Path Aliases?

Path aliases eliminate the need for relative imports (like `../../components/Button`) and make imports cleaner and more maintainable.

## ✅ Benefits

- **Cleaner imports**: `@/components/Button` instead of `../../components/Button`
- **Easier refactoring**: Moving files doesn't break imports
- **Better IDE support**: Autocomplete works better with absolute paths
- **Consistent code**: All team members use the same import style

## 🔧 Configuration

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/features/*": ["src/features/*"],
      "@/pages/*": ["src/pages/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"],
      "@/assets/*": ["src/assets/*"],
      "@/styles/*": ["src/styles/*"]
    }
  }
}
```

### Vite (`vite.config.ts`)

```typescript
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/features': resolve(__dirname, './src/features'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/services': resolve(__dirname, './src/services'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/types': resolve(__dirname, './src/types'),
      '@/assets': resolve(__dirname, './src/assets'),
      '@/styles': resolve(__dirname, './src/styles'),
    },
  },
});
```

### ESLint (`eslint.config.js`)

```javascript
export default [
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
```

## 📦 Required Packages

```bash
pnpm add -D @types/node eslint-import-resolver-typescript eslint-plugin-import
```

## 📖 Usage Examples

### Components

```typescript
// ✅ Good
import { Button } from '@/components/common/Button';
import { Header } from '@/components/layout/Header';

// ❌ Bad
import { Button } from '../../components/common/Button';
import { Header } from '../layout/Header';
```

### Hooks

```typescript
// ✅ Good
import { useAuth } from '@/hooks/useAuth';
import { useWindowSize } from '@/hooks/useWindowSize';

// ❌ Bad
import { useAuth } from '../hooks/useAuth';
import { useWindowSize } from '../../hooks/useWindowSize';
```

### Utils & Types

```typescript
// ✅ Good
import { formatDate } from '@/utils/formatters';
import type { User } from '@/types/user';

// ❌ Bad
import { formatDate } from '../../utils/formatters';
import type { User } from '../types/user';
```

### Assets & Styles

```typescript
// ✅ Good
import logo from '@/assets/images/logo.png';
import '@/styles/global.css';

// ❌ Bad
import logo from '../../assets/images/logo.png';
import '../styles/global.css';
```

### Pages & Features

```typescript
// ✅ Good
import { Home } from '@/pages/Home';
import { LoginForm } from '@/features/auth/components/LoginForm';

// ❌ Bad
import { Home } from '../pages/Home';
import { LoginForm } from '../../features/auth/components/LoginForm';
```

## 🔍 Import Order

ESLint is configured to enforce a consistent import order:

```typescript
// 1. Built-in Node.js modules
import { readFile } from 'fs';

// 2. External dependencies
import React from 'react';
import { useState } from 'react';

// 3. Internal aliases (@/)
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatters';

// 4. Parent/sibling imports
import { localHelper } from '../utils/helper';
import { ComponentProps } from './types';

// 5. Index imports
import './styles.css';
```

## 🚨 Important Notes

### Local Imports Within Same Folder

Imports within the same folder can still be relative:

```typescript
// In: src/components/Button/Button.tsx
import type { ButtonProps } from './types'; // ✅ OK
import { buttonVariants } from './constants'; // ✅ OK
```

### CSS Imports

CSS imports should use the same alias pattern:

```typescript
// ✅ Good - Alias for CSS imports in TS/JS files
import '@/styles/global.css';
import '@/components/Button/Button.css';

// ❌ Bad (but works for same folder)
import './Button.css'; // OK if in same folder
```

**⚠️ Important CSS Limitation:**

Tailwind CSS v4's `@reference` directive does **NOT support path aliases**. You must use **relative paths** in CSS files:

```css
/* ✅ Good - Relative path in @reference */
@reference "../../index.css";

.button {
  @apply px-4 py-2 rounded;
}
```

```css
/* ❌ Bad - Aliases don't work in @reference */
@reference "@/index.css"; /* This will NOT work */

.button {
  @apply px-4 py-2 rounded;
}
```

**Why?** This is a current limitation of Tailwind CSS v4. The `@reference` directive is processed by Tailwind's compiler before Vite's alias resolution happens.

### Auto-fix

ESLint can automatically fix import order:

```bash
pnpm run lint:fix
```

## 🔄 Migration from Relative Imports

If you have existing code with relative imports, you can:

1. Run `pnpm run lint:fix` to auto-fix import order
2. Manually replace relative imports with aliases
3. Use VS Code's "Find and Replace" with regex patterns

Example regex for VS Code:

- Find: `from ['"](\.\./)+components/`
- Replace: `from '@/components/`

## 🧪 Verification

Test that aliases work:

```bash
# TypeScript check
pnpm run typecheck

# ESLint check
pnpm run lint

# Build check
pnpm build
```

All checks should pass without errors.
