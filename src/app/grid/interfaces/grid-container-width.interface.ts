import { ColumnDisplayType } from "../../interfaces/column.type";

export interface IGridContainerWidht {
    min_width: number;
    max_width: number;
    display: ColumnDisplayType;
}

export type IGridContainersWidth = Array<IGridContainerWidht>