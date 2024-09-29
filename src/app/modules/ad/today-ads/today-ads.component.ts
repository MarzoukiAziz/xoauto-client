import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Ad } from '../ad.types';
import { Subject, takeUntil } from 'rxjs';
import { AdService } from '../ad.service';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdPreviewComponent } from '../components/ad-preview/ad-preview.component';
import { NoAdsComponent } from '../components/no-ads/no-ads.component';
import { configurePaginator } from 'src/app/shared/utils/configure-paginator';

@Component({
  selector: 'app-today-ads',
  templateUrl: './today-ads.component.html',
  styleUrl: './today-ads.component.css',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    MatPaginator,
    AdPreviewComponent,
    NoAdsComponent,
  ],
})
export class TodayAdsComponent {
  ads: Ad[] = [];
  count: Number = 0;
  currentPage: number = 1;
  pageSize = 9;
  private _unsubscribeAll: Subject<Ad> = new Subject<Ad>();

  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _adService: AdService
  ) {}

  OnPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    window.scrollTo(0, 0); // Scroll to top
    this._adService.getTodayAds(this.currentPage).subscribe();
  }

  ngOnInit(): void {
    this.paginator = configurePaginator(this.paginator, 'Annonces');
    this._adService.ads$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ads: Ad[]) => {
        this.ads = ads;
        this._changeDetectorRef.markForCheck();
      });
    this._adService.count$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((count) => {
        this.count = count;
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  trackByFn(index: number, item: any): any {
    return item._id || index;
  }
}
