import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ad-seller-type-filter',
  templateUrl: './seller-type-filter.component.html',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  styleUrl: '../filter-item.css',
})
export class SellerTypeFilterComponent {
  sellerTypes = ['Particulier', 'Pro'];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  toggleSellerType(sellerType) {
    const index = this._adService.selectedSellerTypes.indexOf(sellerType);
    if (index === -1) {
      this._adService.selectedSellerTypes.push(sellerType);
    } else {
      this._adService.selectedSellerTypes.splice(index, 1);
    }
  }

  isSelected(sellerType) {
    return this._adService.selectedSellerTypes.includes(sellerType);
  }

  resetSellerTypes() {
    this._adService.selectedSellerTypes = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
