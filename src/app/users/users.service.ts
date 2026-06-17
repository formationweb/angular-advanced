import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface User {
    id: number
    email: string
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }
}