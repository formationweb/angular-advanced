import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Login } from './login/login';
import { authGuard } from './core/guards/auth';

export const routes: Routes = [{
    path: '',
    component: Users,
    canActivate: [authGuard]
}, {
    path: 'login',
    component: Login
}];
