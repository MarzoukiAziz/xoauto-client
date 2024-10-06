import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { Settings } from '../../../ad.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
})
export class StepTwoComponent {
  categories: String[];
  energies: String[];
  colors: String[];

  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.categories = settings.categories.map((cat) => cat.name_fr);
      this.energies = settings.energies.map((en) => en.name_fr);
      this.colors = settings.colors.map((col) => col.name_fr);
    });
  }

  //falgs
  categorySelected = false;
  energySelected = false;
  coolorSelected = false;

  //alert
  alertMessage = '';
  showAlert = false;

  verifyStepTwo(
    seats,
    horsepower,
    power_kw,
    autonomy_wltp_km,
    category,
    energy,
    color
  ) {
    this.alertMessage = '';
    this.showAlert = false;

    if (seats < 1 || seats > 10 || seats == '') {
      this.alertMessage = 'Valeur de Nombre de Places invalide';
      this.showAlert = true;
      return;
    }
    if (horsepower < 1 || horsepower > 2000 || horsepower == '') {
      this.alertMessage = 'Valeur de Puissance en chevaux invalide';
      this.showAlert = true;
      return;
    }
    if (power_kw < 1 || power_kw > 2000 || power_kw == '') {
      this.alertMessage = 'Valeur de Puissance en kw invalide';
      this.showAlert = true;
      return;
    }

    if (
      autonomy_wltp_km < 1 ||
      autonomy_wltp_km > 2000 ||
      autonomy_wltp_km == ''
    ) {
      this.alertMessage = 'Valeur de Autonomie WLTP invalide';
      this.showAlert = true;
      return;
    }

    if (!this.categories.includes(category)) {
      this.alertMessage = 'Carrosserie invalide.';
      this.showAlert = true;
      return;
    }
    if (!this.energies.includes(energy)) {
      this.alertMessage = 'Énergie invalide.';
      this.showAlert = true;
      return;
    }

    if (!this.colors.includes(color)) {
      this.alertMessage = 'Couleur invalide.';
      this.showAlert = true;
      return;
    }

    this._adService.newAd.category = category;
    this._adService.newAd.fuel_type = energy;
    this._adService.newAd.color = color;
    this._adService.newAd.seats = parseInt(seats);
    this._adService.newAd.horsepower = parseInt(horsepower);
    this._adService.newAd.power_kw = parseInt(power_kw);
    this._adService.newAd.autonomy_wltp_km = parseInt(autonomy_wltp_km);
    this._adService.step = 3;
  }

  back() {
    this._adService.step = 1;
  }
}
