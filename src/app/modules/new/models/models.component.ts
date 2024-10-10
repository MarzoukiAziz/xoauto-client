import { ChangeDetectorRef, Component } from '@angular/core';
import { Brand, Model } from '../new.types';
import { NewService } from '../new.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _newService: NewService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._newService.brand$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((brand: Brand) => {
        this.brand = brand;
        this._changeDetectorRef.markForCheck();
      });
    this._newService.models$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((models: Model[]) => {
        this.models = models.map((model) => formatModelToPreview(model));
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.model || index;
  }
}
