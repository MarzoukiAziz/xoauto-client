import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewService } from '../../new.service';

@Component({
  selector: 'filter-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  yearMax = new Date().getFullYear();
  constructor(public _newService: NewService) {}
}
