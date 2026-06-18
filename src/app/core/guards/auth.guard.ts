import { inject } from "@angular/core";
import { Auth } from "../services/auth";
import { catchError, Observable, of } from "rxjs";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route) => {
    const auth = inject(Auth)
    const router = inject(Router)
    // return of(auth.hasToken()).pipe(
    //     catchError((err) => {

    //         throw err
    //     })
    // )
    if (!auth.hasToken()) {
        return router.createUrlTree(['/login'])
    }
    return true
}