import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, map, of } from "rxjs";
import { IThemeColors, IThemeSwitcherItem, IThemeSwitcherItems, ThemeEnum } from "../../interfaces/theme/theme.interface";

export const LOCAL_STORAGE_THEME_KEY: string = 'UKEP-THEME';

export const themeItems: IThemeSwitcherItems = [
  {
    title: 'Светлая',
    code: ThemeEnum.Light,
    icon_name: 'sun',
    icon_class_list: 'svg-icon svg-icon-md svg-icon-warning'
  },
  {
    title: 'Темная',
    code: ThemeEnum.Dark,
    icon_name: 'moon',
    icon_class_list: 'svg-icon svg-icon-md svg-icon-secondary'
  }
];


@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BehaviorSubject<IThemeSwitcherItem> {

  private readonly themeItems = themeItems;

  constructor(
    @Optional() 
    @Inject(DOCUMENT) 
    private document: Document) {
    const currentThemeName = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as IThemeColors || ThemeEnum.Light;
    const currentThemeItem = themeItems.find(x => x.code === currentThemeName) || themeItems[0];
    super(currentThemeItem)      
  }
  
  selectCurrentTheme(): Observable<IThemeSwitcherItem> {
    return super.asObservable().pipe(distinctUntilChanged((prev, curr) => prev.code === curr.code));
  }

  selectCurrentThemeName(): Observable<IThemeColors> {
    return super.asObservable().pipe(distinctUntilChanged((prev, curr) => prev.code === curr.code), map(item => item.code));
  }

  selectThemeList(): Observable<IThemeSwitcherItems> {
    return of(this.themeItems);
  }

  loadTheme(): void {
    let themeName: IThemeColors = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as IThemeColors || ThemeEnum.Light;
    this.setTheme(themeName)
  }

  getThemeItemByName(name: IThemeColors): IThemeSwitcherItem | undefined {
    return themeItems.find(x => x.code === name);
  }

  setTheme(value: IThemeColors): void {
    this.setCurrentBootstrapTheme(value);
    this.saveTheme(value);
    const themeItem = this.getThemeItemByName(value) || themeItems[0];
    super.next(themeItem);
  }

  saveTheme(value: IThemeColors): void {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, value)
  }

  setCurrentBootstrapTheme(name: IThemeColors): void {
    this.document.documentElement.setAttribute('data-bs-theme', name);
  }
}