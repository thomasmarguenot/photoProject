import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import mkcert from 'vite-plugin-mkcert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    tailwindcss(),
    ViteImageOptimizer({
      // Optimize PNG
      png: {
        quality: 85,
      },
      // Optimize JPEG
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      // Optimize WebP (format moderne, 30% plus léger)
      webp: {
        quality: 85,
      },
      // Optimize AVIF (format le plus moderne, 50% plus léger)
      avif: {
        quality: 85,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/features': resolve(__dirname, './src/features'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/services': resolve(__dirname, './src/services'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/types': resolve(__dirname, './src/types'),
      '@/assets': resolve(__dirname, './src/assets'),
      '@/styles': resolve(__dirname, './src/styles'),
    },
  },
  server: {
    host: 'photoproject.local',
    port: 5173,
    strictPort: true,
  },
});
