import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridTemplateService } from '../services/grid-template.service';
import { IGridColumn, INITIAL_GRID_COLUMN } from '../interfaces/grid-column.interface';
import { Observable, of } from 'rxjs';
import { IGridElements } from '../interfaces/grid-element.interface';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { GridSelectionService } from '../services/grid-selection.service';

@Component({
  selector: 'app-grid-col',
  templateUrl: './grid-col.component.html',
  styleUrl: './grid-col.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColComponent implements OnChanges {
  
  @Input({ alias: 'column' })
  column: IGridColumn = INITIAL_GRID_COLUMN;

  @HostBinding('class') 
  col_class: string = 'col col-xs col-sm col-md col-lg';
  
  @HostBinding('attr.tabindex') 
  tabindex: number = 0;

  @HostListener('focus', ['$event'])
  onColumnFocus(event: any) {
    this.gridSelection.setSelection(this.column)
  }

  rows$: Observable<IGridRows> = of([])
  elements$: Observable<IGridElements> = of([])
  column$: Observable<IGridColumn | undefined> = of(undefined)
  canInsertNewColumn$: Observable<boolean> = of(false)

  constructor(
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['column'].firstChange) {
      const column_id: number = changes['column'].currentValue.id;
      const column_parent_id: number | null = changes['column'].currentValue.parent_id;

      this.rows$ = this.gridTemplate.selectRows(column_id)
      this.elements$ = this.gridTemplate.selectElements(column_id)
      this.column$ = this.gridSelection.selectByType('cols', column_id) as Observable<IGridColumn | undefined>;
      this.canInsertNewColumn$ = this.gridTemplate.selectCanInsertNewColumn(column_parent_id);
    }
    
    if(changes['column'].currentValue && changes['column'].previousValue && changes['column'].currentValue.class != changes['column'].previousValue.class) {
      this.col_class = (changes['column'].currentValue as IGridColumn).class;
    }
  }

  onAppendColumnLeft(selected: IGridColumn): void {
    this.gridTemplate.insertColumn(selected, 0);
  }

  onAppendColumnRight(selected: IGridColumn): void {
    this.gridTemplate.insertColumn(selected, 1);
  }

  onRemoveColumn(selected: IGridColumn): void {
    this.gridTemplate.removeColumn(selected)
  }

  // Обработчик на случай если дропнули колонку в строку
  handleDroppedItem(item: IGridColumn, target: IGridRow): void {
    switch(item.type) {
      case 'column': this.gridTemplate.appendColumnById(item.id, target.id, target.type);
    }

    console.log(`[GridColComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }
}
