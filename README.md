# PhotoProject

Vite + React + TypeScript Project

## 🚀 Technologies

- **React** 19.2.0
- **TypeScript** 5.9+ (with strict mode)
- **Vite** 7.1.9
- **Tailwind CSS** 4.1.14
- **ESLint** 9.37.0 + **Prettier** 3.6.2
- **Husky** + **lint-staged** for pre-commit hooks
- **pnpm** as package manager
- **Local HTTPS** with self-signed certificates (vite-plugin-mkcert)

## 📦 Installation

```bash
pnpm install
```

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build
- `pnpm typecheck` - Check TypeScript types without emitting files
- `pnpm lint` - Check for linting errors
- `pnpm lint:fix` - Fix linting errors automatically
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting without modifying files

## 🏃 Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

   **Note**: On first launch, the mkcert plugin will ask for your sudo password to install the SSL certificate in your system keychain.

3. Open **https://photoproject.local:5173** in your browser

## 📁 Project Structure

```
photoProject/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, SVG, fonts, etc.
│   ├── components/  # Reusable UI components
│   │   ├── common/  # Generic components (Button, Input, etc.)
│   │   └── layout/  # Layout components (Header, Footer, Layout)
│   ├── features/    # Feature-based modules
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Page components (one per route)
│   ├── services/    # API calls and external services
│   ├── styles/      # Global styles
│   ├── types/       # Shared TypeScript types
│   ├── utils/       # Utility functions
│   ├── App.tsx      # Main App component
│   ├── main.tsx     # Application entry point
│   └── index.css    # Global styles + Tailwind CSS
├── .husky/          # Git hooks
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── eslint.config.js # ESLint configuration
├── prettier.config.cjs # Prettier configuration
├── CODE_QUALITY.md  # Code quality tools documentation
├── STRUCTURE.md     # Detailed project structure guide
├── TAILWIND.md      # Tailwind CSS documentation
└── README.md        # This file
```

**See [STRUCTURE.md](./STRUCTURE.md) for detailed conventions and best practices.**

## � Path Aliases

This project uses TypeScript path aliases to avoid relative imports. Always use absolute imports with the `@` prefix:

```typescript
// ✅ Good - Use aliases
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/formatters';

// ❌ Bad - Don't use relative imports
import { Button } from '../../components/common/Button';
import { useAuth } from '../hooks/useAuth';
```

Available aliases:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/pages/*` → `src/pages/*`
- `@/hooks/*` → `src/hooks/*`
- `@/services/*` → `src/services/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/assets/*` → `src/assets/*`
- `@/styles/*` → `src/styles/*`

## �📝 Notes

**Local HTTPS**: The project uses `vite-plugin-mkcert` to generate trusted local SSL certificates. On first launch, you will need to enter your sudo password to install the certificate in your system keychain.

**Custom Host**: The project is accessible via `https://photoproject.local:5173` instead of `localhost`. The entry has been added to `/etc/hosts`.

**Fixed Port**: The server will always use port 5173 and will never change (`strictPort: true`).

**Note on Vite version**: The project uses Vite 7.1.9. Note that Vite 7+ requires Node.js 22.12+.
