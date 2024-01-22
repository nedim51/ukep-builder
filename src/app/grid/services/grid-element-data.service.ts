import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IElements } from '../../interfaces/element.interface';
import { elements } from './grid-element.data';

/**
 * Сервис представляет список элементов доступных для переноса на доску
 */

@Injectable({
  providedIn: 'root'
})
export class GridElementDataService {

  selectElementList(): Observable<IElements> {
    return of(elements);
  }
}