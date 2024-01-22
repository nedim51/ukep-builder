import { AfterViewInit, ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { IThemeColors } from '../interfaces/theme/theme.interface';
import { Observable, Subject, distinctUntilChanged, filter, first, map, merge, of, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { ThemeService } from '../services/root/theme.service';
import { IResize } from '../directives/resizable/resize.interface';
import { IGuideItems } from '../interfaces/guide.interface';
import { IGridRow } from '../grid/interfaces/grid-row.interface';
import { IGridColumn } from '../grid/interfaces/grid-column.interface';
import { ColumnDisplayType, ColumnSizeOffsetType, ColumnSizeType, ContainerType } from '../grid/interfaces/grid-column.type';
import { IGridElement } from '../grid/interfaces/grid-element.interface';
import { Destroy } from '../services/core/destroy.service';
import { ClassDataService } from '../grid/services/grid-class.service';
import { GridSelectionService } from '../grid/services/grid-selection.service';
import { GridService, findChildrenRecursive } from '../grid/services/grid.service';
import { GridContainerService } from '../grid/services/grid-container.service';
import { GridElementDataService } from '../grid/services/grid-element-data.service';
import { IElements } from '../interfaces/element.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { BuilderDialogService } from './services/builder-dialog.service';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { BuilderParamsService } from './services/builder-params.service';
import { ElementType, ElementTypeIdx, GridElementService } from '../grid/services/grid-element.service';
import { GridObjectEnum } from '../grid/interfaces/grid-object.type';
import { ElementEnum } from '../grid/services/grid-element.data';
import { CONTROL_PARAMS, ControlParamTypeEnum, IControlParam } from '../interfaces/template/control-param.interface';
import { collapseItems, DEFAULT_DURATION } from '../helpers/animations';
import { downloadFile } from '../helpers/helper';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    collapseItems(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType)
  ]
})
export class BuilderComponent implements AfterViewInit {
  
  readonly elementEnum = ElementEnum;
  readonly contolParamType = ControlParamTypeEnum;
  
  title: WritableSignal<string> = signal('Анкета-заявка 115-ФЗ');
  themeName$: Observable<IThemeColors>
  container$: Observable<ContainerType>
  targetSelection$: Observable<IGridRow | IGridColumn | IGridElement | undefined>  
  targetClassList$: Observable<string>;
  elementList$: Observable<IElements>;
  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>
  containerSize$: Subject<IResize> = new Subject();
  selectContainerSize$ = this.containerSize$.asObservable().pipe(
    throttleTime(200)
  );
  
  selectForm?: WritableSignal<FormGroup>;
  
  get selectsFormArray(): FormArray | undefined {
    if(!this.selectForm) return undefined

    return this.selectForm().controls['selects'] as FormArray 
  }

  sizeCodeList$: Observable<string[]>;
  offsetCodeList$: Observable<string[]>;
  formChanges$: Observable<{ sizes: string[], offsets: string[] }> | undefined;
  sizesChanges$?: Observable<string[]>
  offsetsChanges$?: Observable<string[]>
  
  routerExtracts$: Observable<NavigationExtras | undefined>;

  element$?: Observable<Array<IControlParam & { element: ElementType, key2: ElementTypeIdx }> | undefined>;

