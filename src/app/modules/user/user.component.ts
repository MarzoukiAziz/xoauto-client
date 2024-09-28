import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from './user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from './user.types';
import { Subject, takeUntil } from 'rxjs';
import { NewAdBannerComponent } from '../../shared/components/new-ad-banner/new-ad-banner.component';

@Component({
  selector: 'app-user',
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
  selectedSection = 'dashboard';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  signOut() {
    this._userService.signOut();
  }

  ngOnInit(): void {
    const segments = this.router.url.split('/');
    this.selectedSection = segments[2] || '';
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
