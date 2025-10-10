# PhotoProject

Vite + React + TypeScript Project

## 🚀 Technologies

- **React** 19.2.0
- **TypeScript** 5.9+ (with strict mode)
- **Vite** 7.1.9
- **React Router** 7+ (with lazy loading)
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
├── docs/            # Documentation folder
│   ├── ALIASES.md   # Path aliases guide
│   ├── CODE_QUALITY.md # Code quality tools
│   ├── ROUTER.md    # React Router documentation
│   ├── STRUCTURE.md # Project structure guide
│   └── TAILWIND.md  # Tailwind CSS guide
└── README.md        # This file
```

**See [docs/STRUCTURE.md](./docs/STRUCTURE.md) for detailed conventions and best practices.**

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

**See [docs/ALIASES.md](./docs/ALIASES.md) for complete documentation.**

## 🧭 Routing

This project uses React Router with lazy-loaded routes for optimal performance:

- **Lazy Loading**: Routes are loaded only when needed
- **Suspense**: Loading fallback while routes are being loaded
- **Code Splitting**: Automatic chunk splitting per route

**Routes**:

- `/` - Home page
- `/about` - About page
- `*` - 404 Not Found

**See [docs/ROUTER.md](./docs/ROUTER.md) for complete documentation.**

## �📝 Notes

**Local HTTPS**: The project uses `vite-plugin-mkcert` to generate trusted local SSL certificates. On first launch, you will need to enter your sudo password to install the certificate in your system keychain.

**Custom Host**: The project is accessible via `https://photoproject.local:5173` instead of `localhost`. The entry has been added to `/etc/hosts`.

**Fixed Port**: The server will always use port 5173 and will never change (`strictPort: true`).

## 📚 Documentation

Complete documentation is available in the `docs/` folder:

- **[docs/STRUCTURE.md](./docs/STRUCTURE.md)** - Project structure and folder conventions
- **[docs/ALIASES.md](./docs/ALIASES.md)** - Path aliases configuration and usage
- **[docs/ROUTER.md](./docs/ROUTER.md)** - React Router setup and lazy loading
- **[docs/TAILWIND.md](./docs/TAILWIND.md)** - Tailwind CSS with @apply pattern
- **[docs/CODE_QUALITY.md](./docs/CODE_QUALITY.md)** - ESLint, Prettier, Husky setup

### GitHub Copilot Instructions

For the best Copilot experience, this project includes a comprehensive instruction file at `.github/copilot-instructions.md`. This ensures that Copilot generates code following the project's conventions and best practices.

**Note on Vite version**: The project uses Vite 7.1.9. Note that Vite 7+ requires Node.js 22.12+.