  constructor(
    private router: Router,
    private destroy$: Destroy,
    private classData: ClassDataService,
    private gridElement: GridElementService,
    private buildParams: BuilderParamsService,
    private elementData: GridElementDataService,
    private builderDialog: BuilderDialogService,
    private gridSelection: GridSelectionService,
    private grid: GridService,
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
    // this.element$ = this.gridElement.selectElementById(null)
    this.targetClassList$ = this.targetSelection$.pipe(
      filter(selection => selection !== undefined && selection.type === GridObjectEnum.Column), 
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
        this.grid.insertFirstTemplate(state['template']['rows'], state['template']['cols']);
      }

      if(state && state['dialog'] && state['dialog'] === 'drawTemplate') {
        this.builderDialog.drawGridDialog('asdasdasd').subscribe()
      }

      this.router.navigate([], { state: undefined })
    });
  }

  updateClassList(display: ColumnDisplayType, size: ColumnSizeType, offset: ColumnSizeOffsetType): void {
    this.gridContainer.setContainer(display);
    this.sizes$ = this.classData.selectBySize(size);
    this.offsets$ = this.classData.selectByOffset(offset);
  }

  ngAfterViewInit(): void {
    merge(
      /**
       * Ждем события фокуса на объект или событие изменения контейнера
       */
      this.targetSelection$.pipe(
        switchMap(selection => {
          return this.gridContainer.selectDisplay().pipe(
            map(display => {
              return {
                selection: selection,
                size: this.classData.createColumnSize('col', '-', display),
                offset: this.classData.createColumnOffset('col', '-', display, 'offset')
              }
            })
          )
        })
      ),

      this.selectContainerSize$.pipe(
        map(({ width }) => this.gridContainer.getContainerByWidth(width)),
        distinctUntilChanged(), 
        filter(display => display != undefined),
        switchMap((display) => {
          const columnFilter = this.classData.createColumnSize('col', '-', display as ColumnDisplayType);
          const columnOffsetFilter = this.classData.createColumnOffset('col', '-', display as ColumnDisplayType, 'offset');
          
          this.updateClassList(display as ColumnDisplayType, columnFilter, columnOffsetFilter);
  
          return this.targetSelection$.pipe(
            map(selection => {
              return {
                selection: selection,
                size: columnFilter,
                offset: columnOffsetFilter
              }
            }) 
          )
        })
      )
    )
    .pipe( 
      tap(_ => this.element$ = of(undefined)),
      filter(selection => selection != undefined && selection.selection != undefined),

      tap(selection => {
        if(selection.selection!.type === GridObjectEnum.Element) {
          this.element$ = this.gridElement.selectElementById(selection.selection!.id).pipe(
            map(elementParams => {
              if(!elementParams) 
                return undefined;

              const keys = Object.keys(elementParams);

              return CONTROL_PARAMS.filter(param => keys.includes(param.key)).map(params => { 
                return { 
                  ...params, 
                  key2: params.key as ElementTypeIdx,
                  element: elementParams 
                }
              })
            })
          )
        }

        this.selectForm = undefined
      }),

      filter(selection => selection!.selection!.type === GridObjectEnum.Column),
      
      distinctUntilChanged((prev, curr) => prev!.selection!.type != curr!.selection!.type),

      switchMap((targetSelection) => {
        const classList = (targetSelection.selection as IGridColumn).class.split(' ');
        return this.buildParams.createForm(classList, { size: targetSelection.size, offset: targetSelection.offset }).pipe(
          map(form => { 
            return { 
              form: form, 
              selection: targetSelection.selection as IGridColumn,
              size: targetSelection.size,
              offset: targetSelection.offset
            }
          })
        )
      }),
      takeUntil(this.destroy$)
    ).subscribe(({ form, selection, size, offset }) => {

      this.sizesChanges$ = form.controls['sizes'].valueChanges.pipe(
        switchMap(changes => this.classData.selectBySize(size).pipe(
          map(sizes => sizes.map(size => size.code)),
          map(codes => codes
            .map((code, index) => changes[index] === true ? codes[index] : null)
            .filter(x => !!x) as string[])
          )
        ),
        tap(changes => {
          this.grid.setColumnClass2(selection, changes.join().replaceAll(',', ' '))
        })
      )

      this.offsetsChanges$ = form.controls['offsets'].valueChanges.pipe(
        switchMap(changes => this.classData.selectByOffset(offset).pipe(
          map(offsets => offsets.map(offset => offset.code)),
          map(codes => codes
            .map((code, index) => changes[index] === true ? codes[index] : null)
            .filter(x => !!x) as string[])
          )
        ),
        tap(changes => {
          this.grid.setColumnClass2(selection, changes.join().replaceAll(',', ' '))
        })
      )

      this.selectForm = signal(form);
    })
  }
  
  onDragStart(event: DragEvent, id: number): void {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', `${id}`);
    }
  }

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.grid.appendRowById(item.id, null, null);
        break;
    }
    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }

  onCheckboxChange(event: any, value: string, target: any): void {
    this.grid.setColumnClass(target, value, event.target.checked)
  }

  onResizeContainer(size: IResize): void {
    this.containerSize$.next(size);
  }

  export(): void {
    this.grid.export()
    .pipe(first())
    .subscribe(result => 
      console.log(findChildrenRecursive(result, 3))
      // downloadFile('grid export.json', JSON.stringify(result))
    );
  }

  undo(): void {
    this.grid.undo();
  }

  redo(): void {
    this.grid.redo();
  }
}











        // map(({ width }) => this.gridContainer.getContainerByWidth(width)),
        // distinctUntilChanged(), 
        // filter(display => display != undefined),
        // switchMap(display => {
        //   this.gridContainer.setContainer(display as ColumnDisplayType);

        //   const columnFilter = this.classData.createColumnSize('col', '-', display as ColumnDisplayType);
        //   const columnOffsetFilter = this.classData.createColumnOffset('col', '-', display as ColumnDisplayType, 'offset');

        //   this.sizes$ = this.classData.selectBySize(columnFilter);
        //   this.offsets$ = this.classData.selectByOffset(columnOffsetFilter);

        //   return this.targetSelection$
        // })


  // createForm$: Observable<FormGroup>;
  // formArraySizes$: Observable<FormArray>;
  // formArrayOffsets$: Observable<FormArray>;

    // private fb: FormBuilder,

    // this.formArraySizes$ = this.sizeCodeList$.pipe(
    //   map(sizeList => this.fb.array(sizeList.map(code => false))) // не false а определять существующие классы !!!
    // )

    // this.formArrayOffsets$ = this.offsetCodeList$.pipe(
    //   map(offsetList => this.fb.array(offsetList.map(code => false))) // не false а определять существующие классы !!!
    // )

    // this.createForm$ = of(new FormGroup({})).pipe(
    //   switchMap((group) => this.formArraySizes$.pipe(
    //     map(array => { 
    //       group.addControl('sizes', array);
    //       return group;
    //     })
    //   )),
      
    //   switchMap((group) => this.formArrayOffsets$.pipe(
    //     map(array => {
    //       group.addControl('offsets', array)
    //       return group;
    //     })
    //   ))
    // )


  // ngOnInit(): void {
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
  // }

  // createSizesFormArray(source: string[]): Observable<FormArray> {
  //   return this.sizeCodeList$.pipe(
  //     map(sizeList => this.fb.array(sizeList.map(code => source.includes(code)))) // не false а определять существующие классы !!!
  //   )
  // }

  // createOffsetsFormArray(source: string[]): Observable<FormArray> {
  //   return this.offsetCodeList$.pipe(
  //     map(offsetList => this.fb.array(offsetList.map(code => source.includes(code)))) // не false а определять существующие классы !!!
  //   )
  // }

  // createFormGroup(): FormGroup<{ sizes: FormArray<any>, offsets: FormArray<any> }> {
  //   return new FormGroup({
  //     sizes: this.fb.array([]),
  //     offsets: this.fb.array([])
  //   })
  // }

        // switchMap((group) => {
        //   const classList = (targetSelection as IGridColumn).class.split(' ');
        //   console.log(classList)
        //   return this.createSizesFormArray(classList).pipe(
        //     map(array => { 
        //       group.addControl('sizes', array);
        //       return group;
        //     })
        //   )
        // }),
        
        // switchMap((group) => this.createOffsetsFormArray((targetSelection as IGridColumn).class.split(' ')).pipe(
        //   map(array => {
        //     group.addControl('offsets', array)
        //     return group;
        //   })
        // ))