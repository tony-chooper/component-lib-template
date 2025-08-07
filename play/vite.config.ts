import { defineConfig } from "vite";
// @ts-ignore
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import DefineOptions from "unplugin-vue-define-options/vite";
import { visualizer } from "rollup-plugin-visualizer";
import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { ytoCustomH5Resolvers } from "ytoCustomH5/resolvers";
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from '@vant/auto-import-resolver';
import postCssPxToRem from 'postcss-pxtorem'

export default defineConfig({
  css:{
    postcss:{
      plugins:[
        postCssPxToRem({
          rootValue: 37.5,
          propList:['*'],
        })
      ]
    }
  },
  plugins: [
    vue(),
    DefineOptions(),
    visualizer(),
    UnoCSS(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [
        ytoCustomH5Resolvers(),
         VantResolver()],
    }),
  ],
});
