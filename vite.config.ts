import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  server: {
    host: 'photoproject.local',
    port: 5173,
    strictPort: true,
    https: true,
  },
});
