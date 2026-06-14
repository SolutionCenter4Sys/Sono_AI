import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  // Caminhos relativos no index.html (`./assets/...` em vez de `/assets/...`).
  // Permite servir o build de qualquer subpath e rodar localmente
  // (`npm run preview`) ou em hosts estáticos sem assumir raiz.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
