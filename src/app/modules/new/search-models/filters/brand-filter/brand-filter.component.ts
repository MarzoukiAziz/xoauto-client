import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NewService } from '../../../new.service';
import { Settings } from 'src/app/modules/ad/ad.types';

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
  constructor(public _newService: NewService) {}

  ngOnInit(): void {
    this._newService.settings$.subscribe((settings: Settings) => {
      this.brands = settings.brands;
    });
  }

  toggleBrand(brand) {
    const index = this._newService.selectedBrands.indexOf(brand);
    if (index === -1) {
      this._newService.selectedBrands.push(brand);
    } else {
      this._newService.selectedBrands.splice(index, 1);
    }
  }

  isSelected(brand) {
    return this._newService.selectedBrands.includes(brand);
  }

  resetBrands() {
    this._newService.selectedBrands = [];
  }
  updateResult() {
    this._newService.currentPage = 1;
    this._newService.getModels().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
