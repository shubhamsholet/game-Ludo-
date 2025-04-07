import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./ludo/ludo.component').then((m) => m.LudoComponent),
  },
  {
    path: 'play-ludo',
    loadComponent: () => import('./ludo/play-ludo/play-ludo.page').then( m => m.PlayLudoPage)
  },
  {
    path: 'play-ludo',
    loadComponent: () => import('./ludo/play-ludo/play-ludo.page').then( m => m.PlayLudoPage)
  },
];
