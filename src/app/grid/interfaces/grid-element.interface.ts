import { IGridBase } from "./grid.interface";

export interface IGridElement extends IGridBase { 
    element_id: number;
}

export type IGridElements = Array<IGridElement>;

export const INITIAL_GRID_ELEMENT: IGridElement = { 
    id: -1, 
    type: 'element',
    parent_id: null,
    parent_type: 'column',
    element_id: -1,
    title: '',
    index: -1
}