import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Users } from './users/users';

export const routes: Routes = [{
    path: 'login',
    component: Login
}, {
    path: '',
    component: Users
}];
