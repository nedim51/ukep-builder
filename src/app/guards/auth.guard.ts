import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

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
        const isAuth = this.authService.userValue.id !== -1;
        
        if (isAuth) return true;

        this.router.navigate(['/auth/sign-in'], {
            queryParams: {
                returnUrl: state.url // После авторизации продолжим с того же места
            }
        });

        return false;
    }
}