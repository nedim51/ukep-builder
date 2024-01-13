import { IGridBase } from "./grid.interface";

export interface IGridRow extends IGridBase { }

export type IGridRows = Array<IGridRow>;

export const INITIAL_GRID_ROW: IGridRow = {
    id: -1,
    type: 'row',
    parent_id: null,
    parent_type: 'column',
    title: '',
    index: -1
}