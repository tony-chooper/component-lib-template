import type { ExtractPropTypes, PropType } from "vue";

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
