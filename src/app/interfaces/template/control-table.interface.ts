import { IControlBase, INITIAL_CONTROL_BASE, TableControlType } from "./control-base.interface";
import { ControlTypeEnum } from "./control-type.enum";

// Интерфейс контрола таблицы
export interface IControlTable extends IControlBase {
    fields: Array<TableControlType>; // any controls
    min_rows: number,           // Минимальное количество строк
    max_rows: number,           // Максимальное количество строк
    display_col: boolean; // Флаг отображения в колонке (может быть перенесен в таблицу)
}

export const INITIAL_CONTROL_TABLE: IControlTable = {
    ...INITIAL_CONTROL_BASE,
    type: ControlTypeEnum.Table,
    fields: [],
    min_rows: 0,
    max_rows: 0,
    display_col: false
}