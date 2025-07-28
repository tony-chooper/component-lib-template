import type { App, Plugin } from "vue";
import { COMPONENT_PREFIX } from "./config";
export type SFCWithInstall<T> = T & Plugin;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const withInstall = <T extends { name?: string }>(comp: T) => {
  let name = (comp as any).name;
  // 自动加上大驼峰前缀 COMPONENT_PREFIX
  if (name && !name.startsWith(COMPONENT_PREFIX)) {
    name = `${COMPONENT_PREFIX}${capitalize(name)}`;
    (comp as any).name = name;
  }
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};
