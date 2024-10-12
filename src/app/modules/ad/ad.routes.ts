import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { AdService } from './ad.service';
import { TodayAdsComponent } from './today-ads/today-ads.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { DetailComponent } from './detail/detail.component';
import { catchError, throwError } from 'rxjs';
import { SearchAdsComponent } from './search-ads/search-ads.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

const adResolver = (route: ActivatedRouteSnapshot) => {
  const adService = inject(AdService);
  const router = inject(Router);

  return adService.getAdById(route.paramMap.get('adid') ?? '').pipe(
    catchError((error) => {
      console.error(error);
      router.navigateByUrl('/ad');
      return throwError(error);
    })
  );
};

const savedResolver = () => {
  const adService = inject(AdService);
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return adService.getSavedAds().pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  } else {
    return [];
  }
};

export default [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateAdComponent,
    resolve: { settings: () => inject(AdService).getSettings() },
  },
  {
    path: 'search',
    component: SearchAdsComponent,
    resolve: {
      ads: () => inject(AdService).getAds(),
      settings: () => inject(AdService).getSettings(),
    },
  },
  {
    path: 'today',
    component: TodayAdsComponent,
    resolve: {
      ads: () => inject(AdService).getTodayAds(),
    },
  },
  {
    path: 'comparator',
    component: ComparatorComponent,
    resolve: {
      ads: () => inject(AdService).getAdsForComparator(),
    },
  },
  {
    path: 'detail/:adid',
    component: DetailComponent,
    resolve: {
      ad: adResolver,
      saved: savedResolver,
    },
  },
] as Routes;
