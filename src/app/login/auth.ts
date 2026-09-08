import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';

function simulateHttpToken(): Observable<{ token: string }> {
  return timer(1000).pipe(
    map(() => {
      return {
        token: 'test',
      };
    }),
  );
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = signal<string | null>(null)
  isConnected = computed(() => !!this.token())

  login(email: string, password: string): Observable<void> {
    return simulateHttpToken().pipe(
        map((response) => {
            this.token.set(response.token)
        })
    );
  }
}
