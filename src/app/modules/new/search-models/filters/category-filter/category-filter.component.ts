import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NewService } from '../../../new.service';
import { Settings } from 'src/app/modules/ad/ad.types';
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
  constructor(public _newService: NewService) {}

  ngOnInit(): void {
    this._newService.settings$.subscribe((settings: Settings) => {
      this.categories = settings.categories;
    });
  }

  toggleCategory(category) {
    const index = this._newService.selectedCategories.indexOf(category);
    if (index === -1) {
      this._newService.selectedCategories.push(category);
    } else {
      this._newService.selectedCategories.splice(index, 1);
    }
  }

  isSelected(category) {
    return this._newService.selectedCategories.includes(category);
  }

  resetCategories() {
    this._newService.selectedCategories = [];
  }
  updateResult() {
    this._newService.currentPage = 1;
    this._newService.getModels().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
