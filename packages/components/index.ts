import * as components from "./src/index";
export * from "./src/index";
import { App } from "vue";

export default {
  install: (app: App) => {
    Object.values(components).forEach((comp) => {
      app.use(comp);
    });
  },
};