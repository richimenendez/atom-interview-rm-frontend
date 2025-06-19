import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tasks/tasks-module').then(m => m.TasksModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];
