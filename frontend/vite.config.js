import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            if (!res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                error: 'Backend server is offline. Please start Spring Boot on port 8080.' 
              }));
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Prevent Spring Security error-page redirect from triggering browser CORS block
            if (proxyRes.statusCode === 302 && proxyRes.headers.location && proxyRes.headers.location.includes('/login')) {
              delete proxyRes.headers.location;
              proxyRes.statusCode = 400;
            }
          });
        },
      },
      '/oauth2': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
