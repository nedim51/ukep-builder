import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface"
import { IDictCode, IDictItems } from "./dict.interface"

export interface IControlRadioButton extends IControlBase {
    multi_select: boolean;
    dict_items: IDictItems;
    default_item: IDictCode;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_RADIO_BUTTON: IControlRadioButton = {
    ...INITIAL_CONTROL_BASE,
    type: 'dict',
    component: 'radio',
    multi_select: false,
    dict_items: [],
    default_item: ''
}