import { Injectable } from "@angular/core";
import { IGuideItem, IGuideItems } from "../interfaces/guide.interface";
import { ColumnDisplayType, ColumnOffsetType, ColumnPrefixType, ColumnSeparatorType, ColumnSizeOffsetType, ColumnSizeType } from "../interfaces/column.type";
import { StateService } from "./core/state.service";
import { Observable, map } from "rxjs";
import { IClassDataState, INITIAL_CLASS_DATA_STATE, IColumnClassList } from "../interfaces/class/class-data.interface";
import { sizes, sizes_offset } from "./class.data";

@Injectable()
export class ClassDataService extends StateService<IClassDataState> {

    private readonly sizes;
    private readonly sizesOffset;

    constructor() {
        super(INITIAL_CLASS_DATA_STATE);
        this.sizes = sizes;
        this.sizesOffset = sizes_offset;
    }

    initState(): void {
        const sizes = this.createColumnSizesList();
        const offsets = this.createColumnOffsetList();

        this.setState({
            sizes: sizes,
            offsets: offsets
        })
    }

    /**
     * Создаем список col-{size}-{n} классов
     * 
     * @param startWith - Начальное значение для идентификаторов классов col-{xs}-{1}
     * @param maxColumn - Конечное значение для идентификаторов классов col-{xs}-{12}
     * @returns Список классов столбцов в виде массива объектов IColumnClass.
     */
    createColumnSizesList(startWith: number = 1, maxColumn: number = 12): IColumnClassList {
        let resultArray: IColumnClassList = [];

        for (let item of this.sizes) {
            // пока что item, item ... - потом как нибудь может наименование придумаю :/
            const list = this.createClassList(item, item, startWith, maxColumn);

            resultArray.push({
                sizes: item,
                list: list
            });
        }

        return resultArray;
    }

    /**
     * Создаем список col-{size}-offset-{n} классов 
     * 
     * @param startWith - Начальное значение для идентификаторов классов col-{xs}-offset-{0}
     * @param maxColumn - Конечное значение для идентификаторов классов col-{xs}-offset-{11}
     * @returns Список классов столбцов в виде массива объектов IColumnClass.
     */
    createColumnOffsetList(startWith: number = 0, maxColumn: number = 12): IColumnClassList {
        let resultArray: IColumnClassList = [];

        for (let item of this.sizesOffset) {
            const list = this.createClassList(item, item, startWith, maxColumn);

            resultArray.push({
                sizes: item,
                list: list
            });
        }

        return resultArray;
    }

    /**
     * Создает список классов столбцов на основе предоставленных параметров.
     *
     * @param name - Название класса столбца.
     * @param code - Кодовое обозначение класса столбца.
     * @param startWith - Начальное значение для идентификаторов классов (по умолчанию 0).
     * @param count - Количество создаваемых классов столбцов.
     * @returns Список классов столбцов в виде массива объектов IColumnClass.
     */
    createClassList(name: string, code: string, startWith: number = 0, count: number): IGuideItems {
        if (count <= 0) {
            return [];
        }

        const classList: IGuideItems = [];

        for (let i = 0; i < count; i++) {
            const columnClass: IGuideItem = {
                id: i + startWith,
                name: `${name}-${i + startWith}`,
                code: `${code}-${i + startWith}`,
            };

            classList.push(columnClass);
        }

        return classList;
    }

    createColumnSize(column: ColumnPrefixType, separator: ColumnSeparatorType, display: ColumnDisplayType): ColumnSizeType {
        return `${column}${separator}${display}`
    }

    createColumnOffset(column: ColumnPrefixType, separator: ColumnSeparatorType, display: ColumnDisplayType, offset: ColumnOffsetType): ColumnSizeOffsetType {
        return `${column}${separator}${display}${separator}${offset}`
    }

    /**
     * Selectors
     */

    selectState(): Observable<IClassDataState> {
        return this.select(state => state);
    }

    selectSizes(): Observable<IClassDataState['sizes']> {
        return this.select(state => state.sizes);
    }

    selectOffsets(): Observable<IClassDataState['offsets']> {
        return this.select(state => state.offsets);
    }

    selectBySize(sizeType: ColumnSizeType | undefined = undefined): Observable<IGuideItems> {
        return this.select(state => state.sizes).pipe(
            map(sizes => {
                return sizes
                    .filter(item => sizeType === undefined ? true : item.sizes === sizeType)
                    .map(item => item.list)
                    .flat()
            })
        )
    }

    selectByOffset(offsetType: ColumnSizeOffsetType | undefined = undefined): Observable<IGuideItems> {
        return this.select(state => state.offsets).pipe(
            map(sizes => {
                return sizes
                    .filter(item => offsetType === undefined ? true : item.sizes === offsetType)
                    .map(item => item.list)
                    .flat()
            })
        )
    }
}