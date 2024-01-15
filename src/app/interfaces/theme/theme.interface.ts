import { ukepIcons } from "ng-ukep-icons-builder";

export type IThemeColors = 'dark' | 'light' | 'system';

export interface IThemeSwitcherItem {
  title: string;
  code: IThemeColors;
  icon_name: ukepIcons;
  icon_class_list: string;
}

export type IThemeSwitcherItems = Array<IThemeSwitcherItem>;