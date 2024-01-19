import { ColumnDisplayType, ContainerType } from "../../interfaces/column.type";
import { display_lg, container_lg } from "../services/grid-class.data";

export interface IGridContainer {
    display: ColumnDisplayType,
    container: ContainerType
}

export const INITIAL_GRID_CONTAINER: IGridContainer = {
    display: display_lg,
    container: container_lg
}