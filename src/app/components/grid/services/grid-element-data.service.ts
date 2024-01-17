import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IElements } from '../../../interfaces/element.interface';

@Injectable({
  providedIn: 'root'
})
export class GridElementDataService {

  selectElementList(): Observable<IElements> {
    return of<IElements>([
      {
        id: 0,
        title: 'Input',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      {
        id: 1,
        title: 'File-input',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      {
        id: 2,
        title: 'Checkbox',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      {
        id: 3,
        title: 'Radio-button',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      {
        id: 4,
        title: 'Button',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      {
        id: 5,
        title: 'Combobox',
        type: 'element',
        icon_name: '',
        icon_class: '',
      },
      // {
      //   id: 6,
      //   title: 'Table',
      //   type: 'element',
      //   icon_name: '',
      //   icon_class: '',
      // },
    ])
  }
}