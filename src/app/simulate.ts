import { map, Observable, timer } from "rxjs";

function simulateHttpToken(): Observable<{ token: string }> {
    return timer(1000).pipe(map(() => {
        return {
            token: 'test'
        }
    }))
}

simulateHttpToken().subscribe(console.log)