import { IControlBase, INITIAL_CONTROL_BASE } from "./control-base.interface";
import { ControlTypeEnum } from "./control-type.enum";
import { IDictCode, IDictItems } from "./dict.interface";

// Интерфейс контрола файлового вложения
export interface IControlFile extends IControlBase {
    file_types: IDictItems;           // Типы файлов (для элементов управления типа "file")
    default_type: IDictCode;  // Тип файла по умолчанию (для элементов управления типа "file")
    allowed_extension: Array<string>; // Разрешенные расширения файлов (для элементов управления типа "file")
    max_size: number;                 // Максимальный размер файла (для элементов управления типа "file")
    min_rows: number;                 // Минимальное количество загружаемых файлов
    max_rows: number;                 // Максимальное количество загружаемых файлов
}

export const INITIAL_CONTROL_FILE: IControlFile = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.File,
    file_types: [],
    allowed_extension: [],
    default_type: '',
    min_rows: 1,
    max_rows: 1,
    max_size: 0
}