import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'model-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './model-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class ModelFilterComponent {
  models = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.models = settings.models;
    });
  }

  toggleModel(model) {
    const index = this._adService.selectedModels.indexOf(model);
    if (index === -1) {
      this._adService.selectedModels.push(model);
    } else {
      this._adService.selectedModels.splice(index, 1);
    }
    console.log(this._adService.selectedModels);
  }

  isSelected(model) {
    return this._adService.selectedModels.includes(model);
  }

  resetModels() {
    this._adService.selectedModels = [];
  }
  UpdateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }

  filterModels(models) {
    if (this._adService.selectedBrands.length > 0) {
      const selectedBrandIds = this._adService.selectedBrands.map(
        (brand) => brand._id
      );
      return models.filter((model) => selectedBrandIds.includes(model.brandId));
    }
    return models;
  }
}
