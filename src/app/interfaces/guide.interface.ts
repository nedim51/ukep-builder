/**
 * Интерфейс для справочниых полей
 */
export interface IGuideItem {
    id: number;
    name: string;
    code: string;
    description?: string;
}

export type IGuideItems = Array<IGuideItem>;