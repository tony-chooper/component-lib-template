import path from "path";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

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
  themeConfig: {
    siteTitle: "vitepress",
    nav: [
      { text: "指南", link: "/guild/" },
      { text: "组件", link: "/examples/button/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/qddidi/easyest" },
    ],
    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guild/installation",
            },
            {
              text: "快速开始",
              link: "/guild/quickstart",
            },
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "xx",
              link: "/xx",
            },
          ],
        },
      ],
      "/examples/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button",
              link: "/examples/button",
            },
            {
              text: "table",
              link: "/examples/table",
            },
          ],
        },
      ],
    },
  },
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
    plugins: [htmlStylePlugin()],
  },
};
