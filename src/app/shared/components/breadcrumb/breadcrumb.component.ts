import { Component, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  standalone: true,
})
export class BreadcrumbComponent {
  @Input() title: string = '';
  @Input() backgroundImgPath: string = '';
  @Input() brandName: string = '';
  @Input() brandIcon: string = '';
}
