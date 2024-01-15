import { Inject, Injectable, Optional } from "@angular/core";
import { IThemeColors, IThemeSwitcherItem, IThemeSwitcherItems } from "../../interfaces/theme/theme.interface";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject, Observable, distinctUntilChanged, map, of } from "rxjs";

export const LOCAL_STORAGE_THEME_KEY: string = 'app_theme';

export const themeItems: IThemeSwitcherItems = [
  {
    title: 'Светлая',
    code: 'light',
    icon_name: 'sun',
    icon_class_list: 'svg-icon svg-icon-md svg-icon-warning'
  },
  {
    title: 'Темная',
    code: 'dark',
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
    const currentThemeName = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as IThemeColors || 'light';
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
    let themeName: IThemeColors = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as IThemeColors || 'light';
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



// import { ChangeDetectionStrategy, Component, WritableSignal, effect, signal } from '@angular/core';

// @Component({
//   selector: 'kod-create',
//   templateUrl: './kod-create.component.html',
//   styleUrl: './kod-create.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class KodCreateComponent {

  

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