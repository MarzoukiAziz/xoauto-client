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
import { AuthService } from '../../auth/auth.service';

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
  article!: Article;
  comments: Comment[] = [];
  content!: SafeHtml;
  connected: boolean = false;
  selectedCommentToReply: string = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private _blogService: BlogService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _auth: AuthService
  ) {
    this.connected = this._auth.isAuthenticated();
  }

  ngOnInit(): void {
    this._blogService.article$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((article: Article) => {
        this.article = article;
        this.content = this.sanitizer.bypassSecurityTrustHtml(
          this.article.content ?? ''
        );
        this._changeDetectorRef.markForCheck();
      });

    this._blogService.comments$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // Method to post a comment
  postComment() {
    const commentContent = document.querySelector<HTMLInputElement>(
      this.selectedCommentToReply != ''
        ? `#c${this.selectedCommentToReply}`
        : '#comment-box'
    );
    const comment = {
      uid: this._auth.getUserInfo().id,
      articleId: this.article._id,
      content: commentContent.value,
      answerTo: this.selectedCommentToReply,
    };
    this._blogService.createComment(comment).subscribe(() => {
      commentContent.value = '';
      this.selectedCommentToReply = '';
    });
  }

  // Method to initiate reply to a comment
  answerSelectedComment(commentId) {
    this.selectedCommentToReply = commentId;
  }

  // Method to close reply section
  closeAnswer() {
    this.selectedCommentToReply = '';
  }

  // Method to post a reply to a comment
  postAnswer(id) {
    // const myInput = document.querySelector<HTMLInputElement>(`#c${id}`);
    // const comment = new ArticleComment();
    // comment.user = this._auth.userData;
    // comment.articleId = this.article._id;
    // comment.content = myInput.value;
    // comment.answerTo = this.selectedCommentToReply;
    // this.selectedCommentToReply = '';
    // this._commentservice.createComment(comment).subscribe((res) => {
    //   myInput.value = '';
    //   this.toastr.info('Commentaire ajouté!', "C'est fait", {
    //     progressBar: true,
    //   });
    //   this.getComments();
    // });
  }
}
