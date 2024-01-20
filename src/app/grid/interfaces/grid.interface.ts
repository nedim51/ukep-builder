import { GridObjectType } from "./grid-object.type";

export interface IGridBase {
    id: number;
    type: GridObjectType;
    parent_id: number | null;
    parent_type: GridObjectType | null;
    title: string;
    index: number;
}

export type IGridBaseList = Array<IGridBase>;