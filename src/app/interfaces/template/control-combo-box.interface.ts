import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { ControlComponentEnum } from "./control-component.enum";
import { ControlTypeEnum } from "./control-type.enum";
import { IDictCode, IDictItems, INITIAL_DICT_CODE, INITIAL_DICT_ITEMS } from "./dict.interface";

export interface IControlCombobox extends IControlBase {
    dict_items: IDictItems;
    default_item: IDictCode;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_COMBOBOX: IControlCombobox = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.Dict,
    component: ControlComponentEnum.CheckBox,
    dict_items: INITIAL_DICT_ITEMS,
    default_item: INITIAL_DICT_CODE
}