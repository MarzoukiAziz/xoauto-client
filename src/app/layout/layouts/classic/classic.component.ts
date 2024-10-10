import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.component.html',
  styleUrl: './classic.component.css',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    RouterOutlet,
    CommonModule,
  ],
})
export class ClassicComponent {
  constructor(public loader: LoadingService) {}
}
