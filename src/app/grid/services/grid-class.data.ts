import { ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType, ColumnSizeType, ColumnSizeOffsetType, ContainerType } from "../../interfaces/column.type";
import { ConcatType } from "../../interfaces/core/concat.type";

/**
 * Displays
 */

export const display_xs: ColumnDisplayType = 'xs';

export const display_sm: ColumnDisplayType = 'sm';

export const display_md: ColumnDisplayType = 'md';

export const display_lg: ColumnDisplayType = 'lg';

export const displays: ColumnDisplayType[] = [display_xs, display_sm, display_md, display_lg];

/**
 * Columns
 */

export const class_col_xs: ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]> = 'col-xs';

export const class_col_sm: ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]> = 'col-sm';

export const class_col_md: ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]> = 'col-md';

export const class_col_lg: ConcatType<[ColumnPrefixType, ColumnSeparatorType, ColumnDisplayType]> = 'col-lg';

export const class_cols: string = `${class_col_xs} ${class_col_sm} ${class_col_md} ${class_col_lg}`;

export const sizes: ColumnSizeType[] = [class_col_xs, class_col_sm, class_col_md, class_col_lg];

/**
 * Offsets
 */

export const sizes_offset: ColumnSizeOffsetType[] = sizes.map(item => item + '-' as ColumnSeparatorType + 'offset' as ColumnSizeOffsetType);

/**
 * Containers
 */

export const container_xs: ContainerType = 'container-xs';

export const container_sm: ContainerType = 'container-sm';

export const container_md: ContainerType = 'container-md';

export const container_lg: ContainerType = 'container-lg';

export const containers: ContainerType[] = [container_xs, container_sm, container_md, container_lg];