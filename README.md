# PhotoProject

Projet Vite + React + TypeScript

## 🚀 Technologies

- **React** 18.3.1
- **TypeScript** 5.5+
- **Vite** 6.3.6 (compatible avec Node.js 22.11)
- **pnpm** comme gestionnaire de paquets

## 📦 Installation

```bash
pnpm install
```

## 🛠️ Scripts disponibles

- `pnpm dev` - Démarre le serveur de développement
- `pnpm build` - Compile le projet pour la production
- `pnpm preview` - Prévisualise le build de production
- `pnpm typecheck` - Vérifie les types TypeScript sans émission de fichiers

## 🏃 Démarrage rapide

1. Installer les dépendances :
   ```bash
   pnpm install
   ```

2. Lancer le serveur de développement :
   ```bash
   pnpm dev
   ```

3. Ouvrir http://localhost:5173 dans votre navigateur

## 📁 Structure du projet

```
photoProject/
├── public/          # Assets statiques
├── src/
│   ├── assets/      # Images, SVG, etc.
│   ├── App.tsx      # Composant principal
│   ├── App.css      # Styles du composant App
│   ├── main.tsx     # Point d'entrée de l'application
│   ├── index.css    # Styles globaux
│   └── vite-env.d.ts # Types Vite
├── index.html       # Template HTML
├── package.json     # Dépendances et scripts
├── tsconfig.json    # Configuration TypeScript
├── tsconfig.node.json # Configuration TypeScript pour Vite
└── vite.config.ts   # Configuration Vite
```

## 📝 Notes

**Note sur la version de Vite** : Le projet utilise Vite 6.3.6 au lieu de 7.1.9 pour des raisons de compatibilité avec Node.js 22.11.0. Vite 7+ nécessite Node.js 22.12+.

