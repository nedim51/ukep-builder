import { IGroupControl } from "./group-control.interface"

// Интерфейс базового шаблона
export interface ITemplateBase {
    template_id: number,              // Уникальный идентификатор шаблона
    caption: string,                  // Заголовок шаблона
    field_group: Array<IGroupControl> // Группы элементов управления в шаблоне
}

// Начальное состояние шаблона
export const INITIAL_TEMPLATE_BASE: ITemplateBase = {
    template_id: -1,
    caption: '',
    field_group: []
}