import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { IResize } from '../../directives/resizable/resize.interface';
import { ClassDataService } from '../services/grid-class.service';
import { GridContainerService } from '../services/grid-container.service';
import { IGridRow } from '../interfaces/grid-row.interface';
import { GridService } from '../services/grid.service';
import { ContainerType } from '../interfaces/grid-column.type';
import { IGuideItems } from '../../interfaces/guide.interface';

@Component({
  selector: 'app-grid-root',
  templateUrl: './grid-root.component.html',
  styleUrl: './grid-root.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridRootComponent {

  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>
  container$: Observable<ContainerType>;

  @Output()
  resize: EventEmitter<IResize> = new EventEmitter();

  constructor(
    private classData: ClassDataService,
    private grid: GridService,
    private gridContainer: GridContainerService) {
    this.sizes$ = this.classData.selectBySize('col-lg');
    this.offsets$ = this.classData.selectByOffset('col-lg-offset');
    this.container$ = this.gridContainer.selectContainer();
  }

  onDragStart(event: DragEvent, id: number) {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${id}`);
    }
  }

  onResizeContainer(size: IResize): void {
    this.resize.emit(size);
  }

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.grid.appendRowById(item.id, null, null);
        break;
    }

    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }
}
