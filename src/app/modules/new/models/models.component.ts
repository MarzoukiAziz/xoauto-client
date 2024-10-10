import { Component } from '@angular/core';
import { Brand, Model } from '../new.types';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { environment } from 'src/environments/environment';
import { formatModelToPreview } from 'src/app/shared/utils/format-model-versions';
import { SortNewAdsComponent } from '../components/sort-ads/sort-new-ads.component';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, SortNewAdsComponent],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css',
})
export class ModelsComponent {
  models: Model[] = [];
  brand: Brand;
  currency = environment.CURRENCY;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.brand = data['brand'];
      this.models = data['models'].ads.map((ad) => formatModelToPreview(ad));
    });
  }

  trackByFn(index: number, item: any): any {
    return item.model || index;
  }
}
