import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpHeaders, HttpStatusCode, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, map, switchMap, filter } from 'rxjs/operators';
import { INITIAL_USER, IUser, IUsers } from '../interfaces/user/user.interface';
import { UserDataService } from './user-data.service';
import { USER_KEY } from '../services/auth/auth.service';

export const BackendInterceptorFn: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const backendInterceptor = inject(BackendInterceptor);
    return backendInterceptor.intercept(req, next);
};

@Injectable({
    providedIn: 'root'
})
export class BackendInterceptor {

    authorized: Map<string, string> = new Map();
    currentUser: IUser;
    users$: Observable<IUsers>;

    constructor(private usersData: UserDataService) {
        this.users$ = this.usersData.selectUsers();
        const storedUser: string | null = localStorage.getItem(USER_KEY);
        this.currentUser = storedUser ? JSON.parse(storedUser) : INITIAL_USER;
        
        // Костыль? - да! Но работает :)
        this.usersData.selectUsers().pipe(
            map(users => users.find(user => user.id === this.currentUser.id)),
            filter(user => user !== undefined)
        ).subscribe(user => this.currentUser = user as IUser)
    }

    intercept(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        const handleRoute = () => {
            switch (true) {
                case url.endsWith('/user/authenticate') && method === 'POST':
                    return this.authenticate(body);
                case url.endsWith('/users') && method === 'GET':
                    return this.getUsers(headers);
                case url.endsWith('/ukep/forms') && method === 'GET':
                    return this.ok(); // Доработать ...
                default:
                    return next(request);
            }    
        }

        return of(null).pipe(
            mergeMap(handleRoute),
            materialize(), // Нужно вызвать materialize и dematerialize для имитации задержки, даже если ошибка, 
            delay(500), // а так materialize оборачивает любое испускаемое observable значение в некий Notification объект и эмитит его как «next»
            dematerialize()
        );
    }

    authenticate(body: any): Observable<HttpResponse<any>> {
        const { username, password } = body;

        return this.findUser(username, password).pipe(
            switchMap(user => {
                if(!user) {
                    return this.error('Ошибка логина или пароля')
                }

                // Попозже допилить эту тему
                this.authorized.set(`Basic ${window.btoa(`${user.username}:${user.password}`)})`, user.username)
                
                this.currentUser = user;

                const result: Omit<IUser, 'password'> = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    right: user.right,
                    role_id: user.role_id
                }

                return this.ok(result);
            })
        )
    }

    findUser(username: string, password: string): Observable<IUser | undefined> {
        return this.users$.pipe(
            map(users => users.find(user => user.username === username && user.password === password))
        )
    }

    error(message: string, status: HttpStatusCode = HttpStatusCode.NotFound): Observable<never> {
        return throwError(new HttpErrorResponse({ 
            status: status,
            error: { 
                message 
            } 
        }));
    }

    unauthorized(): Observable<never> {
        return throwError(new HttpErrorResponse({ 
            status: 401, 
            error: { 
                message: 'Не авторизован' 
            } 
        }));
    }
        
    getUsers(headers: HttpHeaders) {
        if (!this.isLoggedIn(this.currentUser, headers)) {
            return this.unauthorized();
        }

        return this.ok().pipe(
            switchMap(response => this.users$.pipe(
                map(users => new HttpResponse({ 
                    status: response.status, 
                    body: users 
                }))
            ))
        );
    }


    ok$(body?: Observable<any>): Observable<HttpResponse<any>> {
        if(body && body instanceof Observable) {
            return of(200).pipe(
                switchMap(status => body.pipe(
                    map(body => new HttpResponse({ 
                        status: status, 
                        body: body 
                    }))
                ))
            )
        }

        return this.ok(body)
    }

    ok(body?: any): Observable<HttpResponse<any>> {
        return of(new HttpResponse({ 
            status: 200, 
            body
        }))
    }

    isLoggedIn(user: IUser, headers: HttpHeaders): boolean {
        return headers.get('Authorization') == `Basic ${window.btoa(`${user.username}:${user.password}`)}`;
    }

}