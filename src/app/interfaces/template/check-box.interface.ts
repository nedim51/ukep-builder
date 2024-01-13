import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { IDictCodes, IDictItems } from "./dict.interface";

export interface IControlChecbox extends IControlBase {
    multi_select: boolean;
    dict_items: IDictItems;
    default_item: IDictCodes;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_RADIO_BUTTON: IControlChecbox = {
    ...INITIAL_CONTROL_BASE,
    type: 'dict',
    component: 'checkbox',
    multi_select: false,
    dict_items: [],
    default_item: []
}