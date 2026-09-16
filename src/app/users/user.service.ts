import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Service } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

export type UserPayload = { email: string, name: string }

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)

    getAll(search: string): Observable<User[]> {
        return this.http.get<User[]>(this.url + '?search=' + search)
    }

    create(payload: UserPayload): Observable<User> {
         return this.http.post<User>(this.url, payload)
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/' + id)
    }
}