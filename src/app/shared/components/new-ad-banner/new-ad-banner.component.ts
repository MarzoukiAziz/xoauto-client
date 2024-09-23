import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'new-ad-banner',
  templateUrl: './new-ad-banner.component.html',
  styleUrl: './new-ad-banner.component.css',
  standalone: true,
  imports: [RouterLink],
})
export class NewAdBannerComponent {}
