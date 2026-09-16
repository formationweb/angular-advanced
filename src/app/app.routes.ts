import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './core/guards/auth';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [{
    path: 'login',
    component: Login
}, {
    path: '',
    loadComponent: () => import('./users/users').then(mod => mod.Users),
    canActivate: [authGuard]
}, {
    path: 'admin', // admin/dashboard ; admin/articles ; admin/
    loadChildren: () => import('./admin/admin.routes').then(mod => mod.adminRoutes)
}];
