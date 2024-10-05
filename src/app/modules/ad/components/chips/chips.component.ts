import { Component } from '@angular/core';
import { AdService } from '../../ad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filter-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  yearMax = new Date().getFullYear();
  constructor(public _adService: AdService) {}
}
