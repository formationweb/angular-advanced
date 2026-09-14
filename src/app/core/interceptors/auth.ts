import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { Auth } from "../../login/auth";

export const authInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const auth = inject(Auth)
        const token = auth.token()

        if (!token) {
            return next(req)
        }

        if (req.url.includes('login')) {
            return next(req)
        }

        const headers = new HttpHeaders({
            Authorization: token
        })

        const newReq = req.clone({
            headers
        })

        return next(newReq).pipe(
            tap((httpEvent) => {
                console.log(httpEvent)
            }),
            catchError((err) => {
                console.log(err)
                throw err
            })
        )
    }