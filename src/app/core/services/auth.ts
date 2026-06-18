import { Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { simulateHttpToken } from '../../simulate';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private token = signal('')

  login(email: string, password: string): Observable<void> {
    return simulateHttpToken().pipe(
      tap(({ token }) => {
        this.token.set(token)
      }),
      map(() => undefined
    ))
  }
}
