import { Component, OnInit } from '@angular/core';
import { PanelTitleComponent } from 'src/app/shared/components/panel-title/panel-title.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [PanelTitleComponent],
})
export class DashboardComponent {}
