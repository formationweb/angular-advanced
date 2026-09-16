import { isPlatformBrowser } from '@angular/common';
import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
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
    private platformId = inject(PLATFORM_ID)
    token = signal<string | null>('')
    isConnected = computed(() => !!this.token())

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.token.set(localStorage.getItem(KEY))
        }
    }

    login(email: string, password: string): Observable<void> {
        return simulateHttpToken().pipe(
            map((res) => {
               this.token.set(res.token)
               localStorage.setItem(KEY, res.token)
            })
        )
    }
}
