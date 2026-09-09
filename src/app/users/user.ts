import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { User } from '../core/interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class UserService  {
    readonly url = 'https://jsonplaceholder.typicode.com/users'
    private http = inject(HttpClient)

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url)
    }
}
