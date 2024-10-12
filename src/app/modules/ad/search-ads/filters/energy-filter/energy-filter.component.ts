import { Component, ViewChild } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'ad-energy-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './energy-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class EnergyFilterComponent {
  energies = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.energies = settings.energies;
    });
  }

  toggleEnergy(energy) {
    const index = this._adService.selectedEnergies.indexOf(energy);
    if (index === -1) {
      this._adService.selectedEnergies.push(energy);
    } else {
      this._adService.selectedEnergies.splice(index, 1);
    }
  }

  isSelected(energy) {
    return this._adService.selectedEnergies.includes(energy);
  }

  resetEnergies() {
    this._adService.selectedEnergies = [];
  }
  updateResult() {
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
