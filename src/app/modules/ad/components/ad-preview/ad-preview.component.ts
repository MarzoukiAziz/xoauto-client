import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Ad } from '../../ad.types';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
register();

@Component({
  selector: 'ad-preview',
  templateUrl: './ad-preview.component.html',
  styleUrl: './ad-preview.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink, SwiperDirective],
})
export class AdPreviewComponent {
  @Input() ad: Ad;
  comparateur = '';

  addToCompare(id) {}

  removeFromCompare(id) {}

  swiperConfig: SwiperOptions = {
    pagination: true,
  };
  slideChange(swiper: any) {}
}
