import { Component } from '@angular/core';
import { AdService } from '../../ad.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'sort-ads',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sort-ads.component.html',
  styleUrl: './sort-ads.component.css',
})
export class SortAdsComponent {
  count: Number = 0;
  private _unsubscribeAll: Subject<number> = new Subject<number>();

  constructor(public _adService: AdService) {}
  ngOnInit(): void {
    this._adService.count$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((count) => {
        this.count = count;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  sortOptions = [
    {
      name: 'Plus récentes',
      code: 'desc',
    },
    {
      name: 'Plus anciennes',
      code: 'asc',
    },
    {
      name: 'Prix Descendant',
      code: 'price-desc',
    },
    {
      name: 'Prix Ascendant',
      code: 'price-asc',
    },
  ];

  isSelected(sortOption) {
    return this._adService.sort == sortOption.code;
  }

  updateResult(sortOption) {
    this._adService.sort = sortOption;
    this._adService.currentPage = 1;
    this._adService.getAds().subscribe();
  }
}
