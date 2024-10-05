import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Settings } from '../../../ad.types';

@Component({
  selector: 'step-five',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-five.component.html',
})
export class StepFiveComponent {
  regions: String[];

  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.regions = settings.regions.map((region) => region.name_fr);
    });
  }

  //falgs
  regionSelected = false;

  //alert
  alertMessage = '';
  showAlert = false;

  verifyStepFive(region, address, description) {
    this.alertMessage = '';
    this.showAlert = false;
    if (!this.regions.includes(region)) {
      this.alertMessage = 'Gouvernorat invalide.';
      this.showAlert = true;
      return;
    }
    if (!address) {
      this.alertMessage = 'Adresse invalide.';
      this.showAlert = true;
      return;
    }
    this._adService.newAd.region = region;
    this._adService.newAd.description = description;
    this._adService.newAd.address = address;
    this._adService.step = 6;
  }

  back() {
    this._adService.step = 4;
  }
}
