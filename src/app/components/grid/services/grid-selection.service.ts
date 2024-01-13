import { Injectable } from '@angular/core';
import { Observable, filter, map, mergeMap, of } from 'rxjs';
import { IGridTemplate } from '../interfaces/grid-template.service';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns } from '../interfaces/grid-column.interface';
import { IGridElement, IGridElements } from '../interfaces/grid-element.interface';
import { GridTemplateService } from './grid-template.service';
import { StateService } from '../../../services/core/state.service';
import { IGridSelection } from '../interfaces/grid-selection.interface';
import { IGridBase } from '../interfaces/grid.interface';

@Injectable()
export class GridSelectionService extends StateService<IGridSelection> {

    gridTemplateState$: Observable<IGridTemplate>

    constructor(private gridTemplate: GridTemplateService) {
        super({});
        
        this.gridTemplateState$ = this.gridTemplate.selectState()
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

            mergeMap(selected => this.gridTemplateState$.pipe(
                map(state => {
                        const type: keyof IGridTemplate = typeToKey(selected!.type)
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
    selectByType(type: keyof IGridTemplate, selected_id: number): Observable<IGridRow | IGridColumn | IGridElement | undefined> {
        return this.selectAll().pipe(
            map(selected => selected && selected[type] ? selected[type].find(item => item.id === selected_id) : undefined)
        )
    }

    // Get all selections { [], [], [] }
    selectAll(): Observable<IGridTemplate> {
        return this.select(state => state.selected).pipe(
            
            //Skip undefined
            filter(selected => selected !== undefined),
            
            // Обрабатываем изменение состояния элементов, обязательно, потому что могут измениться свойства
            mergeMap(selected => selected ? this.gridTemplateState$.pipe(
                    map(state => findAllOccurrences(state, selected!.id)),
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

    clear(): void {
        this.setState({ 
            selected:  undefined
        });
    }
}

export function typeToKey(type: IGridBase['type']): keyof IGridTemplate {
    switch(type) {
        case 'row': return 'rows';
        case 'column': return 'cols';
        case 'element': return 'elements';
    }
}

    
export function findAllOccurrences(tree: IGridTemplate, targetId: number | null) {
    const result: Array<IGridRow | IGridColumn | IGridElement> = [];
  
    function findRecursive(nodes: Array<IGridRow> | Array<IGridColumn> | Array<IGridElement>) {
      const occurrences: Array<IGridRow | IGridColumn | IGridElement> = [];
  
      for (const node of nodes) {
        if (node.id === targetId) {
          occurrences.push(node);
  
          const parentNodes = node.parent_id !== null ? findAllOccurrences(tree, node.parent_id) : [];
          
          occurrences.unshift(...parentNodes);
  
          return occurrences; // обрываем цикл !!!
        } 
      }
  
      return occurrences;
    }
  
    for (const key in tree) {
      const found = findRecursive(tree[key as keyof IGridTemplate]);
  
      if (found.length > 0) {
        result.push(...found);
      }
    }
  
    return result;
  }
















// map(selected => {
//     let selectedItem;

//     switch (type) {
//         case 'row':
//             // selectedItem = selected.row;
//             break;
//         case 'column':
//             // selectedItem = selected.col;
//             break;
//         case 'element':
//             // selectedItem = selected.element;
//             break;
//     }

//     return selectedItem// && selectedItem.id === selected_id ? selectedItem : undefined;
// })


// initialSelection


    // private grid$: Observable<IGridTemplate>
    // private selected$: Subject<IGridSelectedTemplate> = new Subject();


    // selectTarget(): Observable<IGridRow | IGridColumn | IGridElement | undefined> {
    //     return this.selected().pipe(map(state => state.target ? state[state.target] : undefined))
    // }

    // clearSelected(): void {
    //     this.selected$.next({});
    // }



        // if(selected) {
        // }
        // const findOperator = (i: IGridRow | IGridColumn | IGridElement) => i.id === selected!.parent_id;

        // this.grid$.pipe(
        //     filter(state => selected != undefined),
        //     map(state => {
        //         let result: IGridSelectedTemplate | undefined = undefined;

        //         switch (selected!.type) {
        //             case 'row': result = { 
        //                     target: 'row',
        //                     row: selected as IGridRow, 
        //                     col: state.cols.find(findOperator),
        //                 }; break;
        //             case 'column': result = { 
        //                     target: 'col',
        //                     col: selected as IGridColumn, 
        //                     row: state.rows.find(findOperator),
        //                 }; break;
        //                 case 'element': result = { 
        //                     target: 'element',
        //                     element: selected as IGridElement, 
        //                     col: state.cols.find(findOperator),
        //                 }; break;
        //         }

        //         return result
        //     }),
        //     takeUntil(this.destroy$)
        // ).subscribe(result => this.selected$.next(result))
    