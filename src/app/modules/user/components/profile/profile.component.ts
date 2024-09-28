import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from '../../user.types';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';
import { PanelTitleComponent } from 'src/app/shared/components/panel-title/panel-title.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [PanelTitleComponent, CommonModule],
})
export class ProfileComponent {
  user!: User;
  selectedSection = 'dashboard';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;

        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
