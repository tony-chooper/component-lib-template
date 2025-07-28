// 组件库配置
export const LIBRARY_CONFIG = {
  // 组件前缀，可以根据需要修改
  PREFIX: 'yto',
  // 组件库名称
  NAME: 'yto-custom-h5',
  // 版本
  VERSION: '1.0.0'
} as const;

// 导出配置，方便外部使用
export const COMPONENT_PREFIX = LIBRARY_CONFIG.PREFIX; 