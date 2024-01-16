import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';
import { IResize } from '../../../directives/resizable/resize.interface';
import { ClassDataService } from '../../../services/class-data.service';
import { Destroy } from '../../../services/core/destroy.service';
import { ThemeService } from '../../../services/core/theme.service';
import { GridContainerService } from '../../../services/grid-container.service';
import { IGridColumn } from '../interfaces/grid-column.interface';
import { IGridRow } from '../interfaces/grid-row.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { GridTemplateService } from '../services/grid-template.service';
import { ContainerType } from '../../../interfaces/column.type';

@Component({
  selector: 'app-grid-root',
  templateUrl: './grid-root.component.html',
  styleUrl: './grid-root.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridRootComponent {

  containerSize$: Subject<IResize> = new Subject();
  
  container$: Observable<ContainerType>
  constructor(
    private destroy$: Destroy,
    private classData: ClassDataService,
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService,
    private gridContainer: GridContainerService,
    private themeService: ThemeService) {
      
    this.container$ = this.gridContainer.selectContainer();
  }
  
  onDragStart(event: DragEvent, id: number) {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${id}`);
    }
  }

  onResizeContainer(size: IResize): void {
    this.containerSize$.next(size)
  }

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.gridTemplate.appendRowById(item.id, null, null);
        break;
    }

    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }
}
