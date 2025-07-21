import { defineConfig } from "vite";
// @ts-ignore
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import DefineOptions from "unplugin-vue-define-options/vite";
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [vue(), DefineOptions(),visualizer(),],
});