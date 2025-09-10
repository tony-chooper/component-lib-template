# table 表格

### 基本用法

:::preview

demo-preview=@components/table/example/basic.vue

:::

## API

### Props

| 属性名        | 说明             | 类型     | 可选值 | 默认值     | 备注 |
| ------------- | ---------------- | -------- | ------ | ---------- | ---- |
| data          | 列表数据         | T[]      | -      | []         |      |
| columns       | 列配置           | Column[] | -      | []         |      |
| defaultSort   | 默认排序         | SortType   | -      | {}         |      |
| emptyText     | data为空的提示   | string   | -      | '暂无数据' |      |
| emptyCellText | 单元格为空时展示 | string   | -      | '-'         |      |

### Column 类型说明

| 属性名 | 说明               | 类型                      | 可选值            | 默认值  |
| ------ | ------------------ | ------------------------- | ----------------- | ------- |
| label  | 列标题             | string                    | -                 | -       |
| prop   | 列属性名称         | string                    | -                 | -       |
| width  | 列宽度             | number/string             | -                 | -       |
| align  | 对齐方式           | string                    | left/center/right | -       |
| sort   | 排序配置           | SortType                  | -                 | -       |
| type   | 列类型             | string                    | index/default     | default |
| link   | 是否显示为链接样式 | boolean/string            | -                 | false   |
| render | 自定义渲染函数     | (row: T) => string/number | -                 | -       |

### Slots

| 插槽名 | 说明         | 作用域参数 |
| ------ | ------------ | ---------- |
| [prop] | 自定义列内容 | { row: T } |

### Events

| 事件名               | 说明                     | 回调参数                                |
| -------------------- | ------------------------ | --------------------------------------- |
| on-sort              | 点击排序时触发           | (sortInfo: SortType)                    |
| on-header-cell-click | 点击表头单元格时触发     | (column: Column)                        |
| on-body-cell-click   | 点击表格内容单元格时触发 | (row: T, column: Column, index: number) |

### 类型定义

```typescript
interface SortType {
  prop: string;
  order: string;
}

interface Column<T> {
  label: string;
  prop: string;
  width?: number;
  align?: "left" | "center" | "right";
  sort?: SortType;
  type?: 'index' | 'default';
  link?: boolean | string;
  render?: (row: T) => string | number;
}
```
