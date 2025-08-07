# Table 表格组件

## 类型定义

### 基础类型

```typescript
// 表格行数据类型
interface TableRow {
  id?: string | number;
  key?: string | number;
  [key: string]: any;
}

// 列配置类型
interface Column {
  label: string; // 列标题
  prop: string; // 数据属性名
  width?: number; // 列宽度
  align?: "left" | "center" | "right"; // 对齐方式
  sort?: SortType; // 排序配置
  type?: "index" | "default"; // 列类型
  render?: (row: TableRow) => string | number; // 自定义渲染函数
}

// 排序类型
interface SortType {
  prop: string;
  order: string;
}
```

### 具体业务类型示例

```typescript
// 用户数据示例
interface UserData extends TableRow {
  id: number;
  name: string;
  age: number;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
}

// 产品数据示例
interface ProductData extends TableRow {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}
```

## 使用示例

### 基础用法

```vue
<template>
  <YtoTable :columns="columns" :data="tableData" @on-sort="handleSort" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, UserData } from "./props";

// 定义列配置
const columns: Column[] = [
  {
    label: "序号",
    prop: "index",
    type: "index",
    width: 80,
  },
  {
    label: "姓名",
    prop: "name",
    align: "left",
    sort: { prop: "name", order: "" },
  },
  {
    label: "年龄",
    prop: "age",
    align: "center",
    sort: { prop: "age", order: "" },
  },
  {
    label: "邮箱",
    prop: "email",
    align: "left",
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    render: (row: UserData) => (row.status === "active" ? "活跃" : "非活跃"),
  },
  {
    label: "创建时间",
    prop: "createdAt",
    align: "center",
  },
];

// 表格数据 - 使用具体业务类型
const tableData = ref<UserData[]>([
  {
    id: 1,
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    email: "lisi@example.com",
    status: "inactive",
    createdAt: "2024-01-02",
  },
]);

// 排序处理
const handleSort = (sortInfo: SortType) => {
  console.log("排序信息:", sortInfo);
  // 处理排序逻辑
};
</script>
```

### 使用泛型类型（推荐）

```vue
<template>
  <YtoTable :columns="columns" :data="tableData" @on-sort="handleSort" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, TypedTableRow, TableRowFromColumns } from "./props";

// 定义列配置
const columns = [
  { label: "姓名", prop: "name", align: "left" },
  { label: "年龄", prop: "age", align: "center" },
  { label: "邮箱", prop: "email", align: "left" },
  { label: "状态", prop: "status", align: "center" },
] as const;

// 根据列配置自动生成类型
type MyTableData = TableRowFromColumns<typeof columns>;

// 表格数据 - 类型安全
const tableData = ref<MyTableData[]>([
  {
    id: 1,
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    email: "lisi@example.com",
    status: "inactive",
  },
]);

// 列配置 - 类型安全
const columnConfig: Column[] = [
  {
    label: "姓名",
    prop: "name",
    render: (row: MyTableData) => row.name.toUpperCase(), // 类型安全
  },
  {
    label: "状态",
    prop: "status",
    render: (row: MyTableData) => (row.status === "active" ? "活跃" : "非活跃"),
  },
];
</script>
```

### 使用 TypedTableRow

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Column, TypedTableRow } from "./props";

// 定义具体的数据结构
interface MyData {
  name: string;
  age: number;
  email: string;
  status: "active" | "inactive";
}

// 使用 TypedTableRow 组合类型
type MyTableData = TypedTableRow<MyData>;

const columns: Column[] = [
  { label: "姓名", prop: "name" },
  { label: "年龄", prop: "age" },
  { label: "邮箱", prop: "email" },
  { label: "状态", prop: "status" },
];

