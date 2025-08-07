/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { unocssFix, replaceScssToCss, removeEmptyVue3Mjs } from "./script/plugins";
import postCssPxToRem from 'postcss-pxtorem'

export default defineConfig({
  // test: {
  //   environment: "happy-dom"
  // },
  build: {
    cssCodeSplit: true,
    //打包文件目录
    outDir: "es",
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue", /\.scss/, 'vant', /^vant\/.*/],
      // external: ["vue"],
      input: ["index.ts", "resolvers.ts", "directives/index.ts"],
      output: [
        {
          //打包格式
          format: "es",
          //打包后文件名
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot:'src',
          exports: "named",
          //配置打包根目录
          dir: "../dist/es",
        },
        {
          //打包格式
          format: "cjs",
          //打包后文件名
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot:'src',
          exports: "named",
          //配置打包根目录
          dir: "../dist/lib",
        },
      ],
    },
    lib: {
      entry: ["index.ts", "resolvers.ts"],
      name: "dist",
    },
  },
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
    vueJsx(),
    UnoCSS({
      // mode: 'global',
      // mode: 'per-module',
      mode: "vue-scoped",
      // mode: 'dist-chunk',
      // transformCSS: 'post',
      transformCSS: "pre",
    }),
    unocssFix,
    dts({
      entryRoot: ".",
      outDir: ["../dist/es/", "../dist/lib/"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: "../../tsconfig.json",
      include: ["index.ts", '"resolvers.ts"', "src", "directives"],
      exclude: [
        "**/*.test.ts", // 排除测试文件
        "**/__tests__/**", // 排除测试目录
      ],
    }),
    DefineOptions(),
    replaceScssToCss(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
});
