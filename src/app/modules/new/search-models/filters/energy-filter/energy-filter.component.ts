import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NewService } from '../../../new.service';
import { Settings } from 'src/app/modules/ad/ad.types';

@Component({
  selector: 'new-energy-filter',
  standalone: true,
  imports: [CommonModule, NgbPopover, FormsModule],
  templateUrl: './energy-filter.component.html',
  styleUrl: '../filter-item.css',
})
export class NewEnergyFilterComponent {
  energies = [];

  @ViewChild('popOver1') public popover1!: NgbPopover;
  constructor(public _newService: NewService) {}

  ngOnInit(): void {
    this._newService.settings$.subscribe((settings: Settings) => {
      this.energies = settings.energies;
    });
  }

  toggleEnergy(energy) {
    const index = this._newService.selectedEnergies.indexOf(energy);
    if (index === -1) {
      this._newService.selectedEnergies.push(energy);
    } else {
      this._newService.selectedEnergies.splice(index, 1);
    }
  }

  isSelected(energy) {
    return this._newService.selectedEnergies.includes(energy);
  }

  resetEnergies() {
    this._newService.selectedEnergies = [];
  }
  updateResult() {
    this._newService.currentPage = 1;
    this._newService.getModels().subscribe();
    if (this.popover1.isOpen()) this.popover1.close();
  }
}
