import DefaultTheme from "vitepress/theme";
import YtoCustom from "ytoCustomH5";
import DemoBlock from "@ruabick/vitepress-demo-block";
import "@ruabick/vitepress-demo-block/dist/style.css";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component("demo", DemoBlock);
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    console.log("YtoCustom---", YtoCustom);
    app.use(YtoCustom);
  },
};
