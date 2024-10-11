import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NewService } from '../../new.service';
import { Model } from '../../new.types';
@Component({
  selector: 'new-similar-models',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './similar-models.component.html',
  styleUrl: './similar-models.component.css',
})
export class SimilarModelsComponent {
  currency = environment.CURRENCY;
  @Input() price = 0;
  @Input() model = '';
  @Input() category = '';

  similars = [];
  loading = false;

  constructor(private _newService: NewService) {}

  ngOnInit(): void {
    this.loading = true;
    this._newService
      .getSimilars(this.category, this.model, this.price)
      .subscribe(() => {
        this._newService.similarAds$.subscribe((similars: Model[]) => {
          this.similars = similars;
          this.loading = false;
        });
      });
  }
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
