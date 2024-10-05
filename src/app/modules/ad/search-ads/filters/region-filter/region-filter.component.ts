import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'region-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './region-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class RegionFilterComponent {
  regions = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.regions = settings.regions;
    });
  }

  toggleRegion(region) {
    const index = this._adService.selectedRegions.indexOf(region);
    if (index === -1) {
      this._adService.selectedRegions.push(region);
    } else {
      this._adService.selectedRegions.splice(index, 1);
    }
  }

  isSelected(region) {
    return this._adService.selectedRegions.includes(region);
  }

  resetRegions() {
    this._adService.selectedRegions = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
