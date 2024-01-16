import { class_cols } from "../../../services/class.data";
import { IGridBase } from "./grid.interface";

export interface IGridColumn extends IGridBase {
    class: string;
}

export type IGridColumns = Array<IGridColumn>;

export const INITIAL_GRID_COLUMN: IGridColumn = {
    id: -1,
    type: 'column',
    parent_id: null,
    parent_type: 'row',
    title: '',
    class: class_cols,
    index: -1
};