import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "../services/auth";
import { UsersService } from "../../users/users.service";
import { authGuard } from "./auth.guard";
import { map } from "rxjs";

// export const permissionGuard: CanActivateFn = (route) => {
//     const usersService = inject(UsersService)
//     const router = inject(Router)
//     const requiredPermissions = route.data['requiredPermissions'] as string[]

//     if (!requiredPermissions) {
//         return true
//     }

//     return usersService.getFirstUser().pipe(
//         map((user) => {
//             return requiredPermissions.some(permission => {
//                 return user.permissions.includes(permission)
//             }) ? true : router.createUrlTree(['/forbidden'])
//         })
//     )
// }

export const permissionGuard = (requiredPermissions: string[]): CanActivateFn => {
    return (route) => {
        const usersService = inject(UsersService)
        const router = inject(Router)
        

        if (!requiredPermissions) {
            return true
        }

        return usersService.getFirstUser().pipe(
            map((user) => {
                return requiredPermissions.some(permission => {
                    return user.permissions.includes(permission)
                }) ? true : router.createUrlTree(['/forbidden'])
            })
        )
    }
}