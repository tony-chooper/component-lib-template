import { ComponentResolver } from 'unplugin-vue-components'
import path from 'path'
/**
 * 自动按需引入 elementEnhance 组件库的 resolver
 */
export function elementEnhanceResolvers(): ComponentResolver {
  return {
    type: "component",
    // @ts-ignore
    resolve: (name: string) => {
      console.log('elementEnhanceResolvers--name', name, import.meta.dirname)
      
      // path.resolve(__dirname, '../packages')
      // 组件名转为横线命名，如 AdaptionContainer => adaption-container
      const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
      // 只处理你库里的组件名
      const validNames = ['AdaptionContainer', 'Button', 'Card']
      if (validNames.includes(name)) {
        return {
          importName: name,
          // from: `elementEnhance/es/src/${kebabName}/index.mjs`,
          // path: `elementEnhance/es/src/${kebabName}/index.mjs`,
          path: import.meta.resolve(`./src/${kebabName}/index.mjs`, import.meta.dirname ),
        }
      }
    }
  }
}