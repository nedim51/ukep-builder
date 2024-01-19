import { GridObjectType } from "../grid/interfaces/grid-element.type";
import { IconInterface } from "./icon.interface";

export interface IElement extends IconInterface {
    id: number;
    title: string;
    type: GridObjectType
}

export type IElements = Array<IElement>;