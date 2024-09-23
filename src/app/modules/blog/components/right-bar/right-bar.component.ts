import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleDetailComponent } from '../../details/article-detail.component';
import { ArticleListComponent } from '../../list/article-list.component';

@Component({
  selector: 'blog-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RightBarComponent {
  categories: string[] = [];
  selectedCategory: string = '';
  keywords: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _blogService: BlogService,
    private _blogListing: ArticleListComponent
  ) {}

  ngOnInit(): void {
    this._blogService.categories$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((categories: string[]) => {
        this.categories = categories;
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.updateArticlesResult();
  }

  updateArticlesResult() {
    this._blogService
      .getArticles(1, this.keywords, this.selectedCategory)
      .subscribe();
    this._blogListing.paginator.pageIndex = 0;
  }
}
