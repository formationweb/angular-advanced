import { computed, Service, signal } from '@angular/core';
import { map, Observable, tap, timer } from "rxjs";

function simulateHttpToken(): Observable<{ token: string }> {
   return timer(1000).pipe(map(() => {
       return {
           token: 'test'
       }
   }))
}

const KEY = 'angular-token'

@Service()
export class Auth {
    token = signal<string | null>(localStorage.getItem(KEY))
    isConnected = computed(() => !!this.token())

    login(email: string, password: string): Observable<void> {
        return simulateHttpToken().pipe(
            map((res) => {
               this.token.set(res.token)
               localStorage.setItem(KEY, res.token)
            })
        )
    }
}
