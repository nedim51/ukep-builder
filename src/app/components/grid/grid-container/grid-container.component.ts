import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { GridTemplateService } from '../services/grid-template.service';
import { Observable } from 'rxjs';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { IGridColumn, INITIAL_GRID_COLUMN } from '../interfaces/grid-column.interface';
import { GridSelectionService } from '../services/grid-selection.service';

const BEGIN_ROWS: number = 4;
const BEGIN_COLUMNS: number = 1;

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerComponent {

  @HostBinding('class.container') 
  grid_class: boolean = true;
  
  @HostListener('click', ['$event']) clearSelection(event: MouseEvent) {
    if(['APP-GRID-CONTAINER', 'APP-GRID-ROW'].includes((event.target as Element).tagName)) {
      this.gridSelection.setSelection(INITIAL_GRID_COLUMN);
    }
  }

  rows$: Observable<IGridRows>;
  canUndo$: Observable<boolean>;
  canRedo$: Observable<boolean>;

  constructor(
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService) {
    this.rows$ = this.gridTemplate.selectRows(null);
    this.canUndo$ = this.gridTemplate.canUndo();
    this.canRedo$ = this.gridTemplate.canRedo();
  }

  createFirstColumns(): void {
    this.gridTemplate.insertFirstTemplate(BEGIN_ROWS, BEGIN_COLUMNS);
  }

  handleDroppedItem(item: IGridColumn, target: IGridRow): void {
    switch(item.type) {
      case 'column': this.gridTemplate.appendColumnById(item.id, target.id, target.type);
    }
    
    // console.log(`[GridContainerComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }
}
