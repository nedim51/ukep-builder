import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IGridState, INITIAL_GRID_STATE } from '../interfaces/grid-state.interface';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns, INITIAL_GRID_COLUMN } from '../interfaces/grid-column.interface';
import { IGridElement, IGridElements, INITIAL_GRID_ELEMENT } from '../interfaces/grid-element.interface';
import { GridObjectIdService } from './grid-object-id.service';
import { IRowColumns } from '../interfaces/grid-rows-cols.interface';
import { GridObjectType } from '../interfaces/grid-object.type';
import { elements } from './grid-element.data';
import { insertItemByIndex } from '../../helpers/helper';
import { StateHistoryService } from '../../services/core/state-history.service';

export const MAX_GRID_COLUMNS: number = 12;

@Injectable()
export class GridService extends StateHistoryService<IGridState> {
  
  constructor(private gridObjectId: GridObjectIdService) {
    super(INITIAL_GRID_STATE)
  }

  /**
   * Метод экспортирования JSON
   */
  export(): Observable<any> { //
    return this.select(state => state).pipe(map(state => {
      const keys: Array<keyof IGridState> = Object.keys(INITIAL_GRID_STATE) as Array<keyof IGridState>;
      const init: any = INITIAL_GRID_STATE;

      for (let key of keys) {
        init[key] = state[key].map(item => {
          switch (item.type) {
            case 'row': case 'element': return {
              id: item.id,
              parent_id: item.parent_id,
              index: item.index
            }
            case 'column':
              const _item = item as IGridColumn;

              return {
                id: _item.id,
                parent_id: _item.parent_id,
                class: _item.class,
                index: _item.index
              }
          }
        })
      } 

      /*return init; */return state;
    }))
  }

