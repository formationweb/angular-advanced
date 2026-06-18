import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";

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
    private _users = signal<User[]>([])
    users = this._users.asReadonly()
    searchValue = signal('')
    usersFiltered = computed(() => {
        return this.users().filter(user => user.name.includes(this.searchValue()))
    })

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url).pipe(
            tap((users) => {
                this._users.set(users)
            })
        )
    }


   getFirstUser(): Observable<User> {
    return this.http.get<User>(this.url + '/1').pipe(
      map((user) => {
        return {
          ...user,
          permissions: ['user.read', 'user.edit']
        }
      })
    )
  }
}