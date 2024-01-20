import { GridObjectType } from "../grid/interfaces/grid-object.type";
import { ElementEnum } from "../grid/services/grid-element.data";
import { IconInterface } from "./icon.interface";

export interface IElement extends IconInterface {
    id: ElementEnum;
    title: string;
    type: GridObjectType
}

export type IElements = Array<IElement>;