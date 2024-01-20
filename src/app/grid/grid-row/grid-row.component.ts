import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridTemplateService } from '../services/grid-template.service';
import { Observable, of } from 'rxjs';
import { IGridRow, INITIAL_GRID_ROW } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns } from '../interfaces/grid-column.interface';
import { IGridElement } from '../interfaces/grid-element.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { GridElementService } from '../services/grid-element.service';

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
    private gridTemplate: GridTemplateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['row'].firstChange) {
      this.columns$ = this.gridTemplate.selectColumns(changes['row'].currentValue.id);
      this.selectedRow$ = this.gridSelection.selectByType('rows', changes['row'].currentValue.id) as Observable<IGridRow | undefined>;
    }
  }

  appendColumn(row: IGridRow): void {
    this.gridTemplate.insertFirstColumn(row);
  }

  onAppendRowTop(selected: IGridRow): void {
    const rowBottom: 0 | 1 = 0;
    this.gridTemplate.insertRow(selected, rowBottom);
  }
  
  onAppendRowBottom(selected: IGridRow): void {
    const rowBottom: 0 | 1 = 1;
    this.gridTemplate.insertRow(selected, rowBottom);
  }
  
  removeSelf(row: IGridRow): void {
    this.gridTemplate.removeRow(row);
  }

  onRemoveRow(row: IGridRow): void {
    this.gridTemplate.removeRowColumns(row);
  }

  handleDroppedItem(item: IGridRow | IGridElement, target: IGridColumn): void {
    switch(item.type) {
      case 'element': {
        this.gridTemplate.appendElementById(item.id, target.id, target.type);
        this.gridElement.setElement((item as IGridElement).element_id, item.id, item.index); 
      }
        break;
      case 'row': this.gridTemplate.appendRowById(item.id, target.id, target.type);
        break;
    }
    
    // console.log(`[GridRowComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item);
  }
}
