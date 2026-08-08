import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'ion-icon',
        },
      },
    }),
    tailwindcss(),
  ],
  server: {
    watch: {
      // 忽略截图工具产物与日志，避免 watcher 崩溃（曾发生 EBUSY）
      ignored: ['**/screenshots/**', '**/dist/**', '**/*.log'],
    },
  },
})
