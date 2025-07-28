import { defineConfig } from "vite";
// @ts-ignore
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import DefineOptions from "unplugin-vue-define-options/vite";
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { elementEnhanceResolvers } from 'elementEnhance/resolvers' 

export default defineConfig({
  plugins: [vue(), DefineOptions(), visualizer(), UnoCSS(),
    Components({
      resolvers: [elementEnhanceResolvers()]
    })
  ],
});