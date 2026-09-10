import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Storage } from '../core/storage';

function simulateHttpToken(): Observable<{ token: string }> {
  return timer(1000).pipe(
    map(() => {
      return {
        token: 'test',
      };
    }),
  );
}

const TOKEN_KEY = 'angular-token'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storage = inject(Storage)
  token = signal<string | null>(this.storage.getItem(TOKEN_KEY))
  isConnected = computed(() => !!this.token())

  login(email: string, password: string): Observable<void> {
    return simulateHttpToken().pipe(
        map((response) => {
            this.token.set(response.token)
            this.storage.setItem(TOKEN_KEY, response.token)
        })
    );
  }
}
