import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { AdService } from './ad.service';
import { TodayAdsComponent } from './today-ads/today-ads.component';
import { ComparatorComponent } from './comparator/comparator.component';
import { DetailComponent } from './detail/detail.component';
import { catchError, throwError } from 'rxjs';

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

export default [
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
    },
  },
] as Routes;
