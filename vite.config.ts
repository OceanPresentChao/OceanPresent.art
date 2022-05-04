import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import path from 'path';
import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'
import {
  ElementPlusResolve, createStyleImportPlugin
} from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Components({
      // ui库解析器
      resolvers: [ElementPlusResolver()],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
    }),
    Markdown({
      markdownItOptions: {
        quotes: '""\'\'',
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  server: {
    open: true
  }
})
