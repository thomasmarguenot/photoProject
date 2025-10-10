# Code Quality Tools

This project uses ESLint, Prettier, Husky, and lint-staged to maintain code quality and consistency.

## 🛠️ Tools

### ESLint

- **Version**: 9.37.0
- **Configuration**: `eslint.config.js` (ESLint 9 flat config)
- **Extends**: Recommended configs for JavaScript, TypeScript, React, and React Hooks
- **Plugins**:
  - `@typescript-eslint` - TypeScript linting
  - `react` - React linting
  - `react-hooks` - React Hooks linting
  - `react-refresh` - Vite React Refresh linting
  - `prettier` - Prettier integration

### Prettier

- **Version**: 3.6.2
- **Configuration**: `prettier.config.cjs`
- **Settings**:
  - Single quotes
  - Semicolons
  - 2 spaces indentation
  - 80 characters line width
  - Trailing commas (ES5)

### Husky

- **Version**: 9.1.7
- **Git hooks**: Pre-commit hook configured
- **Location**: `.husky/pre-commit`

### lint-staged

- **Version**: 16.2.3
- **Configuration**: In `package.json`
- **Actions**:
  - TypeScript/TSX files: ESLint fix + Prettier format
  - CSS/JSON/MD files: Prettier format

## 📝 Available Scripts

### Linting

```bash
# Check for linting errors
pnpm lint

# Fix linting errors automatically
pnpm lint:fix
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting without modifying files
pnpm format:check
```

### Type Checking

```bash
# Check TypeScript types
pnpm typecheck
```

## 🔧 Configuration Files

- **`eslint.config.js`** - ESLint configuration (flat config format)
- **`prettier.config.cjs`** - Prettier configuration
- **`.prettierignore`** - Files to ignore for Prettier
- **`tsconfig.json`** - TypeScript configuration with `strict: true`

## 🪝 Git Hooks

### Pre-commit Hook

The pre-commit hook automatically runs lint-staged on staged files before each commit. This ensures that:

1. All TypeScript/TSX files are linted and formatted
2. All CSS, JSON, and Markdown files are formatted
3. No linting errors are committed to the repository

**Location**: `.husky/pre-commit`

**What it does**:

- Runs ESLint with auto-fix on staged `.ts` and `.tsx` files
- Runs Prettier on staged files
- Prevents commit if there are linting errors

## 🚀 Usage

### Automatic (on commit)

When you commit your changes, Husky will automatically:

1. Run lint-staged on your staged files
2. Fix any auto-fixable issues
3. Prevent the commit if there are unfixable errors

```bash
git add .
git commit -m "Your commit message"
# Husky will run lint-staged automatically
```

### Manual

You can manually run linting and formatting:

```bash
# Lint all files
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format all files
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm typecheck
```

## 📋 Lint-staged Configuration

From `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,json,md}": ["prettier --write"]
  }
}
```

## ⚙️ ESLint Rules

Key rules enabled:

- TypeScript strict type checking
- React best practices
- React Hooks rules
- No unused variables (with `_` prefix exception)
- Prettier formatting as error
- React Refresh for Vite

## 💡 Tips

### Disable ESLint for a line

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = {};
```

### Disable Prettier for a block

```typescript
// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
```

### Skip pre-commit hook (not recommended)

```bash
git commit --no-verify -m "Skip hooks"
```

## 🔍 IDE Integration

### VS Code

Install the following extensions:

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)

Add to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## ✅ Verification

To verify everything is working:

1. Create a test file with formatting issues
2. Stage it: `git add test.ts`
3. Try to commit: `git commit -m "test"`
4. Husky should run lint-staged and fix issues automatically
