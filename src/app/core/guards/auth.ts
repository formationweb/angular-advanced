import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../../login/auth";
import { isPlatformServer } from "@angular/common";

export const authGuard: CanActivateFn = () => {
    const auth = inject(Auth)
    const router = inject(Router)
    const platformId = inject(PLATFORM_ID)
    if (isPlatformServer(platformId)) {
        return true
    }
    if (!auth.isConnected()) {
        // router.navigateByUrl('/login')
        // return false
        return router.createUrlTree(['/login'])
    }
    return true
}