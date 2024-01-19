import { IGridContainersWidth } from "../interfaces/grid-container-width.interface";
import { display_lg, display_md, display_sm, display_xs } from "./grid-class.data";

export const CONTAINER_WIDTHS: IGridContainersWidth = [
    {
        min_width: 512,
        max_width: 576,
        display: display_xs
    },
    {
        min_width: 577,
        max_width: 768,
        display: display_sm
    },
    {
        min_width: 769,
        max_width: 1024,
        display: display_md
    },
    {
        min_width: 1025,
        max_width: 1200,
        display: display_lg
    }
];