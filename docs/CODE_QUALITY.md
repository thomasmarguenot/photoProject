# Code Quality Tools

This project uses TypeScript (strict), ESLint, Prettier, Husky and Commitlint to maintain code quality and consistency.

## 🛠️ Tools

### TypeScript

- **Version**: 5.9
- **Configuration**: `tsconfig.json`
- **Settings**: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

### ESLint

- **Version**: 9.37.0
- **Configuration**: `eslint.config.js` (ESLint 9 flat config)
- **Extends**: Recommended configs for JavaScript, TypeScript, React, and React Hooks
- **Plugins**:
  - `@typescript-eslint` - TypeScript linting
  - `react` - React linting
  - `react-hooks` - React Hooks linting
  - `react-refresh` - Vite React Refresh linting
  - `import` - Import resolution and ordering
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
  - LF line endings

### Husky

- **Version**: 9.1.7
- **Git hooks**: `pre-commit` and `commit-msg`
- **Location**: `.husky/`

### Commitlint

- **Configuration**: `commitlint.config.js` (extends `@commitlint/config-conventional`)
- **Role**: Rejects commit messages that don't follow [Conventional Commits](https://www.conventionalcommits.org/)

## 📝 Available Scripts

### Linting

```bash
# Check for linting errors (fails on any warning)
pnpm lint

# Fix linting errors automatically
pnpm lint:fix
```

### Formatting

```bash
# Format all files in src/
pnpm format

# Check formatting without modifying files
pnpm format:check
```

### Type Checking

```bash
# Check TypeScript types
pnpm typecheck
```

### Before each commit

```bash
pnpm typecheck && pnpm lint
```

## 🔧 Configuration Files

- **`eslint.config.js`** - ESLint configuration (flat config format)
- **`prettier.config.cjs`** - Prettier configuration
- **`.prettierignore`** - Files to ignore for Prettier
- **`tsconfig.json`** - TypeScript configuration with `strict: true`
- **`commitlint.config.js`** - Commitlint configuration
- **`.husky/pre-commit`** - Pre-commit hook
- **`.husky/commit-msg`** - Commit message hook

## 🪝 Git Hooks

### Pre-commit Hook

Runs `pnpm run lint:fix` on the whole project before each commit:

1. Auto-fixable ESLint errors are fixed, including Prettier formatting of `.ts` / `.tsx` files (through `prettier/prettier`)
2. The commit is blocked if unfixable errors remain

What it does **not** do:

- It does not type-check: run `pnpm typecheck` yourself
- It does not format CSS files: run `pnpm format`
- Files fixed by the hook are not re-staged automatically: check `git status` after committing

### Commit-msg Hook

Runs `commitlint --edit` on the commit message and rejects it if it doesn't match `<type>[optional scope]: <description>`.

## 🚀 Usage

### Automatic (on commit)

```bash
git add .
git commit -m "fix(header): keep indicator aligned on resize"
# Husky runs lint:fix, then commitlint on the message
```

### Manual

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm typecheck
```

## ⚙️ ESLint Rules

Key rules enabled:

- TypeScript recommended rules
- React and React Hooks recommended rules
- No unused variables (with `_` prefix exception for arguments)
- Prettier formatting as error
- React Refresh for Vite (`only-export-components` as warning)
- `import/no-unresolved` with the TypeScript resolver (understands the `@/` alias)
- `import/order`: builtin → external → `@/` aliases → relative, separated by blank lines and sorted alphabetically

Scripts in `scripts/` are linted with Node globals and `no-console` disabled.

## 💡 Tips

### Disable ESLint for a line

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = {};
```

`pnpm lint` uses `--report-unused-disable-directives`: remove the directive once it is no longer needed.

### Disable Prettier for a block

```typescript
// prettier-ignore
const matrix = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
```

### Skip hooks (not recommended)

```bash
git commit --no-verify -m "chore: skip hooks"
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
    "source.fixAll.eslint": "explicit"
  }
}
```
