import { Component } from '@angular/core';

import { NewService } from '../new.service';
import { NewBrandFilterComponent } from './filters/brand-filter/brand-filter.component';
import { NewCategoryFilterComponent } from './filters/category-filter/category-filter.component';
import { NewEnergyFilterComponent } from './filters/energy-filter/energy-filter.component';
import { NewSeatsFilterComponent } from './filters/seats-filter/seats-filter.component';
import { NewPriceSliderComponent } from './sliders/price-slider/price-slider.component';
import { NewAutonomySliderComponent } from './sliders/autonomy-slider/autonomy-slider.component';
import { ChipsComponent } from '../components/chips/chips.component';
import { SortNewAdsComponent } from '../components/sort-ads/sort-new-ads.component';
import { ResultComponent } from '../components/result/result.component';

@Component({
  selector: 'search-models',
  templateUrl: './search-models.component.html',
  styleUrl: './search-models.component.css',
  standalone: true,
  imports: [
    NewBrandFilterComponent,
    NewCategoryFilterComponent,
    NewEnergyFilterComponent,
    NewSeatsFilterComponent,
    NewPriceSliderComponent,
    NewAutonomySliderComponent,
    ChipsComponent,
    SortNewAdsComponent,
    ResultComponent,
  ],
})
export class SearchModelsComponent {
  constructor(public _newService: NewService) {}

  updateResult() {
    this._newService.currentPage = 1;
    this._newService.getModels().subscribe();
  }
}
