# Tailwind CSS Configuration

Ce projet utilise **Tailwind CSS v4.1.14** avec le plugin Vite pour une intégration optimale.

## 📦 Installation

Tailwind CSS v4 est déjà installé et configuré dans ce projet. Les packages suivants ont été ajoutés :

```bash
pnpm add -D tailwindcss@4.1.14 @tailwindcss/vite
```

## ⚙️ Configuration

### 1. Plugin Vite

Le plugin `@tailwindcss/vite` a été ajouté dans `vite.config.ts` :

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  // ...
});
```

### 2. Import CSS

Dans `src/index.css`, l'import Tailwind v4 utilise la nouvelle syntaxe :

```css
@import "tailwindcss";
```

**Note** : Tailwind v4 utilise `@import` au lieu des anciennes directives `@tailwind base`, `@tailwind components`, `@tailwind utilities`.

### 3. Intégration dans main.tsx

Le fichier CSS est importé dans `src/main.tsx` :

```typescript
import "./index.css";
```

## 🎨 Utilisation

Vous pouvez maintenant utiliser toutes les classes utilitaires Tailwind dans vos composants React :

```tsx
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello Tailwind!
      </h1>
      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
        Click me
      </button>
    </div>
  );
}
```

## 📝 Différences avec Tailwind v3

### Nouvelles fonctionnalités de Tailwind v4 :

1. **Import simplifié** : Utilise `@import "tailwindcss"` au lieu des directives `@tailwind`
2. **Configuration CSS** : La configuration peut maintenant être faite directement dans le CSS avec `@theme`
3. **Performance améliorée** : Plus rapide et plus léger
4. **Pas de fichier tailwind.config.js requis** : La configuration de base fonctionne out-of-the-box

### Configuration personnalisée (optionnelle)

Si vous souhaitez personnaliser le thème, ajoutez des règles `@theme` dans votre CSS :

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-display: "Inter", sans-serif;
}
```

## 🔗 Ressources

- [Documentation Tailwind CSS v4](https://tailwindcss.com/docs)
- [Guide d'installation Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Migration vers v4](https://tailwindcss.com/docs/upgrade-guide)

## ✅ Vérification

Pour vérifier que Tailwind fonctionne correctement :

1. Lancez le serveur de développement : `pnpm dev`
2. Ouvrez https://photoproject.local:5173
3. Les classes Tailwind dans `App.tsx` devraient être appliquées correctement
