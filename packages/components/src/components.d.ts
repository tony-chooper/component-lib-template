import * as components from "./index";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    YtoButton: typeof components.Button;
    YtoIcon: typeof components.Icon;
  }
}
export {};