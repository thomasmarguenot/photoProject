# PhotoProject

Vite + React + TypeScript Project

## 🚀 Technologies

- **React** 19.2.0
- **TypeScript** 5.9+
- **Vite** 7.1.9
- **Tailwind CSS** 4.1.14
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
│   ├── assets/      # Images, SVG, etc.
│   ├── App.tsx      # Main component
│   ├── App.css      # App component styles
│   ├── main.tsx     # Application entry point
│   ├── index.css    # Global styles + Tailwind CSS
│   └── vite-env.d.ts # Vite types
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── tsconfig.node.json # TypeScript configuration for Vite
├── vite.config.ts   # Vite configuration
├── TAILWIND.md      # Tailwind CSS documentation
└── README.md        # This file
```

## 📝 Notes

**Local HTTPS**: The project uses `vite-plugin-mkcert` to generate trusted local SSL certificates. On first launch, you will need to enter your sudo password to install the certificate in your system keychain.

**Custom Host**: The project is accessible via `https://photoproject.local:5173` instead of `localhost`. The entry has been added to `/etc/hosts`.

**Fixed Port**: The server will always use port 5173 and will never change (`strictPort: true`).

**Note on Vite version**: The project uses Vite 7.1.9. Note that Vite 7+ requires Node.js 22.12+.

