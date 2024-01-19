import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { IThemeColors } from '../interfaces/theme/theme.interface';
import { Observable, Subject, combineLatest, filter, first, map, mergeMap, of, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { ThemeService } from '../services/root/theme.service';
import { IResize } from '../directives/resizable/resize.interface';
import { IGuideItems } from '../interfaces/guide.interface';
import { IGridRow } from '../grid/interfaces/grid-row.interface';
import { IGridColumn } from '../grid/interfaces/grid-column.interface';
import { ContainerType } from '../interfaces/column.type';
import { IGridElement } from '../grid/interfaces/grid-element.interface';
import { Destroy } from '../services/core/destroy.service';
import { ClassDataService } from '../grid/services/grid-class.service';
import { GridSelectionService } from '../grid/services/grid-selection.service';
import { GridTemplateService } from '../grid/services/grid-template.service';
import { GridContainerService } from '../grid/services/grid-container.service';
import { GridElementDataService } from '../grid/services/grid-element-data.service';
import { IElements } from '../interfaces/element.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BuilderDialogService } from './services/builder-dialog.service';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderComponent implements OnInit {
  
  title: WritableSignal<string> = signal('Анкета-заявка 115-ФЗ');
  formCreate: WritableSignal<boolean> = signal(false);
  themeName$: Observable<IThemeColors>
  container$: Observable<ContainerType>
  targetSelection$: Observable<IGridRow | IGridColumn | IGridElement | undefined>  
  targetClassList$: Observable<string>;
  elementList$: Observable<IElements>;
  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>
  containerSize$: Subject<IResize> = new Subject();
  selectContainerSize$ = this.containerSize$.asObservable().pipe(throttleTime(200));
  
  selectForm?: FormGroup;
  
  get selectsFormArray(): FormArray {
    return this.selectForm?.controls['selects'] as FormArray
  }

  sizeCodeList$: Observable<string[]>;
  offsetCodeList$: Observable<string[]>;
  createForm$: Observable<FormGroup>;
  formArraySizes$: Observable<FormArray>;
  formArrayOffsets$: Observable<FormArray>;
  formChanges$: Observable<{ sizes: string[], offsets: string[] }> | undefined;
  sizesChanges$: Observable<string[]> | undefined;
  offsetsChanges$: Observable<string[]> | undefined;

  routerExtracts$: Observable<NavigationExtras | undefined>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private destroy$: Destroy,
    private classData: ClassDataService,
    private elementData: GridElementDataService,
    private builderDialog: BuilderDialogService,
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService,
    private gridContainer: GridContainerService,
    private themeService: ThemeService) {
    this.themeName$ = this.themeService.selectCurrentThemeName()
    this.elementList$ = this.elementData.selectElementList();
    this.targetSelection$ = this.gridSelection.selectTarget();
    this.container$ = this.gridContainer.selectContainer();
    this.sizes$ = this.classData.selectBySize('col-lg');
    this.offsets$ = this.classData.selectByOffset('col-lg-offset');
    this.sizeCodeList$ = this.classData.selectSizesCodes();
    this.offsetCodeList$ = this.classData.selectOffsetsCodes();

    this.formArraySizes$ = this.sizeCodeList$.pipe(
      map(sizeList => this.fb.array(sizeList.map(code => false)))
    )

    this.formArrayOffsets$ = this.offsetCodeList$.pipe(
      map(offsetList => this.fb.array(offsetList.map(code => false)))
    )

    this.createForm$ = of(new FormGroup({})).pipe(
      switchMap((group) => this.formArraySizes$.pipe(
        map(array => { 
          group.addControl('sizes', array);
          return group;
        })
      )),
      
      switchMap((group) => this.formArrayOffsets$.pipe(
        map(array => {
          group.addControl('offsets', array)
          return group;
        })
      ))
    )




    this.targetClassList$ = this.targetSelection$.pipe(
      filter(selection => selection !== undefined && selection.type === 'column'), 
      map(selection => (selection as IGridColumn).class)
    );
    
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

  ngOnInit(): void {
    /**
     * Создаем форму
     */
    // this.createForm$.pipe(takeUntil(this.destroy$))
    // .subscribe(form => {
    //   this.sizesChanges$ = form.controls['sizes'].valueChanges.pipe(
    //     switchMap(changes => this.sizeCodeList$.pipe(
    //       map(sizeCodeList => sizeCodeList
    //         .map((code, index) => changes[index] === true ? sizeCodeList[index] : null)
    //         .filter(x => !!x) as string[])
    //       )
    //     ),
    //     tap(changes => console.log(changes.join().replaceAll(',', ' ')))
    //   )

    //   this.offsetsChanges$ = form.controls['offsets'].valueChanges.pipe(
    //     switchMap(changes => this.offsetCodeList$.pipe(
    //       map(offsetCodeList => offsetCodeList
    //         .map((code, index) => changes[index] === true ? offsetCodeList[index] : null)
    //         .filter(x => !!x) as string[])
    //       )
    //     ),
    //     tap(changes => console.log(changes))
    //   )

      // this.formChanges$ = combineLatest([
      //   form.valueChanges, this.sizeCodeList$, this.offsetCodeList$
      // ]).pipe(
      //   map(([changes, sizes, offsets]) => {
      //     const sizeCodes = sizes
      //       .map((code, index) => changes[index] === true ? sizes[index] : null)
      //       .filter(x => !!x) as string[];

      //     const offsetCodes = offsets
      //       .map((code, index) => changes[index] === true ? offsets[index] : null)
      //       .filter(x => !!x) as string[];

      //     return {
      //       sizes: sizeCodes,
      //       offsets: offsetCodes
      //     }
      //   }),
      //   // tap(({ sizes, offsets }) => null)
      // )
      
    //   this.selectForm = form;
    // });
  }

  ngAfterViewInit(): void {
    this.selectContainerSize$.pipe(
      tap(({ width }) => this.gridContainer.setContainerByWidth(width)), 
      mergeMap(_ => this.gridContainer.selectDisplay()), 
      tap(display => {
        const columnFilter = this.classData.createColumnSize('col', '-', display);
        const columnOffsetFilter = this.classData.createColumnOffset('col', '-', display, 'offset');
        
        this.sizes$ = this.classData.selectBySize(columnFilter);
        this.offsets$ = this.classData.selectByOffset(columnOffsetFilter);
      }),
      switchMap(display => this.createForm$),
      takeUntil(this.destroy$)
    ).subscribe((form) => {
      this.sizesChanges$ = form.controls['sizes'].valueChanges.pipe(
        switchMap(changes => this.sizeCodeList$.pipe(
          map(sizeCodeList => sizeCodeList
            .map((code, index) => changes[index] === true ? sizeCodeList[index] : null)
            .filter(x => !!x) as string[])
          )
        ),
        tap(changes => console.log(changes.join().replaceAll(',', ' ')))
      )

      this.offsetsChanges$ = form.controls['offsets'].valueChanges.pipe(
        switchMap(changes => this.offsetCodeList$.pipe(
          map(offsetCodeList => offsetCodeList
            .map((code, index) => changes[index] === true ? offsetCodeList[index] : null)
            .filter(x => !!x) as string[])
          )
        ),
        tap(changes => console.log(changes))
      )

      this.selectForm = form;
      this.formCreate.set(true)
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
