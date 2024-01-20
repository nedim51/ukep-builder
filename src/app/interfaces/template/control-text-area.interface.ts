import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";

export interface IControlTextArea extends IControlBase {
    default_value: string,       // Значение по умолчанию
    max_length: number,          // Максимальная длина (для текстовых элементов управления)
    placeholder: string,         // Заглушка (placeholder)
}

export const INITIAL_CONTROL_TEXT_AREA: IControlTextArea = {
    ...INITIAL_CONTROL_BASE,
    type: 'string',
    component: 'textarea',
    max_length: 0,
    default_value: '',
    placeholder: ''
}