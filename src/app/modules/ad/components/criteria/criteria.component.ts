import { Component, Input } from '@angular/core';

@Component({
  selector: 'criteria',
  templateUrl: './criteria.component.html',
  styleUrl: './criteria.component.css',
  standalone: true,
})
export class CriteriaComponent {
  @Input() criteria: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() unit: string = '';
}
