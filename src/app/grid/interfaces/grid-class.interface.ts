import { ColumnSizeOffsetType, ColumnSizeType } from "./grid-column.type";
import { IGuideItems } from "../../interfaces/guide.interface";

export interface IColumnClass {
    sizes: ColumnSizeType | ColumnSizeOffsetType;
    list: IGuideItems;
}

export type IColumnClassList = Array<IColumnClass>;