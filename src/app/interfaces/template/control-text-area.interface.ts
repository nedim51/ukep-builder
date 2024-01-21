import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { ControlComponentEnum } from "./control-component.enum";
import { ControlTypeEnum } from "./control-type.enum";

export interface IControlTextArea extends IControlBase {
    default_value: string,       // Значение по умолчанию
    max_length: number,          // Максимальная длина (для текстовых элементов управления)
    placeholder: string,         // Заглушка (placeholder)
}

export const INITIAL_CONTROL_TEXT_AREA: IControlTextArea = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.String,
    component: ControlComponentEnum.TextArea,
    max_length: 0,
    default_value: '',
    placeholder: ''
}