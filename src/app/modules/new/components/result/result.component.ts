import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { configurePaginator } from 'src/app/shared/utils/configure-paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewService } from '../../new.service';
import { Model } from '../../new.types';
import { NoAdsComponent } from 'src/app/modules/ad/components/no-ads/no-ads.component';
import { formatModelToPreview } from 'src/app/shared/utils/format-model-versions';
import { MatGridListModule } from '@angular/material/grid-list';
import { environment } from 'src/environments/environment.prod';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'search-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    NoAdsComponent,
    MatProgressSpinnerModule,
    MatGridListModule,
    RouterLink,
  ],
})
export class ResultComponent {
  @Input() loading: boolean = false;
  models: Model[] = [];
  count: Number = 0;
  pageSize = 9;
  breakpoint: number = 4;
  rowHeight = '2:2.5';
  currency = environment.CURRENCY;

  private _unsubscribeAll: Subject<Model> = new Subject<Model>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _newService: NewService
  ) {}

  OnPageChange(event: PageEvent) {
    this._newService.currentPage = event.pageIndex + 1;
    window.scrollTo(0, 0); // Scroll to top
    this._newService.getModels().subscribe();
  }

  ngOnInit(): void {
    this.initSize();
    this.paginator = configurePaginator(this.paginator, 'Annonces');
    this._newService.models$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((models: Model[]) => {
        this.models = models.map((model) => formatModelToPreview(model));
        this.paginator.pageIndex = this._newService.currentPage - 1;
        this._changeDetectorRef.markForCheck();
      });
    this._newService.count$
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

  onResize(event: any) {
    this.breakpoint =
      event.target.innerWidth <= 600
        ? 2
        : event.target.innerWidth <= 990
        ? 3
        : 4;
    this.rowHeight =
      event.target.innerWidth <= 350
        ? '2:3'
        : event.target.innerWidth <= 370
        ? '2:2.8'
        : event.target.innerWidth <= 400
        ? '2:2.5'
        : event.target.innerWidth <= 520
        ? '2:2.3'
        : event.target.innerWidth <= 600
        ? '2:2'
        : event.target.innerWidth <= 770
        ? '2:3'
        : event.target.innerWidth <= 990
        ? '2:2.25'
        : event.target.innerWidth <= 1200
        ? '2:2.15'
        : '2:2';
  }

  initSize() {
    this.breakpoint =
      window.innerWidth <= 600 ? 2 : window.innerWidth <= 990 ? 3 : 4;

    this.rowHeight =
      window.innerWidth <= 350
        ? '2:3'
        : window.innerWidth <= 370
        ? '2:2.8'
        : window.innerWidth <= 400
        ? '2:2.5'
        : window.innerWidth <= 520
        ? '2:2.3'
        : window.innerWidth <= 600
        ? '2:2'
        : window.innerWidth <= 770
        ? '2:3'
        : window.innerWidth <= 990
        ? '2:2.25'
        : window.innerWidth <= 1200
        ? '2:2.15'
        : '2:2';
  }
}
