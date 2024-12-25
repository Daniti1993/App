import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the API URL from environment or use the DigitalOcean IP
const API_URL = process.env.VITE_API_URL || 'http://159.223.0.84:5001';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(API_URL)
  }
});