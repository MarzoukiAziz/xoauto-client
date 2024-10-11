import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewService } from '../new/new.service';
import { inject } from '@angular/core';
import { BlogService } from '../blog/blog.service';
import { AdService } from '../ad/ad.service';

export default [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      brands: () => inject(NewService).getSettings(),
      articles: () => inject(BlogService).getArticles(),
      ads: () => inject(AdService).getAds(),
    },
  },
] as Routes;
