import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the API URL from environment or use Render URL in production
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://complexesapp.onrender.com'
  : 'http://localhost:5001';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(API_URL)
  }
});