// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@': resolve(__dirname, 'src')
        },
    },
    server: {
        hmr: true,
        watch: {
            usePolling: false,
            ignored: [
              '**/node_modules/**',
              '**/vendor/**',
              '**/storage/**',
              '**/.git/**',
            ],
        },
    },
});
