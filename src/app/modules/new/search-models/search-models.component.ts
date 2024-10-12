import { Component } from '@angular/core';

import { NewService } from '../new.service';
import { BrandFilterComponent } from './filters/brand-filter/brand-filter.component';
import { CategoryFilterComponent } from './filters/category-filter/category-filter.component';
import { EnergyFilterComponent } from './filters/energy-filter/energy-filter.component';
import { SeatsFilterComponent } from './filters/seats-filter/seats-filter.component';
import { PriceSliderComponent } from './sliders/price-slider/price-slider.component';
import { AutonomySliderComponent } from './sliders/autonomy-slider/autonomy-slider.component';
import { ChipsComponent } from '../components/chips/chips.component';
import { SortNewAdsComponent } from '../components/sort-ads/sort-new-ads.component';
import { ResultComponent } from '../components/result/result.component';

@Component({
  selector: 'search-models',
  templateUrl: './search-models.component.html',
  styleUrl: './search-models.component.css',
  standalone: true,
  imports: [
    BrandFilterComponent,
    CategoryFilterComponent,
    EnergyFilterComponent,
    SeatsFilterComponent,
    PriceSliderComponent,
    AutonomySliderComponent,
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
