import { IElements } from "../../interfaces/element.interface";
import { GridObjectEnum } from "../interfaces/grid-object.type";

export enum ElementEnum {
    TextBox = 0,
    File = 1,
    CheckBox = 2,
    RadioButton = 3,
    Button = 4,
    ComboBox = 5,
    Table = 6,
    TextArea = 7
}

export const elements: IElements = [
    {
        id: ElementEnum.TextBox,
        title: 'TextBox',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.File,
        title: 'File',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.CheckBox,
        title: 'CheckBox',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.RadioButton,
        title: 'RadioButton',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.Button,
        title: 'Button',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.ComboBox,
        title: 'ComboBox',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.Table,
        title: 'Table',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
    {
        id: ElementEnum.TextArea,
        title: 'TextArea',
        type: GridObjectEnum.Element,
        icon_name: '',
        icon_class: '',
    },
]