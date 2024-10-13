import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserAdsComponent } from './components/user-ads/user-ads.component';
import { AdService } from '../ad/ad.service';
import { SavedAdsComponent } from './components/saved-ads/saved-ads.component';

const userResolver = () => {
  const userService = inject(UserService);
  return userService.getCurrentUser().pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
};

export default [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: userResolver,
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          highlight: () => inject(UserService).getHighLight(),
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'saved',
        component: SavedAdsComponent,
        resolve: {
          ads: () => inject(AdService).getSavedAdsData(),
        },
      },
      {
        path: 'ads',
        component: UserAdsComponent,
        resolve: {
          ads: () => inject(AdService).getUserAds(),
        },
      },
    ],
  },
] as Routes;
