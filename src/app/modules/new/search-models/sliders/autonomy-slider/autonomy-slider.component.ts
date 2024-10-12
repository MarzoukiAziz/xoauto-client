import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewService } from 'src/app/modules/new/new.service';

@Component({
  selector: 'new-autonomy-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
  templateUrl: './autonomy-slider.component.html',
  styleUrl: '../slider-item.css',
})
export class NewAutonomySliderComponent {
  autonomyMin = 0;
  autonomyMax = 1200;
  constructor(public _newService: NewService) {}
}
