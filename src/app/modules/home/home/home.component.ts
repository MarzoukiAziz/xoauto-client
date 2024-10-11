import { Component } from '@angular/core';
import { Brand } from '../../new/new.types';
import { ActivatedRoute } from '@angular/router';
import { BrandLogosComponent } from '../components/brand-logos/brand-logos.component';
import { register } from 'swiper/element/bundle';
import { LeatestNewsComponent } from '../components/leatest-news/leatest-news.component';
import { Article } from '../../blog/blog.types';
import { MobileAppAdComponent } from '../components/mobile-app-ad/mobile-app-ad.component';
import { Ad } from '../../ad/ad.types';
import { LatestAdsComponent } from '../components/latest-ads/latest-ads.component';

register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BrandLogosComponent,
    LeatestNewsComponent,
    MobileAppAdComponent,
    LatestAdsComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  brands: Brand[];
  articles: Article[];
  ads: Ad[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.brands = data['brands'].brands;
      this.articles = data['articles'].articles;
      this.ads = data['ads'].ads;
    });
  }
}