  /**
   * Вызывается когда дропнули элемент в колонку
   */  
  appendElementById(
    drop_element_id: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): IGridElement {
    const element = elements.find(element => element.id === drop_element_id);

    if(!element) 
    return INITIAL_GRID_ELEMENT;

    const newElementId = this.gridObjectId.next();
    const newElement: IGridElement = this.createElement(
      newElementId, 
      element.id,
      element.title, 
      parent_id, 
      parent_type 
    );
    
    this.setState({
      elements: [...this.state.elements, newElement]
    })

    return newElement;
  }
  /**
   * Вызываеся когда дропнули колонку в строку
   */
  appendColumnById(
    row_id: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): void {
    if(!this.canInsertNewColumn(parent_id)) {
      return; // show error message
    }

    const columnIndex = this.state.cols.findIndex(item => item.id === row_id)

    if(columnIndex === -1) return

    const oldParentId = this.state.cols[columnIndex].parent_id;
    const oldIndex = this.state.cols[columnIndex].index;

    const nextIndex = this.getMaxIndex('cols', parent_id) + 1;
    this.state.cols[columnIndex].parent_id = parent_id;
    this.state.cols[columnIndex].parent_type = parent_type;
    this.state.cols[columnIndex].index = nextIndex;

    let listToUpdate = this.state.cols.filter(item => item.parent_id === oldParentId && item.index >= oldIndex);

    if(listToUpdate.length > 0) {
      this.updateIndex(0, listToUpdate, 'remove');
    }

    this.setState({
      cols: [...this.state.cols]
    })
  }
  /**
   * Вызываеся когда дропнули строку в колонку
   */
  appendRowById(
    row_id: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): void {
    const rowIndex = this.state.rows.findIndex(item => item.id === row_id)

    if(rowIndex === -1) {
      return;
    }

    const oldParentId = this.state.rows[rowIndex].parent_id;
    const oldIndex = this.state.rows[rowIndex].index;

    let row: IGridRow = this.state.rows[rowIndex];
    // Получим следующий индекс строки, куда этот объект вставили
    // Пока что так, потом нужно будет сделать директиву для определения вставляемой позиции
    const nextIndex = this.getMaxIndex('rows', parent_id) + 1;
    
    row.parent_id = parent_id;
    row.parent_type = parent_type;
    // Пока что буду кидать в конец, в дальнейшем нужно сделать еще 
    // sortableDirective которая будет определять позицию и вставлять в позицию
    row.index = nextIndex; 
    
    // Определим массив объектов у которых необходимо обновить индексы
    let listToUpdate = this.state.rows.filter(item => item.parent_id === oldParentId && item.index >= oldIndex);

    this.updateIndex(0, listToUpdate, 'remove'); // Берем его соседей и обновляем их индексы 
    
    this.setState({
      rows: [...this.state.rows]
    })
  }
  /**
   * Вызывается пользователем для вставки новой колонки слева или справа
   */
  insertColumn(column: IGridColumn, right: 0 | 1 = 0): void {
    if(!this.canInsertNewColumn(column.parent_id)) {
      return; // show error message
    }
    
    const columnNewIndex = column.index + right;
    const columnId = this.gridObjectId.next();
    const newColumn = this.createColumn(
      columnId,
      columnNewIndex,
      column.parent_id,
      column.parent_type
    );

    const cols = insertItemByIndex<IGridColumn>(
      this.state.cols, 
      columnNewIndex + right, 
      newColumn
    )
    
    let listToUpdate = cols.filter(item => item.parent_id === column.parent_id && item.id !== columnId && item.index >= columnNewIndex);
    
    if(listToUpdate.length > 0) {
      this.updateIndex(0, listToUpdate, 'insert');
    }
    
    this.setState({
      cols: cols
    })
  }
  /**
   * Вызывается пользователем для вставки новой строки сверху или снизу
   */
  insertRow(row: IGridRow, bottom: 0 | 1 = 0): void {
    // Индекс нового объекта (если сверху то остается такой же как и опорного объекта иначе +1)
    const rowIndexNew = row.index + bottom;
    // Создаем новый объект
    const rowId = this.gridObjectId.next();
    const newRow = this.createRow(
      rowId, 
      rowIndexNew,
      row.parent_id,
      row.parent_type
    );
    // Уже устарело, нужно убрать, потому-что используем сортировку по индексам (но пока что оставлю так) !!!
    // const rows = [...this.state.rows, newRow];
    const rows = insertItemByIndex<IGridRow>(
      this.state.rows, 
      rowIndexNew, 
      newRow
    )
    // Итак, для того что бы обновить индексы нужно:
    // 1. Определить массив объектов которым нужно обновить индексы
    // 2. Операция тут insert, то есть индекс + 1
    // Пока что так попробуем
    let listToUpdate = rows.filter(item => item.parent_id === row.parent_id && item.id !== rowId && item.index >= rowIndexNew);

    if(listToUpdate.length > 0) {
      this.updateIndex(0, listToUpdate, 'insert');
    }

    this.setState({
      rows: rows
    })
  }
  /**
   * Обновить индексы у списка объектов
   */
  updateIndex(
    startIndex: number = 0, 
    list: IGridRows | IGridColumns | IGridElements, 
    method: 'remove' | 'insert' = 'remove'): void {

    const k: number = 0;
    const inc: number = method === 'remove' ? -1 : 1;

    // Пока что так, порешаю потом, сейчас времени на это нету
    if(list.length === 0 || startIndex + k > list.length) {
      return; 
    }

    for (let i = startIndex + k; i < list.length; i++) {
      list[i].index += inc;
    }
  }
  /**
   * Удалить пустую строку (вроде работает)
   */
  removeRow(row: IGridRow): void {
    const newRows = this.state.rows.filter(item => item.id !== row.id /* && item.parent_id !== row.parent_id*/);
    let rowsToUpdate = this.state.rows.filter(item => item.parent_id === row.parent_id && item.index > row.index);
    // Если есть что обновлять, то обновим
    // Вроде работает, но пока что так
    if(rowsToUpdate.length > 0) {
      this.updateIndex(0, rowsToUpdate, 'remove'); 
    }

    this.setState({
      rows: newRows
    })
  }

