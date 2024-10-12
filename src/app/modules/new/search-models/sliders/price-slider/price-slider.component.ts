import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewService } from 'src/app/modules/new/new.service';

@Component({
  selector: 'price-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
  templateUrl: './price-slider.component.html',
  styleUrl: '../slider-item.css',
})
export class PriceSliderComponent {
  priceMin = 0;
  priceMax = 1000000;
  constructor(public _newService: NewService) {}
}
