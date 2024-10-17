import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BlogService } from '../blog.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Article } from '../blog.types';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RightBarComponent } from '../components/right-bar/right-bar.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { NewAdBannerComponent } from 'src/app/shared/components/new-ad-banner/new-ad-banner.component';
import { configurePaginator } from 'src/app/shared/utils/configure-paginator';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styleUrls: ['./article-list.component.css'],
  imports: [
    MatPaginator,
    BreadcrumbComponent,
    CommonModule,
    RouterLink,
    RightBarComponent,
    LoaderComponent,
    NewAdBannerComponent,
  ],
})
export class ArticleListComponent {
  articles: Article[] = [];
  count: Number = 0;
  currentPage: number = 1;
  pageSize = 8;
  resetPaginator = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _blogService: BlogService
  ) {}

  OnPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.resetPaginator = false;
    this._blogService.getArticles(this.currentPage).subscribe((_) => {
      window.scrollTo(0, 0); // Scroll to top
    });
  }

  ngOnInit(): void {
    this.paginator = configurePaginator(this.paginator, 'Articles');

    this._blogService.articles$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((articles: Article[]) => {
        this.articles = articles;
        if (this.resetPaginator) {
          this.paginator.pageIndex = 0;
        }
        this.resetPaginator = true;

        this._changeDetectorRef.markForCheck();
      });
    this._blogService.count$
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
