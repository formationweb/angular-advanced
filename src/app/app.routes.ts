import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Users } from './users/users';
import { authGuard } from './core/guards/auth.guard';
import { Forbidden } from './forbidden/forbidden';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [{
    path: 'login',
    component: Login
}, {
    path: '',
    component: Users,
    canActivate: [authGuard, permissionGuard(['user.read', 'user.delete'])],
    data: {
        requiredAuth: true,
        //requiredPermissions: ['user.read', 'user.delete']
    }
}, {
    path: 'forbidden',
    component: Forbidden
}];
