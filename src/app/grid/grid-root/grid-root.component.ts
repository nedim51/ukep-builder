import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { IResize } from '../../directives/resizable/resize.interface';
import { ClassDataService } from '../services/grid-class.service';
import { Destroy } from '../../services/core/destroy.service';
import { ThemeService } from '../../services/root/theme.service';
import { GridContainerService } from '../services/grid-container.service';
import { IGridRow } from '../interfaces/grid-row.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { GridTemplateService } from '../services/grid-template.service';
import { ContainerType } from '../../interfaces/column.type';
import { IGuideItems } from '../../interfaces/guide.interface';

@Component({
  selector: 'app-grid-root',
  templateUrl: './grid-root.component.html',
  styleUrl: './grid-root.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridRootComponent implements AfterViewInit {

  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>
  containerSize$: Subject<IResize> = new Subject();
  container$: Observable<ContainerType>;
  selectContainerSize$ = this.containerSize$.asObservable()
    .pipe(throttleTime(200));

  @Output()
  resize: EventEmitter<IResize> = new EventEmitter();

  constructor(
    private destroy$: Destroy,
    private classData: ClassDataService,
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService,
    private gridContainer: GridContainerService,
    private themeService: ThemeService) {
      
    this.sizes$ = this.classData.selectBySize('col-lg');
    this.offsets$ = this.classData.selectByOffset('col-lg-offset');
    this.container$ = this.gridContainer.selectContainer();
  }
  
  ngAfterViewInit(): void {
    this.selectContainerSize$.pipe(
      tap(({ width }) => this.gridContainer.setContainerByWidth(width)), 
      switchMap(_ => this.gridContainer.selectDisplay()), 
      takeUntil(this.destroy$)
    ).subscribe((display) => {
      const columnFilter = this.classData.createColumnSize('col', '-', display);
      const columnOffsetFilter = this.classData.createColumnOffset('col', '-', display, 'offset')
      
      this.sizes$ = this.classData.selectBySize(columnFilter)
      this.offsets$ = this.classData.selectByOffset(columnOffsetFilter)
    })
  }

  onDragStart(event: DragEvent, id: number) {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${id}`);
    }
  }

  onResizeContainer(size: IResize): void {
    this.containerSize$.next(size);
    this.resize.emit(size);
  }

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.gridTemplate.appendRowById(item.id, null, null);
        break;
    }

    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }
}
