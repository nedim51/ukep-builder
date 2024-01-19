import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../interfaces/user/user.interface';
import { IconInterface } from '../../../interfaces/icon.interface';
import { DEFAULT_DURATION, collapseItems } from '../../../helpers/animations';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.component.html',
  styleUrl: './wellcome.component.scss',
  animations: [
    collapseItems(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WellcomeComponent {

  readonly groups: IWellcomeGroups = groups;
  user$: Observable<IUser>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user;
  }
}

export const createItems: IWellcomeItems = [
  {
    title: 'Пустая форма',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'layout_top_panel_6',
    routerLink: ['/builder'],
    index: 0
  },
  {
    title: 'Шаблон 4 х 2',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'layout_4_blocks',
    routerLink: ['/builder'],
    extracts: { state: { template: { rows: 4, cols: 2 } }, queryParamsHandling: 'merge' },
    index: 1
  },
  {
    title: 'Шаблон 8 х 2',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'layout_grid',
    routerLink: ['/builder'],
    extracts: { state: { template: { rows: 8, cols: 2 } }, queryParamsHandling: 'merge' },
    index: 2
  },
  {
    title: 'Нарисовать',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'compass_1',
    routerLink: ['/builder'],
    extracts: { state: { dialog: 'drawTemplate' }, queryParamsHandling: 'merge' },
    index: 3
  },
];

export const openItems: IWellcomeItems = [
  {
    title: 'Реестр',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'clipboard_list',
    routerLink: ['register'],
    index: 0
  },
  {
    title: 'Завершены',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'like',
    routerLink: ['success'],
    index: 1
  },
  {
    title: 'Архив',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'star',
    routerLink: ['archive'],
    index: 2
  },
];

export const otherItems: IWellcomeItems = [
  {
    title: 'Мониторинг',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'spy',
    routerLink: ['monitoring'],
    index: 0
  },
  {
    title: 'Параметры',
    icon_class: 'svg-icon svg-icon-primary svg-icon-2x',
    icon_name: 'settings_4',
    routerLink: ['setting'],
    index: 1
  },
];

export const groups: IWellcomeGroups = [
  {
    title: 'Создание форм',
    items: createItems,
    index: 0
  },
  {
    title: 'Открыть',
    items: openItems,
    index: 1
  },
  {
    title: 'Прочее',
    items: otherItems,
    index: 2
  }
];

export interface IWellcomeGroup {
  title: string;
  items: IWellcomeItems;
  index: number;
}

export type IWellcomeGroups = Array<IWellcomeGroup>;

export interface IWellcomeItem extends IconInterface {
  title: string;
  routerLink: string[] | string | undefined;
  extracts?: NavigationExtras;
  index: number;
}

export type IWellcomeItems = Array<IWellcomeItem>;