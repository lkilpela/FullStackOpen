// filepath: [vite.config.js](http://_vscodecontentref_/1)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Ensure this matches your URL
    open: true,  // Automatically open in browser
  },
});