import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

export const ErrorInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const errorInterceptor = inject(ErrorInterceptor);
  return errorInterceptor.intercept(req, next);
};

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
        return next(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.authService.logout();
                    location.reload();
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        )
    }
}