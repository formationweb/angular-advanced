import { AsyncSubject, BehaviorSubject, interval, map, merge, mergeMap, Observable, of, ReplaySubject, Subject, switchMap } from "rxjs";

// const ob$ = interval(1000)

// ob$.pipe(
//     mergeMap(nb => of(nb * 2)) // === map(nb => nb * 2)
// ).subscribe(console.log)

// let subscription

// interval(1000).subscribe((nb) => {
//     console.log(nb)
//     if (subscription) subscription.unsubscribe()
//     subscription = interval(1000).pipe(map(() => Math.random())).subscribe((rand) => {
//         console.log(rand)
//     })
// })


interval(1000).pipe(
    switchMap((nb) => interval(1000).pipe(map(() => Math.random()))
)).subscribe({
    next: (nb) => {
        console.log(nb)
    },
    error: (err) => {
        console.log(err)
    }
})

// const ob$ = new AsyncSubject() 

// ob$.next('a') 
// ob$.next('b') 
// ob$.next('c') 

// ob$.subscribe(console.log)

// ob$.next('d') 
// ob$.complete()