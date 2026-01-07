import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            // Split React into its own chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Other vendor dependencies
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 30,
  },
})
