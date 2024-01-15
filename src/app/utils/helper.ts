/**
 * Генерирует случайный идентификатор (UID) заданной длины.
 * @param uidLength Длина генерируемого UID (по умолчанию 8 символов).
 * @returns Случайно сгенерированный UID.
 */
export function generateRandomUid(uidLength: number = 8): string {
  // Символы, используемые для генерации UID
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Переменная для хранения генерируемого UID
  let uid = '';

  // Цикл для создания UID указанной длины
  for (let i = 0; i < uidLength; i++) {
    // Генерация случайного индекса в диапазоне символов
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Добавление символа к UID
    uid += characters.charAt(randomIndex);
  }

  // Возврат сгенерированного UID
  return uid;
}

/**
 * Вставляет элемент или массив элементов в указанную позицию массива.
 * @param originalArray Исходный массив, в который будет вставлен элемент или массив элементов.
 * @param index Позиция, на которую нужно вставить новый элемент или массив.
 * @param newObject Новый элемент или массив элементов для вставки. Может быть как одиночным элементом (T), так и массивом элементов (Array<T>).
 * @returns Новый массив элементов типа T после вставки нового элемента или массива.
 */
export function insertItemByIndex<T>(originalArray: Array<T>, index: number, newObject: T | Array<T>): Array<T> {
  // Проверка, находится ли index в допустимых границах массива.
  if (index < 0 || index > originalArray.length)
    return originalArray;

  // Создание двух частей массива: от начала до index и от index до конца.
  const firstPart = originalArray.slice(0, index);
  const secondPart = originalArray.slice(index);

  // Если newObject - массив, объединить три части в новый массив.
  if (Array.isArray(newObject)) {
    return [
      ...firstPart,
      ...newObject,
      ...secondPart
    ];
  }
  // Если newObject - одиночный элемент, вставить его между первой и второй частями.
  else {
    return [
      ...firstPart,
      newObject,
      ...secondPart
    ];
  }
}

/**
 * Возвращает массив, содержащий уникальные значения из входного массива.
 *
 * @param inputArray - Входной массив, из которого требуется извлечь уникальные значения.
 * @returns Массив, содержащий уникальные значения из входного массива.
 * 
 * @template T - Тип элементов во входном массиве.
 *
 * @example
 * const inputArray = [1, 2, 2, 3, 4, 4, 5];
 * const uniqueValues = getUniqueValues(inputArray);
 * console.log(uniqueValues); // Вывод: [1, 2, 3, 4, 5]
 */
export function getUniqueValues<T>(inputArray: Array<T>): Array<T> {
  // Используйте метод filter вместе с indexOf для извлечения уникальных значений.
  return inputArray.filter((value, index, array) => array.indexOf(value) === index);
}

/**
 * Создает глубокую копию объекта или массива.
 *
 * @param obj - Объект или массив, для которого требуется создать глубокую копию.
 * @returns Глубокая копия входного объекта или массива.
 * 
 * @template T - Тип элементов во входном объекте или массиве.
 *
 * @example
 * const originalObject = { a: 1, b: { c: 2 } };
 * const copiedObject = deepCopy(originalObject);
 * console.log(copiedObject); // Вывод: { a: 1, b: { c: 2 } }
 *
 * const originalArray = [1, [2, 3], { d: 4 }];
 * const copiedArray = deepCopy(originalArray);
 * console.log(copiedArray); // Вывод: [1, [2, 3], { d: 4 }]
 */
export function deepCopy<T>(obj: T): T {
  // Если объект null или не является объектом, возвращаем его как есть.
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Если объект - массив, применяем deepCopy к каждому элементу массива.
  if (Array.isArray(obj)) {
    return obj.map(deepCopy) as T;
  }

  const newObj: any = {};
  
  // Если объект - не массив, создаем новый объект и рекурсивно применяем deepCopy к его свойствам.
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}

// quickSort(list, 0, list.length - 1);
export function quickSort(sortArray: number[], low: number, high: number): void {
  if(sortArray.length === 0 || low >= high) return;

  let middle: number = low + (high - low) / 2;
  let border: number = sortArray[middle];

  let i = low, j = high;

  while(i <= j) {
    while(sortArray[i] < border) {
      i += 1;
    }

    while(sortArray[j] > border) {
      j -= 1;
    }
    
    if(i <= j) {
      let swap = sortArray[i];
      sortArray[i] = sortArray[j];
      sortArray[j] = swap;

      i += 1;
      j += 1;
    }
  }

  if(low < j) {
    quickSort(sortArray, low, j);
  }

  if(high > i) {
    quickSort(sortArray, i, high);
  }
}























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