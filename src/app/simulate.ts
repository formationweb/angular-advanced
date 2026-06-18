import { map, Observable, timer } from "rxjs";

export function simulateHttpToken(): Observable<{ token: string }> {
    return timer(1000).pipe(map(() => {
        return {
            token: 'test'
        }
    }))
}