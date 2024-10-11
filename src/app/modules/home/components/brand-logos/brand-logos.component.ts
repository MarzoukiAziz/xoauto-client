import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from 'src/app/modules/new/new.types';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'home-brand-logos',
  templateUrl: './brand-logos.component.html',
  standalone: true,
  imports: [SwiperDirective, CommonModule, RouterLink],
  styleUrls: ['./brand-logos.component.css'],
})
export class BrandLogosComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @Input() brands: Brand[] = [];

  index = 0;

  swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 8,
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
