import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'color-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './color-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class ColorFilterComponent {
  colors = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.colors = settings.colors;
    });
  }

  toggleColor(color) {
    const index = this._adService.selectedColors.indexOf(color);
    if (index === -1) {
      this._adService.selectedColors.push(color);
    } else {
      this._adService.selectedColors.splice(index, 1);
    }
    console.log(this._adService.selectedColors);
  }

  isSelected(color) {
    return this._adService.selectedColors.includes(color);
  }

  resetColors() {
    this._adService.selectedColors = [];
  }
  UpdateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
