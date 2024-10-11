import { Component, Input } from '@angular/core';
import { TechnicalSheet } from '../../new.types';
import { CommonModule } from '@angular/common';
import { FeatureTableComponent } from '../feature-table/feature-table.component';

@Component({
  selector: 'new-technical-sheet',
  standalone: true,
  imports: [CommonModule, FeatureTableComponent],
  templateUrl: './technical-sheet.component.html',
})
export class TechnicalSheetComponent {
  @Input() technical_sheet: TechnicalSheet;
}
