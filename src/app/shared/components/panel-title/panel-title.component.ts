import { Component, Input } from '@angular/core';

@Component({
  selector: 'panel-title',
  templateUrl: './panel-title.component.html',
  styleUrl: './panel-title.component.css',
  standalone: true,
})
export class PanelTitleComponent {
  @Input() title: string = '';
}
