import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NewService } from '../../new.service';
@Component({
  selector: 'sort-new-ads',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sort-new-ads.component.html',
  styleUrl: './sort-new-ads.component.css',
})
export class SortNewAdsComponent {
  @Input() brand: string = '';
  private _unsubscribeAll: Subject<number> = new Subject<number>();

  constructor(public _newService: NewService) {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  sortOptions = [
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
    return this._newService.sort == sortOption.code;
  }

  updateResult(sortOption) {
    this._newService.sort = sortOption;

    this._newService.getModelsByBrand(this.brand).subscribe();
  }
}
