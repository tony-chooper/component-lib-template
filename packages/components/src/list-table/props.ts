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

export interface TableRow {
  [key: string]: any;
}

export const listTableProps = {
  finishedText: {
    type: String,
    default: '我也是有底线的...'
  },
  errorText: {
    type: String,
    default: '请求失败，请重新加载'
  },
  immediateCheck: {
    type: Boolean,
    default: false
  },
  onLoad: {
    required:true,
    type: Function as PropType<(...args: any[]) => Promise<TableRow>>,
    default: null
  },
  loadKey: {
    type: Object as PropType<{ totalKey: string; listKey: string }>,
    default: () => { return {totalKey:'total', listKey: 'list'} }
  }
};

export type ListTableProps = ExtractPropTypes<
  typeof listTableProps
>;
