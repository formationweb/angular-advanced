import { AsyncSubject, BehaviorSubject, interval, mergeMap, Observable, of, ReplaySubject, retry, share, shareReplay, Subject, switchMap } from "rxjs"

// const ob$ = new Observable((subscribe) => {
//     subscribe.next(Math.random())
//     subscribe.next(Math.random())
//     setTimeout(() => {
//         subscribe.next(Math.random())
//     }, 1000)
// })

// ob$.subscribe(console.log)
// ob$.subscribe(console.log)

// const ob$ = new BehaviorSubject('default value') // ob$ = signal('default value')

// ob$.next('a') // ob$.set('a')

// ob$.subscribe(console.log) // effect(() => ob$())

// ob$.next('c')

// const ob$ = new AsyncSubject()



// ob$.next('a')
// ob$.next('b')
// ob$.next('c')

// ob$.next('d')
// ob$.subscribe(console.log)

// ob$.complete()

// const ob$ = new Observable((subscribe) => {
//     subscribe.next(Math.random())
// }).pipe(
//     share(),
// )

// ob$.subscribe((a) => console.log(a + 1))
// ob$.subscribe(console.log)

//  const ob$ = new Observable((subscribe) => {
//     let nb = 0
//      const counter = setInterval(() => {
//         nb++
//         subscribe.next(nb)
//      }, 1000)
//      return () => {
//         clearInterval(counter)
//      }
//  })

const ob1$ = interval(1000)
const ob2$ = interval(1000)

let subscription

// ob1$.subscribe((nb1) => {
//     console.log('----', nb1)
//     if (subscription) subscription.unsubscribe()
//     subscription = ob2$.subscribe((nb2) => {
//         console.log(nb2)
//     })
// })

// ob1$
//     .pipe(
//         switchMap((nb1) => {
//             console.log('----', nb1)
//             return ob2$
//         })
//     )
//     .subscribe((nb2) => {
//         console.log(nb2)
//     })

of(1, 2, 3).pipe(
    mergeMap((nb) => {
        console.log(nb)
        return of('a', 'b', 'c')
    })
).subscribe({
    next: (letter) => {
        console.log(letter)
    },
    error: (err) => {
        console.log(err)
    }
})