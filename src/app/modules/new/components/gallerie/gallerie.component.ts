import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
@Component({
  selector: 'new-gallerie',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './gallerie.component.html',
  styleUrl: './gallerie.component.css',
})
export class GallerieComponent {
  @Input() gallerie: [];
}
