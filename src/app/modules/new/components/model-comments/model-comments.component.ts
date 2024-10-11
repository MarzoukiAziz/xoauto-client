import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NewService } from '../../new.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AdComment, Version } from '../../new.types';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'new-model-comments',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './model-comments.component.html',
  styleUrl: './model-comments.component.css',
})
export class ModelCommentsComponent {
  @Input() versions: Version[] = [];
  comments: AdComment[] = [];
  content!: SafeHtml;
  connected: boolean = false;
  selectedCommentToReply: string = '';
  versionIds = [];
  loading = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _newService: NewService,
    private _auth: AuthService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.connected = this._auth.isAuthenticated();
  }

  ngOnInit(): void {
    this.versionIds = this.versions.map((version) => version._id);
    this.loading = true;
    this._newService.getAdComments(this.versionIds).subscribe(() => {
      this._newService.adComments$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((adComments: AdComment[]) => {
          this.comments = adComments;
          this.loading = false;
          this._changeDetectorRef.markForCheck();
        });
    });
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
      adId: this.versions[0]._id,
      content: commentContent.value,
      answerTo: this.selectedCommentToReply,
    };
    this._newService.createComment(comment, this.versionIds).subscribe(() => {
      commentContent.value = '';
      this.selectedCommentToReply = '';
      window.scrollTo(0, 0);
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
