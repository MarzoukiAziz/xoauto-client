import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthCallbackComponent } from './modules/auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'blog',
        loadChildren: () => import('./modules/blog/blog.routes'),
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.routes'),
      },
      {
        path: 'ad',
        loadChildren: () => import('./modules/ad/ad.routes'),
      },
      {
        path: 'success-login',
        component: AuthCallbackComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
