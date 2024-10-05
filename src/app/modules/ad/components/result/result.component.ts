import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Ad } from '../../ad.types';
import { Subject, takeUntil } from 'rxjs';
import { AdService } from '../../ad.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdPreviewComponent } from '../ad-preview/ad-preview.component';
import { NoAdsComponent } from '../no-ads/no-ads.component';
import { configurePaginator } from 'src/app/shared/utils/configure-paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'search-result',
  templateUrl: './result.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    AdPreviewComponent,
    NoAdsComponent,
    MatProgressSpinnerModule,
  ],
})
export class ResultComponent {
  @Input() loading: boolean = false;
  ads: Ad[] = [];
  count: Number = 0;
  pageSize = 9;
  private _unsubscribeAll: Subject<Ad> = new Subject<Ad>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _adService: AdService
  ) {}

  OnPageChange(event: PageEvent) {
    this._adService.currentPage = event.pageIndex + 1;
    window.scrollTo(0, 0); // Scroll to top
    this._adService.getAds().subscribe();
  }

  ngOnInit(): void {
    this.paginator = configurePaginator(this.paginator, 'Annonces');
    this._adService.ads$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((ads: Ad[]) => {
        this.ads = ads;
        this.paginator.pageIndex = this._adService.currentPage - 1;
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