  removeColumn(col: IGridColumn): void {
    const newColumns = this.state.cols.filter(item => item.id !== col.id /* && item.parent_id !== col.parent_id*/);

    this.updateIndex(0, newColumns, 'remove'); 

    this.setState({
      cols: newColumns
    })
  }
  /**
   * Удалить элемент (пока что свои задачи выполняет)
   */
  removeElement(element: IGridElement): void {
    const newElements = this.state.elements.filter(item => item.id !== element.id);
    const elementsToUpdate = this.state.elements.filter(item => item.parent_id === element.parent_id && item.index > element.index);
    
    this.updateIndex(0, elementsToUpdate, 'remove'); 

    this.setState({
      elements: newElements
    })
  }

  removeColumnElements(parent_id: number | null): void {
    const newElements = this.state.elements
      .filter(item => item.parent_id != parent_id)

    this.setState({
      elements: newElements
    })
  }

  removeColumns(parent_id: number | null): void {
    const newColumns = this.state.cols
      .filter(col => col.parent_id != parent_id);

    this.setState({
      cols: newColumns
    })
  }

  removeRowColumns(row: IGridRow): void {
    // this.removeColumns(row.id);
    // this.removeRow(row);

    const childToRemove = findChildrenRecursive(this.state, row.id);
    const keys: Array<keyof IGridState> = Object.keys(this.state) as Array<keyof IGridState>;
    const result: IGridState = INITIAL_GRID_STATE;

    for(let key of keys) {
      for (let i = 0; i < this.state[key].length; i++) {
        for (let j = 0; j < childToRemove[key].length; j++) {
          if(this.state[key][i].id === childToRemove[key][j].id) {
            
          }
        }
      }
    }




    // for(let i = 0; i < this.state[])


    //   this.state[key as unknown as keyof IGridState].filter(i => {
    //     if(!all[key as unknown as keyof IGridState].map(i => i.id).includes(i.id)) {

    //     }
    //   })
    // }

    // all.rows.map(i => i.id);
    // all.cols.map(i => i.id);
    // all.elements.map(i => i.id);
  }
  /**
   * Добавить удалить класс у колонки (нужно доработать)
   */
  setColumnClass2(column: IGridColumn, classList: string): void {
    // Находим индекс колонки в текущем состоянии
    const columnIndex = this.state.cols.findIndex(item => item.id === column.id);
    const cpColumn = { ...column };

    if(columnIndex === -1) return;

    // Фильтруем колонки, исключая текущую по идентификатору
    const colsFiltered = this.state.cols.filter(item => item.id !== column.id);

    // Объединяем существующие и новые классы, удаляем повторения
    /*const classList = className;`${column.class} ${className}`
      .split(' ')
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter(item => {
        const splitted = item.split('-');
        const classSplitted = className.split('-');

        // [col, xs] | [col, xs, 1] || [col, xs, offset, 1]
        return !(
          (classSplitted.length === 3 || classSplitted.length === 5) && 
          (splitted.length === classSplitted.length && splitted[1] === classSplitted[1] && splitted[2] !== classSplitted[2]))
      }).join(' ');*/

    // Присваиваем новый список классов к скопированной колонке
    cpColumn.class = `${INITIAL_GRID_COLUMN.class} ${classList}`;
    
    this.setState({
      cols: insertItemByIndex(colsFiltered, columnIndex, cpColumn)
    })
  }
  /**
   * Обновить значение класса у колонки 
   * (уже не актуально использую reactive Forms)
   */
  setColumnClass(column: IGridColumn, className: string, append: boolean): void {
    append === true ? this.appendColumnClass(column, className) : this.removeColumnClass(column, className)
  }
  /**
   * Добавить класс к колонке
   * (уже не актуально использую reactive Forms)
   */
  appendColumnClass(column: IGridColumn, className: string): void {
    // Находим индекс колонки в текущем состоянии
    const columnIndex = this.state.cols.findIndex(item => item.id === column.id);
    const cpColumn = { ...column };
    
    if(columnIndex === -1) return;
    
    // Фильтруем колонки, исключая текущую по идентификатору
    const colsFiltered = this.state.cols.filter(item => item.id !== column.id);

    // Объединяем существующие и новые классы, удаляем повторения
    const classList = `${column.class} ${className}`
      .split(' ')
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter(item => {
        const splitted = item.split('-');
        const classSplitted = className.split('-');

        // [col, xs] | [col, xs, 1] || [col, xs, offset, 1]
        return !(
          (classSplitted.length === 3 || classSplitted.length === 5) && 
          (splitted.length === classSplitted.length && splitted[1] === classSplitted[1] && splitted[2] !== classSplitted[2]))
      }).join(' ');

    // Присваиваем новый список классов к скопированной колонке
    cpColumn.class = classList;
    
    this.setState({
      cols: insertItemByIndex(colsFiltered, columnIndex, cpColumn)
    })
  }
  /**
   * Удалить класс у колонки
   * (уже не актуально использую reactive Forms)
   */
  removeColumnClass(column: IGridColumn, className: string): void {
    // Находим индекс колонки в текущем состоянии
    const columnIndex = this.state.cols.findIndex(item => item.id === column.id);
    const cpColumn = { ...column };

    if(columnIndex === -1) return;

    // Фильтруем колонки, исключая текущую по идентификатору
    const colsFiltered = this.state.cols.filter(item => item.id !== column.id);

    //Исключаем удаляемый класс, удаляем повторения
    const classList = this.state.cols[columnIndex].class
      .split(' ')
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter(item => item !== className)
      .join(' ');

    // Присваиваем новый список классов к скопированной колонке
    cpColumn.class = classList;

    this.setState({
      cols: insertItemByIndex(colsFiltered, columnIndex, cpColumn)
    })
  }
  /**
   * Получить последнюю позицию индекса по свойству
   */
  getMaxIndex(property: keyof IGridState, parent_id: number | null): number {
    const indexList = this.state[property]
      // .filter(item => item.parent_id === parent_id)
      .map(item => item.parent_id === parent_id ? item.index : -1);

    if(indexList.length === 0) return indexList.length;

    const maxIndex = Math.max(...indexList);
    return maxIndex// > 0 ? maxIndex : 0;
  }
  /**
   * Пока что не используется !!! 
   * Жестко обновить весть список индексов
   */
  updateIndexListHard(property: keyof IGridState, parent_id: number | null): void {
    const indexList = this.state[property]
      .filter(item => item.parent_id === parent_id)
      .map(item => item.index);
    
  }
  /**
   * Пока что не используется !!!
   * Признак дочернего элемента
   */
  isRowContainsChildren(row: IGridRow): boolean {
    return this.state.cols.some((column) => column.parent_id === row.id);
  }
  /**
   * Пока что не используется !!!
   * Признак дочернего элемента
   */
  isColumnContainsChildren(column: IGridColumn): boolean {
    const rowsParentIds = this.state.rows.map(i => i.parent_id);
    const elementsParentIds = this.state.elements.map(i => i.parent_id);
    return [...rowsParentIds, ...elementsParentIds].some((i) => i === column.id);
  }
  /**
   * Пока что не используется !!!
   * Признак дочернего элемента
   */
  hasChildren(source: IGridRow | IGridColumn, target: IGridRow | IGridColumn) {
    const rowsIds = this.state.rows.map(i => { 
      return {
        id: i.id,
        parent_id: i.parent_id 
      }
    });

    const columnsIds = this.state.cols.map(i => { 
      return {
        id: i.id,
        parent_id: i.parent_id 
      }
    });

    const childrens = [...rowsIds, ...columnsIds].filter(i => i.parent_id === source.parent_id);

    return childrens.length > 0 ? null : null;
  }
  /**
   * Проверка на возможность добавить еще колонку в строку, максимум 12 колонок, 12 - думаю это не поменяется
   */
  canInsertNewColumn(column_parent_id: number | null): boolean {
    const objectLenght: number = this.state.cols.filter(col => col.parent_id === column_parent_id).length;

    return (objectLenght < MAX_GRID_COLUMNS);
  }
  /**
   * Вызывается пользователем, если в пустой строке нажать добавить колонку
   */
  insertFirstColumn(row: IGridRow): void {
    const colFirstId = this.gridObjectId.next();
    const colFirstIdx = 0;
    const newCol = this.createColumn(
      colFirstId, 
      colFirstIdx,
      row.id,
      row.type
    );

    this.setState({
      cols: [...this.state.cols, newCol]
    })
  }
  /**
   * Стартовый набор строк и колонок
   */
  insertFirstTemplate(rows: number, cols: number): void {
    // const row_cols: IRowColumns = this.createRowColumns(4);
    const row_cols: IRowColumns = this.createRowsCols(rows, cols);

    this.setState({
      rows: [ ...this.state.rows, ...row_cols.rows ],
      cols: [ ...this.state.cols, ...row_cols.columns ]
    })
  }
  /**
   * Создать "матрицу" строк, колонок
   */
  createRowsCols(
    rows: number, 
    cols: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null = null
  ): IRowColumns {
    const rowsCols: IRowColumns = {
      rows: [],
      columns: []
    };
    
    for(let i = 0; i < rows; i++) {
      const nextId: number = this.gridObjectId.next();
      const row: IGridRow = this.createRow(nextId, i, parent_id, parent_type);
      const col: IGridColumns = this.createColumns(cols, row.id, row.type);
      
      rowsCols.rows.push(row)
      rowsCols.columns.push(...col)
    }

    return rowsCols;
  }
  /**
   * Создать объект строки со вложенными колонками, а так же установить ему родителя
   */ 
  createRowColumns(
    cols: number, 
    index: number,
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): IRowColumns {
    if(cols > MAX_GRID_COLUMNS) cols = 12;
    
    const nextId: number = this.gridObjectId.next();
    const row: IGridRow = this.createRow(
      nextId,
      index,
      parent_id,
      parent_type
    );
    const columns: IGridColumns = this.createColumns(cols, row.id, row.type);

    return {
      rows: [row],
      columns: columns
    }
  }
  /**
   * Создать массив объектов колонки, а так же установить их родителя
   */ 
  createColumns(
    count: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): IGridColumns {
    let columns: IGridColumns = [];
    
    for(let i = 0; i < count; i++) {
      const nextId: number = this.gridObjectId.next();
      columns.push(this.createColumn(
        nextId, 
        i,
        parent_id,
        parent_type
      ));
    }

    return columns;
  }
  /**
   * Создать объект строки
   */ 
  createRow(
    id: number, 
    index: number,
    parent_id: number | null = null,
    parent_type: GridObjectType | null, 
    type_row: GridObjectType = 'row'
  ): IGridRow {
    return {
      id: id,
      type: type_row,
      parent_id: parent_id,
      parent_type: parent_type,
      title: `row-${id}`,
      index: index
    }
  }
  /**
   * Создать объект колонки
   */ 
  createColumn(
    id: number, 
    index: number,
    parent_id: number | null = null, 
    parent_type: GridObjectType | null, 
    type_column: GridObjectType = 'column'
  ): IGridColumn {
    return {
      id: id,
      type: type_column,
      parent_id: parent_id,
      parent_type: parent_type,
      title: `column-${id}`,
      class: 'col-xs col-sm col-md col-lg',
      index: index
    }
  }
  /**
   * Создать объект элемента
   */
  createElement(
    id: number, 
    element_id: number,
    title: string, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null, 
    type_element: GridObjectType = 'element'
  ): IGridElement {
    return {
      id: id,
      type: type_element,
      parent_id: parent_id,
      parent_type: parent_type,
      element_id: element_id,
      title: title,
      index: id
    }
  }
  /**
   * Selectors
   * 
   * Селектнуть все
   */
  selectState(): Observable<IGridState> {
    return this.select(state => state);
  }
  /**
   * Селектнуть строки + сортировка
   */
  selectRows(
    parent_id: number | null, 
    sortFn: (a: IGridRow, b: IGridRow) => number = (a, b) => a.index - b.index
  ): Observable<IGridRows> {
    return this.select(state => state.rows).pipe(
      map(rows => rows.filter(row => row.parent_id === parent_id).sort(sortFn))
    );
  }
  /**
   * Селектнуть строки + фильтр + сортировка
   */
  selectRowByFilter(
    parent_id: number | null, 
    filterFn: (row: IGridRow) => boolean = (row) => row.parent_id === parent_id,
    sortFn: (a: IGridRow, b: IGridRow) => number = (a, b) => a.index - b.index
  ): Observable<IGridRows> {
    return this.select(state => state.rows).pipe(
      map(rows => rows.filter(filterFn).sort(sortFn))
    );
  }
  /**
   * Селектнуть колонки + фильр + сортировка
   */
  selectColumns(
    parent_id: number | null, 
    sortFn: (a: IGridColumn, b: IGridColumn) => number = (a, b) => a.index - b.index
  ): Observable<IGridColumns> {
    return this.select(state => state.cols).pipe(
      map(cols => cols.filter(col => col.parent_id === parent_id)
        .sort(sortFn)
      )
    );
  }
  /**
   * Селектнуть элементы + фильр + сортировка
   */
  selectElements(
    parent_id: number | null,
    // sortFn: (a: IGridElement, b: IGridElement) => number = (a, b) => a.index - b.index
  ): Observable<IGridElements> {
    return this.select(state => state.elements).pipe(
      map(elements => elements.filter(element => element.parent_id === parent_id)
        // .sort(sortFn)
      )
    );
  }
  /**
   * Селектнуть 
   */
  selectCanInsertNewColumn(column_parent_id: number | null): Observable<boolean> {
    return this.select(state => state.cols).pipe(
      map(cols => cols.filter(col => col.parent_id === column_parent_id).length < MAX_GRID_COLUMNS)
    )
  }
}

