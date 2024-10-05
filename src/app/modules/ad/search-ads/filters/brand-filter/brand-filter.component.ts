import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'brand-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './brand-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class BrandFilterComponent {
  brands = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.brands = settings.brands;
    });
  }

  toggleBrand(brand) {
    const index = this._adService.selectedBrands.indexOf(brand);
    if (index === -1) {
      this._adService.selectedBrands.push(brand);
    } else {
      this._adService.selectedBrands.splice(index, 1);
    }
    console.log(this._adService.selectedBrands);
  }

  isSelected(brand) {
    return this._adService.selectedBrands.includes(brand);
  }

  resetBrands() {
    this._adService.selectedBrands = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
