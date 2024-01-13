import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";

export interface IControlTextbox extends IControlBase {
    default_value: string, // Значение по умолчанию
    min_rows: number,      // Минимальное количество строк (для элементов управления типа "textarea")
    max_rows: number,      // Максимальное количество строк (для элементов управления типа "textarea")
    max_length: number,    // Максимальная длина (для текстовых элементов управления)
    mask: string,          // Маска (например, "7(000) 000-00-00")
    regexp: string,        // Регулярное выражение
    placeholder: string,   // Заглушка (placeholder)
}

export const INITIAL_CONTROL_TEXTBOX: IControlTextbox = {
    ...INITIAL_CONTROL_BASE,
    default_value: '',
    min_rows: 1,
    max_rows: 1,
    max_length: 1,
    mask: '',
    regexp: '',
    placeholder: ''
}