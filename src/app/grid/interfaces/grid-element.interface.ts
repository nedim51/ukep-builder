import { ElementEnum } from "../services/grid-element.data";
import { GridObjectEnum } from "./grid-object.type";
import { IGridBase } from "./grid.interface";

export interface IGridElement extends IGridBase { 
    element_id: ElementEnum;
}

export type IGridElements = Array<IGridElement>;

export const INITIAL_GRID_ELEMENT: IGridElement = { 
    id: -1, 
    type: GridObjectEnum.Element,
    parent_id: null,
    parent_type: GridObjectEnum.Column,
    element_id: ElementEnum.TextBox,
    title: '',
    index: -1
}