import { Component, OnInit } from '@angular/core';
import { PanelTitleComponent } from 'src/app/shared/components/panel-title/panel-title.component';
import { HighLight } from '../../user.types';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [PanelTitleComponent],
})
export class DashboardComponent {
  highlight: HighLight;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.highlight = data['highlight'];
      console.log(this.highlight);
    });
  }
}
