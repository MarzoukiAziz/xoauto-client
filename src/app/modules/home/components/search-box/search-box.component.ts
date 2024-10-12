import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PriceSliderComponent } from '../../../ad/search-ads/sliders/price-slider/price-slider.component';
import { AdService } from 'src/app/modules/ad/ad.service';
import { NewService } from 'src/app/modules/new/new.service';
import { RouterLink } from '@angular/router';
import { MileageSliderComponent } from '../../../ad/search-ads/sliders/mileage-slider/mileage-slider.component';
import { YearSliderComponent } from '../../../ad/search-ads/sliders/year-slider/year-slider.component';
import { AutonomySliderComponent } from '../../../ad/search-ads/sliders/autonomy-slider/autonomy-slider.component';
import { NewPriceSliderComponent } from '../../../new/search-models/sliders/price-slider/price-slider.component';

@Component({
  selector: 'home-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PriceSliderComponent,
    RouterLink,
    MileageSliderComponent,
    YearSliderComponent,
    AutonomySliderComponent,
    NewPriceSliderComponent,
  ],
})
export class SearchBoxComponent {
  @Input() categories = [];

  selected = 'used';
  moreSliders = false;

  constructor(private _adService: AdService, private _newService: NewService) {
    this._adService.resetFilters();
    this._newService.resetFilters();
  }

  toggleUsedCategory(category) {
    const index = this._adService.selectedCategories.indexOf(category);
    if (index === -1) {
      this._adService.selectedCategories.push(category);
    } else {
      this._adService.selectedCategories.splice(index, 1);
    }
  }

  toggleNewCategory(category) {
    const index = this._newService.selectedCategories.indexOf(category);
    if (index === -1) {
      this._newService.selectedCategories.push(category);
    } else {
      this._newService.selectedCategories.splice(index, 1);
    }
  }

  isUsedCategorySelected(category) {
    return this._adService.selectedCategories.includes(category);
  }

  isNewCategorySelected(category) {
    return this._newService.selectedCategories.includes(category);
  }
}
