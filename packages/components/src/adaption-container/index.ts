import _AdaptionContainer from './adaption-container.vue'
// import { withInstall } from 'components-utils'
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;
const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name;
    //注册组件
    app.component(name, comp as SFCWithInstall<T>);
  };
  return comp as SFCWithInstall<T>;
};

export const AdaptionContainer = withInstall(_AdaptionContainer);
export default AdaptionContainer;
