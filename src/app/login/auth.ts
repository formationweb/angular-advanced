import { isPlatformBrowser } from '@angular/common';
import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { map, Observable, tap, timer } from "rxjs";
import { Storage } from '../core/storage';

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
   
    private storage = inject(Storage)
    token = signal<string | null>(this.storage.getItem(KEY))
    isConnected = computed(() => !!this.token())

    login(email: string, password: string): Observable<void> {
        return simulateHttpToken().pipe(
            map((res) => {
               this.token.set(res.token)
               this.storage.setItem(KEY, res.token)
            })
        )
    }
}
