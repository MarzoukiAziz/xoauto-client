import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-ads',
  templateUrl: './no-ads.component.html',
  styleUrl: './no-ads.component.css',
  standalone: true,
})
export class NoAdsComponent {
  @Input() message: string =
    "Aucune annonce de voitures d'occasion n'a été publiée aujourd'hui.";
}
