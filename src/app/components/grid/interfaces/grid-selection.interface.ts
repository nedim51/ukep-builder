import { IGridColumn } from "./grid-column.interface";
import { IGridElement } from "./grid-element.interface";
import { IGridRow } from "./grid-row.interface";

export interface IGridSelection {
    selected?: IGridRow | IGridColumn | IGridElement
}