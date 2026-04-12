import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(__dirname, 'src');
const sharedPackagesSrc = path.resolve(__dirname, '../../shared-packages/src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: srcRoot,
      '@shared-packages': sharedPackagesSrc,
    },
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['@smartlib/shared-packages'],
  },
});
