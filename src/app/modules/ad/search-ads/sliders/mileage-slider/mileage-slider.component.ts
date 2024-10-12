import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AdService } from '../../../ad.service';

@Component({
  selector: 'ad-mileage-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
  templateUrl: './mileage-slider.component.html',
  styleUrl: '../slider-item.css',
})
export class MileageSliderComponent {
  mileageMin = 0;
  mileageMax = 500000;
  constructor(public _adService: AdService) {}
}
