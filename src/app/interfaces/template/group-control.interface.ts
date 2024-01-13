import { GroupControlType } from "./control-base.interface"

// Интерфейс группы элементов управления
export interface IGroupControl {
    name: string,               // Уникальное имя группы
    caption: string,            // Заголовок группы
    hint: string,               // Подсказка
    fields: Array<GroupControlType> // Элементы управления в группе
}

// Начальное состояние группы элементов управления
export const INITIAL_GROUP_CONTROL: IGroupControl = {
    name: '',
    caption: '',
    hint: '',
    fields: []
}