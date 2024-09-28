import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from './user.types';
import { Subject, takeUntil, filter } from 'rxjs';
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
export class UserComponent implements OnInit, OnDestroy {
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
    // Set selected section based on initial URL
    const segments = this.router.url.split('/');
    this.selectedSection = segments[2] || '';

    // Subscribe to user data
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to router events to track route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        const newSegments = event.urlAfterRedirects.split('/');
        this.selectedSection = newSegments[2] || '';
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
