export default {
  siteTitle: "YtoCustomH5",
   logo: '/images/yto-plus-logo.svg',
  nav: [
    { text: "指南", link: "/guild/installation" },
    { text: "组件", link: "/examples/table/" },
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
            link: "/guild/fast",
          },
        ],
      },
    ],
    "/examples/": [
      {
        text: "基础组件",
        items: [
          {
            text: "table 表格",
            link: "/examples/table",
          },
          {
            text: "listTable 列表",
            link: "/examples/listTable",
          },
          
        ],
      },
    ],
  },
};