// 表格数据 - 类型安全
const tableData = ref<MyTableData[]>([
  {
    id: 1, // 来自 TableRow
    name: "张三", // 来自 MyData
    age: 25,
    email: "zhangsan@example.com",
    status: "active",
  },
]);
</script>
```

### 使用插槽自定义列内容

```vue
<template>
  <YtoTable :columns="columns" :data="tableData">
    <!-- 自定义操作列 -->
    <template #actions="{ row }">
      <button @click="editUser(row)">编辑</button>
      <button @click="deleteUser(row)">删除</button>
    </template>

    <!-- 自定义状态列 -->
    <template #status="{ row }">
      <span :class="row.status === 'active' ? 'text-green' : 'text-red'">
        {{ row.status === "active" ? "活跃" : "非活跃" }}
      </span>
    </template>
  </YtoTable>
</template>

<script setup lang="ts">
const columns: Column[] = [
  { label: "姓名", prop: "name" },
  { label: "状态", prop: "status" },
  { label: "操作", prop: "actions" }, // 对应插槽名
];
</script>
```

## Props 说明

| 属性           | 类型       | 默认值                  | 说明           |
| -------------- | ---------- | ----------------------- | -------------- |
| columns        | Column[]   | []                      | 列配置数组     |
| data           | TableRow[] | []                      | 表格数据       |
| requestApi     | Function   | null                    | 请求数据的函数 |
| defaultSort    | SortType   | { prop: '', order: '' } | 默认排序       |
| immediateCheck | Boolean    | false                   | 是否立即检查   |
| finishedText   | String     | '我也是有底线的...'     | 加载完成文本   |
| emptyText      | String     | '暂无数据'              | 空数据文本     |
| emptyCellText  | String     | '-'                     | 空单元格文本   |
| errorText      | String     | '请求失败，请重新加载'  | 错误文本       |

## Events 说明

| 事件名               | 参数     | 说明                 |
| -------------------- | -------- | -------------------- |
| on-sort              | SortType | 排序变化时触发       |
| on-header-cell-click | Column   | 表头单元格点击时触发 |
| on-body-cell-click   | TableRow | 表格单元格点击时触发 |

## 类型安全建议

### 1. 使用 TableRowFromColumns（推荐）

```typescript
// 定义列配置
const columns = [
  { label: "姓名", prop: "name" },
  { label: "年龄", prop: "age" },
  { label: "邮箱", prop: "email" },
] as const;

// 自动生成类型
type MyTableData = TableRowFromColumns<typeof columns>;

// 使用类型安全的数据
const tableData: MyTableData[] = [
  {
    id: 1,
    name: "张三", // 类型安全
    age: 25, // 类型安全
    email: "zhangsan@example.com", // 类型安全
  },
];
```

### 2. 使用 TypedTableRow

```typescript
// 定义业务数据结构
interface UserInfo {
  name: string;
  age: number;
  email: string;
}

// 组合类型
type UserTableData = TypedTableRow<UserInfo>;

// 使用
const tableData: UserTableData[] = [
  {
    id: 1, // 来自 TableRow
    name: "张三", // 来自 UserInfo
    age: 25,
    email: "zhangsan@example.com",
  },
];
```

### 3. 继承 TableRow

```typescript
// 为具体业务定义类型
interface MyBusinessData extends TableRow {
  id: number;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

// 使用
const tableData: MyBusinessData[] = [
  {
    id: 1,
    name: "张三",
    status: "active",
    createdAt: "2024-01-01",
  },
];
```

### 4. 列配置类型化

```typescript
const columns: Column[] = [
  {
    label: "姓名",
    prop: "name",
    render: (row: MyTableData) => row.name.toUpperCase(), // 类型安全
  },
  {
    label: "状态",
    prop: "status",
    render: (row: MyTableData) => (row.status === "active" ? "活跃" : "非活跃"),
  },
];
```

## 类型优势

1. **自动类型推导**：`TableRowFromColumns` 可以根据列配置自动生成类型
2. **类型安全**：确保数据包含所有必需的列属性
3. **IDE 支持**：提供完整的智能提示和类型检查
4. **编译时检查**：在编译时发现类型错误
5. **灵活性**：支持多种类型定义方式，适应不同场景
