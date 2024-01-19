import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { IThemeColors } from '../interfaces/theme/theme.interface';
import { EMPTY, Observable, Subject, filter, first, map, mergeMap, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { ThemeService } from '../services/core/theme.service';
import { IResize } from '../directives/resizable/resize.interface';
import { IGuideItems } from '../interfaces/guide.interface';
import { IGridRow } from '../components/grid/interfaces/grid-row.interface';
import { IGridColumn } from '../components/grid/interfaces/grid-column.interface';
import { ContainerType } from '../interfaces/column.type';
import { IGridElement } from '../components/grid/interfaces/grid-element.interface';
import { Destroy } from '../services/core/destroy.service';
import { ClassDataService } from '../services/class-data.service';
import { GridSelectionService } from '../components/grid/services/grid-selection.service';
import { GridTemplateService } from '../components/grid/services/grid-template.service';
import { GridContainerService } from '../services/grid-container.service';
import { GridElementDataService } from '../components/grid/services/grid-element-data.service';
import { IElements } from '../interfaces/element.interface';
import { FormGroup } from '@angular/forms';
import { BuilderDialogService } from './builder-dialog.service';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderComponent {
  
  title: WritableSignal<string> = signal('Анкета-заявка 115-ФЗ');
  themeName$: Observable<IThemeColors>
  container$: Observable<ContainerType>
  targetSelection$: Observable<IGridRow | IGridColumn | IGridElement | undefined>  
  targetClassList$: Observable<string>;
  elementList$: Observable<IElements>;
  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>
  containerSize$: Subject<IResize> = new Subject();
  selectContainerSize$ = this.containerSize$.asObservable().pipe(throttleTime(200));
  
  selectForm: FormGroup = new FormGroup({})

  routerExtracts$: Observable<NavigationExtras | undefined>;

  constructor(
    private builderDialog: BuilderDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private destroy$: Destroy,
    private elementData: GridElementDataService,
    private classData: ClassDataService,
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService,
    private gridContainer: GridContainerService,
    private themeService: ThemeService) {
    this.themeName$ = this.themeService.selectCurrentThemeName()
    this.elementList$ = this.elementData.selectElementList();
    this.targetSelection$ = this.gridSelection.selectTarget()
    this.targetClassList$ = this.targetSelection$.pipe(
      filter(selection => selection !== undefined && selection.type === 'column'), 
      map(selection => (selection as IGridColumn).class)
    );
    this.container$ = this.gridContainer.selectContainer();

    this.sizes$ = this.classData.selectBySize('col-lg');
    this.offsets$ = this.classData.selectByOffset('col-lg-offset');
    
    this.routerExtracts$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      map(event => this.router.getCurrentNavigation()?.extras)
    );

    this.routerExtracts$.pipe(
      map(extracts => extracts && extracts.state ? extracts.state : undefined),
      first(),
      takeUntil(this.destroy$)
    ).subscribe(state => {
      if(state && state['template']) {
        this.gridTemplate.insertFirstTemplate(state['template']['rows'], state['template']['cols']);
      }

      if(state && state['dialog'] && state['dialog'] === 'drawTemplate') {
        this.builderDialog.drawGridDialog('asdasdasd').subscribe()
      }

      this.router.navigate([], { state: undefined })
    });
  }

  ngAfterViewInit(): void {
    this.selectContainerSize$.pipe(
      tap(({ width }) => this.gridContainer.setContainerByWidth(width)), 
      mergeMap(_ => this.gridContainer.selectDisplay()), 
      takeUntil(this.destroy$)
    ).subscribe((display) => {
      const columnFilter = this.classData.createColumnSize('col', '-', display);
      const columnOffsetFilter = this.classData.createColumnOffset('col', '-', display, 'offset')
      
      this.sizes$ = this.classData.selectBySize(columnFilter)
      this.offsets$ = this.classData.selectByOffset(columnOffsetFilter)
    })
  }
  
  onDragStart(event: DragEvent, id: number): void {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${id}`);
    }
  }

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.gridTemplate.appendRowById(item.id, null, null);
        break;
    }
    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }

  onCheckboxChange(event: any, value: string, target: any): void {
    this.gridTemplate.setColumnClass(target, value, event.target.checked)
  }

  onResizeContainer(size: IResize): void {
    this.containerSize$.next(size);
  }

  export(): void {
    this.gridTemplate.export();
  }

  undo(): void {
    this.gridTemplate.undo();
  }

  redo(): void {
    this.gridTemplate.redo();
  }
}
