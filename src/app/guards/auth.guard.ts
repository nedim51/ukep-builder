import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const AuthGuardFn: CanActivateFn = (
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
): boolean => {
    return inject(AuthGuard).canActivate(next, state);
}

@Injectable({ 
    providedIn: 'root' 
})
export class AuthGuard {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuth = this.authService.userValue.id !== -1  && this.authService.userValue.authdata;
        
        if (isAuth) return true;

        this.router.navigate(['/auth/sign-in'], {
            queryParams: {
                returnUrl: state.url // После авторизации продолжим работать с того же места
            }
        });

        return false;
    }
}