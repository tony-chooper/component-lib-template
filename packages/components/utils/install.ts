import type { App, Plugin, Component } from "vue";
import { COMPONENT_PREFIX } from "./config";
// 修改类型定义
export type SFCWithInstall<T extends Component> = T & Plugin;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getComponentName = (name:string) => {
  return `${COMPONENT_PREFIX}${capitalize(name)}`
}
// 修改 withInstall 的类型定义
export const withInstall = <T extends Component>(comp: T) => {
  let name = (comp as any).name;
  
  if (name && !name.startsWith(COMPONENT_PREFIX)) {
    name = getComponentName(name);
    (comp as any).name = name;
  }

  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, comp);
  };

  return comp as SFCWithInstall<T>;
};
