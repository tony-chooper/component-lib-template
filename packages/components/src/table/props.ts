import type { ExtractPropTypes, PropType } from "vue";

export interface SortType { 
  prop: string; 
  order: string; 
}

export interface Column {
  label: string;
  prop: string;
  width?: number;
  align?: "left" | "center" | "right";
  sort?: SortType;
  type?: 'index' | 'default';
  render?: (row: TableRow) => string | number;
  [propName: string]: any;
}

// 基础表格行数据类型
export interface TableRow {
  [key: string]: any;
}

// 表格组件 Props 类型
export const tableProps = {
  columns: {
    type: Array as PropType<Column[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<TableRow[]>,
    default: () => [],
  },
  requestApi: {
    type: Function as PropType<() => void>,
    default: null,
  },
  defaultSort: {
    type: Object as PropType<SortType>,
    default: () => ({ prop: '', order: '' }),
  },
  immediateCheck:{
    type: Boolean,
    default: false,
  },
  finishedText: {
    type: String,
    default: '我也是有底线的...'
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  emptyCellText: {
    type: String,
    default: '-'
  },
  errorText:{
    type:String, 
    default:'请求失败，请重新加载'
  }
};

export type TableProps = ExtractPropTypes<
  typeof tableProps
>;
