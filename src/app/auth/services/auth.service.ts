import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { INITIAL_USER, IUser } from '../../interfaces/user/user.interface';
import { StateService } from '../../services/core/state.service';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Destroy } from '../../services/core/destroy.service';

export const USER_KEY: string = 'UKEP-USER'

@Injectable({
    providedIn: 'root'
})
export class AuthService extends StateService<IUser> {

    public user: Observable<IUser>;

    public get userValue(): IUser {
        return this.state;
    }

    constructor(
        private destroy$: Destroy,
        private authApi: AuthApiService,
        private router: Router) {
        const storedUser: string | undefined = localStorage.getItem(USER_KEY) || undefined;
        super(storedUser ? JSON.parse(storedUser) : INITIAL_USER)
        this.user = this.select(state => state);
    }

    /**
     * Метод авторизации в сервисе
     */
    login(username: string, password: string) {
        const auth$: Observable<IUser> = this.authApi.login(username, password);

        return auth$.pipe(
            tap(user => {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem(USER_KEY, JSON.stringify(user));
                this.setState(user);
                return user;
            })
        );
    }

    /**
     * Метод де-авторизации
     */
    logout() {
        const logout$: Observable<{}> = this.authApi.logout();

        localStorage.removeItem(USER_KEY);
        this.setState(INITIAL_USER);

        logout$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_ => this.router.navigate(['auth', 'sign-in']));
    }
}