import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/modules/blog/blog.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-latest-news',
  templateUrl: './latest-news.component.html',
  standalone: true,
  imports: [SwiperDirective, CommonModule, RouterLink],
  styleUrls: ['./latest-news.component.css'],
})
export class LatestNewsComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @Input() articles: Article[] = [];

  index = 0;

  swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: true,
    autoplay: {
      delay: 2000,
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

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    this.swiper.nativeElement.swiper.autoplay.start();
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }
}
