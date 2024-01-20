import { IColumnClassList } from "./grid-class.interface";

export interface IClassDataState {
    sizes: IColumnClassList;
    offsets: IColumnClassList;
}

export const INITIAL_CLASS_DATA_STATE: IClassDataState = {
    sizes: [],
    offsets: []
}