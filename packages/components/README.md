# YTO Custom H5 Components

一个基于 Vue 3 的业务组件库，支持自动前缀和多种命名方式。

## 特性

- 🚀 基于 Vue 3 + TypeScript
- 🎨 支持 UnoCSS
- 🔧 自动组件前缀（默认：`yto-`）
- 📦 支持按需引入
- 🛠️ 统一的组件注册机制
- 🔄 支持多种组件命名方式
- 🤖 自动扫描组件目录

## 安装

```bash
npm install yto-custom-h5
# 或
yarn add yto-custom-h5
# 或
pnpm add yto-custom-h5
```

## 使用

### 全局引入

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import YtoComponents from "yto-custom-h5";

const app = createApp(App);
app.use(YtoComponents);
app.mount("#app");
```

### 按需引入

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ytoCustomH5Resolvers } from "yto-custom-h5/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ytoCustomH5Resolvers()],
    }),
  ],
});
```

## 组件使用

### 支持的命名方式

组件库支持以下四种命名方式：

#### 1. 带前缀的短横线命名（推荐）

```vue
<template>
  <yto-button type="primary">点击我</yto-button>
  <yto-card title="卡片标题">卡片内容</yto-card>
  <yto-adaption-container :list="list"> 适配内容 </yto-adaption-container>
</template>
```

#### 2. 带前缀的驼峰命名

```vue
<template>
  <YtoButton type="primary">点击我</YtoButton>
  <YtoCard title="卡片标题">卡片内容</YtoCard>
  <YtoAdaptionContainer :list="list"> 适配内容 </YtoAdaptionContainer>
</template>
```

#### 3. 原始驼峰命名（向后兼容）

```vue
<template>
  <Button type="primary">点击我</Button>
  <Card title="卡片标题">卡片内容</Card>
  <AdaptionContainer :list="list"> 适配内容 </AdaptionContainer>
</template>
```

#### 4. 短横线命名（向后兼容）

```vue
<template>
  <button type="primary">点击我</button>
  <card title="卡片标题">卡片内容</card>
  <adaption-container :list="list"> 适配内容 </adaption-container>
</template>
```

## 自定义前缀

如果需要修改组件前缀，可以在配置文件中修改：

```typescript
// packages/components/src/config/index.ts
export const LIBRARY_CONFIG = {
  PREFIX: "your-prefix", // 修改为你的前缀
  NAME: "yto-custom-h5",
  VERSION: "1.0.0",
} as const;
```

## 自动组件发现

组件库会自动扫描 `src` 目录下的组件文件夹，无需手动维护组件列表。当你添加新组件时：

1. 在 `src` 目录下创建组件文件夹（如 `my-component`）
2. 在文件夹中创建 `index.ts` 文件并导出组件
3. 组件会自动被识别并支持所有命名方式

## 可用组件

- `yto-button` / `YtoButton` / `Button` / `button` - 按钮组件
- `yto-card` / `YtoCard` / `Card` / `card` - 卡片组件
- `yto-adaption-container` / `YtoAdaptionContainer` / `AdaptionContainer` / `adaption-container` - 适配容器组件

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test
```

## 技术实现

- **自动前缀**: 使用 `withPrefix` 工具函数统一处理组件注册
- **动态解析**: 通过 `ytoCustomH5Resolvers` 支持多种命名方式
- **类型支持**: 完整的 TypeScript 类型声明
