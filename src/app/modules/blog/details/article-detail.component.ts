import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Article, Comment } from '../blog.types';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../blog.service';
import { CommonModule } from '@angular/common';
import { NewAdBannerComponent } from '../../../shared/components/new-ad-banner/new-ad-banner.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NewAdBannerComponent],
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  comments: Comment[] = [];
  content!: SafeHtml;
  connected: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private _blogService: BlogService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._blogService.article$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((article: Article) => {
        this.article = article;
        this.content = this.sanitizer.bypassSecurityTrustHtml(
          this.article.content
        );
        this._changeDetectorRef.markForCheck();
      });

    this._blogService.comments$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
        console.log(this.comments);
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
