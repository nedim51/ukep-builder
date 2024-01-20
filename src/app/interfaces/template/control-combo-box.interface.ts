import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { IDictCode, IDictItems } from "./dict.interface";

export interface IControlCombobox extends IControlBase {
    dict_items: IDictItems;
    default_item: IDictCode;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_COMBOBOX: IControlCombobox = {
    ...INITIAL_CONTROL_BASE,
    type: 'dict',
    component: 'select',
    dict_items: [],
    default_item: ''
}