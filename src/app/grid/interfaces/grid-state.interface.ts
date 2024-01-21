import { IGridRows } from "./grid-row.interface";
import { IGridColumns } from "./grid-column.interface";
import { IGridElements } from "./grid-element.interface";

export interface IGridState {
    rows: IGridRows;
    cols: IGridColumns;
    elements: IGridElements;
}

export const INITIAL_GRID_STATE: IGridState = {
    rows: [],
    cols: [],
    elements: []
}