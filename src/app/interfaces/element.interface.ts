import { GridObjectType } from "../components/grid/interfaces/grid-element.type";
import { IconInterface } from "./icon.interface";

export interface IElement extends IconInterface {
    id: number;
    title: string;
    type: GridObjectType
}

export type IElements = Array<IElement>;