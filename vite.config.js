import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import topLevelAwait from "vite-plugin-top-level-await";
import legacyPlugin from '@vitejs/plugin-legacy';


const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': pathSrc,
    }
  },
  plugins: [
    vue(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    legacyPlugin({
        targets: [
            'Android > 50',
            'Chrome >= 88',
            'Safari >= 14',
            'iOS >= 13',
            'Firefox >= 79',
            'Edge >= 89'
        ]
    })

  ],
  build: {
    // target: ['esnext'],
    minify: 'terser',
    manifest: false, // 是否产出maifest.json
    sourcemap: false, // 是否产出soucemap.json
    terserOptions: {
      compress: {
        // drop_console: true,
        // drop_debugger: true
      }
    },
  },
})
