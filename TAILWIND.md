# Tailwind CSS Configuration

This project uses **Tailwind CSS v4.1.14** with the Vite plugin for optimal integration.

## 📦 Installation

Tailwind CSS v4 is already installed and configured in this project. The following packages have been added:

```bash
pnpm add -D tailwindcss@4.1.14 @tailwindcss/vite
```

## ⚙️ Configuration

### 1. Vite Plugin

The `@tailwindcss/vite` plugin has been added in `vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  // ...
});
```

### 2. CSS Import

In `src/index.css`, the Tailwind v4 import uses the new syntax:

```css
@import "tailwindcss";
```

**Note**: Tailwind v4 uses `@import` instead of the old `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives.

### 3. Integration in main.tsx

The CSS file is imported in `src/main.tsx`:

```typescript
import "./index.css";
```

## 🎨 Usage

### Recommended Approach: CSS Classes with @apply

This project uses the `@apply` directive to extract Tailwind classes into separate CSS files. This keeps JSX clean and styles organized.

**In your React component:**
```tsx
function Button() {
  return (
    <button className="primary-button">
      Click me
    </button>
  );
}
```

**In your CSS file (e.g. App.css):**
```css
@reference "./index.css";

.primary-button {
  @apply px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors;
}
```

**Important Note**: You must add `@reference "./index.css"` at the top of each CSS file that uses `@apply` to reference Tailwind utilities.

### Complete Example

**Component (src/components/Card.tsx):**
```tsx
export function Card({ title, children }) {
  return (
    <div className="card-container">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
```

**Styles (src/components/Card.css):**
```css
@reference "../index.css";

.card-container {
  @apply bg-white rounded-lg shadow-md p-6;
}

.card-title {
  @apply text-2xl font-bold text-gray-800 mb-4;
}

.card-content {
  @apply text-gray-600;
}
```

## 📝 Differences with Tailwind v3

### New Features in Tailwind v4:

1. **Simplified import**: Uses `@import "tailwindcss"` instead of `@tailwind` directives
2. **CSS Configuration**: Configuration can now be done directly in CSS with `@theme`
3. **Improved performance**: Faster and lighter
4. **No tailwind.config.js required**: Base configuration works out-of-the-box

### Custom Configuration (optional)

If you want to customize the theme, add `@theme` rules in your CSS:

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-display: "Inter", sans-serif;
}
```

## 🔗 Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Vite Installation Guide](https://tailwindcss.com/docs/installation/using-vite)
- [Migration to v4](https://tailwindcss.com/docs/upgrade-guide)

## ✅ Verification

To verify that Tailwind is working correctly:

1. Start the development server: `pnpm dev`
2. Open https://photoproject.local:5173
3. Tailwind classes in `App.tsx` should be applied correctly
