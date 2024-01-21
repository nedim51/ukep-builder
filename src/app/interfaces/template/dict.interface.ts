// Интерфейс элемента словаря
export interface IDictItem {
    code: string,       // Код элемента
    caption: string,    // Заголовок элемента
    descrition: string, // Описание элемента
}

export type IDictItems = Array<IDictItem>;

export type IDictCodes = Array<IDictItem['code']>;

export type IDictCode = IDictItem['code'];

export const INITIAL_DICT_CODE: IDictCode = 'lorem';

export const INITIAL_DICT_CODES: IDictCodes = [INITIAL_DICT_CODE];

export const INITIAL_DICT_ITEM: IDictItem = {
    code: 'lorem',
    caption: 'Lorem ipsum',
    descrition: 'lorem ipsum mode is'
};

export const INITIAL_DICT_ITEMS: IDictItems = [INITIAL_DICT_ITEM];
