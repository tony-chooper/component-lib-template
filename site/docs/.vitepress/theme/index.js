import DefaultTheme from "vitepress/theme";
import YtoCustom from "ytoCustomH5";
import "./style.css";

import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component("demo-preview", ElementPlusContainer);
    console.log("YtoCustom---", YtoCustom);
    app.use(YtoCustom);
  },
};
