



// :host {
//     display: flex;
//     flex-direction: column;
//     box-sizing: border-box;
//     flex: 1 1 100%;
// }

// .root-container {
//     display: flex;
//     flex-direction: row;
//     flex: 1 1 100%;
//     box-sizing: border-box;
//     max-height: 100%;
// }

// .sidebar {
//     width: 300px;
//     padding: 15px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     background-color: aquamarine;

//     .sidebar-item {
//         border: 1px solid red;
//         border-radius: 10px;
//         padding: 7px;
//         cursor: move;
//     }
// }

// .container-fluid {
//     height: 100%;
// }

// .root {
//     display: flex;
//     flex-direction: column;
//     flex: 1 1 0%;
//     align-items: center;
//     box-sizing: border-box;
//     overflow-x: auto;

//     background-color: rgb(238, 238, 238);

//     padding: 20px;

//     .board {
//         border: 1px solid rgb(177, 177, 177);
//         background-color: #FFF;
//         height: 100%;
//         width: 100%;
//         transition: width .3s ease-in-out;
//         cursor: default;

//         &.resizable {
//             position: relative;
//         }

//         &.resizable::after {    
//             content: '';
//             position: absolute;
//             bottom: -2px;
//             right: -5px;

//             width: 1px; 
//             height: 1px; 
//             border-left: 6px solid transparent;
//             border-right: 6px solid transparent;
//             border-bottom: 6px solid rgb(177, 177, 177);

//             transform: rotate(135deg);
//         }

//         &.resizable--hover {
//             position: relative;
//             cursor: se-resize;
//             user-select: none;
//             transition: none;

//             &.resizable::after {
//                 border-bottom-color: red;
//             }
//         }

//         &.resizable--active {
//             position: relative;
//             cursor: se-resize;
//             user-select: none;
//             transition: none;

//             &.resizable::after {
//                 border-bottom-color: green;
//             }
//         }
//     }
// }





// .multiselect {
//     width: 200px;
//   }

//   .selectBox {
//     position: relative;
//   }

//   .selectBox select {
//     width: 100%;
//     font-weight: bold;
//   }

//   .overSelect {
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//   }

//   #checkboxes {
//     // display: none;
//     background-color: #FFF;
//     border: 1px #dadada solid;
//   }

// #checkboxes {

//     label {
//         display: block;
//     }

//     label, input {
//         cursor: pointer;
//     }
// }

// #checkboxes[data-theme=light] {

//     label:hover {
//         background-color: #1e90ff;
//     }
// }

// #checkboxes[data-theme=dark] {

//     label:hover {
//         background-color: #ff1e69;
//     }
// }






























// map(selected => {
//     let selectedItem;

//     switch (type) {
//         case 'row':
//             // selectedItem = selected.row;
//             break;
//         case 'column':
//             // selectedItem = selected.col;
//             break;
//         case 'element':
//             // selectedItem = selected.element;
//             break;
//     }

//     return selectedItem// && selectedItem.id === selected_id ? selectedItem : undefined;
// })


// initialSelection


    // private grid$: Observable<IGridTemplate>
    // private selected$: Subject<IGridSelectedTemplate> = new Subject();


    // selectTarget(): Observable<IGridRow | IGridColumn | IGridElement | undefined> {
    //     return this.selected().pipe(map(state => state.target ? state[state.target] : undefined))
    // }

    // clearSelected(): void {
    //     this.selected$.next({});
    // }



        // if(selected) {
        // }
        // const findOperator = (i: IGridRow | IGridColumn | IGridElement) => i.id === selected!.parent_id;

        // this.grid$.pipe(
        //     filter(state => selected != undefined),
        //     map(state => {
        //         let result: IGridSelectedTemplate | undefined = undefined;

        //         switch (selected!.type) {
        //             case 'row': result = { 
        //                     target: 'row',
        //                     row: selected as IGridRow, 
        //                     col: state.cols.find(findOperator),
        //                 }; break;
        //             case 'column': result = { 
        //                     target: 'col',
        //                     col: selected as IGridColumn, 
        //                     row: state.rows.find(findOperator),
        //                 }; break;
        //                 case 'element': result = { 
        //                     target: 'element',
        //                     element: selected as IGridElement, 
        //                     col: state.cols.find(findOperator),
        //                 }; break;
        //         }

        //         return result
        //     }),
        //     takeUntil(this.destroy$)
        // ).subscribe(result => this.selected$.next(result))
    



      // console.log(changes['column'].currentValue.class)
      // const uniqueValues = (changes['column'].currentValue as IGridColumn).class.split(' ').filter((value, index, array) => array.indexOf(value) === index);
