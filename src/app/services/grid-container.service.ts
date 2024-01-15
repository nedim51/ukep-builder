import { Injectable } from "@angular/core";
import { StateService } from "./core/state.service";
import { Observable, of } from "rxjs";
import { ColumnDisplayType, ColumnSeparatorType, ContainerPrefixType, ContainerType } from "../interfaces/column.type";
import { container_lg, display_lg, display_md, display_sm, display_xs, displays } from "../data/class.data";

interface IContainerWidht {
    min_width: number;
    max_width: number;
    display: ColumnDisplayType;
}

type IContainersWidth = Array<IContainerWidht>

const CONTAINER_WIDTHS: IContainersWidth = [
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

export interface IGridContainer {
    display: ColumnDisplayType,
    container: ContainerType
}

export const INITIAL_GRID_CONTAINER: IGridContainer = {
    display: display_lg,
    container: container_lg
}


@Injectable({
    providedIn: 'root'
})
export class GridContainerService extends StateService<IGridContainer> {

    private readonly containersWidth = CONTAINER_WIDTHS;
    private readonly displays = displays;

    constructor() {
        super(INITIAL_GRID_CONTAINER)
    }

    setContainer(display: ColumnDisplayType): void {
        const container: ContainerType = this.createContainer('container', '-', display);

        this.setState({
            display: display,
            container: container
        })
    }

    setContainerByWidth(width: number): void {
        const container = this.containersWidth.find(item => item.min_width <= width && width <= item.max_width);

        if(container) {
            this.setContainer(container.display);
        }
    }

    selectDisplay(): Observable<ColumnDisplayType> {
        return this.select(state => state.display)
    }

    selectContainer(): Observable<ContainerType> {
        return this.select(state => state.container)
    }

    selectDisplays(): Observable<any> {
        return of(this.displays)
    }

    createContainer(container: ContainerPrefixType, separator: ColumnSeparatorType, display: ColumnDisplayType): ContainerType {
        return `${container}${separator}${display}`
    }
}