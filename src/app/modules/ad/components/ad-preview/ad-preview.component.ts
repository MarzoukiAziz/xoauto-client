import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Ad } from '../../ad.types';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { AdService } from '../../ad.service';

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

  constructor(public _adService: AdService) {}

  ngOnInit() {}

  swiperConfig: SwiperOptions = {
    pagination: true,
  };
  slideChange(swiper: any) {}
}
