import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';
@Component({
  selector: 'category-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './category-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class CategoryFilterComponent {
  categories = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.categories = settings.categories;
    });
  }

  toggleCategory(category) {
    const index = this._adService.selectedCategories.indexOf(category);
    if (index === -1) {
      this._adService.selectedCategories.push(category);
    } else {
      this._adService.selectedCategories.splice(index, 1);
    }
  }

  isSelected(category) {
    return this._adService.selectedCategories.includes(category);
  }

  resetCategories() {
    this._adService.selectedCategories = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
