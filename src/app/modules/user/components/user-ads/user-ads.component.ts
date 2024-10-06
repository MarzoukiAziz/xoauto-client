import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Ad } from 'src/app/modules/ad/ad.types';
import { Subject, takeUntil } from 'rxjs';
import { AdService } from 'src/app/modules/ad/ad.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NoAdsComponent } from 'src/app/modules/ad/components/no-ads/no-ads.component';
import { configurePaginator } from 'src/app/shared/utils/configure-paginator';
import { PanelTitleComponent } from 'src/app/shared/components/panel-title/panel-title.component';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-ads',
  standalone: true,
  imports: [
    CommonModule,
    PanelTitleComponent,
    NoAdsComponent,
    RouterLink,
    MatPaginator,
  ],
  templateUrl: './user-ads.component.html',
  styleUrl: './user-ads.component.css',
})
export class UserAdsComponent {
  ads: Ad[] = [];
  count: Number = 0;
  currentPage: number = 1;
  pageSize = 9;
  currency = environment.CURRENCY;

  private _unsubscribeAll: Subject<Ad> = new Subject<Ad>();

  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _adService: AdService
  ) {}

  OnPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    window.scrollTo(0, 0); // Scroll to top
    this._adService.getUserAds(this.currentPage).subscribe();
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
