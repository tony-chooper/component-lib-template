export default {
  siteTitle: "vitepress",
  nav: [
    { text: "指南", link: "/guild/" },
    { text: "组件", link: "/examples/button/" },
  ],
  socialLinks: [{ icon: "github", link: "https://github.com/qddidi/easyest" }],
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
};
