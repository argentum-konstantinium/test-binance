import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import vuetify from 'vite-plugin-vuetify'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@entities': path.resolve(__dirname,'./src/entities'),
      '@features': path.resolve(__dirname,'./src/features'),
      '@shared': path.resolve(__dirname,'./src/shared'),
    }
  },
  plugins: [vue(), vuetify()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@shared/ui/scss/index.scss";`
      }
    }
  },
  ssr: {
    noExternal: ['vuetify']
  }
})
