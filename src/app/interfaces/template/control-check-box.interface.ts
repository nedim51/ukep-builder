import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { ControlComponentEnum } from "./control-component.enum";
import { ControlTypeEnum } from "./control-type.enum";
import { IDictCodes, IDictItems, INITIAL_DICT_CODES, INITIAL_DICT_ITEMS } from "./dict.interface";

export interface IControlChecbox extends IControlBase {
    multi_select: boolean;
    dict_items: IDictItems;
    default_item: IDictCodes;
    // "rows": 1, Для чего ???
}

export const INITIAL_CONTROL_CHECKBOX: IControlChecbox = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.Dict,
    component: ControlComponentEnum.CheckBox,
    multi_select: false,
    dict_items: INITIAL_DICT_ITEMS,
    default_item: INITIAL_DICT_CODES
}