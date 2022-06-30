import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import externalGlobals from 'rollup-plugin-external-globals'

import ElementPlus from 'unplugin-element-plus/vite'

import topLevelAwait from "vite-plugin-top-level-await";
import legacyPlugin from '@vitejs/plugin-legacy';


const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': pathSrc,
      'nim': `${pathSrc}/nim_sdk/NIM_Web_NIM_v9.2.0.js`
    }
  },
  optimizeDeps:{
    include:['nim']
  },
  plugins: [
    vue(),
    ElementPlus(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router',
        {
          'element-plus': ['ElMessage', 'ElNotification', 'ClickOutside']
        }
      ],

      resolvers: [
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),

    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass', useSource: true })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),

    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    legacyPlugin({
        targets: [
            'Android > 39',
            'Chrome >= 60',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'Firefox >= 54',
            'Edge >= 15'
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
    rollupOptions:{
      external:['nim'],//lmw add 6 不让cesium再被编译
      plugins:[
        externalGlobals({
          "nim":"NIM"//lmw add 7 用引入的Cesium对应代码中的cesium
        })
      ]
    }
  },
})
