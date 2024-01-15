import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ISidebarItems } from './sidebar-item.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarDataService {
  
  selectItems(): Observable<ISidebarItems> {
    return of<ISidebarItems>([
      {
        id: 1,
        parent_id: undefined,
        icon_name: 'layout_top_panel_1',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Создать',
        role_id: undefined,
        router_link: ['home', 'create']
      },
      {
        id: 2,
        parent_id: undefined,
        icon_name: 'folder_thunder',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Открыть',
        role_id: undefined,
        router_link: undefined
      },
      {
        id: 3,
        parent_id: 2,
        icon_name: 'clipboard_list',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Реестр',
        role_id: undefined,
        router_link: ['home', 'register']
      },
      {
        id: 5,
        parent_id: 2,
        icon_name: 'like',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Завершены',
        role_id: undefined,
        router_link: ['home', 'success']
      },
      {
        id: 6,
        parent_id: 2,
        icon_name: 'star',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Архив',
        role_id: undefined,
        router_link: ['home', 'archive']
      },
      {
        id: 4,
        parent_id: undefined,
        icon_name: 'spy',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Мониторинг',
        role_id: undefined,
        router_link: ['home', 'monitoring']
      },
      {
        id: 10,
        parent_id: undefined,
        icon_name: 'settings_4',
        icon_class_list: 'svg-icon svg-icon-md',
        title: 'Параметры',
        role_id: undefined,
        router_link: ['home', 'setting']
      }
    ])
  }
}