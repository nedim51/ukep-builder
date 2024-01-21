import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface"
import { ControlComponentEnum } from "./control-component.enum";
import { ControlTypeEnum } from "./control-type.enum";
import { IDictCode, IDictItems, INITIAL_DICT_CODE, INITIAL_DICT_ITEMS } from "./dict.interface"

export interface IControlRadioButton extends IControlBase {
    multi_select: boolean;
    dict_items: IDictItems;
    default_item: IDictCode;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_RADIO_BUTTON: IControlRadioButton = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.Dict,
    component: ControlComponentEnum.Radio,
    multi_select: false,
    dict_items: INITIAL_DICT_ITEMS,
    default_item: INITIAL_DICT_CODE
}