export function findChildrenRecursive(tree: IGridState, targetId: number | null): IGridState {
  const result: any = {
    rows: [],
    cols: [],
    elements: [],
  };

  const findRecursive = (nodes: Array<IGridRow> | Array<IGridColumn> | Array<IGridElement>, parentId: number | null) => {
    const children: Array<IGridRow | IGridColumn | IGridElement> = [];

    for (const node of nodes) {
      if (node.parent_id === parentId) {
        children.push(node);

        const grandchildren = findRecursive(nodes, node.id);
        children.push(...grandchildren);
      }
    }

    return children;
  }

  let currentLevel: Array<IGridRow | IGridColumn | IGridElement> = [];

  for (const key in tree) {
    const children = findRecursive(tree[key as keyof IGridState], targetId);
    currentLevel.push(...children);
    result[key] = children;
  }

  while (currentLevel.length > 0) {
    const nextLevel: Array<IGridRow | IGridColumn | IGridElement> = [];

    for (const node of currentLevel) {
      for (const key in tree) {
        const grandchildren = findRecursive(tree[key as keyof IGridState], node.id);
        nextLevel.push(...grandchildren);
        result[key].push(...grandchildren);
      }
    }

    currentLevel = nextLevel;
  }

  return result;
}


// export function findChildrenRecursive1(tree: IGridState, targetId: number | null): Array<IGridRow | IGridColumn | IGridElement> {
//   const result: Array<IGridRow | IGridColumn | IGridElement> = [];

//   const findRecursive = (nodes: Array<IGridRow> | Array<IGridColumn> | Array<IGridElement>, parentId: number | null) => {
//       const children: Array<IGridRow | IGridColumn | IGridElement> = [];

//       for (const node of nodes) {
//           if (node.parent_id === parentId) {
//               children.push(node);

//               const grandchildren = findRecursive(nodes, node.id);
//               children.push(...grandchildren);
//           }
//       }

//       return children;
//   }

//   let currentLevel: Array<IGridRow | IGridColumn | IGridElement> = [];

//   for (const key in tree) {
//       const children = findRecursive(tree[key as keyof IGridState], targetId);
//       currentLevel.push(...children);
//   }

//   while (currentLevel.length > 0) {
//       result.push(...currentLevel);
//       const nextLevel: Array<IGridRow | IGridColumn | IGridElement> = [];

//       for (const node of currentLevel) {
//           for (const key in tree) {
//           const grandchildren = findRecursive(tree[key as keyof IGridState], node.id);
//           nextLevel.push(...grandchildren);
//           }
//       }

//       currentLevel = nextLevel;
//   }

//   return result;
// }