import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Service } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }
}