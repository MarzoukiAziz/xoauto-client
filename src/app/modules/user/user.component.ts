import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from './user.types';
import { Subject, takeUntil } from 'rxjs';
import { NewAdBannerComponent } from '../../shared/components/new-ad-banner/new-ad-banner.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NewAdBannerComponent,
    NewAdBannerComponent,
  ],
})
export class UserComponent {
  user!: User;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  signOut() {
    this._userService.signOut();
  }

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;

        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
