import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { indicate } from '../../../operators/indicate.operator';
import { Destroy } from '../../../services/core/destroy.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  test: WritableSignal<{ login: string, password: string }> = signal({ login: 'test', password: 'test' });
  isFormValid$: Observable<boolean>;
  loadingIndicator$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string = '';
  errorMessage: WritableSignal<string> = signal('');

  constructor(
    private destroy$: Destroy,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.createLoginForm();
    this.isFormValid$ = this.loginForm.statusChanges.pipe(map(status => status === 'VALID' ? true : false))
    
    if (this.authService.userValue.id !== -1) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // URL-адрес возврата из параметров маршрута или по умолчанию '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get controls() { 
    return this.loginForm.controls; 
  }

  get credentials() {
    return { 
      username: this.controls['username'].value, 
      password: this.controls['password'].value
    }
  }

  onSubmit() {
    const login$ = this.authService.login(this.credentials.username, this.credentials.password)
      .pipe(indicate(this.loadingIndicator$));
    
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    login$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error: any) => {
        this.errorMessage.set(error);
      }
    })
  }

  createLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      password: new FormControl({ disabled: false, value: '' }, [Validators.required]),
    })
  }
}
