import { IGridColumns } from "./grid-column.interface";
import { IGridRows } from "./grid-row.interface";

export interface IRowColumns {
    rows: IGridRows;
    columns: IGridColumns;
}

export type IRowsColumns = Array<IRowColumns>;