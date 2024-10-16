import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'similar-ads',
  templateUrl: './similar-ads.component.html',
  styleUrl: './similar-ads.component.css',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
})
export class SimilarAdsComponent {
  @Input() similars: [];
  currency = environment.CURRENCY;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };
}
