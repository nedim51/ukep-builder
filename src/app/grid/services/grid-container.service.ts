import { Injectable } from "@angular/core";
import { StateService } from "../../services/core/state.service";
import { Observable, of } from "rxjs";
import { ColumnDisplayType, ColumnSeparatorType, ContainerPrefixType, ContainerType } from "../../interfaces/column.type";
import { displays } from "./grid-class.data";
import { CONTAINER_WIDTHS } from "./grid-container.data";
import { IGridContainer, INITIAL_GRID_CONTAINER } from "../interfaces/grid-container.interface";

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

    createContainer(container: ContainerPrefixType, separator: ColumnSeparatorType, display: ColumnDisplayType): ContainerType {
        return `${container}${separator}${display}`
    }

    /**
     * Selectors
     */

    selectDisplay(): Observable<ColumnDisplayType> {
        return this.select(state => state.display)
    }

    selectContainer(): Observable<ContainerType> {
        return this.select(state => state.container)
    }

    selectDisplays(): Observable<any> {
        return of(this.displays)
    }
}