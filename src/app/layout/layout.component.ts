import { Component } from '@angular/core';
import { ClassicComponent } from './layouts/classic/classic.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [ClassicComponent],
})
export class LayoutComponent {}
