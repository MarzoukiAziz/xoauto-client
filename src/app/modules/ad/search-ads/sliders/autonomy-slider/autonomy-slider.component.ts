import { Component } from '@angular/core';
import { AdService } from '../../../ad.service';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ad-autonomy-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
  templateUrl: './autonomy-slider.component.html',
  styleUrl: '../slider-item.css',
})
export class AutonomySliderComponent {
  autonomyMin = 0;
  autonomyMax = 1200;
  constructor(public _adService: AdService) {}
}
