import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { Settings } from '../../../ad.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-one.component.html',
})
export class StepOneComponent {
  brands = [];
  models = [];
  months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  years: number[] = this.generateYears(2000);

  startYear: number;

  private generateYears(endYear: number): number[] {
    this.startYear = new Date().getFullYear();
    const length = Math.abs(this.startYear - endYear) + 1;
    return Array.from({ length }, (_, index) => this.startYear - index);
  }

  constructor(public _adService: AdService) {}

  ngOnInit(): void {
    this._adService.settings$.subscribe((settings: Settings) => {
      this.brands = settings.brands;
      this.models = settings.models;
    });
  }

  //falgs
  brandSelected = false;
  modelSelected = false;
  monthSelected = false;
  yearSelected = false;

  //alert
  alertMessage = '';
  showAlert = false;

  verifyStepOne(brand, model, otherModel, finition, month, year, km) {
    this.alertMessage = '';
    this.showAlert = false;
    if (!this.brands.map((brand) => brand.name).includes(brand)) {
      this.alertMessage = 'Marque invalide.';
      this.showAlert = true;
      return;
    }
    if (!model) {
      this.alertMessage = 'Modèle invalide!';
      this.showAlert = true;
      return;
    }

    if (otherModel == '' && model == 'Autre') {
      this.alertMessage = 'Spécifier le modèle!';
      this.showAlert = true;
      return;
    }

    if (month < 1 || month > 12) {
      this.alertMessage = 'Le mois doit être compris entre 1 et 12.';
      this.showAlert = true;
      return;
    }

    if (year < 2000 || year > this.startYear) {
      this.alertMessage =
        "L'année doit être comprise entre 2000 et " + this.startYear + '.';
      this.showAlert = true;
      return;
    }

    if (km < 0 || km > 2000000 || km == '') {
      this.alertMessage =
        'Valeur de Kilométrage invalide. Doit être entre 0 et 2000000.';
      this.showAlert = true;
      return;
    }
    this._adService.newAd.brand = brand;
    this._adService.newAd.version = finition;
    this._adService.newAd.first_registration.month = parseInt(month);
    this._adService.newAd.first_registration.year = parseInt(year);
    this._adService.newAd.mileage = parseInt(km);

    if (model == 'Autre') {
      this._adService.newAd.car_model = otherModel;
    } else {
      this._adService.newAd.car_model = model;
    }

    this._adService.step = 2;
  }

  filterModels(models, brand) {
    if (brand.value != 'Marque') {
      const brandId = this.brands.filter((b) => b.name == brand.value)[0]._id;
      return models.filter((model) => model.brandId == brandId);
    }
    return [];
  }
}
