// Интерфейс элемента словаря
export interface IDictItem {
    code: string,       // Код элемента
    caption: string,    // Заголовок элемента
    descrition: string, // Описание элемента
}

export type IDictItems = Array<IDictItem>;

export type IDictCodes = Array<IDictItem['code']>;

export type IDictCode = IDictItem['code'];