import { ElementType } from "../services/grid-element.service";

export interface IElementState {
    elements: Array<ElementType>;
};

export const INITIAL_ELEMENT_STATE: IElementState = {
    elements: []
};