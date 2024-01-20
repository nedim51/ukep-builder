import { Injectable } from "@angular/core";
import { IGuideItem, IGuideItems } from "../../interfaces/guide.interface";
import { ColumnDisplayType, ColumnOffsetType, ColumnPrefixType, ColumnSeparatorType, ColumnSizeOffsetType, ColumnSizeType } from "../interfaces/grid-column.type";
import { StateService } from "../../services/core/state.service";
import { Observable, map } from "rxjs";
import { IColumnClassList } from "../interfaces/grid-class.interface";
import { sizes, sizes_offset } from "./grid-class.data";
import { IClassDataState, INITIAL_CLASS_DATA_STATE } from "../interfaces/grid-class-state.interface";

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

    selectSizesCodes(): Observable<Array<IGuideItem['code']>> {
        return this.select(state => state.sizes).pipe(
                map(sizes => sizes.map(size => size.list).flat().map(sizesList => sizesList.code)
            )
        )
    }
    
    selectOffsets(): Observable<IClassDataState['offsets']> {
        return this.select(state => state.offsets);
    }

    selectOffsetsCodes(): Observable<Array<IGuideItem['code']>> {
        return this.select(state => state.offsets).pipe(
            map(offsets => offsets.map(offset => offset.list).flat().map(offsetsList => offsetsList.code))
        )
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

    selectCodesBySize(sizeType: ColumnSizeType | undefined = undefined): Observable<Array<IGuideItem['code']>> {
        return this.selectBySize(sizeType).pipe(
            map(sizes => sizes.map(size => size.code))
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
    
    selectCodesByOffset(offsetType: ColumnSizeOffsetType | undefined = undefined): Observable<Array<IGuideItem['code']>> {
        return this.selectByOffset(offsetType).pipe(
            map(offsets => offsets.map(offset => offset.code))
        )
    }
}