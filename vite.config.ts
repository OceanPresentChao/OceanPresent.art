import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import path, { resolve } from 'path';
import matter from "gray-matter"
import Anchor from 'markdown-it-anchor';
import prism from 'markdown-it-prism';
import LinkAttributes from 'markdown-it-link-attributes';
import Toc from 'markdown-it-toc-done-right';
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jsdoc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Components({
      // ui库解析器
      resolvers: [],
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
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
      importMode: 'async',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        if(path.endsWith('.vue'))
          return route
        const md = matter.read(path)
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })
      },
    }),
    Markdown({
      wrapperComponent: 'Post',
      wrapperClasses: "prose img-center",
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(prism)
        md.use(Anchor, {
          permalink: Anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
          permalinkBefore: true,
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(Toc, { listType: "ul" })
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  server: {
    open: true
  },
})
