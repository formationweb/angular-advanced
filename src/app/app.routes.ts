import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Login } from './login/login';

export const routes: Routes = [{
    path: '',
    component: Users
}, {
    path: 'login',
    component: Login
}];
