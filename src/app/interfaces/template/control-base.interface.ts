import { IControlChecbox } from "./control-check-box.interface";
import { IControlCombobox } from "./control-combo-box.interface";
import { IControlDate } from "./control-date.interface";
import { IControlRadioButton } from "./control-radio-button.interface";
import { IControlTable } from "./control-table.interface";
import { IControlTextArea } from "./control-text-area.interface";
import { IControlTextbox } from "./control-text-box.interface";
import { IControlFile } from "./control-file-input.interface";

export type ControlType = 'date' | 'string' | 'dict' | 'file' | 'table' | 'number';

export type ControlComponentType = 'select' | 'checkbox' | 'radio' | 'textarea';

export type TableControlType = IControlChecbox | IControlCombobox | IControlRadioButton | IControlDate | IControlTextArea | IControlTextbox | IControlFile;

export type GroupControlType = IControlTable | IControlChecbox | IControlCombobox | IControlRadioButton | IControlDate | IControlTextArea | IControlTextbox | IControlFile;

// Базовый интерфейс контрола
export interface IControlBase {
    name: string;                     // Уникальное имя элемента управления
    caption: string;                  // Заголовок элемента управления
    type: ControlType;                // Тип элемента управления
    component?: ControlComponentType; // Тип компонента (может быть связан с UI-фреймворком)
    readonly: boolean;                // Флаг "только для чтения"
    required: boolean;                // Флаг обязательного заполнения
    visible: boolean;                 // Флаг видимости элемента управления
    hint: string;                     // Подсказка (если отсутствует, то скрыта)
    order: number;                    // Порядок отображения (Пока что нигде не используется)
}

export const INITIAL_CONTROL_BASE: IControlBase = {
    name: '',
    caption: '',
    type: 'string',
    required: false,
    readonly: false,
    visible: false,
    hint: '',
    order: -1
}