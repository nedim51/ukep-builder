import { ConcatType } from "../../interfaces/core/concat.type";
/**
 * Префикс, используемый для конфигурации контейнеров.
 */
export type ContainerPrefixType  = 'container'
/**
 * 
 */
export type ContainerType =  ConcatType<[ContainerPrefixType, ColumnSeparatorType, ColumnDisplayType]>;
/**
 * Префикс, используемый для конфигурации столбцов.
 */
export type ColumnPrefixType = 'col';
/**
 * Тип, используемый для определения смещения столбца в макете.
 */
export type ColumnOffsetType = 'offset';
/**
 * Разделитель, используемый для различения различных частей конфигурации столбца.
 */
export type ColumnSeparatorType = '-';
/**
 * Размер отображения столбца на различных экранах
 */
export type ColumnDisplayType = 'xs' | 'sm' | 'md' | 'lg';
/**
 * Ширина столбца в макете в виде строки от 1 до 12
 */
export type ColumnType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
/**
 * Автоматически сгенерированный тип, объединяющий префикс, разделитель и размер отображения столбца.
 */
export type ColumnSizeType = ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]>;
/**
 * Автоматически сгенерированный тип, объединяющий префикс, разделитель и размер отображения столбца.
 */
export type ColumnSizeOffsetType = ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType, ColumnSeparatorType, ColumnOffsetType]>;
/**
 * Конфигурация столбца, объединяющую префикс, разделитель, размер отображения и ширину столбца
 */
export type ColumnsType = ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType, ColumnSeparatorType, ColumnType]>;
