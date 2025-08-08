import type { ExtractPropTypes, PropType } from "vue";

export interface SortType { 
  prop: string; 
  order: string; 
}
export interface BaseRecord {
  [key: string]: any
}
export interface Column<T> {
  label: string;
  prop: string;
  width?: number;
  align?: "left" | "center" | "right";
  sort?: SortType;
  type?: 'index' | 'default';
  link?: boolean | string;
  render?: (row: T) => string | number;
  [propName: string]: any;
}
export const tableProps = <T>() => ({
  columns: {
    type: Array as PropType<Column<T>[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
  defaultSort: {
    type: Object as PropType<SortType>,
    default: () => ({ prop: '', order: '' }),
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  emptyCellText: {
    type: String,
    default: '-'
  }
});

export type TableProps<T extends BaseRecord> = ExtractPropTypes<ReturnType<typeof tableProps<T>>>;