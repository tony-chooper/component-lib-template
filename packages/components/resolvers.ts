import { ComponentResolver } from "unplugin-vue-components";
import { COMPONENT_PREFIX } from "./utils/config";
/**
 * 自动按需引入组件库的 resolver
 */
export function ytoCustomH5Resolvers(): ComponentResolver {
  return {
    type: "component",
    // @ts-expect-error
    resolve: (name: string) => {
      // console.log("ytoCustomH5Resolvers---name", name);
      // 只处理以COMPONENT_PREFIX开头的组件
      if (name.startsWith(COMPONENT_PREFIX)) {
        // 去掉前缀，首字母大写转横线命名
        const rawName = name.slice(COMPONENT_PREFIX.length); // 去掉前缀
        const kebabName = rawName
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
          .replace(/^-/, "");
        // console.log('ytoCustomH5Resolvers---kebabName', kebabName, name)
        return {
          importName: name,
          path: import.meta.resolve(
            `./src/${kebabName}/index.mjs`,
            import.meta.dirname,
          ),
        };
      }
    },
  };
}