//uniqueValues.join(' ')// console.log(this.col_class)
  
  // @HostBinding('class.drag-here') dragHereBinding: boolean = false;
  
  // @HostBinding('attr.dropzone') dropzone: boolean = true;

  // @HostListener('dragover', ['$event'])
  // onDragOver(event: any) {
  //   this.dragHereBinding = true
  //   event.preventDefault();
  // }

  // @HostListener('dragleave', ['$event'])
  // onDragLeave(event: any) {
  //   this.dragHereBinding = false
  // }

  // @HostListener('drop', ['$event'])
  // public onDrop(event: any) {
  //   this.dragHereBinding = false;
  //   if (event && event.dataTransfer) {
  //     const dropElementId: number = Number(event.dataTransfer.getData('text/plain'));
  //     this.gridTemplate.appendElementById(dropElementId, this.column.id, this.column.type)
  //   }
  // }


// Draggable ******************

// private isDragging = false;
// this.isDragging = true;


// @HostListener('dragend') onDragEnd() {
//   this.renderer.removeClass(this.el.nativeElement, 'dragging');
//   this.isDragging = false;
// }

// @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
//   event.preventDefault();
//   if (this.isDragging) {
//     this.renderer.addClass(this.el.nativeElement, 'drag-over');
//   }
// }

// @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
//   this.renderer.removeClass(this.el.nativeElement, 'drag-over');
// }

// @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
//   event.preventDefault();
//   this.renderer.removeClass(this.el.nativeElement, 'drag-over');
//   const droppedData = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');
  
//   // console.log('Dropped Data:', droppedData);
// }



// History Service


// const newState = this.history.reduce((prev, curr, idx) => {
//     return idx < this.currentIndex ? { ...prev, ...curr } : { ...prev }
// }, this.initialState)

// const previousState = this.history[this.currentIndex - 1] || this.initialState; 
// const currentState = this.history[this.currentIndex];

// const change = this.calculateChange(previousState as any, currentState);

// const newState = { ...previousState, ...change };

// this.setState(newState);



// Select Service


  // private selected$: Subject<IGridSelectedTemplate> = new Subject();

  // setSelected(selected: IGridRow | IGridColumn | IGridElement): void {
  //   let result: IGridSelectedTemplate | undefined = undefined;

  //   switch(selected.type) {
  //     case 'row':
  //       result = { row: selected as IGridRow, col: this.state.cols.find(i => i.id === selected.parent_id) };
  //       break;
  //     case 'column':
  //       result = { col: selected as IGridColumn, row: this.state.rows.find(i => i.id === selected.parent_id) };
  //       break;
  //     case 'element':
  //       result = { element: selected as IGridElement, col: this.state.cols.find(i => i.id === selected.parent_id) };
  //       break;
  //   }
    
  //   this.selected$.next(result);
  // }

  // selectSelected(): Observable<IGridSelectedTemplate> {
  //   return this.selected$.asObservable();
  // }

  // // Сделать рекурсивно -> будут плюшки
  // selectSelectedBy(type: 'row' | 'column' | 'element', selected_id: number): Observable<IGridRow | IGridColumn | IGridElement | undefined> {
  //   return this.selectSelected().pipe(
  //     map(selected => {
  //       let selectedItem;
  //       switch (type) {
  //         case 'row':
  //           selectedItem = selected.row;
  //           break;
  //         case 'column':
  //           selectedItem = selected.col;
  //           break;
  //         case 'element':
  //           selectedItem = selected.element;
  //           break;
  //       }

  //       return selectedItem && selectedItem.id === selected_id ? selectedItem : undefined;
  //     })
  //   )
  // }

  // clearSelected(): void {
  //   this.selected$.next({});
  // }

  

