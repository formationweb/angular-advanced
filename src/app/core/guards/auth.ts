import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../login/auth";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(Router)
    if (!authService.isConnected()) {
        return router.createUrlTree(['/login'])
    } 
    return true
}