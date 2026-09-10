import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../login/auth";
import { isPlatformServer } from "@angular/common";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const platformId = inject(PLATFORM_ID)
    const router = inject(Router)
    if (isPlatformServer(platformId)) {
        return true
    }
    if (!authService.isConnected()) {
        return router.createUrlTree(['/login'])
    } 
    return true
}