import { AsyncSubject, BehaviorSubject, interval, mergeMap, Observable, of, ReplaySubject, Subject, Subscription, switchMap } from "rxjs"

// interval(1000).subscribe((ev1) => {
//     console.log('ev1', ev1)
//     interval(1000).subscribe((ev2) => {
//          console.log('----ev2', ev2)
//     })
// })

interval(1000).pipe(
    switchMap((ev1) => {
         console.log('ev1', ev1)
        return interval(1000)
    })
).subscribe((ev2) => {
     console.log('----ev2', ev2)
})

// let subscription: Subscription
// interval(1000).subscribe((ev1) => {
//     console.log('ev1', ev1)
//     if (subscription) subscription.unsubscribe()
//     subscription = interval(1000).subscribe((ev2) => {
//          console.log('----ev2', ev2)
//     })
// })