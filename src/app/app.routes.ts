import { Routes } from '@angular/router';
import { AuthGuardFn } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    data: {
      sidebar: false, 
      header: false,
      title: 'Авторизация'
    },
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    data: {
      icon: 'layout_top_panel_2',
      title: 'Конструктор WEB-интерфейсов'
    },
    canActivate: [AuthGuardFn],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'other',
    data: {
      sidebar: false, 
      header: false,
    },
    loadChildren: () => import('./other/other.module').then(m => m.OtherModule)
  },
  { 
    path: '**',
    redirectTo: 'other/not-found'
  }
];
 