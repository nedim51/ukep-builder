import { IGuideItem, IGuideItems } from "../guide.interface";
import { IControlChecbox } from "./control-check-box.interface";
import { IControlCombobox } from "./control-combo-box.interface";
import { IControlDate } from "./control-date.interface";
import { IControlFile } from "./control-file-input.interface";
import { IControlRadioButton } from "./control-radio-button.interface";
import { IControlTable } from "./control-table.interface";
import { IControlTextArea } from "./control-text-area.interface";
import { IControlTextbox } from "./control-text-box.interface";

export type ControlParamKeys = keyof IControlTable | keyof IControlChecbox | keyof IControlCombobox | 
keyof IControlRadioButton | keyof IControlDate | keyof IControlTextArea | keyof IControlTextbox | keyof IControlFile;

export interface IControlParam {
    key: ControlParamKeys;
    title: string;
    type: ControlParamTypeEnum;
    readonly: boolean;
    items?: IGuideItems;
}

export enum ControlParamTypeEnum {
    String = 'String',
    Boolean = 'Boolean',
    Number = 'Number',
    Array = 'Array',
    List = 'List'
}

export const CONTROL_PARAMS: Array<IControlParam> = [
    {
        key: 'name',
        title: 'Уникальный код поля (name)',
        type: ControlParamTypeEnum.String,
        readonly: true
    },
    {
        key: 'caption',
        title: 'Наименование поля (Caption)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'component',
        title: 'Тип компонента (component)',
        type: ControlParamTypeEnum.String, // String потому что только для чтения
        readonly: true
    },
    {
        key: 'type',
        title: 'Тип (type)',
        type: ControlParamTypeEnum.String,
        readonly: true
    },
    {
        key: 'required',
        title: 'Обязательный (required)',
        type: ControlParamTypeEnum.Boolean,
        readonly: false
    },
    {
        key: 'readonly',
        title: 'Только для чтения (readonly)',
        type: ControlParamTypeEnum.Boolean,
        readonly: false
    },
    {
        key: 'visible',
        title: 'Видимый (visible)',
        type: ControlParamTypeEnum.Boolean,
        readonly: false
    },
    {
        key: 'hint',
        title: 'Подсказка (hint)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'order',
        title: 'Порядок (order)',
        type: ControlParamTypeEnum.Number,
        readonly: true
    },
    {
        key: 'multi_select',
        title: 'Мульти-выбор (multi_select)',
        type: ControlParamTypeEnum.Boolean,
        readonly: true
    },
    {
        key: 'dict_items',
        title: 'Список (dict_items)',
        type: ControlParamTypeEnum.Array, // Array<IDictItem> - потом подумаю как сделать более гибко
        readonly: false
    },
    {
        key: 'default_item',
        title: 'Значение по умолчанию (default_item)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'min_rows',
        title: 'Минимальное кол-во строк (min_rows)',
        type: ControlParamTypeEnum.Number,
        readonly: false
    },
    {
        key: 'max_rows',
        title: 'Максимальное кол-во строк (max_rows)',
        type: ControlParamTypeEnum.Number,
        readonly: false
    },
    {
        key: 'max_size',
        title: 'Максимальный размер (max_size)',
        type: ControlParamTypeEnum.Number,
        readonly: false
    },
    {
        key: 'file_types',
        title: 'Список типов (file_types)',
        type: ControlParamTypeEnum.Array, // Array<IDictItem> - потом подумаю как сделать более гибко
        readonly: false
    },
    {
        key: 'allowed_extension',
        title: 'Список расширейний (allowed_extension)',
        type: ControlParamTypeEnum.Array, // Array<string> - потом подумаю как сделать более гибко
        readonly: false
    },
    {
        key: 'default_type',
        title: 'Тип по-умолчанию (default_type)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'default_value',
        title: 'Значение по-умолчанию (default_value)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'max_length',
        title: 'Максимальная длина (max_length)',
        type: ControlParamTypeEnum.Number,
        readonly: false
    },
    {
        key: 'mask',
        title: 'Мака (mask)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'regexp',
        title: 'Регулярное выражение (regexp)',
        type: ControlParamTypeEnum.String,
        readonly: false
    },
    {
        key: 'placeholder',
        title: 'Заполнитель (placeholder)',
        type: ControlParamTypeEnum.String,
        readonly: false
    }
]