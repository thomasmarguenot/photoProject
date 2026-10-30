# Tailwind CSS

The project uses **Tailwind CSS 4.1.14** through the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`: the configuration lives in CSS.

## ⚙️ Configuration

### Vite plugin (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Entry stylesheet (`src/index.css`)

`src/main.tsx` imports `src/index.css`, which contains:

- `@import 'tailwindcss';`
- `@theme { ... }`: tokens exposed as Tailwind utilities (fonts, header dimensions and colors)
- `:root { ... }`: CSS variables for the design system (type scale, colors, glass effects, ...)
- global base styles

Fonts are self-hosted in `src/fonts/local-fonts.css`, loaded by `index.html`.

## 🎨 The rule: `@apply` only

Tailwind utilities never appear in JSX. Components use semantic class names, and the colocated CSS file maps them to utilities with `@apply`:

```tsx
// NotFound.tsx
<Link to="/" className="not-found-link">
  Go back home
</Link>
```

```css
/* NotFound.css */
@reference "../../index.css";

.not-found-link {
  @apply inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors;
}
```

Why:

- the JSX stays readable;
- the styles of a component live in one place;
- class names describe the role of the element, which helps in DevTools and in tests.

## 📌 `@reference`

Every CSS file that uses `@apply` must start with `@reference` pointing to `src/index.css`, so Tailwind knows the utilities and the `@theme` tokens without emitting them twice.

The path must be **relative**: aliases are not resolved in `@reference`. See the depth table in [ALIASES.md](./ALIASES.md).

## 🎯 Tokens

- **Prefer existing tokens** (`var(--color-primary)`, `--text-h2`, ...) over hardcoded values.
- **New token**:
  - put it in `@theme` if it must be usable as a Tailwind utility;
  - otherwise put it in `:root`.
- `/charte` shows the design system (colors, type scale, buttons, glass, spacing, radii) and is the quickest way to check a token visually.

## 🔗 Resources

- [Tailwind CSS v4 documentation](https://tailwindcss.com/docs)
- [Functions and directives (`@apply`, `@reference`, `@theme`)](https://tailwindcss.com/docs/functions-and-directives)
