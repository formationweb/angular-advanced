import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { simulateHttpToken } from '../../simulate';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _token = signal('')
  token = this._token.asReadonly()
  hasToken = computed(() => !!this.token())

  login(email: string, password: string): Observable<void> {
    return simulateHttpToken().pipe(
      tap(({ token }) => {
        this._token.set(token)
      }),
      map(() => undefined
    ))
  }
}
