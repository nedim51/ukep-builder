import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const BasicAuthInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const basicAuthInterceptor = inject(BasicAuthInterceptor);

  return basicAuthInterceptor.intercept(req, next)
};

@Injectable({
    providedIn: 'root'
})
export class BasicAuthInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
        const currentUser = this.authService.userValue;

        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${currentUser.authdata}`
                }
            });
        }

        return next(request);
    }
}