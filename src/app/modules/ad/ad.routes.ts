import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AdService } from './ad.service';
import { TodayAdsComponent } from './today-ads/today-ads.component';
import { ComparatorComponent } from './comparator/comparator.component';

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
] as Routes;
