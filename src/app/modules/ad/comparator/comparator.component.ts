import { ChangeDetectorRef, Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { AdService } from '../ad.service';
import { Ad } from '../ad.types';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NoAdsComponent } from '../components/no-ads/no-ads.component';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrl: './comparator.component.css',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, NoAdsComponent],
})
export class ComparatorComponent {
  ads: Ad[] = [];
  all = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _adService: AdService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._adService.ads$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ads: Ad[]) => {
        this.ads = ads;
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  removeFromComparator(id) {
    this._adService.removeFromCompare(id);
    this._adService
      .getAdsForComparator()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ads: Ad[]) => {
        this.ads = ads;
        this._changeDetectorRef.markForCheck();
      });
  }
}
