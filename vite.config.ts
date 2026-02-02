
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Хязгаарыг 1600кб болгож өсгөв
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Том сангуудыг тусад нь файл болгож салгах (Optimization)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@google/genai')) {
              return 'vendor-ai';
            }
            if (id.includes('react')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
