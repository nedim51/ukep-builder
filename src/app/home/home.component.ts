import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { AuthApiService } from '../services/api/auth-api.service';
import { Observable } from 'rxjs';
import { IUsers } from '../interfaces/user/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  showOutlet: WritableSignal<boolean> = signal(false);

  users$: Observable<IUsers>;

  constructor(private api: AuthApiService) {
    this.users$ = this.api.getUsers()
  }

  onOutletActivate(event: any): void {
    this.showOutlet.set(true);
  }
  
  onOutletDeactivate(event: any): void {
    this.showOutlet.set(false);
  }
}
