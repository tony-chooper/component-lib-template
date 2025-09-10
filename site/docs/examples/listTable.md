# table 表格
基于van-list组件和table组件封装滚动加载组件，支持插槽自定义列表展示形式

### 基本用法

:::preview

demo-preview=@components/list-table/example/basic.vue

:::

## API

### Props

| 属性名         | 说明            | 类型     | 可选值 | 默认值                              | 备注 |
| -------------- | --------------- | -------- | ------ | ----------------------------------- | ---- |
| finishedText   | 加载完成提示    | string   | -      | '我也是有底线的...'                 |      |
| errorText      | 错误提示        | string   | -      | '请求失败，请重新加载'              |      |
| immediateCheck | 默认排序        | boolean  | -      | false                               |      |
| onLoad         | 加载函数        | Function | -      | null                                |      | 必填 |
| loadKey        | 数据对应的key值 | Object   | -      | "{totalKey:'total', listKey: 'list'}" |      |

### Slots

| 插槽名 | 说明         | 作用域参数 |
| ------ | ------------ | ---------- |
| default | 默认插槽 | 'data' |

