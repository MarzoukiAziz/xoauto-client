import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Ad } from 'src/app/modules/ad/ad.types';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { environment } from 'src/environments/environment';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types/swiper-options';
@Component({
  selector: 'home-latest-ads',
  templateUrl: './latest-ads.component.html',
  styleUrls: ['./latest-ads.component.css'],
  standalone: true,
  imports: [SwiperDirective, CommonModule],
})
export class LatestAdsComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @Input() ads: Ad[] = [];
  index = 0;
  currency = environment.CURRENCY;

  // Swiper configuration options
  swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  // Lifecycle hook - ngAfterViewInit
  ngAfterViewInit() {
    // Set the active index and start autoplay after the view is initialized
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    this.swiper.nativeElement.swiper.autoplay.start();
  }

  // Callback function for the slide change event
  slideChange(swiper: any) {
    // Update the index when the slide changes
    this.index = swiper.detail[0].activeIndex;
  }
}
