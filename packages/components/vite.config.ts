/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS, {PerModuleModePlugin} from 'unocss/vite';

const unocssFix = {
  name: "unocss:fix-dist-chunk",
  apply: "build",
  resolveId(id:string) {
    if (id === "virtual:uno.css") {
      return id;
    }
  },
  load(id:string) {
    if (id === "virtual:uno.css") {
      return { code: "" };
    }
  },
};
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
      external: ["vue", /\.scss/],
      // external: ["vue"],
      input: ["index.ts", "resolvers.ts"],
      output: [
        {
          //打包格式
          format: "es",
          //打包后文件名
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
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
          exports: "named",
          //配置打包根目录
          dir: "../dist/lib",
        },
      ],
    },
    lib: {
      entry: ["index.ts", "resolvers.ts"],
      name:'dist'
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS({
      // mode: 'global',
      // mode: 'per-module',
      mode:'vue-scoped',
      // mode: 'dist-chunk',
      // transformCSS: 'post',
      transformCSS: 'pre',
    }),
    unocssFix,
    dts({
      entryRoot: ".",
      outDir: ['../dist/es/', '../dist/lib/'],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: "../../tsconfig.json",
      include:['index.ts', '"resolvers.ts"', 'src'],
      exclude: [
        "**/*.test.ts",     // 排除测试文件
        "**/__tests__/**",  // 排除测试目录
      ],
    }),
    DefineOptions(),
    {
      name:'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle)
        for (const key of keys) {
          const bundler:any = bundle[key]
          this.emitFile({
            type:'asset',
            fileName:key,
            source: bundler?.code?.replace(/\.scss/g, ".css"),
          })
        }
      }
    }
  ],
});