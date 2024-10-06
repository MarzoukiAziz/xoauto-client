import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { Settings } from '../../../ad.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'step-three',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent {
  indoor = [];
  outdoor = [];
  safety = [];
  functional = [];

  selectedIndoor = [];
  selectedOutdoor = [];
  selectedSafety = [];
  selectedFunctional = [];
  non_smoker = false;
  first_hand = false;
  manufacturer_warranty = false;
  others = '';

  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.indoor = settings.equipment.indoor;
      this.outdoor = settings.equipment.outdoor;
      this.safety = settings.equipment.safety;
      this.functional = settings.equipment.functional;
    });
  }

  verifyStepThree(others) {
    this._adService.newAd.equipments.indoor = this.selectedIndoor;
    this._adService.newAd.equipments.outdoor = this.selectedOutdoor;
    this._adService.newAd.equipments.safety = this.selectedSafety;
    this._adService.newAd.equipments.functional = this.selectedFunctional;
    this._adService.newAd.options_vehicule.first_hand = this.first_hand;
    this._adService.newAd.options_vehicule.manufacturer_warranty =
      this.manufacturer_warranty;
    this._adService.newAd.options_vehicule.non_smoker = this.non_smoker;
    if (others.length > 0) {
      this._adService.newAd.options_vehicule.others = others
        .split(',')
        .map((option) => option.trim());
    }
    this._adService.step = 4;
  }

  onOutdoorSelect(event: Event, eq: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedOutdoor.push(eq);
    } else {
      const index = this.selectedOutdoor.indexOf(eq);
      if (index > -1) {
        this.selectedOutdoor.splice(index, 1);
      }
    }
  }
  onIndoorSelect(event: Event, eq: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedIndoor.push(eq);
    } else {
      const index = this.selectedIndoor.indexOf(eq);
      if (index > -1) {
        this.selectedIndoor.splice(index, 1);
      }
    }
  }
  onSafetySelect(event: Event, eq: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedSafety.push(eq);
    } else {
      const index = this.selectedSafety.indexOf(eq);
      if (index > -1) {
        this.selectedSafety.splice(index, 1);
      }
    }
  }
  onFunctionalSelect(event: Event, eq: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedFunctional.push(eq);
    } else {
      const index = this.selectedFunctional.indexOf(eq);
      if (index > -1) {
        this.selectedFunctional.splice(index, 1);
      }
    }
  }

  back() {
    this._adService.step = 2;
  }
}
