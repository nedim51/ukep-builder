import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IGridTemplate, INITIAL_GRID_TEMPLATE } from '../interfaces/grid-template.service';
import { IGridRow, IGridRows } from '../interfaces/grid-row.interface';
import { IGridColumn, IGridColumns } from '../interfaces/grid-column.interface';
import { IGridElement, IGridElements } from '../interfaces/grid-element.interface';
import { GlobalObjectIdService } from './grid-global-object-id.service';
import { IRowColumns } from '../interfaces/grid-rows-cols.interface';
import { GridObjectType } from '../interfaces/grid-element.type';
import { elements } from '../../../services/grid-element.data';
import { insertItemByIndex } from '../../../utils/helper';
import { StateHistoryService } from '../../../services/core/state-history.service';

export const MAX_GRID_COLUMNS: number = 12;

@Injectable()
export class GridTemplateService extends StateHistoryService<IGridTemplate> {
  
  
  constructor(private GLOBAL_OBJECT_ID: GlobalObjectIdService) {
    super(INITIAL_GRID_TEMPLATE)
  }

  export() {
    this.select(state => state).pipe(map(state => {
      const keys = Object.keys(state);
      let init: any = INITIAL_GRID_TEMPLATE;

      for(let key of keys) {
        init[key] = state[key as keyof IGridTemplate].map(item => {
          switch(item.type) {
            case 'row': case 'element': return {
              id: item.id,
              parent_id: item.parent_id,
              index: item.index
            }
            case 'column': 
              const _item = item as IGridColumn
            return {
              id: _item.id,
              parent_id: _item.parent_id,
              class: _item.class,
              index: _item.index
            }
          }
        })
      } return init;
    })).subscribe(result => console.log(JSON.stringify(result)))
  }

  /**
   * Вызывается когда дропнули элемент в колонку
   */  
  appendElementById(
    drop_element_id: number, 
    parent_id: number | null = null, 
    parent_type: GridObjectType | null
  ): void {
    const element = elements.find(element => element.id === drop_element_id);

    if(!element) 
    return

    const newElementId = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
    const columnId = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
    const rowId = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
   * Удалить пустую строку
   */
  removeRow(row: IGridRow): void {
    const newRows = this.state.rows.filter(item => item.id !== row.id /* && item.parent_id !== row.parent_id*/);
    let colsToUpdate = this.state.rows.filter(item => item.parent_id === row.parent_id && item.index > row.index);
    // Если есть что обновлять, то обновим
    // Вроде работает, но пока что так
    if(colsToUpdate.length > 0) {
      this.updateIndex(0, colsToUpdate, 'remove'); 
    }

    this.setState({
      rows: newRows
    })
  }
  removeColumn(col: IGridColumn): void {
    const newColumns = this.state.cols
      .filter(item => item.id !== col.id /* && item.parent_id !== col.parent_id*/);
      
    this.updateIndex(col.index - 1, newColumns, 'remove'); 

    this.setState({
      cols: newColumns
    })
  }
  
  removeElement(element: IGridElement): void {
    const newElements = this.state.elements
      .filter(item => item.id !== element.id /* && item.parent_id !== element.parent_id*/);

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
    this.removeColumns(row.id);
    this.removeRow(row);
  }
  /**
   * Обновить значение класса у колонки 
   */
  setColumnClass(column: IGridColumn, className: string, append: boolean): void {
    append === true ? this.appendColumnClass(column, className) : this.removeColumnClass(column, className)
  }
  /**
   * Добавить класс к колонке
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
  getMaxIndex(property: keyof IGridTemplate, parent_id: number | null): number {
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
  updateIndexListHard(property: keyof IGridTemplate, parent_id: number | null): void {
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
    const colFirstId = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
      const nextId: number = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
    
    const nextId: number = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
      const nextId: number = this.GLOBAL_OBJECT_ID.NEXT_ID();
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
  selectState(): Observable<IGridTemplate> {
    return this.select(state => state);
  }
  /**
   * Селектнуть строки + фильтр + сортировка
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
