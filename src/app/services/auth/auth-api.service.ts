import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IUser, IUsers } from "../../interfaces/user/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(private http: HttpClient) { }

    public login(username: string, password: string): Observable<IUser> {
        return this.http.post<IUser>(`/user/authenticate`, { username, password });
    }

    public logout(): Observable<{}> {
        return of({}); // Типо пошли в бэк, удалили сессию и вернулись с ответом
    }

    public getUsers(): Observable<IUsers> {
        return this.http.get<IUsers>(`/users`);
    }
}