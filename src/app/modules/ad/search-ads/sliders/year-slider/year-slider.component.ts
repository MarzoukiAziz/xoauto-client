import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AdService } from '../../../ad.service';

@Component({
  selector: 'year-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
  templateUrl: './year-slider.component.html',
  styleUrl: '../slider-item.css',
})
export class YearSliderComponent {
  yearMin = 2000;
  yearMax = new Date().getFullYear();
  constructor(public _adService: AdService) {}
}
