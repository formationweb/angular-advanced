import { Routes } from '@angular/router';

import { Users } from './users/users';
import { authGuard } from './core/guards/auth.guard';
import { Forbidden } from './forbidden/forbidden';
import { permissionGuard } from './core/guards/permission.guard';
import { confirmDeactivateGuard } from './core/guards/confirm.guard';
import { UserEdit } from './user-edit/user-edit';
import { UserEditSchema } from './user-edit-schema/user-edit-schema';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login_copy/login').then((mod) => mod.Login),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(mod => mod.adminRoutes)
  },
  {
    path: '',
    component: Users,
    // canActivate: [authGuard, permissionGuard(['user.read', 'user.delete'])],
    //canDeactivate: [confirmDeactivateGuard],
    data: {
      requiredAuth: true,
      //requiredPermissions: ['user.read', 'user.delete']
    },
  },
  {
    path: 'forbidden',
    component: Forbidden,
  },
  {
    path: 'edit/:id',
    component: UserEdit,
    canDeactivate: [confirmDeactivateGuard],
  },
  {
    path: 'user-schema',
    component: UserEditSchema
  }
];
