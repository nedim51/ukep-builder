import { Injectable } from '@angular/core';
import { Observable, filter, map, mergeMap, of } from 'rxjs';
import { IGridState } from '../interfaces/grid-state.interface';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns } from '../interfaces/grid-column.interface';
import { IGridElement, IGridElements } from '../interfaces/grid-element.interface';
import { GridService } from './grid.service';
import { StateService } from '../../services/core/state.service';
import { IGridSelection } from '../interfaces/grid-selection.interface';
import { IGridBase } from '../interfaces/grid.interface';

@Injectable()
export class GridSelectionService extends StateService<IGridSelection> {

    gridState$: Observable<IGridState>

    constructor(private grid: GridService) {
        super({});

        this.gridState$ = this.grid.selectState()
    }

    // Set current selections
    setSelection(selected: IGridRow | IGridColumn | IGridElement | undefined): void {
        this.setState({ selected })
    }

    // Get current selections
    selectTarget(): Observable<IGridSelection['selected']> {
        return this.select(state => state.selected).pipe(

            // Skip undefined
            filter(selected => selected !== undefined),

            mergeMap(selected => this.gridState$.pipe(
                map(state => {
                    const type: keyof IGridState = this.typeToKey(selected!.type)
                    return state[type].find(item => item.id === selected!.id);
                })
            )
            )
        )
    }

    // Тоже что и selectTarget только значения обновляются
    selectTargetCurrent(): Observable<IGridSelection['selected'] | undefined> {
        return this.select(state => state.selected)
    }

    // Get select
    selectByType(type: keyof IGridState, selected_id: number): Observable<IGridRow | IGridColumn | IGridElement | undefined> {
        return this.selectAll().pipe(
            map(selected => selected && selected[type] ? selected[type].find(item => item.id === selected_id) : undefined)
        )
    }

    // Get all selections { [], [], [] }
    selectAll(): Observable<IGridState> {
        return this.select(state => state.selected).pipe(

            //Skip undefined
            filter(selected => selected !== undefined),

            // Обрабатываем изменение состояния элементов, обязательно, потому что могут измениться свойства
            mergeMap(selected => selected ? this.gridState$.pipe(
                map(state => this.findAllOccurrences(state, selected!.id)),
                map(selections => {
                    return {
                        rows: selections.filter(items => items.type === 'row') as IGridRows,
                        cols: selections.filter(items => items.type === 'column') as IGridColumns,
                        elements: selections.filter(items => items.type === 'element') as IGridElements
                    }
                })
            ) : of({ rows: [], cols: [], elements: [] })
            )
        )
    }

    findAllOccurrences(tree: IGridState, targetId: number | null) {
        const result: Array<IGridRow | IGridColumn | IGridElement> = [];

        const findRecursive = (nodes: Array<IGridRow> | Array<IGridColumn> | Array<IGridElement>) => {
            const occurrences: Array<IGridRow | IGridColumn | IGridElement> = [];
    
            for (const node of nodes) {
                if (node.id === targetId) {
                    occurrences.push(node);
    
                    const parentNodes = node.parent_id !== null ? this.findAllOccurrences(tree, node.parent_id) : [];
    
                    occurrences.unshift(...parentNodes);
    
                    return occurrences; // обрываем цикл !!!
                }
            }
    
            return occurrences;
        }
    
        for (const key in tree) {
            const found = findRecursive(tree[key as keyof IGridState]);
    
            if (found.length > 0) {
                result.push(...found);
            }
        }
    
        return result;
    }

    typeToKey(type: IGridBase['type']): keyof IGridState {
        switch (type) {
            case 'row': return 'rows';
            case 'column': return 'cols';
            case 'element': return 'elements';
        }
    }

    clear(): void {
        this.setState({
            selected: undefined
        });
    }
}

