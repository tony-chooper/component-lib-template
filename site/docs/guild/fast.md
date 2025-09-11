---
title: 快速开始
---

### 按需引入（推荐）

在 `vite.config.ts` 进行如下配置

```ts
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ytoCustomH5Resolvers } from "@yto/custom-h5/resolvers";
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
    visualizer(),
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
```

### 完整引入（不推荐）

在 `main.ts` 中引入下面内容

```ts
import { createApp } from 'vue'
import App from './App.vue'

import YtoCustom from '@yto/custom-h5'
import '@yto/custom-h5/style'

createApp(App).use(YtoCustom).mount('#app')
```

## 指令

### 使用方式

::: code-group

```vue [xxx.vue]
import { ResizeElement as vResizeElement } from '@yto-custom/directives'

<template>
  <div v-resize-element="resizeHandler"></div>
</template>
```

:::

