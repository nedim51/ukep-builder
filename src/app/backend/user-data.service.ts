import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUsers } from '../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  selectUsers(): Observable<IUsers> {
    return of<IUsers>([
      { 
        id: 1, 
        username: 'SuinovNA1', 
        password: '12345678', 
        firstName: 'Nedim', 
        lastName: 'Suinov', 
        right: 'Разработчик',
        role_id: 20
      },
      { 
        id: 2, 
        username: 'test', 
        password: 'test', 
        firstName: 'Test', 
        lastName: 'User', 
        right: 'Test', 
        role_id: 1
      }
    ])
  }
}