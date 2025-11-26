import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), eslint()],
   resolve: {
      alias: {
         '@': resolve(__dirname, 'src'),
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `@import "${resolve(__dirname, 'src/styles/_variables.scss')}";`,
         },
      },
   },
})
