import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";

// Интерфейс контрола даты
export interface IControlDate extends IControlBase {
    format: string; // Формат
    default_value: string; // Значение по умолчанию
}

export const INITIAL_CONTROL_DATE: IControlDate = {
    ...INITIAL_CONTROL_BASE,
    type: 'date',
    default_value: '01.01.2024',
    format: 'DD.MM.YYYY'
}