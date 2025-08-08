import Table from "./Index.vue";
import { withInstall } from "../../utils/install";

// 导出类型
export type TableType = typeof Table;

export const YtoTable = withInstall<TableType>(Table);
export default YtoTable;

export * from './props';