import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AdService } from './ad.service';
import { TodayAdsComponent } from './today-ads/today-ads.component';

export default [
  {
    path: 'today',
    component: TodayAdsComponent,
    resolve: {
      ads: () => inject(AdService).getTodayAds(),
    },
  },
] as Routes;
