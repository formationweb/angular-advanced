import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "./services/auth";

export const authInterceptor = 
    (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const auth  = inject(Auth)
        const token = auth.token()

        if (!token) {
            return next(req)
        }

        const headers = new HttpHeaders({
            Authorization: token
        })

        const newReq = req.clone({
            headers
        })

        return next(newReq)
    }