import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridService } from '../services/grid.service';
import { Observable, of } from 'rxjs';
import { IGridRow, INITIAL_GRID_ROW } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns } from '../interfaces/grid-column.interface';
import { IGridElement } from '../interfaces/grid-element.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { GridElementService } from '../services/grid-element.service';
import { GridObjectEnum } from '../interfaces/grid-object.type';

@Component({
  selector: 'app-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrl: './grid-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridRowComponent implements OnChanges {

  @HostBinding('class.row') 
  row_class: boolean = true;

  // @HostBinding('attr.tabindex') 
  // tabindex: number = 0;

  @Input({ alias: 'row' }) 
  row: IGridRow = INITIAL_GRID_ROW;

  columns$: Observable<IGridColumns> = of([]);
  selectedRow$: Observable<IGridRow | undefined> = of(undefined);

  constructor(
    private gridElement: GridElementService,
    private gridSelection: GridSelectionService,
    private grid: GridService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['row'].firstChange) {
      this.columns$ = this.grid.selectColumns(changes['row'].currentValue.id);
      this.selectedRow$ = this.gridSelection.selectByType('rows', changes['row'].currentValue.id) as Observable<IGridRow | undefined>;
    }
  }

  appendColumn(row: IGridRow): void {
    this.grid.insertFirstColumn(row);
  }

  onAppendRowTop(selected: IGridRow): void {
    const rowBottom: 0 | 1 = 0;
    this.grid.insertRow(selected, rowBottom);
  }
  
  onAppendRowBottom(selected: IGridRow): void {
    const rowBottom: 0 | 1 = 1;
    this.grid.insertRow(selected, rowBottom);
  }
  
  removeSelf(row: IGridRow): void {
    this.grid.removeRow(row);
  }

  onRemoveRow(row: IGridRow): void {
    this.grid.removeRowColumns(row);
  }

  handleDroppedItem(item: IGridRow | IGridElement, target: IGridColumn): void {
    switch(item.type) {
      case GridObjectEnum.Element: {
        const newElement = this.grid.appendElementById(item.id, target.id, target.type);
        this.gridElement.setElement(item.id, newElement.id, newElement.index); 
      }
        break;
      case GridObjectEnum.Row: this.grid.appendRowById(item.id, target.id, target.type);
        break;
    }
    
    // console.log(`[GridRowComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item);
  }
}
