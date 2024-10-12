import { Component } from '@angular/core';
import { Brand } from '../../new/new.types';
import { ActivatedRoute } from '@angular/router';
import { BrandLogosComponent } from '../components/brand-logos/brand-logos.component';
import { register } from 'swiper/element/bundle';
import { LatestNewsComponent } from '../components/latest-news/latest-news.component';
import { Article } from '../../blog/blog.types';
import { MobileAppAdComponent } from '../components/mobile-app-ad/mobile-app-ad.component';
import { Ad } from '../../ad/ad.types';
import { LatestAdsComponent } from '../components/latest-ads/latest-ads.component';
import { SearchBoxComponent } from '../components/search-box/search-box.component';

register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BrandLogosComponent,
    LatestNewsComponent,
    MobileAppAdComponent,
    LatestAdsComponent,
    SearchBoxComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  brands: Brand[];
  articles: Article[];
  ads: Ad[];
  categories = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.brands = data['settings'].brands;
      this.articles = data['articles'].articles;
      this.ads = data['ads'].ads;
      this.categories = data['settings'].categories;
    });
  }
}
