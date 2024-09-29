import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Ad } from '../../ad.types';
import { SwiperOptions } from 'swiper/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { CookieService } from 'ngx-cookie-service';

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
  comparator = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.comparator = this.cookieService.get('comparator-used');
    console.log(this.comparator);
  }

  addToCompare(id) {
    const cookieValue = this.cookieService.get('comparator-used');
    let arr = cookieValue.split(',');
    let value = '';
    if (arr.indexOf(id) == -1) {
      if (cookieValue == '') {
        value = id;
      } else {
        value = cookieValue + ',' + id;
      }
      this.cookieService.set('comparator-used', value);
      this.comparator = value;
    }
  }

  removeFromCompare(id) {
    let cookieValue = this.cookieService.get('comparator-used');
    let arr = cookieValue.split(',');
    arr = arr.filter((item) => item !== id);
    const value = arr.join(',');
    this.cookieService.set('comparator-used', value);
    this.comparator = value;
  }

  swiperConfig: SwiperOptions = {
    pagination: true,
  };
  slideChange(swiper: any) {}
}
