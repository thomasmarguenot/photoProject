# PhotoProject

Projet Vite + React + TypeScript

## 🚀 Technologies

- **React** 19.2.0
- **TypeScript** 5.9+
- **Vite** 7.1.9
- **Tailwind CSS** 4.1.14
- **pnpm** comme gestionnaire de paquets
- **HTTPS local** avec certificats auto-signés (vite-plugin-mkcert)

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
   **Note** : Au premier lancement, le plugin mkcert vous demandera votre mot de passe sudo pour installer le certificat SSL dans votre trousseau système.

3. Ouvrir **https://photoproject.local:5173** dans votre navigateur

## 📁 Structure du projet

```
photoProject/
├── public/          # Assets statiques
├── src/
│   ├── assets/      # Images, SVG, etc.
│   ├── App.tsx      # Composant principal
│   ├── App.css      # Styles du composant App
│   ├── main.tsx     # Point d'entrée de l'application
│   ├── index.css    # Styles globaux + Tailwind CSS
│   └── vite-env.d.ts # Types Vite
├── index.html       # Template HTML
├── package.json     # Dépendances et scripts
├── tsconfig.json    # Configuration TypeScript
├── tsconfig.node.json # Configuration TypeScript pour Vite
├── vite.config.ts   # Configuration Vite
├── TAILWIND.md      # Documentation Tailwind CSS
└── README.md        # Ce fichier
```

## 📝 Notes

**HTTPS Local** : Le projet utilise `vite-plugin-mkcert` pour générer des certificats SSL locaux de confiance. Au premier lancement, vous devrez entrer votre mot de passe sudo pour installer le certificat dans votre trousseau système.

**Host personnalisé** : Le projet est accessible via `https://photoproject.local:5173` au lieu de `localhost`. L'entrée a été ajoutée dans `/etc/hosts`.

**Port fixe** : Le serveur utilisera toujours le port 5173 et ne changera jamais (`strictPort: true`).

**Note sur la version de Vite** : Le projet utilise Vite 6.3.6 au lieu de 7.1.9 pour des raisons de compatibilité avec Node.js 22.11.0. Vite 7+ nécessite Node.js 22.12+.

