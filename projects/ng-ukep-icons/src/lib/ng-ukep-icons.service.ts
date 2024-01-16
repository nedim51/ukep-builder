import { Injectable } from '@angular/core';
import { IUkepIcons, ukepIcons } from '../../../../dist/ng-ukep-icons-builder';
// import { IUkepIcons, ukepIcons } from 'ng-ukep-icons-builder';

@Injectable({
  providedIn: 'root'
})
export class NgUkepIconsRegistry {
 
  private registry = new Map<ukepIcons, string>();

  public registerIcons(icons: IUkepIcons[]): void {
    icons.forEach(icon => this.registry.set(icon.name, icon.data));
  }

  public getIcon(iconName: ukepIcons): string | undefined {
    if(!this.registry.has(iconName)) {
      console.warn(`${iconName} не зарегистрирована в библиотеке UkepIcons`);
    }

    return this.registry.get(iconName)
  }
}
