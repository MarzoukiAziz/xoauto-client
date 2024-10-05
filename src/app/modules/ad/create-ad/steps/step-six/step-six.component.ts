import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'step-six',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step-six.component.html',
})
export class StepSixComponent {
  constructor(public _adService: AdService) {}

  conditionsSelected = false;

  //alert
  alertMessage = '';
  showAlert = false;

  verifyStepSix(price) {
    this.alertMessage = '';
    this.showAlert = false;
    if (!price || parseInt(price) < 0) {
      this.alertMessage = 'Prix invalide.';
      this.showAlert = true;
      return;
    }
    this._adService.newAd.price = parseInt(price);
    this._adService.step = 7;
  }

  back() {
    this._adService.step = 5;
  }
}
