import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrl: './feature-table.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class FeatureTableComponent {
  @Input() title!: string;
  @Input() iconPath!: string;
  @Input() features!: any;
}
