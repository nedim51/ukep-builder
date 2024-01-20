import { ColumnDisplayType } from "./grid-column.type";

export interface IGridContainerWidht {
    min_width: number;
    max_width: number;
    display: ColumnDisplayType;
}

export type IGridContainersWidth = Array<IGridContainerWidht>