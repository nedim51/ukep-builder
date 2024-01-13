import { ColumnSizeOffsetType, ColumnSizeType } from "../column.type";
import { IGuideItems } from "../guide.interface";

export interface IColumnClass {
    sizes: ColumnSizeType | ColumnSizeOffsetType;
    list: IGuideItems;
}

export type IColumnClassList = Array<IColumnClass>;

export interface IClassDataState {
    sizes: IColumnClassList;
    offsets: IColumnClassList;
}

export const INITIAL_CLASS_DATA_STATE: IClassDataState = {
    sizes: [],
    offsets: []
}