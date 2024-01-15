import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthApiService } from '../services/auth/auth-api.service';
import { Observable } from 'rxjs';
import { IUsers } from '../interfaces/user/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  users$: Observable<IUsers>;
  
  constructor(private api: AuthApiService) {
    this.users$ = this.api.getUsers()
  }
}
