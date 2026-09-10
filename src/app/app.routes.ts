import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './core/guards/auth';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./users/users').then((mod) => mod.Users),
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((mod) => mod.adminRoutes),
  },
];
