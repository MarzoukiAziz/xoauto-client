import { Component } from '@angular/core';
import { AdService } from '../ad.service';
import { ResultComponent } from '../components/result/result.component';
import { BrandFilterComponent } from './filters/brand-filter/brand-filter.component';
import { ModelFilterComponent } from './filters/model-filter/model-filter.component';
import { CategoryFilterComponent } from './filters/category-filter/category-filter.component';
import { EnergyFilterComponent } from './filters/energy-filter/energy-filter.component';
import { ColorFilterComponent } from './filters/color-filter/color-filter.component';
import { SellerTypeFilterComponent } from './filters/seller-type-filter/seller-type-filter.component';
import { RegionFilterComponent } from './filters/region-filter/region-filter.component';
import { SeatsFilterComponent } from './filters/seats-filter/seats-filter.component';
import { PriceSliderComponent } from './sliders/price-slider/price-slider.component';
import { MileageSliderComponent } from './sliders/mileage-slider/mileage-slider.component';
import { YearSliderComponent } from './sliders/year-slider/year-slider.component';
import { AutonomySliderComponent } from './sliders/autonomy-slider/autonomy-slider.component';
import { ChipsComponent } from '../components/chips/chips.component';
import { SortAdsComponent } from '../components/sort-ads/sort-ads.component';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrl: './search-ads.component.css',
  standalone: true,
  imports: [
    ResultComponent,
    BrandFilterComponent,
    ModelFilterComponent,
    CategoryFilterComponent,
    EnergyFilterComponent,
    ColorFilterComponent,
    SellerTypeFilterComponent,
    RegionFilterComponent,
    SeatsFilterComponent,
    PriceSliderComponent,
    MileageSliderComponent,
    YearSliderComponent,
    AutonomySliderComponent,
    ChipsComponent,
    SortAdsComponent,
  ],
})
export class SearchAdsComponent {
  moreSliders = false;
  constructor(public _adService: AdService) {}

  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
  }
}
