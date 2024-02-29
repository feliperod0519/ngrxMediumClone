import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/auth/auth.routes').then((m) => m.loginRoutes)
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/globalFeed/globalFeed.routes').then((m)=>m.routes)
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('../app/yourFeed/yourFeed.routes').then((m)=>m.routes)
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('../app/tagFeed/tagFeed.routes').then((m)=>m.routes)
  }

];
