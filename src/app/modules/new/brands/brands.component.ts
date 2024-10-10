import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NewService } from '../new.service';
import { Brand, NewSettings } from '../new.types';
import { takeUntil } from 'rxjs';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, LoaderComponent, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brands: Brand[];
  constructor(public _newService: NewService) {}

  ngOnInit(): void {
    this._newService.settings$.subscribe((settings: NewSettings) => {
      this.brands = settings.brands;
    });
  }
}