// Мюсли всякие








// ['col-xs', 'col-sm', 'col-md', 'col-lg'].join(' ');
// 'col-xs col-sm col-md col-lg'
// new Map(['col-xs', 'col-sm', 'col-md', 'col-lg']);
// VM4974:1 Uncaught TypeError: Iterator value col-xs is not an entry object
//     at new Map (<anonymous>)
//     at <anonymous>:1:1
// (анонимная) @ VM4974:1
// ['col-xs', 'col-sm', 'col-md', 'col-lg'].join(' ');
// 'col-xs col-sm col-md col-lg'
// let cols = ['col-xs', 'col-sm', 'col-md', 'col-lg', 'col-sm', 'col-md']
// undefined
// cols.filter((value, index, array) => cols.indexOf(value) === index);
// (4) ['col-xs', 'col-sm', 'col-md', 'col-lg']
// ['col-xs', 'col-sm', 'col-md', 'col-lg', 'col-sm', 'col-md'].filter((value, index, array) => array.indexOf(value) === index);
// (4) ['col-xs', 'col-sm', 'col-md', 'col-lg']

// 'col-xs-(1 - 12)' + 'col-xs-offset-(0-11)'
// 'col-sm' + 'col-sm-offset-0'
// 'col-md' + 'col-md-offset-0'
// 'col-lg' + 'col-lg-offset-0'

// 'col'

// 'xs'
// 'sm'
// 'md'
// 'lg'

// '1'
// '2'
// '3'
// '4'
// '5'
// '6'
// '7'
// '8'
// '9'
// '10'
// '11'
// '12'
// // type Concat<T extends string[]> = T["length"] extends 1 
// //   ? T[0] 
// //   : T["length"] extends 2
// //   ? `${T[0]}${T[1]}`
// //   : T["length"] extends 3
// //   ? `${T[0]}${T[1]}${T[2]}`
// //   : T["length"] extends 4
// //   ? `${T[0]}${T[1]}${T[2]}${T[3]}`
// //   : T["length"] extends 5
// //   ? `${T[0]}${T[1]}${T[2]}${T[3]}${T[4]}`
// //   : never;

// // type Concat<T extends string[]> = T["length"] extends 0 
// // ? "" : T extends [infer Head, ...infer Tail] ? `${Head}${Concat<Tail>}` : never;

// type Concat<T extends any[]> = T["length"] extends 0 ? "" : T extends [infer Head, ...infer Tail] ? `${Head & string}${Concat<Tail>}` : never;
// // type Result = Concat<[1, "B", "D"]>; // Результат: "1BD"
// // export const aa: Result = [1, 'B', 'D'];

// export type ColumnPrefixType = 'col';
// export type ColumnSeparatorType = '-';
// export type ColumnDisplayType = 'xs' | 'sm' | 'md' | 'lg';
// export type ColumnType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
// export type ColumnAutoType = Concat<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]>;
// export type ColumnsType = Concat<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType, ColumnSeparatorType, ColumnType]>;


// export function createColumnBy(prefix: ColumnPrefixType = 'col', display: ColumnDisplayType, col: ColumnType) {
//   return `${prefix}-${display}-${col}`;
// }



// const sa: ColumnsType = 'col-lg-10';

// createColumnBy(undefined, 'lg', '1')


// // export type ColAuto = (ColPrefixType & '-' & ColDisplayType);
// // export const a: ColAuto = `${'col'}${'-'}${'xs'}`


// // function makeKey(namespace: ColPrefixType, name: ColDisplayType): ColAuto {
// //     return namespace + '-' + name as `${ColPrefixType}-${N}`
// // }

// // const objKey = makeKey('admin', 'home');

// // type Enumerate<N extends number, Acc extends Array<number> = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;

