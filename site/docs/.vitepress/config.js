import path from "path";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import themeConfig from "./theme/config.js";
// import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

const alias = {
  "@components": path.resolve(__dirname, "../../../packages/components/src"),
};
function htmlStylePlugin() {
  return {
    name: "html-style-inject",
    transformIndexHtml(html) {
      return html.replace(/<html([^>]*)>/, (match, p1) => {
        if (/style=/.test(p1)) {
          return `<html${p1.replace(/style="([^"]*)"/, 'style="$1; font-size: 41.4px;"')}>`;
        }
        return `<html${p1} style="font-size: 41.4px;">`;
      });
    },
  };
}
export default {
  themeConfig,
   head: [
    [
      'script',
      {
        src: '/htmlStyle.js',
        type: 'module'
      }
    ]
  ],
  markdown: {
    config: (md) => {
      md.use(containerPreview, { alias });
      md.use(componentPreview, { alias });
    },
  },
  vite: {
    resolve: { alias },
    ssr: {
      noExternal: ["vant"], // 让 Vite 处理 vant 的依赖
    },
    plugins: [
      htmlStylePlugin(), 
      // vue(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
  },
};
