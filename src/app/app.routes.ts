import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Users } from './users/users';
import { authGuard } from './core/guards/auth';

export const routes: Routes = [{
    path: 'login',
    component: Login
}, {
    path: '',
    component: Users,
    canActivate: [authGuard]
}];