// // type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

// // export function createColumnListBy(display: ColDisplayType, cols: ColType) {
// //     cols = 12

// //     let a: ColAuto = 'col-xs';
// // }





// export enum ContainerEnum {
//     xs = 'xs',
//     sm = 'sm', 
//     md = 'md',
//     lg = 'lg',
//     auto = 'auto'
// }
// Sizes [xs, sm, md, lg]
// xs = 36em = 576px
// sm = 48em = 768px
// md = 64em = 1024px
// lg = 75em = 1200px





// import { ChangeDetectionStrategy, Component, WritableSignal, effect, signal } from '@angular/core';

// @Component({
//   selector: 'ukep-create',
//   templateUrl: './ukep-create.component.html',
//   styleUrl: './ukep-create.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class UkepCreateComponent {

  

//   initTheme: boolean = false;
//   currentTheme: WritableSignal<IThemeSwitcherItem> = signal(this.themeItems[0])

//   onThemeChange(item: IThemeSwitcherItem): void {
//     this.currentTheme.set(item)
//   }

//   constructor() {
//     // themes.initialized(() => {
//     //   this.initTheme = true;
//     //   console.log('themeIsInit')
//     // })


//     // themes.current(localStorage.getItem("dx-theme") || "generic.light");

//     // effect(() => {
//     //   // console.log(this.initTheme)
//     //   // if (this.initTheme) 
//     //   // return;

//     //   switch (this.currentTheme().code) {
//     //     case 'system': {
//     //       document.documentElement.setAttribute('data-bs-theme', 'light');
//     //       // themes.ready(() => {
//     //         localStorage.setItem("dx-theme", 'generic.light');
//     //         themes.current('generic.light')
//     //       // })
//     //     } break;
//     //     case 'light': {
//     //       document.documentElement.setAttribute('data-bs-theme', 'light');
//     //       // themes.ready(() => {
//     //         localStorage.setItem("dx-theme", 'generic.light');
//     //         themes.current('generic.light')
//     //       // })
//     //     } break;
//     //     case 'dark': {
//     //       document.documentElement.setAttribute('data-bs-theme', 'dark');
//     //       // themes.ready(() => {
//     //         localStorage.setItem("dx-theme", 'generic.dark');
//     //         themes.current('generic.dark')
//     //       // })
//     //     } break;
//     //   }

//     //   refreshTheme();
//     // })
//   }
// }



    // import themes from 'devextreme/ui/themes';
    // import { refreshTheme } from 'devextreme/viz/themes'; 
    // if(true) {
      // themes.current('generic.dark')
      // themes.ready(() => {
      // })
      // refreshTheme();
      // document.documentElement.setAttribute('data-bs-theme', 'dark');
    // }











// <!-- <div class="root-container">
// <nav class="sidebar">

//   <div>
//     <span class="svg-icon svg-icon-3x svg-icon-dark">
//       <ukep-icons name="rncb_kod"></ukep-icons> 
//     </span>
//   </div>

//   @for (item of componentList; track item.id) {
//   <div class="sidebar-item" appDraggable [dragData]="item">
//     <span class="item-title">{{ item.title }}</span>
//   </div>
//   }
// </nav>

// <main class="root">
// <button type="button" (click)="export()">Export</button>
//   <div class="board" [ngClass]="container$ | async" resizable (resize)="onResizeContainer($event)" [minWidth]="512" [minHeight]="512" [maxWidth]="1200" [maxHeight]="1200">
//     <div class="container-fluid">
//       <app-grid-container draggableDropzone (itemDropped)="handleDroppedItem($event)"></app-grid-container>
//     </div>
//   </div>
// </main>

// <nav class="sidebar">
//   @if( targetSelection$ | async; as targetSelection) {

//      <span>selected is: <pre>{{ targetClassList$ | async | json }}</pre></span>


//       <form>
//         <div class="multiselect">
//           <label for="columns-select">Select an columns</label>
//           <div class="selectBox" (click)="showCheckboxes()">
//             <select id="columns-select">
//               <option>{{ 'xs, sm, md, xl' }}</option>
//             </select>
//             <div class="overSelect"></div>
//           </div>

