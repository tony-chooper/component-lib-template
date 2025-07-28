import type { App, Plugin } from "vue";
import { COMPONENT_PREFIX } from "../config";

type SFCWithInstall<T> = T & Plugin;

// 将驼峰命名转换为短横线命名
export function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

// 为组件添加前缀的 withInstall 函数
export function withPrefix<T>(comp: T, prefix: string = COMPONENT_PREFIX): SFCWithInstall<T> {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name;
    // 为组件名添加前缀
    const prefixedName = `${prefix}-${toKebabCase(name)}`;
    // 注册组件
    app.component(prefixedName, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
}

// 导出前缀配置，方便外部使用
export { COMPONENT_PREFIX }; 