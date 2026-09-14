import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../../login/auth";

export const authGuard: CanActivateFn = () => {
    const auth = inject(Auth)
    const router = inject(Router)
    if (!auth.isConnected()) {
        // router.navigateByUrl('/login')
        // return false
        return router.createUrlTree(['/login'])
    }
    return true
}