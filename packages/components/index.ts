import * as components from "./src/index";
import { App } from "vue";
import "virtual:uno.css";
export * from "./src/index";
export * from "./directives";

export default {
  install: (app: App) => {
    Object.values(components).forEach((comp) => {
      app.use(comp);
    });
  },
};
