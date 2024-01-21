import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { ControlTypeEnum } from "./control-type.enum";

// Интерфейс контрола даты
export interface IControlDate extends IControlBase {
    format: string; // Формат
    default_value: string; // Значение по умолчанию
}

export const INITIAL_CONTROL_DATE: IControlDate = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.Date,
    default_value: '01.01.2024',
    format: 'DD.MM.YYYY'
}