//          @if (expanded() === true) {
//             <div id="checkboxes" data-theme="dark">
//               @for (item of sizes$ | async; track item.id) {
//             <label for="checkbox-{{item.id}}">
//                 <input type="checkbox" id="checkbox-{{item.id}}" (change)="onCheckboxChange($event, item.code, targetSelection)"/>{{ item.name }}</label>
//               }
//               @empty {
//                 <span>No records</span>
//               }
//             </div>
//           }
//         </div>
//       </form>

//       <form>
//         <div class="multiselect">
//           <label for="columns-select">Select an offset columns</label>
//           <div class="selectBox" (click)="showCheckboxes()">
//             <select id="columns-select">
//               <option>{{ 'xs, sm, md, xl' }}</option>
//             </select>
//             <div class="overSelect"></div>
//           </div>

//          @if (expanded() === true) {
//             <div id="checkboxes">
//               @for (item of offsets$ | async; track item.id) {
//             <label for="checkbox-{{item.id}}">
//                 <input type="checkbox" id="checkbox-{{item.id}}" (change)="onCheckboxChange($event, item.code, targetSelection)"/>{{ item.name }}</label>
//               }
//               @empty {
//                 <span>No records</span>
//               }
//             </div>
//           }
//         </div>
//       </form>
//   }
// </nav>
// </div> -->



// .root-container {
//     display: flex;
//     flex-direction: row;
//     flex: 1 1 100%;
//     box-sizing: border-box;
//     max-height: 100%;
// }

// .sidebar {
//     width: 300px;
//     padding: 15px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     background-color: aquamarine;

//     .sidebar-item {
//         border: 1px solid red;
//         border-radius: 10px;
//         padding: 7px;
//         cursor: move;
//     }
// }

// .container-fluid {
//     height: 100%;
// }

// .root {
//     display: flex;
//     flex-direction: column;
//     flex: 1 1 0%;
//     align-items: center;
//     box-sizing: border-box;
//     overflow-x: auto;
    
//     // background-color: rgb(238, 238, 238);

//     padding: 20px;

//     .board {
//         border: 1px solid rgb(177, 177, 177);
//         // background-color: #FFF;
//         height: 100%;
//         width: 100%;
//         transition: width .3s ease-in-out;
//         cursor: default;

//         &.resizable {
//             position: relative;
//         }

//         &.resizable::after {    
//             content: '';
//             position: absolute;
//             bottom: -2px;
//             right: -5px;

//             width: 1px; 
//             height: 1px; 
//             border-left: 6px solid transparent;
//             border-right: 6px solid transparent;
//             border-bottom: 6px solid rgb(177, 177, 177);

//             transform: rotate(135deg);
//         }

//         &.resizable--hover {
//             position: relative;
//             cursor: se-resize;
//             user-select: none;
//             transition: none;

//             &.resizable::after {
//                 border-bottom-color: red;
//             }
//         }
        
//         &.resizable--active {
//             position: relative;
//             cursor: se-resize;
//             user-select: none;
//             transition: none;

//             &.resizable::after {
//                 border-bottom-color: green;
//             }
//         }
//     }
// }



// .multiselect {
//     width: 200px;
//   }
  
//   .selectBox {
//     position: relative;
//   }
  
//   .selectBox select {
//     width: 100%;
//     font-weight: bold;
//   }
  
//   .overSelect {
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//   }
  
//   #checkboxes {
//     // display: none;
//     background-color: #FFF;
//     border: 1px #dadada solid;
//   }
  
// #checkboxes {
    
//     label {
//         display: block;
//     }

//     label, input {
//         cursor: pointer;
//     }
// }

// #checkboxes[data-theme=light] {

//     label:hover {
//         background-color: #1e90ff;
//     }
// }

// #checkboxes[data-theme=dark] {

//     label:hover {
//         background-color: #ff1e69;
//     }
// }