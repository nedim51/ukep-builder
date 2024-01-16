import { AfterViewInit, ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GridTemplateService } from './components/grid/services/grid-template.service';
import { elements } from './services/grid-element.data';
import { GridContainerService } from './services/grid-container.service';
import { Observable, Subject, filter, map, switchMap, takeUntil, tap, throttleTime } from 'rxjs';
import { ResizableDirective } from './directives/resizable/resizable.directive';
import { DraggableDropzoneDirective } from './directives/draggable-dropzone/draggable-dropzone.directive';
import { IGridRow } from './components/grid/interfaces/grid-row.interface';
import { DraggableDirective } from './directives/draggable/draggable.directive';
import { GridModule } from './components/grid/grid.module';
import { GridSelectionService } from './components/grid/services/grid-selection.service';
import { IGridColumn } from './components/grid/interfaces/grid-column.interface';
import { IGridElement } from './components/grid/interfaces/grid-element.interface';
import { ClassDataService } from './services/class-data.service';
import { IGuideItems } from './interfaces/guide.interface';
import { IResize } from './directives/resizable/resize.interface';
import { Destroy } from './services/core/destroy.service';
import { ContainerType } from './interfaces/column.type';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, GridModule, DraggableDropzoneDirective, ResizableDirective, DraggableDirective],
  providers: [
    {
      multi: false,
      provide: ClassDataService,
      useFactory: () => {
        const classDataService = new ClassDataService();
        classDataService.initState();
        return classDataService;
      },
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent1 implements AfterViewInit {

  public readonly componentList = elements;

  container$: Observable<ContainerType>

  targetSelection$: Observable<IGridRow | IGridColumn | IGridElement | undefined>  
  targetClassList$: Observable<string>;

  // selectSelected$: Observable<IGridSelectedTemplate>;
  sizes$: Observable<IGuideItems>
  offsets$: Observable<IGuideItems>

  containerSize$: Subject<IResize> = new Subject();

  selectContainerSize$ = this.containerSize$.asObservable()
  .pipe(throttleTime(200));

  constructor(
    private destroy$: Destroy,
    private classData: ClassDataService,
    private gridSelection: GridSelectionService,
    private gridTemplate: GridTemplateService,
    private gridContainer: GridContainerService) {
      
    this.targetSelection$ = this.gridSelection.selectTarget()
    this.targetClassList$ = this.targetSelection$.pipe(
      filter(selection => selection !== undefined && selection.type === 'column'), 
      map(selection => (selection as IGridColumn).class)
    );
    this.container$ = this.gridContainer.selectContainer();

    this.sizes$ = this.classData.selectBySize('col-lg');
    this.offsets$ = this.classData.selectByOffset('col-lg-offset');
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

  handleDroppedItem(item: IGridRow): void {
    switch (item.type) {
      case 'row': this.gridTemplate.appendRowById(item.id, null, null);
        break;
    }

    // console.log(`[AppComponent] handleDroppedItem [DROP_TYPE = ${item.type.toUpperCase()}]`, item)
  }

  expanded: WritableSignal<boolean> = signal(false);

  showCheckboxes() {
    this.expanded.update(() => !this.expanded())
  }

  onCheckboxChange(event: any, value: string, target: any): void {
    this.gridTemplate.setColumnClass(target, value, event.target.checked)
  }

  onResizeContainer(size: IResize): void {
    this.containerSize$.next(size)
  }

  export() {
    this.gridTemplate.export();
  }
}

  // this.selectSelected$ = this.gridSelected.selected()

  // this.items$ = of(this.createColumnClassList()).pipe(
  //   map(items => items.map(i => i.list).flat()), tap(console.log))
  // console.log(this.createColumnClassList())
  // console.log(this.createColumnOffsetClassList())


  // Создаем список col-{size}-{n} классов
  // createColumnClassList(): { sizes: string, list: IColumnClassList }[] {
  //   let resultArray: { sizes: string, list: IColumnClassList }[] = [];
  //   const startWith: number = 1;
  //   const maxColumn: number = 12;

  //   for (let item of ['col-xs', 'col-sm', 'col-md', 'col-lg']) {
  //     resultArray.push({ sizes: item, list: createClassList(item, item, startWith, maxColumn) });
  //   }

  //   return resultArray;
  // }

  // Создаем список col-{size}-offset-{n} классов
  // createColumnOffsetClassList(): { sizes: string, list: IColumnClassList }[] {
  //   let resultArray: { sizes: string, list: IColumnClassList }[] = [];
  //   const startWith: number = 0;
  //   const maxColumn: number = 12;

  //   for (let item of ['col-xs-offset', 'col-sm-offset', 'col-md-offset', 'col-lg-offset']) {
  //     resultArray.push({ sizes: item, list: createClassList(item, item, startWith, maxColumn) });
  //   }

  //   return resultArray;
  // }



  // selected: IColumn | undefined = undefined;

  // items: IColumn[] = [
  //   {
  //     id: 0,
  //     name: 'col-xs',
  //     value: 'col-xs',
  //   },
  //   {
  //     id: 1,
  //     name: 'col-sm',
  //     value: 'col-sm',
  //   },
  //   {
  //     id: 2,
  //     name: 'col-md',
  //     value: 'col-md',
  //   },
  //   {
  //     id: 3,
  //     name: 'col-lg',
  //     value: 'col-lg',
  //   },
  //   {
  //     id: 4,
  //     name: 'col-lg-2',
  //     value: 'col-lg-2',
  //   },
  //   {
  //     id: 5,
  //     name: 'col-lg-3',
  //     value: 'col-lg-3',
  //   },
  //   {
  //     id: 6,
  //     name: 'col-lg-offset-3',
  //     value: 'col-lg-offset-3',
  //   },
  // ]

// interface IColumn {
//   id: number;
//   name: string;
//   value: string;
// }




// interface IColumnClass {
//   id: number;
//   name: string;
//   code: string;
// }

// type IColumnClassList = Array<IColumnClass>;

// function createClassList(name: string, code: string, startWith: number = 0, count: number): IColumnClassList {
//   if (count <= 0) {
//     return [];
//   }

//   const classList: IColumnClassList = [];

//   for (let i = 0; i < count; i++) {
//     const iColumnClass: IColumnClass = {
//       id: i + startWith,
//       name: `${name}-${i + startWith}`,
//       code: `${code}-${i + startWith}`,
//     };

//     classList.push(iColumnClass);
//   }

//   return classList;
// }

// // Создаем список col-{size}-{n} классов
// for (let item of ['col-xs', 'col-sm', 'col-md', 'col-lg']) {
//   const resultArray = createClassList(item, item, 1, 12);
// }
// // Создаем список col-{size}-offset-{n} классов
// for (let item of ['col-xs-offset', 'col-sm-offset', 'col-md-offset', 'col-lg-offset']) {
//   const resultArray = createClassList(item, item, 0, 11);
// }


// 'col-xs-(1 - 12)' + 'col-xs-offset-(0-11)'
// 'col-sm' + 'col-sm-offset-0'
// 'col-md' + 'col-md-offset-0'
// 'col-lg' + 'col-lg-offset-0'